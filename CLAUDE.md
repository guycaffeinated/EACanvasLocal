# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EA Landscape Viewer** is a pure client-side (no backend, no build step) enterprise architecture visualization and management dashboard. It reads/writes local CSV files via the File System Access API and provides multiple interactive views for analyzing applications and capabilities.

**Stack:** Vanilla HTML5 + JavaScript (plain `<script>` tags, IIFE pattern — no ES modules, no bundler at runtime) + CSS3. No npm, no package.json, no framework, no test runner, no linter configured.

**Entry point:** `index.html`

---

## Running Locally

There is no build step, and no server is required. **Double-click `index.html`** (or open it via `file://` in the browser) and it runs — Chrome and Edge treat local files as a secure context, so the File System Access API (the folder open/read/write pipeline) works fine directly off disk. This is the primary way to run the app, and often the *only* option on locked-down corporate laptops where running a local server (Python, Node, etc.) is blocked or unavailable.

If you'd rather serve it over HTTP (e.g. for consistent relative-path behavior, or personal preference), that still works:

```
python3 serve.py
```

`serve.py` chdir's to its own directory, so it works from any checkout location. A generic static server works too:

```
python3 -m http.server 8080
```

`.claude/launch.json` also documents an `npx serve . -l 3000` option.

Either way, use **Chrome or Edge** — Firefox/Safari do not implement the File System Access API, which the entire CSV read/write pipeline depends on, regardless of `file://` vs `http://`. There is no test suite, lint config, or CI in this repo to run.

---

## File Structure

```
├── index.html                  # App shell, layout, modal markup, CSP meta tag, script loading order
├── color-config.js             # window.EA_COLOR_CONFIG — color mapping rules per attribute
├── serve.py                    # Local Python dev server
├── assets/
│   ├── app.js                  # Core state, model building, capability map + dashboard rendering — MINIFIED, see below
│   ├── csv-store.js            # File System Access API wrapper, CSV parse/serialize, poll-based file watcher
│   ├── router.js               # Hash-based client-side router (#/section/page)
│   ├── nav.js                  # Top nav dropdown + section/view switching, listens to router events
│   ├── inventory-table.js      # Applications table view (Ledger section)
│   ├── edit-app.js             # Edit Application modal wiring
│   └── lov.js                  # window._eaLov — shared List-of-Values dropdown helper (reads lov.csv)
├── css/
│   └── styles.css              # Global styles, incl. print @media rules (app.js also injects its own <style> block at runtime — see below)
├── libs/                       # Vendored, unmodified third-party libs — do not edit (see libs/NOTICE.md for license attribution)
│   └── xlsx.full.min.js        # SheetJS — vendored but not referenced anywhere in index.html; Excel import/export isn't wired up
└── data/                       # Sample CSV data files
```

### `assets/app.js` is minified — read this before editing it

Unlike every other file in `assets/`, `app.js` is **not hand-authored source** — it's minified/bundled output (single-letter variable names, one giant template-literal CSS block ending in a stray `/*$vite$:1*/` comment, no whitespace). There is no separate readable source file in the repo to regenerate it from; this minified file *is* the source of truth.

Practical implications when working in it:
- Don't try to `grep` for descriptive function/variable names — search by behavior instead (a DOM id like `mapCanvas`, a CSS class like `.app-tile`, a CSV field constant like `App_ID`).
- Prefer small, surgical `Edit` calls over reformatting/rewriting sections; a full reformat produces a massive, unreviewable diff.
- Its embedded `<style>` block (injected into `<head>` via `document.createElement('style')` at load time) duplicates/overrides a large amount of what's in `css/styles.css`. If a CSS change doesn't seem to take effect, check whether this injected block is also defining that selector — it usually is, and it wins by load order.
- It owns: `window._eaState`, the internal event bus (`window._eaEventTarget`), CSV-rows→model normalization, capability map rendering, minimap, zoom/pan, the dashboard view, and color resolution (`window._eaColorFn`).

All other `assets/*.js` files are normal, readable, commented IIFEs and safe to edit directly with standard techniques.

