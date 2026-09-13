/**
 * Lightweight hash-based router for the EA Dashboard.
 * Routes use the format: #/section/page
 * 
 * Dispatches a 'route-changed' CustomEvent on window with detail:
 *   { section: string, page: string|null, hash: string }
 */
(function () {
    'use strict';

    /* ── Route definitions ──────────────────────── */
    const ROUTES = {
        'visualisation/capability-map': { section: 'visualisation', page: 'capability-map' },
        'visualisation/dashboards': { section: 'visualisation', page: 'dashboards' },
        'inventory/applications': { section: 'inventory', page: 'applications' },
    };

    const DEFAULT_ROUTE = 'visualisation/capability-map';

    /* ── Parse current hash ─────────────────────── */
    function parseHash() {
        const raw = (window.location.hash || '').replace(/^#\/?/, '').replace(/\/$/, '');
        return ROUTES[raw]
            ? { ...ROUTES[raw], hash: raw }
            : { ...ROUTES[DEFAULT_ROUTE], hash: DEFAULT_ROUTE };
    }

    /* ── Navigate to a route ────────────────────── */
    function navigateTo(hash) {
        const clean = hash.replace(/^#\/?/, '').replace(/\/$/, '');
        window.location.hash = '#/' + (ROUTES[clean] ? clean : DEFAULT_ROUTE);
    }

    /* ── Dispatch route event ───────────────────── */
    function dispatchRoute() {
        const route = parseHash();
        window.dispatchEvent(new CustomEvent('route-changed', { detail: route }));
    }

    /* ── Listen for hash changes ────────────────── */
    window.addEventListener('hashchange', dispatchRoute);

    /* ── Public API ─────────────────────────────── */
    window.EARouter = {
        navigateTo,
        parseHash,
        ROUTES,
        DEFAULT_ROUTE,
    };

    /* ── Fire initial route on DOMContentLoaded ─── */
    function initRoute() {
        // Always start on the default route (Atlas > Capability Map) on load/refresh
        window.location.hash = '#/' + DEFAULT_ROUTE;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoute);
    } else {
        initRoute();
    }
})();
