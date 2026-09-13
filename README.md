# EA Landscape Viewer

![License: MIT](https://img.shields.io/badge/license-MIT-D4A24C.svg)
![No Backend](https://img.shields.io/badge/backend-none-181919.svg)
![Chrome / Edge](https://img.shields.io/badge/browser-Chrome%20%7C%20Edge-181919.svg)
![Data](https://img.shields.io/badge/data-plain%20CSV-181919.svg)

A local-first enterprise architecture visualization and management workbench for **Enterprise Architects and Solution Architects** — capability maps, an application inventory, and an executive dashboard, all driven by plain CSV files on your own machine. There is **no backend and no build step**: it's plain HTML/CSS/JavaScript that runs entirely in the browser, and nothing is ever sent over the network.

📖 **[Read the full visual Guide →](GUIDE.html)** — philosophy, the CSV data model, a complete feature tour, and how to print the whole map to a single-page PDF.

## Why

- **Local-first.** Runs entirely in your browser. Nothing is ever uploaded — there's no server to send it to.
- **No lock-in.** Your data is plain CSV. Open it in Excel, Numbers, or Google Sheets any time, with or without this app.
- **Version-friendly.** Put the data folder in git and get a real, diffable history of how your architecture evolved, for free.

## Requirements

- **Chrome or Edge.** Firefox and Safari don't implement the File System Access API, which the CSV read/write pipeline depends on.

## Quick Start

1. **Use Chrome or Edge.**
2. **Double-click `index.html`.** That's it — no install, no terminal. Chrome/Edge treat local files as a secure context, so the folder read/write pipeline works straight off disk. This is also the only option on locked-down corporate laptops where running a local server isn't possible.
3. **Click "Open Data Folder"** and select a folder of CSV data — start with the bundled [`data/`](data/) sample folder.

<details>
<summary>Prefer to serve it over HTTP instead?</summary>

Not required, but works too — this is a static file host, not a real backend:

```bash
python3 serve.py
# or, generically:
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

</details>

## Data Model

Everything you see in the app is read live from — and written straight back to — plain CSV files in the folder you selected:

| File | Holds |
|---|---|
| `capabilities_l1.csv` | Top-level capability groups — name, order, layout, description, owner |
| `capabilities_l2.csv` | Sub-capabilities nested under each L1 group |
| `applications.csv` | Your application inventory — ID, name, type, lifecycle, hosting, cost, risk, owner |
| `app_capability_map.csv` | Many-to-many links between applications and the capabilities they support |
| `heading.csv` / `canvas_heading.csv` | Title, description, and company name shown in the header and on the printed map |
| `lov.csv` | Your team's standard vocabulary — allowed values for Lifecycle, Risk, Application Type, etc. |

## Features

- **Capability Map** — Grid/Horizontal/Vertical/Custom layouts, Expanded/Compact/Heatmap density, up to 3-attribute color coding, zoom/pan, minimap
- **Executive Dashboard** — portfolio stats, charts, risk indicators
- **Ledger** — sortable, filterable application inventory table
- **Search & Filtering** — global search, multi-select attribute filters, capability-tree scoping
- **Data Entry** — Add/Edit/Delete applications and capabilities, inline editing, standardized `lov.csv` dropdowns, Manage Mappings

<details>
<summary>Full feature list</summary>

- **Capability Map:** Grid, Horizontal, Vertical, or Custom (CSV-driven) layouts; Expanded, Compact, or Heatmap density; collapsible L1 blocks; adjustable block width; linked "supersedes" chips
- **Executive Dashboard:** portfolio-level stats and bar charts, top-app and risk-indicator lists, warning cards for critical capability gaps
- **Ledger (Inventory Table):** sortable/filterable, resolved L1/L2 capability columns, currency-formatted cost, click a row to open its detail panel
- **Search & Filtering:** global real-time search, multi-select filters combined across attributes, capability-tree scoping, filter state carries across views
- **Color Coding:** up to 3 attributes simultaneously, literal or numeric-range gradient rules, configured once in `color-config.js`, dynamic legend
- **Zoom, Pan & Minimap:** 25%–300% zoom, fit-to-screen, click-drag panning, collapsible minimap with draggable viewport indicator
- **Data Entry & Editing:** Add/Edit/Delete applications and capabilities, inline editing in the detail panel, `lov.csv`-backed dropdowns with an "Other…" fallback, Manage Mappings
- **Sidebars:** left (search/filters/capability tree) and right (full detail panel), both collapsible with remembered state
- **Focus Mode & Auto-Refresh:** hide both sidebars for presenting the map; "Auto" watches the CSV folder and reloads on external changes

</details>

## Printing to a Single Landscape PDF

The print stylesheet targets a large single page (`A2 landscape`), but the final size and scale are controlled by your browser's own Print dialog. In short: **Print → Destination: Save as PDF → Paper size: A2 (or a large custom size) → Margins: None → Scale: Fit to page → turn off headers/footers.** See the [Guide](GUIDE.html#printing) for the full step-by-step and what to do if it still spans multiple pages.

## Learn More

- 📖 [GUIDE.html](GUIDE.html) — the full visual walkthrough (philosophy, data model, feature tour, printing, tips, FAQ)
- 🛠️ [CLAUDE.md](CLAUDE.md) — architecture, data model internals, and technical documentation

## License

MIT — see [LICENSE](LICENSE). This is a personal/demo project provided as-is, with no warranty. Third-party library attributions are in [libs/NOTICE.md](libs/NOTICE.md).