---

## Data Model (CSV Schema)

### capabilities_l1.csv
| Field | Description |
|---|---|
| `L1_ID` | Unique ID (e.g. BC1) |
| `L1_Name` | Display name |
| `L1_Order` | Sort order |
| `L1_Layout` | Layout mode: `row` / `column` |
| `L1_Description` | Free text |
| `L1_Owner` | Responsible owner |
| `L1_Width` | Optional pixel width override (300–1200), only applied in `custom` map layout |

### capabilities_l2.csv
| Field | Description |
|---|---|
| `L1_ID` | Parent L1 reference |
| `L2_ID` | Unique ID (e.g. BC1.1) |
| `L2_Name` | Display name |
| `L2_Order` | Sort order |
| `L2_Layout` | Layout mode: `grid` / `stack` / `row` |
| `L2_Description` | Free text |
| `L2_Owner` | Responsible owner |

### applications.csv
Core fields: `App_ID`, `Application Name`, `App_Order`, `Region`, `Application Type`, `Lifecycle`, `Roadmap`, `Owner`, `Hosting`, `Product Category`, `Annual cost`, `Currency`, `Comments`, `Risk`, `Superseder`. Additional custom columns are auto-detected and become available as filters/color attributes.

`Superseder` holds a pipe-`|`-delimited list of other `App_ID`s that this app supersedes/replaces; the map view renders a linked chip to the superseding app(s). Model-build validates this and logs (but tolerates) self-references, circular references, and orphaned IDs — see `validationWarnings` below.

### app_capability_map.csv
| Field | Description |
|---|---|
| `App_ID` | Application reference |
| `L2_ID` | L2 capability reference |
| `App_Layout` | Layout override for app in this context |

### heading.csv / canvas_heading.csv
Organization and map heading metadata (`Title`, `Description`, `Company Name`, `Main Currency` / `Canvas Title`, `Canvas Description`, `Canvas Company Name`).

### lov.csv
| Field | Description |
|---|---|
| `Field` | Exact `applications.csv` column header this row constrains (e.g. `Application Type`, `Lifecycle`, `Roadmap`, `Hosting`, `Region`, `Product Category`, `Risk`) |
| `Value` | One allowed value for that field |
| `Order` | Integer controlling dropdown display order (ascending; ties/blanks sort alphabetically) |

Loaded outside the main model: `csv-store.js` reads it into `window.EACSVStore._lovRows` and fires a `lov-loaded` window event; `assets/lov.js` groups it into `Field → Value[]` and exposes `window._eaLov`. Used only by the Add Application and Edit Application dropdowns (and inline-edit in the details panel) for the 7 fields above — it does **not** affect the sidebar filter/color-by dropdowns, which stay derived from distinct values actually observed in the loaded data (`model.filterValues`). Every LOV `<select>` includes an "Other…" option with a free-text fallback, so a value not yet in `lov.csv` is never blocked or hidden — add it to `lov.csv` to make it a first-class option going forward.

All CSV field-name constants live in one lookup table near the top of `app.js` (minified to a variable holding `{ l1: {...}, l2: {...}, app: {...}, map: {...}, heading: {...}, canvasHeading: {...} }`); column lookups are case-insensitive against actual CSV headers via a per-load header-index map, so header casing in the CSV files doesn't need to match exactly.

---

## In-Memory Data Model (built by `app.js`)

```js
_eaState.model = {
  l1ById, l2ById, appById,       // Map keyed by ID
  appToL2,                       // App_ID → Set<L2_ID>
  l2ToApps,                      // L2_ID → Set<App_ID>
  l2IdsByL1,                     // L1_ID → L2_ID[]
  appIdsByL2,                    // L2_ID → App_ID[] (sorted)
  l1List,                        // Ordered L1 array
  mappingRows,                   // Flattened, validated app_capability_map rows
  colorFields, filterFields, filterValues, columnsPresent,
  separatedL1Ids,                 // L1s whose L2_Layout resolves to 'stack' — rendered outside the normal grid flow
  l2LayoutsByL1, appLayoutsByL2,
  heading, canvasHeading,
  supersededByApp,                // reverse index of the Superseder relationship
  validationWarnings: { circularRefs, selfRefs, orphanedRefs },
}
```

