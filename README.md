# EA Landscape Viewer (EADashboard)

A pure client-side enterprise architecture visualization and management dashboard. There is **no backend and no build step** — it's plain HTML/CSS/JavaScript that runs entirely in the browser. All data is read from and written back to local CSV files on your machine via the File System Access API; nothing is sent over the network.

## Requirements

- **Chrome or Edge.** Firefox and Safari don't implement the File System Access API, which the CSV read/write pipeline depends on.

## Running locally

No server needed — just **double-click `index.html`**. Chrome and Edge treat local files as a secure context, so the folder open/read/write pipeline works straight off disk. This also makes it the easiest option on locked-down corporate laptops where running a local server isn't possible.

If you'd rather serve it over HTTP instead, that works too:

```
python3 serve.py
```

or, as a generic alternative:

```
python3 -m http.server 8080
```

Then open the served URL (e.g. `http://localhost:8080`).

Either way, click **Open Data Folder** to select a folder containing your CSV data (see `data/` for samples).

For a visual, non-technical walkthrough (philosophy, the CSV data model, a full feature tour, and how to print the whole map to a single-page PDF), see [GUIDE.html](GUIDE.html). For full architecture, data model, and feature documentation, see [CLAUDE.md](CLAUDE.md).

## License

MIT — see [LICENSE](LICENSE). This is a personal/demo project provided as-is, with no warranty. Third-party library attributions are in [libs/NOTICE.md](libs/NOTICE.md).
