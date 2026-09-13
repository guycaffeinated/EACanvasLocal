/**
 * CSV Store and File System Access API Wrapper
 * Enables direct reading and writing of CSV files from the local filesystem.
 */
(function () {
    'use strict';

    function isFileSystemAccessSupported() {
        return 'showDirectoryPicker' in window;
    }

    // A simple CSV parser that handles basic quotes and commas
    function parseCSV(text) {
        if (!text) return [];
        let rows = [];
        let row = [];
        let cur = '';
        let inQuote = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"') {
                if (inQuote && nextChar === '"') {
                    cur += '"';
                    i++; // Skip the escaped quote
                } else {
                    inQuote = !inQuote;
                }
            } else if (char === ',' && !inQuote) {
                row.push(cur);
                cur = '';
            } else if (char === '\n' && !inQuote) {
                // handle crlf
                if (cur.endsWith('\r')) {
                    cur = cur.slice(0, -1);
                }
                row.push(cur);
                if (row.length > 0 || (row.length === 1 && cur === '')) {
                    if (row.length > 1 || row[0] !== '') {
                        rows.push(row);
                    }
                }
                row = [];
                cur = '';
            } else if (char === '\r' && !inQuote) {
                // skip carriage return if followed by newline
                if (nextChar !== '\n') {
                    cur += char;
                }
            } else {
                cur += char;
            }
        }

        // Push the last token if any
        if (cur !== '' || row.length > 0) {
            row.push(cur);
            rows.push(row);
        }

        // Convert array of arrays to array of objects
        if (rows.length < 1) return [];
        const headers = rows[0].map(h => h.trim());
        const result = [];
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].length === 0) continue;
            let obj = {};
            for (let j = 0; j < headers.length; j++) {
                // handle case where row has fewer columns than headers
                obj[headers[j]] = rows[i][j] !== undefined ? rows[i][j].trim() : '';
            }
            result.push(obj);
        }
        return result;
    }

    // Convert array of objects back to CSV string
    function serializeCSV(rows) {
        if (!rows || rows.length === 0) return '';

        // Extract all unique keys from all rows (in case some rows miss keys)
        // Keep order of first row, then append others
        let headersSet = new Set();
        if (rows.length > 0) {
            Object.keys(rows[0]).forEach(k => headersSet.add(k));
        }
        for (const row of rows) {
            Object.keys(row).forEach(k => headersSet.add(k));
        }
        const headers = Array.from(headersSet);

        function escapeField(field) {
            if (field == null) return '';
            let s = String(field);
            if (s.includes(',') || s.includes('"') || s.includes('\n')) {
                return '"' + s.replace(/"/g, '""') + '"';
            }
            return s;
        }

        let csv = headers.map(escapeField).join(',') + '\n';
        for (const row of rows) {
            csv += headers.map(h => escapeField(row[h])).join(',') + '\n';
        }
        return csv;
    }

    async function openDataFolder() {
        if (!isFileSystemAccessSupported()) {
            throw new Error('File System Access API is not supported in this browser.');
        }
        const dirHandle = await window.showDirectoryPicker({
            mode: 'readwrite',
            startIn: 'documents'
        });
        return dirHandle;
    }

    async function verifyPermission(fileHandle, readWrite) {
        const options = {};
        if (readWrite) {
            options.mode = 'readwrite';
        }
        if ((await fileHandle.queryPermission(options)) === 'granted') {
            return true;
        }
        if ((await fileHandle.requestPermission(options)) === 'granted') {
            return true;
        }
        return false;
    }

    async function readCSVFile(dirHandle, filename) {
        try {
            const fileHandle = await dirHandle.getFileHandle(filename);
            const file = await fileHandle.getFile();
            const text = await file.text();
            return {
                lastModified: file.lastModified,
                handle: fileHandle,
                data: parseCSV(text)
            };
        } catch (e) {
            console.warn(`Could not read ${filename}:`, e);
            return null; // File might not exist
        }
    }

    async function readAllCSVs(dirHandle) {
        window.EACSVStore._dirHandle = dirHandle; // expose for other modules
        await verifyPermission(dirHandle, false); // verify basic read permission on dir

        const files = {
            'Capabilities_L1': 'capabilities_l1.csv',
            'Capabilities_L2': 'capabilities_l2.csv',
            'Applications': 'applications.csv',
            'App_Capability_Map': 'app_capability_map.csv',
            'Heading': 'heading.csv',
            'Canvas Heading': 'canvas_heading.csv'
        };

        const results = {};
        const state = {};

        for (const [key, filename] of Object.entries(files)) {
            const res = await readCSVFile(dirHandle, filename);
            results[key] = res ? res.data : [];
            if (res) {
                state[filename] = res.lastModified;
            }
        }

        // Load lov.csv (List-of-Values) for Add/Edit dropdown fields
        const lovRes = await readCSVFile(dirHandle, 'lov.csv');
        window.EACSVStore._lovRows = lovRes ? lovRes.data : [];
        if (lovRes) {
            state['lov.csv'] = lovRes.lastModified;
        }
        window.dispatchEvent(new CustomEvent('lov-loaded', {
            detail: window.EACSVStore._lovRows
        }));

        return {
            modelData: {
                l1Rows: results['Capabilities_L1'],
                l2Rows: results['Capabilities_L2'],
                appRows: results['Applications'],
                mapRows: results['App_Capability_Map'],
                headingRows: results['Heading'],
                canvasHeadingRows: results['Canvas Heading']
            },
            fileState: state
        };
    }

    function formatVersion(date = new Date()) {
        const pad = value => String(value).padStart(2, '0');
        return `v${pad(date.getDate())}${pad(date.getMonth() + 1)}${date.getFullYear()}:${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    async function writeSerializedCSV(dirHandle, filename, rows) {
        const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(serializeCSV(rows));
        await writable.close();
        const file = await fileHandle.getFile();
        return file.lastModified;
    }

    async function updateDataVersion(dirHandle, version) {
        const canvasResult = await readCSVFile(dirHandle, 'canvas_heading.csv');
        const canvasRows = canvasResult?.data?.length ? canvasResult.data : [{}];
        canvasRows[0].version = version;
        const lastModified = await writeSerializedCSV(dirHandle, 'canvas_heading.csv', canvasRows);
        window.dispatchEvent(new CustomEvent('data-version-updated', {
            detail: { version, rows: canvasRows, lastModified }
        }));
    }

    async function writeCSV(dirHandle, filename, rows) {
        if (!isFileSystemAccessSupported()) return false;
        try {
            await verifyPermission(dirHandle, true);
            const version = formatVersion();
            let rowsToWrite = rows;
            if (filename.toLowerCase() === 'canvas_heading.csv') {
                rowsToWrite = rows?.length ? rows : [{}];
                rowsToWrite[0].version = version;
            }
            const lastModified = await writeSerializedCSV(dirHandle, filename, rowsToWrite);
            if (filename.toLowerCase() === 'canvas_heading.csv') {
                window.dispatchEvent(new CustomEvent('data-version-updated', {
                    detail: { version, rows: rowsToWrite, lastModified }
                }));
            } else {
                await updateDataVersion(dirHandle, version);
            }
            return lastModified;
        } catch (e) {
            console.error(`Failed to write ${filename}:`, e);
            throw e;
        }
    }

    // Polling file watcher
    let activeInterval = null;
    function watchForChanges(dirHandle, currentState, onModelChanged, intervalMs = 5000) {
        if (activeInterval) {
            clearInterval(activeInterval);
        }

        activeInterval = setInterval(async () => {
            try {
                // Quick check of lastModified dates without reading full content
                let changed = false;
                for (const filename of Object.keys(currentState)) {
                    try {
                        const fileHandle = await dirHandle.getFileHandle(filename);
                        const file = await fileHandle.getFile();
                        if (file.lastModified > currentState[filename]) {
                            changed = true;
                            // Update state to avoid immediate re-trigger
                            currentState[filename] = file.lastModified;
                        }
                    } catch (e) {
                        // ignore, file might be temporarily locked or deleted
                    }
                }

                if (changed) {
                    console.log('Detected external change, reloading...');
                    onModelChanged();
                }
            } catch (e) {
                console.error("Error checking file changes:", e);
            }
        }, intervalMs);
    }

    function stopWatching() {
        if (activeInterval) {
            clearInterval(activeInterval);
            activeInterval = null;
        }
    }

    window.EACSVStore = {
        isFileSystemAccessSupported,
        openDataFolder,
        readAllCSVs,
        writeCSV,
        watchForChanges,
        stopWatching,
        parseCSV,
        serializeCSV,
        formatVersion,
        _dirHandle: null,
        _lovRows: [],
    };

})();