The model is rebuilt from scratch on every CSV load/reload — there's no incremental patching.

---

## Global State (`window._eaState`)

```js
{
  model,              // Normalized data (see above)
  selected,           // { l1Id, l2Id, appId } — currently selected entities
  colorBy,            // [attr1, attr2, attr3] — active color attributes
  viewMode,           // 'map' | 'dashboard'
  mapLayout,          // 'grid' | 'horizontal' | 'vertical' | 'custom'
  density,            // 'expanded' | 'compact' | 'heatmap'
  search,             // Current search string
  filters,            // { attrKey: value } applied filters
  zoom,               // Current zoom level (0.25 – 3)
  blockWidth,         // Capability block width (360 / 480 / 600)
  collapsedL1s,       // Set<L1_ID>
  treeExpandedL1s,    // Set<L1_ID> in capability tree
  navCollapsed,       // Left sidebar collapsed
  detailsCollapsed,   // Right sidebar collapsed
  minimapCollapsed,   // Minimap collapsed
  focusMode,          // Boolean
}
```

State changes go through an internal event bus (`window._eaEventTarget`, wrapped by small emit/subscribe helpers inside `app.js`), which also re-dispatches plain `window`-level `CustomEvent('state-changed')` / `'selection-changed'` events. Other modules (`inventory-table.js`, `nav.js`) listen for those `window` events to re-render — that's the integration seam to use if you add a new view.

---

## Features by Category

### 1. VISUALIZATION — Capability Map

- **Three layout modes:** Grid (responsive), Horizontal (single row, scrollable), Vertical (stacked column), Custom (CSV-driven position via `L1_Width`)
- **Three density modes:** Expanded (full detail), Compact (condensed), Heatmap (app density visualization)
- **L1 → L2 → App hierarchy** with nested blocks
- **Collapsible L1 blocks** — click header to toggle
- **Application chips** shown inside L2 blocks; colorized by active attributes; linked "supersedes" chips render inline when `Superseder` is set
- **Block width control** — slider to adjust L2/app chip width

### 2. VISUALIZATION — Executive Dashboard

- Statistics cards, bar charts, list views (top apps, risk indicators)
- Warning cards for critical gaps

### 3. SEARCH & FILTERING

- **Global real-time search** — matches name, type, owner, and superseder names across apps and capabilities
- **Search result count** display + one-click clear
- **Attribute filters** — dynamic, generated from actual CSV columns (Lifecycle, Roadmap, Hosting, etc.), plus a synthetic "has superseder" filter
- **Capability tree filter** — click L1/L2 to scope the view
- **Multi-select** filters applied simultaneously
- **Filter state persistence** across view switches

### 5. COLOR CODING

- **3-attribute simultaneous color coding** — pick up to 3 attributes from dropdowns
- **Two mapping modes:**
  - Literal: exact value → color (e.g. `Lifecycle: Active → green`), case-insensitive
  - Numeric range: value ranges → color gradient (first matching rule wins)
- **Fallback:** FNV-1a hash-based color palette for unmapped values
- **Dynamic legend** showing active attribute colors
- Configured in `color-config.js`

### 6. ZOOM & PAN

- **Zoom In/Out** buttons — range 0.25x to 3x, step 0.25
- **Zoom reset** (100%) + **Fit to screen** (auto-scale)
- **Zoom level display** — current % indicator
- **Pan/drag** — click and drag to pan when zoomed
- **CSS transform-based** — smooth GPU-accelerated animations
- LocalStorage persists zoom level

### 7. MINIMAP

- **Overview panel** of entire capability map
- **Viewport indicator** — rectangle showing current visible area
- **Click to navigate** — click minimap to jump to location
- **Drag to navigate** — drag viewport indicator
- **Real-time sync** with main view
- **Collapsible** — toggle hide/show; state persisted to LocalStorage

