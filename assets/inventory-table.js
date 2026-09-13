/**
 * Application Inventory Table for the Ledger section.
 * Renders a sortable, filterable table of all applications.
 */
(function () {
    'use strict';

    var container = document.getElementById('inventoryView');
    if (!container) return;

    var sortCol = 'name';
    var sortDir = 1; // 1 = asc, -1 = desc

    // Column definitions  (capability columns use custom rendering)
    var COLUMNS = [
        { key: 'id', label: 'App-ID', width: '8%' },
        { key: 'name', label: 'Application', width: '18%' },
        { key: '_l1', label: 'L1 Capability', width: '14%', capability: true },
        { key: '_l2', label: 'L2 Capability', width: '14%', capability: true },
        { key: 'type', label: 'Type', width: '10%' },
        { key: 'productCategory', label: 'Product Category', width: '10%' },
        { key: 'lifecycle', label: 'Lifecycle', width: '8%', badge: true },
        { key: 'roadmap', label: 'Roadmap', width: '8%', badge: true },
        { key: 'owner', label: 'Owner', width: '10%' },
        { key: 'hosting', label: 'Hosting', width: '8%', badge: true },
        { key: 'region', label: 'Region', width: '6%' },
        { key: 'costYr', label: 'Annual Cost', width: '8%', numeric: true },
        { key: 'endDate', label: 'End Date', width: '8%' },
    ];

    // Badge field → color-by attribute name mapping
    var BADGE_ATTR = {
        lifecycle: 'Lifecycle',
        roadmap: 'Roadmap',
        hosting: 'Hosting',
    };

    function getAppValue(app, key) {
        if (key === 'costYr') {
            var raw = app.costYr || '';
            if (!raw) return '';
            var n = Number(String(raw).replace(/[^0-9.-]/g, ''));
            return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 0 }) : raw;
        }
        return app[key] || '';
    }

    function getRawNumeric(app, key) {
        if (key !== 'costYr') return null;
        var raw = app.costYr || '';
        if (!raw) return null;
        var n = Number(String(raw).replace(/[^0-9.-]/g, ''));
        return Number.isFinite(n) ? n : null;
    }

    function escapeHtml(s) {
        return (s || '').toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /**
     * For each app, resolve its L1 and L2 capability names.
     * Returns { l1Names: string[], l2Names: string[], l1Ids: Set, l2Ids: Set }
     */
    function getAppCapabilities(app, model) {
        var l2Ids = model.appToL2?.get(app.id);
        if (!l2Ids || l2Ids.size === 0) return { l1Names: [], l2Names: [], l1Ids: new Set(), l2Ids: new Set() };

        var l1Names = [];
        var l2Names = [];
        var l1IdSet = new Set();
        var l2IdSet = new Set(l2Ids);

        l2Ids.forEach(function (l2Id) {
            var l2 = model.l2ById.get(l2Id);
            if (l2) {
                l2Names.push(l2.name);
                var l1 = model.l1ById.get(l2.l1Id);
                if (l1) {
                    l1IdSet.add(l1.id);
                    if (l1Names.indexOf(l1.name) < 0) l1Names.push(l1.name);
                }
            }
        });

        return { l1Names: l1Names, l2Names: l2Names, l1Ids: l1IdSet, l2Ids: l2IdSet };
    }

    function getFilteredApps() {
        var model = window._eaState?.model;
        var filters = window._eaState?.filters || {};
        var search = (window._eaState?.search || '').toLowerCase();
        var selectedL1 = window._eaState?.selected?.l1Id || null;
        var selectedL2 = window._eaState?.selected?.l2Id || null;
        if (!model) return [];

        var apps = Array.from(model.appById.values());

        // Apply attribute filters
        for (var field in filters) {
            if (!filters[field]) continue;
            var fv = filters[field];
            if (field === '_hasSuperseder') {
                var supersederValues = Array.isArray(fv) ? fv : [fv];
                if (supersederValues.length === 1) {
                    apps = apps.filter(function (a) {
                        var hasSuperseder = (a.supersederIds || []).length > 0;
                        return (supersederValues[0] === 'yes') === hasSuperseder;
                    });
                }
                continue;
            }
            var selectedValues = Array.isArray(fv) ? fv : [fv];
            apps = apps.filter(function (a) {
                var val = (a.attrs[field] || '').toString().trim();
                return selectedValues.indexOf(val) !== -1;
            });
        }

        // Apply L1/L2 capability filter from tree selection
        if (selectedL2) {
            apps = apps.filter(function (a) {
                var l2s = model.appToL2?.get(a.id);
                return l2s && l2s.has(selectedL2);
            });
        } else if (selectedL1) {
            // Get all L2 IDs under this L1
            var l2sUnderL1 = model.l2IdsByL1?.get(selectedL1) || [];
            var l2Set = new Set(l2sUnderL1);
            apps = apps.filter(function (a) {
                var appL2s = model.appToL2?.get(a.id);
                if (!appL2s) return false;
                var found = false;
                appL2s.forEach(function (l2Id) {
                    if (l2Set.has(l2Id)) found = true;
                });
                return found;
            });
        }

        // Apply search
        if (search) {
            apps = apps.filter(function (a) {
                return a.name.toLowerCase().indexOf(search) >= 0 ||
                    (a.type || '').toLowerCase().indexOf(search) >= 0 ||
                    (a.owner || '').toLowerCase().indexOf(search) >= 0;
            });
        }

        // Sort
        apps.sort(function (a, b) {
            var av, bv;
            var colDef = COLUMNS.find(function (c) { return c.key === sortCol; });
            if (colDef?.numeric) {
                av = getRawNumeric(a, sortCol) ?? Infinity;
                bv = getRawNumeric(b, sortCol) ?? Infinity;
            } else if (colDef?.capability) {
                // Sort capabilities by first name
                var capA = getAppCapabilities(a, model);
                var capB = getAppCapabilities(b, model);
                if (sortCol === '_l1') {
                    av = (capA.l1Names[0] || '').toLowerCase();
                    bv = (capB.l1Names[0] || '').toLowerCase();
                } else {
                    av = (capA.l2Names[0] || '').toLowerCase();
                    bv = (capB.l2Names[0] || '').toLowerCase();
                }
            } else {
                av = (a[sortCol] || '').toString().toLowerCase();
                bv = (b[sortCol] || '').toString().toLowerCase();
            }
            if (av < bv) return -1 * sortDir;
            if (av > bv) return 1 * sortDir;
            return 0;
        });

        return apps;
    }

    function render() {
        var model = window._eaState?.model;
        if (!model) {
            container.innerHTML = '<div class="inv-empty">Open a Data Folder to view the application inventory.</div>';
            return;
        }

        var apps = getFilteredApps();
        var selectedId = window._eaState?.selected?.appId || null;

        // Build header
        var thead = '<thead><tr>';
        for (var c = 0; c < COLUMNS.length; c++) {
            var col = COLUMNS[c];
            var sortIndicator = '';
            if (col.key === sortCol) {
                sortIndicator = sortDir === 1 ? ' ↑' : ' ↓';
            }
            thead += '<th data-col="' + col.key + '" style="width:' + col.width + '">' +
                escapeHtml(col.label) + '<span class="inv-sort-arrow">' + sortIndicator + '</span></th>';
        }
        thead += '</tr></thead>';

        // Build rows
        var tbody = '<tbody>';
        for (var i = 0; i < apps.length; i++) {
            var app = apps[i];
            var isSelected = app.id === selectedId;
            var caps = getAppCapabilities(app, model);

            tbody += '<tr data-app-id="' + escapeHtml(app.id) + '"' +
                (isSelected ? ' class="selected"' : '') + '>';

            for (var j = 0; j < COLUMNS.length; j++) {
                var col2 = COLUMNS[j];
                var val;
                var content;

                if (col2.capability) {
                    // Render capability pills
                    var names = col2.key === '_l1' ? caps.l1Names : caps.l2Names;
                    if (names.length === 0) {
                        content = '<span class="inv-empty-cell">—</span>';
                    } else if (names.length === 1) {
                        content = '<span class="inv-cap-tag">' + escapeHtml(names[0]) + '</span>';
                    } else {
                        content = '<span class="inv-cap-tag">' + escapeHtml(names[0]) + '</span>' +
                            '<span class="inv-cap-more" title="' + escapeHtml(names.join(', ')) + '">+' + (names.length - 1) + '</span>';
                    }
                } else {
                    val = getAppValue(app, col2.key);

                    if (col2.badge && val) {
                        var attrName = BADGE_ATTR[col2.key] || col2.label;
                        var color = typeof window._eaColorFn === 'function' ? window._eaColorFn(attrName, val) : '#9CA3AF';
                        content = '<span class="inv-badge" style="background:' + color + '20;color:' + color +
                            ';border-color:' + color + '40">' + escapeHtml(val) + '</span>';
                    } else if (col2.numeric && val) {
                        content = '<span class="inv-numeric">' + escapeHtml(val) + '</span>';
                    } else {
                        content = escapeHtml(val) || '<span class="inv-empty-cell">—</span>';
                    }
                }

                tbody += '<td>' + content + '</td>';
            }
            tbody += '</tr>';
        }

        if (apps.length === 0) {
            tbody += '<tr><td colspan="' + COLUMNS.length + '" class="inv-no-results">No applications match the current filters.</td></tr>';
        }

        tbody += '</tbody>';

        // Active filter indicator
        var filterHint = '';
        var selL1 = window._eaState?.selected?.l1Id;
        var selL2 = window._eaState?.selected?.l2Id;
        if (selL2 && model.l2ById.get(selL2)) {
            filterHint = '<span class="inv-filter-hint">Filtered by: ' + escapeHtml(model.l2ById.get(selL2).name) + '</span>';
        } else if (selL1 && model.l1ById.get(selL1)) {
            filterHint = '<span class="inv-filter-hint">Filtered by: ' + escapeHtml(model.l1ById.get(selL1).name) + '</span>';
        }

        container.innerHTML =
            '<div class="inv-header">' +
            '<div class="view-title">Application Inventory</div>' +
            '<div class="inv-header-right">' + filterHint +
            '<span class="inv-count">' + apps.length + ' application' + (apps.length !== 1 ? 's' : '') + '</span>' +
            '</div></div>' +
            '<div class="inv-table-wrap">' +
            '<table class="inv-table">' + thead + tbody + '</table>' +
            '</div>';

        // Wire up click events
        var table = container.querySelector('.inv-table');

        // Header sort clicks
        table.querySelector('thead').addEventListener('click', function (e) {
            var th = e.target.closest('th');
            if (!th) return;
            var col3 = th.dataset.col;
            if (col3 === sortCol) {
                sortDir *= -1;
            } else {
                sortCol = col3;
                sortDir = 1;
            }
            render();
        });

        // Row clicks
        table.querySelector('tbody').addEventListener('click', function (e) {
            var tr = e.target.closest('tr');
            if (!tr || !tr.dataset.appId) return;
            var appId = tr.dataset.appId;

            // Update global state
            if (window._eaState) {
                var wasSelected = window._eaState.selected.appId === appId;
                window._eaState.selected.appId = wasSelected ? null : appId;

                // Dispatch event to update detail panel
                var ae = window._eaEventTarget;
                if (ae) {
                    ae.dispatchEvent(new CustomEvent('selection-changed', { detail: undefined }));
                }
            }

            render();
        });
    }

    // Listen for route changes to know when to render
    window.addEventListener('route-changed', function (e) {
        if (e.detail.hash === 'inventory/applications') {
            // Small delay to let nav.js show/hide views first
            setTimeout(render, 10);
        }
    });

    // Listen for filter/search/selection changes
    window.addEventListener('inventory-refresh', function () {
        if (!container.classList.contains('hidden')) {
            render();
        }
    });

    // Expose render for external calls
    window._inventoryRender = render;
})();
