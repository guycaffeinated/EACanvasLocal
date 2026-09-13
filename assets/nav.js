/**
 * Main navigation controller for EA Dashboard.
 * Drives the top nav bar, dropdown menus, and route-based page switching.
 */
(function () {
    'use strict';

    /* ── DOM references ─────────────────────────── */
    const mainNavItems = document.querySelectorAll('.main-nav-item');
    const controlsRow = document.querySelector('.controls-row');
    const comingSoonPage = document.getElementById('comingSoonPage');
    const mapView = document.getElementById('mapView');
    const dashboardView = document.getElementById('dashboardView');
    const viewMode = document.getElementById('viewMode');

    /* ── Generic dropdown handling ──────────────── */
    // Collect all dropdown wrappers (.vis-menu-wrap and .nav-dropdown-wrap)
    const dropdownWraps = document.querySelectorAll('.vis-menu-wrap, .nav-dropdown-wrap');
    const allSubMenuItems = document.querySelectorAll('.sub-menu-item');

    let openDropdown = null; // track which dropdown is currently open

    function closeAllDropdowns() {
        dropdownWraps.forEach(function (wrap) {
            var btn = wrap.querySelector('.main-nav-item');
            var menu = wrap.querySelector('.sub-dropdown');
            if (menu) menu.classList.add('hidden');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        openDropdown = null;
    }

    function toggleDropdown(wrap) {
        var btn = wrap.querySelector('.main-nav-item');
        var menu = wrap.querySelector('.sub-dropdown');
        if (!menu) return;

        var isOpen = !menu.classList.contains('hidden');
        closeAllDropdowns();

        if (!isOpen) {
            menu.classList.remove('hidden');
            btn.setAttribute('aria-expanded', 'true');
            openDropdown = wrap;
        }
    }

    // Wire up each dropdown trigger
    dropdownWraps.forEach(function (wrap) {
        var btn = wrap.querySelector('.main-nav-item');
        if (!btn) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleDropdown(wrap);
        });

        btn.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                toggleDropdown(wrap);
                var items = wrap.querySelectorAll('.sub-menu-item');
                if (items.length) items[0].focus();
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (openDropdown && !e.target.closest('.vis-menu-wrap') && !e.target.closest('.nav-dropdown-wrap')) {
            closeAllDropdowns();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && openDropdown) {
            var btn = openDropdown.querySelector('.main-nav-item');
            closeAllDropdowns();
            if (btn) btn.focus();
        }
    });

    /* ── Nav item clicks ────────────────────────── */
    // Top-level nav items without dropdowns (e.g. Ledger)
    mainNavItems.forEach(function (item) {
        // Skip items that are inside a dropdown wrapper — they're handled above
        if (item.closest('.vis-menu-wrap') || item.closest('.nav-dropdown-wrap')) return;

        item.addEventListener('click', function (e) {
            var section = this.dataset.section;
            if (section) {
                e.stopPropagation();
                EARouter.navigateTo(section);
            }
        });
    });

    // Sub-menu item clicks (works for all dropdowns)
    allSubMenuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var route = this.dataset.route;
            if (route) {
                EARouter.navigateTo(route);
                closeAllDropdowns();
            }
        });
    });

    // Keyboard nav within sub-menus
    dropdownWraps.forEach(function (wrap) {
        var items = Array.from(wrap.querySelectorAll('.sub-menu-item'));
        items.forEach(function (item, index) {
            item.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    items[(index + 1) % items.length].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    items[(index - 1 + items.length) % items.length].focus();
                }
            });
        });
    });

    /* ── Coming-soon page titles ────────────────── */
    const COMING_SOON_TITLES = {};

    /* ── Route handling ─────────────────────────── */
    var visNavBtn = document.querySelector('[data-section="visualisation"]');
    var ledgerNavBtn = document.querySelector('[data-section="inventory"]');
    var inventoryView = document.getElementById('inventoryView');

    function handleRoute(detail) {
        var section = detail.section;
        var page = detail.page;
        var hash = detail.hash;

        // Update active states on main nav
        mainNavItems.forEach(function (item) {
            item.classList.toggle('active', item.dataset.section === section);
        });

        // Update active states on ALL sub-menu items
        allSubMenuItems.forEach(function (item) {
            item.classList.toggle('is-active', item.dataset.route === hash);
        });

        // Update the label on Atlas button to show current sub-page
        if (visNavBtn) {
            if (section === 'visualisation') {
                var activeVis = Array.from(allSubMenuItems).find(function (i) { return i.dataset.route === hash; });
                var label = activeVis ? activeVis.querySelector('.sub-menu-label').textContent : 'Atlas';
                visNavBtn.querySelector('.nav-label').textContent = label;
            } else {
                visNavBtn.querySelector('.nav-label').textContent = 'Atlas';
            }
        }

        // Update the label on Ledger button to show current sub-page
        if (ledgerNavBtn) {
            if (section === 'inventory' && page) {
                var activeLd = Array.from(allSubMenuItems).find(function (i) { return i.dataset.route === hash; });
                var ldLabel = activeLd ? activeLd.querySelector('.sub-menu-label').textContent : 'Ledger';
                ledgerNavBtn.querySelector('.nav-label').textContent = ldLabel;
            } else {
                ledgerNavBtn.querySelector('.nav-label').textContent = 'Ledger';
            }
        }

        // Show/hide controls row (for visualisation and inventory pages)
        if (controlsRow) {
            var showControls = section === 'visualisation' || section === 'inventory';
            controlsRow.classList.toggle('hidden', !showControls);
        }

        // Hide attribute color dropdowns on inventory (not relevant for table view)
        var attrCtrls = document.querySelectorAll('.attr-ctrl');
        attrCtrls.forEach(function (el) {
            el.classList.toggle('hidden', section === 'inventory');
        });

        // Show/hide views
        var isMap = hash === 'visualisation/capability-map';
        var isDashboard = hash === 'visualisation/dashboards';
        var isInventory = hash === 'inventory/applications';
        var isComingSoon = !isMap && !isDashboard && !isInventory;

        mapView.classList.toggle('hidden', !isMap);
        dashboardView.classList.toggle('hidden', !isDashboard);
        if (inventoryView) inventoryView.classList.toggle('hidden', !isInventory);
        comingSoonPage.classList.toggle('hidden', !isComingSoon);

        // Toggle body class for map-specific CSS
        document.body.className = isMap ? 'view-map' : 'view-' + (page || section);

        // Set coming-soon content
        if (isComingSoon && comingSoonPage) {
            var info = COMING_SOON_TITLES[hash] || { title: 'Coming Soon', desc: '' };
            comingSoonPage.innerHTML =
                '<div class="coming-soon-card">' +
                '<div class="coming-soon-icon">🚧</div>' +
                '<h2 class="coming-soon-title">' + info.title + '</h2>' +
                '<p class="coming-soon-desc">' + info.desc + '</p>' +
                '<span class="coming-soon-badge">Coming Soon</span>' +
                '</div>';
        }

        // Sync with existing app.js viewMode select for existing views
        if (isMap && viewMode && viewMode.value !== 'map') {
            viewMode.value = 'map';
            viewMode.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (isDashboard && viewMode && viewMode.value !== 'dashboard') {
            viewMode.value = 'dashboard';
            viewMode.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    /* ── Listen for route changes ───────────────── */
    window.addEventListener('route-changed', function (e) {
        handleRoute(e.detail);
    });
})();