### 8. SIDEBAR PANELS

#### Left Sidebar (Navigation)
- Collapsible slide-in/out panel
- Search input
- Expandable filter section
- **Capability tree:** L1/L2 hierarchy with chevron expand/collapse, app count badges, click-to-filter

#### Right Sidebar (Detail Panel)
- **Application details:** all attributes as key-value, capability coverage chips, superseder chips, comments, editable fields, Manage Mappings button, Delete button
- **L2 details:** description, owner, mapped app chips
- **L1 details:** description, owner, sub-capability and app counts
- Empty state when nothing selected
- Collapsible; state persisted to LocalStorage

### 9. FOCUS MODE

- Hides both sidebars and non-essential controls
- Toggle button in toolbar
- Remembered in LocalStorage

### 10. PRINT & EXPORT

- **Print button** → browser print dialog
- **Print stylesheet** (`@media print`) optimized for A2 landscape
- Hides all UI chrome (header, sidebars, controls) — prints map only
- `print-color-adjust: exact` preserves colors

### 9. DATA CRUD — Applications

- **Add application** modal — ID, name, parent capability, form validation, plus LOV dropdowns (see below)
- **Edit application** modal (`edit-app.js`) — name, type, lifecycle, risk, roadmap, cost, currency, owner, hosting, region, product category, comments
- **LOV dropdowns** — Application Type, Lifecycle, Roadmap, Hosting, Region, Product Category and Risk render as `<select>`s (backed by `lov.csv`, via `window._eaLov`) in both the Add and Edit modals and in inline-edit; each includes an "Other…" free-text fallback so an unlisted value is never blocked
- **Delete application** — trash button in detail panel, immediate UI refresh
- **Inline field editing** — all attributes editable directly in detail panel (when CSV folder open); the 7 LOV fields render as dropdowns, everything else as plain text
- **Manage Mappings modal** — searchable checkbox list of L2 capabilities to assign/unassign
- All changes written back to CSV files via File System Access API

### 10. DATA CRUD — Capabilities

- **Add L1 / L2 capability** via Add modal (type selector)
- **Delete L1 / L2** — trash button in detail panel
- **Inline edit** — description and owner fields editable in detail panel

### 11. APPLICATION INVENTORY TABLE

- Sortable columns (click header)
- Column types: text, capability (resolved L1/L2 names), badge (Lifecycle/Roadmap/Hosting), numeric (Annual Cost with currency formatting)
- Filters and search integrated (same state as capability map)
- Row hover highlighting
- Click row → opens detail panel

### 12. ROUTING (Hash-based)

- Client-side router, format `#/section/page` — no server required
- Routes: `visualisation/capability-map`, `visualisation/dashboards`, `inventory/applications`
- **Always resets to `visualisation/capability-map` on a fresh page load**, even if the URL already contains a different route hash — deep-linking only works for in-app navigation (`hashchange`), not for sharing/bookmarking a URL to a specific view

### 13. NAVIGATION

- **Two top-level sections:** Atlas (visualizations), Ledger (inventory)
- **Dropdown menus** per section
- **Active state** tracking
- **Keyboard navigation:** Arrow keys, Escape, Tab

### 14. FILE I/O (csv-store.js)

- **File System Access API** — user selects a folder; all CSVs in it are read/written
- **CSV parser/serializer** — custom hand-rolled state machine (handles quoted fields, CRLF/LF, embedded commas), no external CSV library
- **Write-back** — atomic writes via `createWritable()` stream
- **Auto-refresh** — polls each tracked file's `lastModified` every 5 seconds; triggers a full reload if any changed externally (no OS-level file watching)
- No server, no backend — works fully offline once a folder is opened

### 15. STATE PERSISTENCE (LocalStorage)

| Key | Value |
|---|---|
| `ea-map-layout` | `grid` / `horizontal` / `vertical` / `custom` |
| `ea-density` | `expanded` / `compact` / `heatmap` |
| `ea-block-width` | pixel value (360/480/600) |
| `ea-zoom` | zoom multiplier (0.25–3) |
| `ea-minimap-collapsed` | boolean |
| `ea-nav-collapsed` | boolean |
| `ea-details-collapsed` | boolean |

### 16. ACCESSIBILITY

- ARIA: `aria-haspopup`, `aria-expanded`, `role` attributes on interactive elements
- Keyboard navigation throughout nav menus
- Focus-visible outlines
- Semantic HTML (`<button>`, `<form>`, headings)

### 17. RESPONSIVE LAYOUT

- Desktop (>1200px): 3-column CSS Grid (left sidebar + content + right sidebar)
- Tablet (768–1200px): 2-column, controls wrap and reflow
- Mobile (<768px): Stacked single column, sidebars minimized
- CSS variables for all key dimensions

---

## Key Technical Patterns

### Script load order matters (`index.html`)

Scripts are plain `<script src>` tags (not `type="module"`) at the end of `<body>`, in a fixed order that later files depend on:

```
pikaday.js → color-config.js → csv-store.js → lov.js → app.js → router.js → nav.js
→ inventory-table.js → edit-app.js
```

`color-config.js` must precede `app.js` (color resolution reads `window.EA_COLOR_CONFIG`, falling back to inline defaults if absent). `csv-store.js` must precede `app.js` (exposes `window.EACSVStore`). `lov.js` must precede `app.js` and `edit-app.js` (both call into `window._eaLov` to build LOV dropdown options). View modules like `inventory-table.js` grab their container via `getElementById` at IIFE-invocation time and bail out early (`if (!container) return;`) — they depend on the DOM already existing when their `<script>` tag executes, which is why they're loaded last.

### Content Security Policy

`index.html` sets a strict CSP meta tag: `default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'none'; base-uri 'self'`. No external scripts/fonts/XHR-fetch to third-party origins, no remote images (only same-origin or `data:` URIs). Any new feature needs to work within this policy, or the policy needs to be deliberately relaxed as part of that change.

### Event-Driven State
```js
// Dispatch a state change
window.dispatchEvent(new CustomEvent('state-changed'));

// Listen in any component
window.addEventListener('state-changed', () => render());
```

### Data Flow
```
CSV (File System Access API)
  → csv-store.js (parse)
    → app.js model builder
      → _eaState.model
        → render functions
          → DOM
```

### Rendering
- HTML generated via template literals (`innerHTML =`)
- CSS classes toggled for state changes
- Transform-based zoom (`transform: scale()` + `transform-origin`)
- Event delegation on dynamic elements

### Color Resolution
- `color-config.js` defines `window.EA_COLOR_CONFIG` (`attributeColors`, `rangeColors`, `fallbackPalette`, `defaultColor`)
- `app.js` resolves a value → hex color (exposed as `window._eaColorFn`), trying numeric range match, then literal attribute match, then hash-based fallback

---

## Replication Checklist (for another product)

When porting features to a new product, consider these swap points:

| EA Dashboard | Swap With |
|---|---|
| CSV + File System Access API | REST API / database / cloud storage |
| `window._eaState` global | Redux / Zustand / MobX / React Context |
| Vanilla JS IIFE modules | React / Vue / Svelte components |
| Browser Print API | PDF generation (Puppeteer, React-PDF) |
| LocalStorage | User profile / backend preferences store |
| `color-config.js` | UI-based color editor with saved presets |
| Hash router | React Router / Next.js / TanStack Router |
| Inline CSV editing | Form library (React Hook Form, Formik) |
| Manual CSV file polling | WebSockets / SSE / React Query polling |

---

## Dev Notes

- Requires **Chrome or Edge** — File System Access API not supported in Firefox/Safari
- No build step, no npm install — but `app.js` is itself pre-minified output (see above), which is unusual for the rest of the otherwise hand-written codebase
- `color-config.js` is the file a non-developer edits to reconfigure colors; `lov.csv` is the file a non-developer edits to change the allowed dropdown values for Application Type, Lifecycle, Roadmap, Hosting, Region, Product Category and Risk
- Adding a new CSV column automatically makes it available as a filter and color attribute
