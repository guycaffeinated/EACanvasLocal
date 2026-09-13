(function () {
  "use strict"; var ge = document.createElement("style"); ge.textContent = `:root{--bg: #C7CACB;--panel: #ffffff;--line: #B1B5B7;--text: #181919;--muted: #71787A;--soft: #9CA1A3;--shadow: 0 1px 3px rgba(24,25,25, .06), 0 6px 16px rgba(24,25,25, .04);--radius: 12px;--radius-sm: 8px;--accent: #D4A24C;--accent-light: rgba(212, 162, 76, .1);--sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;--mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;--block-w: 480px}*,*:before,*:after{box-sizing:border-box}html,body{height:100%;margin:0}body{font-family:var(--sans);color:var(--text);background:var(--bg);line-height:1.5;font-size:14px}.hidden{display:none!important}.topbar{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,#1D1F20 0%,#121313 100%);backdrop-filter:blur(12px);padding:10px 16px}.topbar-row{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}.brand{display:flex;align-items:center;gap:10px}.brand-mark{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;letter-spacing:.5px;border:1px solid rgba(255,255,255,.15);background:#292C2C;color:#D4A24C}.brand-company{font-size:11px;color:#D4A24C;font-weight:700}.brand-title{font-weight:700;font-size:14px;line-height:1.2;color:#FFFFFF}.brand-subtitle{font-size:11px;color:#B1B5B7}.controls{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;justify-content:flex-end}.ctrl{display:flex;flex-direction:column;gap:3px}.ctrl label{font-size:10px;color:#B1B5B7;text-transform:uppercase;letter-spacing:.5px;font-weight:600}.ctrl-group{display:flex;gap:4px;align-items:flex-end}body:not(.view-map) .map-only{display:none!important}select,input[type=search]{border:1px solid rgba(255,255,255,.15);border-radius:var(--radius-sm);padding:7px 10px;font-size:12px;outline:none;background:#292C2C;min-width:110px;color:#FFFFFF;transition:border-color .15s,box-shadow .15s}select:focus,input[type=search]:focus{border-color:#437EF6;box-shadow:0 0 0 3px rgba(67, 126, 246, .2)}.file-btn{border:1px solid var(--accent);border-radius:var(--radius-sm);padding:7px 14px;background:var(--accent);color:#fff;cursor:pointer;font-size:12px;font-weight:600;transition:background .15s}.file-btn:hover{background:#B8863A}.file-btn input{display:none}.btn{border:1px solid rgba(255,255,255,.15);border-radius:var(--radius-sm);background:linear-gradient(180deg,#2F3233 0%,#232526 100%);padding:7px 12px;cursor:pointer;font-size:12px;font-weight:600;color:rgba(255,255,255,.72);transition:all .15s}.btn:hover{background:linear-gradient(180deg,#3D4142 0%,#2C2F30 100%);color:#FFFFFF}.btn-sm{border:1px solid rgba(255,255,255,.15);border-radius:6px;background:linear-gradient(180deg,#2F3233 0%,#232526 100%);padding:5px 8px;cursor:pointer;font-size:11px;font-weight:600;color:#B1B5B7;transition:all .15s}.btn-sm:hover{background:linear-gradient(180deg,#3D4142 0%,#2C2F30 100%);color:#FFFFFF}.btn-icon{border:none;background:transparent;cursor:pointer;color:var(--muted);font-size:14px;padding:4px;border-radius:4px;transition:all .15s}.btn-icon:hover{color:var(--text);background:var(--soft)}.btn-focus{display:flex;align-items:center;gap:6px;transition:all .15s}.focus-mode .btn-focus{background:var(--accent);color:#fff;border-color:var(--accent)}.zoom-controls{display:flex;gap:2px;align-items:center;border:1px solid rgba(255,255,255,.15);border-radius:var(--radius-sm);background:#292C2C;padding:3px}.zoom-btn{border:none;background:transparent;cursor:pointer;font-size:14px;font-weight:600;color:rgba(255,255,255,.72);padding:4px 8px;border-radius:5px;transition:background .15s;min-width:28px;display:flex;align-items:center;justify-content:center}.zoom-btn:hover{background:#353839;color:#FFFFFF}.zoom-reset{font-size:11px;color:#B1B5B7;min-width:44px;pointer-events:auto}.zoom-reset span{pointer-events:none}.layout{display:grid;grid-template-columns:var(--nav-w, 300px) minmax(0,1fr) var(--det-w, 300px);gap:12px;padding:12px;align-items:start;transition:grid-template-columns .22s ease;background:var(--bg)}.layout.nav-collapsed{--nav-w: 40px}.layout.details-collapsed{--det-w: 40px}.sidebar{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:12px;display:flex;flex-direction:column;position:sticky;top:70px;min-height:calc(100vh - 100px);max-height:calc(100vh - 100px);overflow:hidden;transition:all .22s ease}.sidebar.left,.sidebar.right{background:linear-gradient(180deg,#181919 0%,#121313 100%);color:#FFFFFF;border-color:rgba(255,255,255,.12)}.panel-header{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;min-height:28px}.panel-title{font-weight:700;font-size:11px;letter-spacing:.8px;text-transform:uppercase;color:var(--muted)}.panel-toggle{border:1px solid var(--line);background:#fff;border-radius:6px;width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--muted);font-size:12px;transition:all .15s;flex-shrink:0}.panel-toggle:hover{background:var(--soft)}.panel-body{overflow:auto;flex:1;min-width:0;transition:opacity .18s}.nav-collapsed .sidebar.left .panel-title,.nav-collapsed .sidebar.left .panel-body{opacity:0;pointer-events:none;overflow:hidden;width:0}.nav-collapsed .sidebar.left .panel-header{justify-content:center}.nav-collapsed .sidebar.left{padding:6px;min-width:40px}.details-collapsed .sidebar.right .panel-title,.details-collapsed .sidebar.right .details{opacity:0;pointer-events:none;overflow:hidden;width:0}.details-collapsed .sidebar.right .panel-header{justify-content:center}.details-collapsed .sidebar.right{padding:6px;min-width:40px}.search-bar{display:flex;gap:6px;align-items:center;margin-bottom:10px}.search-bar input{flex:1;min-width:0}.search-count{font-size:11px;color:var(--accent);font-weight:600;font-family:var(--mono);white-space:nowrap}.filter-section{border-top:1px solid var(--line);padding-top:8px;margin-bottom:8px}.filter-summary{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;cursor:pointer;padding:4px 0;user-select:none}.filter-container{display:flex;flex-direction:column;gap:8px;padding-top:8px}.filter-row{display:flex;flex-direction:column;gap:3px}.filter-row label{font-size:10px;color:var(--muted);text-transform:uppercase;font-weight:600;letter-spacing:.3px}.filter-row select{min-width:0;width:100%}.tree-section{border-top:1px solid var(--line);padding-top:8px;flex:1;overflow:auto}.tree-header{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}.cap-tree.empty{color:var(--muted);font-size:12px;padding:8px 0}.tree-group{margin-bottom:2px}.tree-children{padding-left:12px}.tree-item{display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:8px;cursor:pointer;transition:all .12s;border:1px solid transparent}.tree-item:hover{background:var(--soft)}.tree-item.selected{background:var(--accent-light);border-color:#D4A24C33}.tree-chevron{border:none;background:none;cursor:pointer;padding:2px;color:var(--muted);display:flex;align-items:center;justify-content:center;transition:transform .2s;flex-shrink:0;width:18px;height:18px;border-radius:4px}.tree-chevron:hover{background:var(--line)}.tree-chevron.expanded{transform:rotate(90deg)}.tree-name{font-size:12px;font-weight:600;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tree-item.l2 .tree-name{font-weight:500}.tree-count{font-size:10px;color:var(--muted);font-family:var(--mono);background:var(--soft);border-radius:10px;padding:1px 6px;flex-shrink:0}.content{min-height:calc(100vh - 100px);min-width:0}.view{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:14px;min-height:calc(100vh - 100px);overflow:hidden}.view-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding-bottom:12px;border-bottom:1px solid var(--line);flex-wrap:wrap}.view-title{font-size:16px;font-weight:800}.view-hint{font-size:12px;color:var(--muted)}.empty-state{min-height:calc(100vh - 100px);display:flex;align-items:center;justify-content:center}.empty-card{max-width:480px;padding:32px;background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);text-align:center}.empty-card h2{margin:0 0 12px;font-size:20px}.empty-card p{margin:0 0 8px;color:var(--muted);font-size:14px}.empty-hint{font-size:12px!important;color:#7A8786!important;font-family:var(--mono)}.map-heading{display:flex;flex-direction:column;gap:2px;min-width:200px}.map-company{font-size:12px;color:var(--accent);font-weight:700}.map-title{font-size:18px;font-weight:800}.map-desc{font-size:11px;color:var(--muted)}.legend-wrap{display:flex;flex-direction:column;gap:6px;max-width:60%;align-items:flex-end}.legend-title{font-size:11px;color:var(--muted);font-weight:600}.legend-items{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}.legend-item{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);border-radius:999px;padding:3px 8px;font-size:11px;background:#fff}.legend-swatch{width:8px;height:8px;border-radius:999px;border:1px solid rgba(24,25,25, .1);flex-shrink:0}.legend-field-label{font-weight:700;font-size:11px;color:var(--text);padding:3px 0}.legend-more{font-size:11px;color:var(--muted);padding:3px 4px}.legend-empty{font-size:11px;color:var(--muted)}.map-canvas-viewport{width:100%;height:calc(100vh - 200px);overflow:auto}.map-canvas{padding-top:12px;width:max-content;min-width:100%;min-height:100%;transform-origin:top left;transition:transform .2s ease-out}.map-empty{color:var(--muted);padding:16px;font-size:13px}.map-canvas.pan-ready{cursor:grab}.map-canvas.panning{cursor:grabbing;user-select:none}.minimap-container{margin-top:auto;width:100%;background:var(--panel);border-top:1px solid var(--line);border-radius:0;overflow:hidden;transition:max-height .2s ease,opacity .2s;flex-shrink:0}.minimap-container.collapsed .minimap-canvas{max-height:0;overflow:hidden}.minimap-header{display:flex;align-items:center;justify-content:space-between;padding:6px 8px;background:var(--soft);border-bottom:1px solid var(--line)}.minimap-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.4px}.minimap-toggle{border:none;background:transparent;cursor:pointer;font-size:10px;color:var(--muted);padding:2px 4px;border-radius:4px;transition:all .15s}.minimap-toggle:hover{background:var(--line);color:var(--text)}.minimap-canvas{position:relative;width:100%;cursor:pointer;background:#C7CACB;overflow:hidden;transition:max-height .2s ease}.minimap-viewport{position:absolute;border:2px solid var(--accent);background:#D4A24C14;border-radius:2px;cursor:move;pointer-events:auto;min-width:8px;min-height:8px}.minimap-block{position:absolute;background:var(--soft);border:1px solid var(--line);border-radius:2px}.details-collapsed .minimap-container{display:none}.layout-grid .l1-board{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}.layout-grid .l1-board .l1-block{width:var(--block-w);flex:0 0 auto}.layout-horizontal .l1-board{display:flex;flex-direction:row;gap:12px;align-items:flex-start;overflow-x:auto;padding-bottom:4px}.layout-horizontal .l1-board .l1-block{width:var(--block-w);flex:0 0 auto}.layout-vertical .l1-board{display:flex;flex-direction:column;gap:12px}.layout-vertical .l1-board .l1-block{width:100%}.layout-custom .l1-board{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}.layout-custom .l1-board .l1-block{flex:0 0 auto}.l1-separated{margin-top:12px;display:flex;flex-direction:column;gap:12px}.l1-separated .l1-block{width:100%}.l1-block{border:1px solid var(--line);border-radius:var(--radius);padding:10px 12px;background:#fff;transition:all .2s ease;box-shadow:var(--shadow)}.l1-block.collapsed{padding-bottom:10px}.l1-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding-bottom:6px;border-bottom:2px solid rgba(212,162,76,.25)}.l1-left{display:flex;align-items:center;gap:6px}.l1-collapse-btn{border:none;background:none;cursor:pointer;padding:2px;color:var(--muted);display:flex;align-items:center;justify-content:center;transition:transform .2s;border-radius:4px;width:20px;height:20px}.l1-collapse-btn:hover{background:var(--soft)}.l1-collapse-btn:not(.collapsed){transform:rotate(90deg)}.l1-name{font-weight:800;font-size:13px}.l1-meta{font-size:11px;color:var(--muted);font-family:var(--mono);background:var(--soft);border-radius:10px;padding:2px 8px}.l2-container{margin-top:8px}.l2-container.l2-layout-stack{display:block}.l2-container.l2-layout-row{display:flex;flex-direction:row;gap:8px;overflow-x:auto;padding-bottom:4px}.l2-container.l2-layout-row .l2-row{flex:0 0 clamp(160px,50%,260px);margin-top:0;border-top:none;border-left:1px dashed var(--line);padding-top:0;padding-left:8px}.l2-container.l2-layout-row .l2-row:first-child{border-left:none;padding-left:0}.l2-container.l2-layout-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.l2-container.l2-layout-grid .l2-row{margin-top:0;border:1px solid var(--line);padding:8px;border-radius:8px;background:#C7CACB}.l2-row{margin-top:8px;padding-top:8px;border-top:1px dashed var(--line)}.l2-row:first-child{margin-top:6px;padding-top:0;border-top:none}.l2-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px}.l2-name{font-weight:700;font-size:12px}.l2-meta{font-size:10px;color:var(--muted);font-family:var(--mono)}.app-tiles{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.app-tiles.app-layout-stack{flex-direction:column;align-items:flex-start}.app-tiles.app-layout-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr))}.app-tile{border:1px solid var(--line);background:#fff;border-radius:999px;padding:5px 10px;font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;user-select:none;transition:all .12s;max-width:100%;box-shadow:0 1px 2px rgba(24,25,25,.06),inset 0 1px 0 rgba(255,255,255,.6)}.app-tile:hover{filter:brightness(.97);box-shadow:0 1px 4px #18191914}.app-tile.selected{box-shadow:0 0 0 2px var(--accent);border-color:var(--accent)}.density-compact .app-tile{padding:3px 8px;font-size:10px}.density-compact .tile-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tile-dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;border:1px solid rgba(24,25,25, .1)}.tile-label{line-height:1.3}.attr-dots{display:inline-flex;gap:3px;margin-left:auto}.attr-dot{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;font-size:9px;font-weight:700;color:#fff;text-shadow:0 0 2px rgba(24,25,25, .3);border:1px solid rgba(255,255,255,.3);cursor:help}.heatmap-bar-wrap{display:flex;align-items:center;gap:8px;margin-top:6px}.heatmap-bar{flex:1;height:20px;border-radius:6px;overflow:hidden;display:flex;border:1px solid var(--line)}.heatmap-segment{transition:width .3s ease;min-width:3px}.heatmap-count{font-size:11px;font-family:var(--mono);color:var(--muted);white-space:nowrap;flex-shrink:0}.details{overflow:auto;flex:1;min-width:0;padding-right:4px}.details.empty{display:flex;align-items:center;justify-content:center}.detail-empty-msg{color:var(--muted);font-size:12px;text-align:center}.detail-header{margin-bottom:12px}.detail-title{font-size:15px;font-weight:700;margin:0 0 8px}.detail-badges{display:flex;flex-wrap:wrap;gap:6px}.detail-badge{font-size:10px;font-weight:600;border:1px solid;border-radius:999px;padding:2px 8px}.detail-section{margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}.detail-section-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.3px;margin-bottom:8px}.kv-grid{display:flex;flex-direction:column;gap:6px}.kv-row{display:flex;gap:8px;font-size:12px}.kv-label{color:var(--muted);min-width:90px;flex-shrink:0}.kv-value{word-break:break-word}.kv-empty{color:var(--muted);font-size:12px}.coverage-list{display:flex;flex-direction:column;gap:4px}.coverage-path{font-size:11px;padding:4px 8px;background:var(--soft);border-radius:6px;font-family:var(--mono)}.sidebar .coverage-path{background:#292C2C;border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.72)}.detail-app-list{display:flex;flex-wrap:wrap;gap:4px}.detail-app-chip{font-size:10px;padding:3px 8px;background:var(--soft);border-radius:999px;border:1px solid var(--line)}.dash-canvas{padding-top:16px}.dash-stats{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px}.stat-card{flex:1;min-width:140px;background:#fff;border:1px solid var(--line);border-radius:var(--radius-sm);padding:16px;text-align:center;box-shadow:0 1px 3px #1819190A}.stat-value{font-size:28px;font-weight:800;line-height:1.2}.stat-label{font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.3px;margin-top:4px}.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.dash-charts,.dash-lists{display:flex;flex-direction:column;gap:16px}.dash-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius-sm);padding:16px;box-shadow:0 1px 3px #1819190A}.dash-card-warn{border-left:3px solid #F5A623}.dash-card-title{font-size:12px;font-weight:700;color:var(--text);margin-bottom:12px}.bar-chart{display:flex;flex-direction:column;gap:6px}.bar-row{display:flex;align-items:center;gap:8px}.bar-label{font-size:11px;color:var(--text);width:100px;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar-track{flex:1;height:18px;background:var(--soft);border-radius:4px;overflow:hidden}.bar-fill{height:100%;border-radius:4px;transition:width .4s ease;min-width:3px}.bar-value{font-size:11px;font-family:var(--mono);color:var(--muted);width:32px;text-align:right;flex-shrink:0}.bar-overflow{font-size:11px;color:var(--muted);margin-top:6px;text-align:center}.top-row{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--soft)}.top-row:last-child{border-bottom:none}.top-label{font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.top-value{font-size:12px;font-weight:700;font-family:var(--mono);flex-shrink:0}.gap-row{display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px}.gap-l1{color:var(--muted)}.gap-arrow{color:var(--line);font-size:10px}.gap-l2{font-weight:600}.tooltip{position:fixed;z-index:100;pointer-events:none;background:#292C2C;color:#fff;border-radius:8px;padding:8px 12px;font-size:11px;max-width:260px;box-shadow:0 4px 12px #18191933;transform:translate(-50%,-100%);opacity:0;transition:opacity .12s}.tooltip.visible{opacity:1}.tt-name{font-weight:700;font-size:12px;margin-bottom:4px}.tt-row{display:flex;gap:4px}.tt-label{color:#B1B5B7}.footer{display:flex;gap:10px;align-items:center;justify-content:center;padding:8px 14px 12px;color:#B1B5B7;font-size:11px;background:#181919;border-top:1px solid rgba(255,255,255,.12)}@page{size:A2 landscape;margin:10mm}@media print{.topbar,.footer,.sidebar,#emptyState,.minimap-container,.minimap-fab,.view.hidden{display:none!important}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}body{background:#fff;margin:0;padding:0}.layout{display:block;padding:0}.content{padding:0}.view{border:none;box-shadow:none;padding:5mm;min-height:auto;overflow:visible!important}.map-canvas{height:auto!important;overflow:visible!important;transform:none!important}.l1-board{overflow:visible!important}.layout-grid .l1-board{display:flex!important;flex-wrap:wrap!important;gap:5mm!important}.layout-grid .l1-board .l1-block{width:var(--block-w)!important;flex:0 0 auto;break-inside:avoid;page-break-inside:avoid}.layout-horizontal .l1-board{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:5mm!important;overflow-x:visible!important}.layout-horizontal .l1-board .l1-block{width:var(--block-w)!important;flex:0 0 auto;break-inside:avoid;page-break-inside:avoid}.layout-vertical .l1-board{display:flex!important;flex-direction:column!important;gap:5mm!important}.layout-vertical .l1-board .l1-block{width:100%!important;break-inside:avoid;page-break-inside:avoid}.layout-custom .l1-board{display:flex!important;flex-wrap:wrap!important;gap:5mm!important}.layout-custom .l1-board .l1-block{flex:0 0 auto;break-inside:avoid;page-break-inside:avoid}.l2-container{overflow:visible!important}.l2-container.l2-layout-row{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;overflow:visible!important}.l2-container.l2-layout-grid{display:grid!important;overflow:visible!important}.l2-container.l2-layout-stack{display:block!important;overflow:visible!important}.app-tiles{display:flex!important;flex-wrap:wrap!important;gap:2mm!important}.app-tile{font-size:9px;padding:2mm 3mm}.heatmap-bar-wrap{margin-top:2mm}}@media(max-width:1200px){.layout{grid-template-columns:1fr}.sidebar{position:static;max-height:none;min-height:auto}.sidebar.left,.sidebar.right{max-height:400px}.content .view{min-height:500px}.map-canvas-viewport{height:500px}.dash-grid{grid-template-columns:1fr}}@media(max-width:768px){.topbar-row{flex-direction:column;align-items:stretch}.controls{justify-content:flex-start}.legend-wrap{max-width:100%;align-items:flex-start}.view-header{flex-direction:column}}
/*$vite$:1*/`, document.head.appendChild(ge); const ae = new EventTarget, t = { model: null, selected: { l1Id: null, l2Id: null, appId: null }, colorBy: [null, null, null], viewMode: "map", mapLayout: "grid", density: "compact", search: "", filters: {}, zoom: 1, blockWidth: 480, collapsedL1s: new Set, treeExpandedL1s: new Set, navCollapsed: !1, detailsCollapsed: !1, minimapCollapsed: !1, focusMode: !1 }; window._eaState = t; window._eaEventTarget = ae; function V(e, a) { ae.dispatchEvent(new CustomEvent(e, { detail: a })) } function ve(e, a) { const n = o => a(o.detail); return ae.addEventListener(e, n), () => ae.removeEventListener(e, n) } function Re() { const e = localStorage.getItem("ea-map-layout");["grid", "horizontal", "vertical", "custom"].includes(e) && (t.mapLayout = e); const a = localStorage.getItem("ea-density");["expanded", "compact", "heatmap"].includes(a) && (t.density = a); const n = parseInt(localStorage.getItem("ea-block-width"));[360, 480, 600].includes(n) && (t.blockWidth = n); const o = parseFloat(localStorage.getItem("ea-zoom")); o >= .25 && o <= 3 && (t.zoom = o), t.minimapCollapsed = localStorage.getItem("ea-minimap-collapsed") === "1", t.navCollapsed = localStorage.getItem("ea-nav-collapsed") === "1", t.detailsCollapsed = localStorage.getItem("ea-details-collapsed") === "1" } function O(e, a) { localStorage.setItem(e, String(a)) } function z(e) { return (e ?? "").toString().trim() } function w(e) { return (e ?? "").toString().replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;") } function he(e, a) { let n; return (...o) => { clearTimeout(n), n = setTimeout(() => e(...o), a) } } function ne(e) { const a = Number(z(e)); return Number.isFinite(a) ? a : 1 / 0 } function et(e) { if (e == null) return null; const a = String(e).replace(/[^0-9.-]/g, ""); if (!a || a === "." || a === "-" || a === "-.") return null; const n = Number(a); return Number.isFinite(n) ? n : null } function Gt(e, a) { if (e == null) return "-"; const n = z(a || ""); const o = n ? { style: "currency", currency: n, maximumFractionDigits: 0 } : { maximumFractionDigits: 0 }; try { return new Intl.NumberFormat(void 0, o).format(e) } catch { return `${n ? `${n} ` : ""}${Math.round(e).toLocaleString()}` } } function xe(e) { return Array.from(new Set(e)) } function U(e, a) { const n = z(e).toLowerCase(); return ["stack", "grid", "row"].includes(n) ? n : a } function X(e) { const a = new Map; for (const n of e) for (const o of Object.keys(n || {})) { const i = o.toLowerCase(); a.has(i) || a.set(i, o) } return a } function b(e, a, n) { const o = n.get(a.toLowerCase()); return o ? z(e?.[o]) : "" } let S = null; function Fe(e, a) { S || (S = document.createElement("div"), S.className = "tooltip", document.body.appendChild(S)), S.innerHTML = a, S.classList.add("visible"); const n = e.getBoundingClientRect(), o = n.left + n.width / 2, i = n.top - 8; S.style.left = `${o}px`, S.style.top = `${i}px` } function We() { S && S.classList.remove("visible") } const c = { l1: { id: "L1_ID", name: "L1_Name", order: "L1_Order", layout: "L1_Layout", desc: "L1_Description", owner: "L1_Owner", width: "L1_Width" }, l2: { l1Id: "L1_ID", id: "L2_ID", name: "L2_Name", order: "L2_Order", layout: "L2_Layout", desc: "L2_Description", owner: "L2_Owner" }, app: { id: "App_ID", name: "Application Name", order: "App_Order", type: "Application Type", lifecycle: "Lifecycle", risk: "Risk", roadmap: "Roadmap", costYr: "Annual cost", currency: "Currency", owner: "Owner", hosting: "Hosting", region: "Region", productCategory: "Product Category", comments: "Comments", superseder: "Superseder", endDate: "End Date" }, map: { appId: "App_ID", l2Id: "L2_ID", appLayout: "App_Layout" }, heading: { title: "Title", description: "Description", companyName: "Company Name", mainCurrency: "Main Currency" }, canvasHeading: { title: "Canvas Title", description: "Canvas Description", companyName: "Canvas Company Name", version: "version" } }, ye = [c.app.lifecycle, c.app.risk, c.app.roadmap, c.app.hosting, c.app.region, c.app.owner, c.app.type, c.app.productCategory, c.app.costYr], Pe = [...ye]; function Ve(e) { const { l1Rows: a = [], l2Rows: n = [], appRows: o = [], mapRows: i = [], headingRows: r = [], canvasHeadingRows: s = [] } = e, p = X(a), m = X(n), f = X(o), d = X(i), g = new Map; for (const u of a) { const y = b(u, c.l1.id, p), L = b(u, c.l1.name, p); if (!y || !L) continue; const I = parseInt(b(u, c.l1.width, p), 10), M = I >= 300 && I <= 1200 ? I : null; g.set(y, { id: y, name: L, width: M, order: ne(b(u, c.l1.order, p)), layout: U(b(u, c.l1.layout, p), "row"), desc: b(u, c.l1.desc, p), owner: b(u, c.l1.owner, p) }) } const v = new Map, h = new Map; for (const u of n) { const y = b(u, c.l2.id, m), L = b(u, c.l2.name, m), I = b(u, c.l2.l1Id, m); !y || !L || !I || !g.has(I) || (v.set(y, { id: y, name: L, l1Id: I, order: ne(b(u, c.l2.order, m)), layout: U(b(u, c.l2.layout, m), "stack"), desc: b(u, c.l2.desc, m), owner: b(u, c.l2.owner, m) }), h.has(I) || h.set(I, []), h.get(I).push(y)) } const x = new Map, k = xe(o.flatMap(u => Object.keys(u))); for (const u of o) { const y = b(u, c.app.id, f), L = b(u, c.app.name, f); if (!y || !L) continue; const I = {}; for (const M of Object.keys(u || {})) { const Q = z(u[M]); Q && (I[M] = Q) } x.set(y, { id: y, name: L, attrs: I, order: ne(b(u, c.app.order, f)), type: b(u, c.app.type, f), lifecycle: b(u, c.app.lifecycle, f), risk: b(u, c.app.risk, f), roadmap: b(u, c.app.roadmap, f), costYr: b(u, c.app.costYr, f), currency: b(u, c.app.currency, f), owner: b(u, c.app.owner, f), hosting: b(u, c.app.hosting, f), region: b(u, c.app.region, f), productCategory: b(u, c.app.productCategory, f), endDate: b(u, c.app.endDate, f), supersederIds: [], supersederNames: [] }) } const B = new Map, $ = new Map, H = []; let te = 0; for (const u of i) { const y = b(u, c.map.appId, d), L = b(u, c.map.l2Id, d), I = U(b(u, c.map.appLayout, d), "row"); if (!y || !L || !x.has(y) || !v.has(L)) { te++; continue } B.has(y) || B.set(y, new Set), $.has(L) || $.set(L, new Set), B.get(y).add(L), $.get(L).add(y), H.push({ appId: y, l2Id: L, l1Id: v.get(L).l1Id, appLayout: I }) } const de = Array.from(g.values()).sort((u, y) => u.order - y.order || u.name.localeCompare(y.name)); for (const [, u] of h) u.sort((y, L) => { const I = v.get(y), M = v.get(L); return I.order - M.order || I.name.localeCompare(M.name) }); const pe = new Map; for (const [u, y] of $) pe.set(u, Array.from(y).sort((L, I) => { const M = x.get(L), Q = x.get(I); return M.order - Q.order || M.name.localeCompare(Q.name) })); const bt = new Set(de.filter(u => U(u.layout, "row") === "stack").map(u => u.id)), Ne = new Map; for (const u of de) { const y = { row: 0, stack: 0, grid: 0 }; for (const I of h.get(u.id) || []) { const M = v.get(I)?.layout || "stack"; y[M] = (y[M] || 0) + 1 } const L = Object.entries(y).sort((I, M) => M[1] - I[1]); Ne.set(u.id, L[0]?.[1] > 0 ? L[0][0] : "stack") } const _e = new Map; for (const [u] of pe) { const y = H.find(L => L.l2Id === u)?.appLayout; _e.set(u, U(y, "row")) } const ce = X(r), me = r[0] || {}, wt = { title: b(me, c.heading.title, ce), description: b(me, c.heading.description, ce), companyName: b(me, c.heading.companyName, ce), mainCurrency: b(me, c.heading.mainCurrency, ce) }, fe = X(s), ue = s[0] || {}, Lt = { title: b(ue, c.canvasHeading.title, fe), description: b(ue, c.canvasHeading.description, fe), companyName: b(ue, c.canvasHeading.companyName, fe), version: b(ue, c.canvasHeading.version, fe) }, It = ["(None)"].concat(ye.filter(u => k.includes(u))), je = Pe.filter(u => k.includes(u)), Oe = {}; for (const u of je) Oe[u] = xe(Array.from(x.values()).map(y => z(y.attrs[u])).filter(Boolean)).sort(); for (const [appId, app] of x.entries()) { const supersederValue = z(app.attrs[c.app.superseder]); if (supersederValue) { const supersederIds = supersederValue.split('|').map(id => z(id)).filter(Boolean); app.supersederIds = supersederIds; app.supersederNames = []; for (const supId of supersederIds) { if (x.has(supId)) { app.supersederNames.push(x.get(supId).name); } else { console.warn(`Invalid superseder App ID: ${supId} for app ${appId}`); } } } else { app.supersederIds = []; app.supersederNames = []; } } let selfRefs = 0; let circularRefs = 0; let orphanedRefs = 0; for (const [appId, app] of x.entries()) { if (app.supersederIds.includes(appId)) { console.error(`Self-reference detected: ${appId} references itself as superseder`); app.supersederIds = app.supersederIds.filter(id => id !== appId); selfRefs++; } } for (const [appId, app] of x.entries()) { for (const supId of app.supersederIds) { const superApp = x.get(supId); if (superApp && superApp.supersederIds.includes(appId)) { console.error(`Circular reference: ${appId} <-> ${supId}`); circularRefs++; } } } orphanedRefs = Array.from(x.values()).reduce((sum, app) => sum + (app.supersederIds.length - app.supersederNames.length), 0); const supersededByApp = new Map(); for (const [appId, app] of x.entries()) { for (const supId of app.supersederIds) { if (!supersededByApp.has(supId)) { supersededByApp.set(supId, new Set()); } supersededByApp.get(supId).add(appId); } } const activeAppIds = new Set(Array.from(x.entries()).filter(([, app]) => !z(app.attrs[c.app.endDate])).map(([id]) => id)); return { l1ById: g, l2ById: v, appById: x, appToL2: B, l2ToApps: $, l2IdsByL1: h, appIdsByL2: pe, l1List: de, mappingRows: H, colorFields: It, filterFields: je, filterValues: Oe, columnsPresent: k, separatedL1Ids: bt, l2LayoutsByL1: Ne, appLayoutsByL2: _e, invalidMappings: te, heading: wt, canvasHeading: Lt, supersededByApp: supersededByApp, activeAppIds: activeAppIds, validationWarnings: { circularRefs: circularRefs, selfRefs: selfRefs, orphanedRefs: orphanedRefs } } } function K(e, a, n, o, excludeEndDated) { let i = e.mappingRows; excludeEndDated && (i = i.filter(m => e.activeAppIds.has(m.appId))); for (const [m, f] of Object.entries(a)) {
    if (m === "_hasSuperseder") {
        const supersederValues = Array.isArray(f) ? f : [f];
        if (supersederValues.length === 1) {
          const shouldHaveSuperseder = supersederValues[0] === "yes";
          i = i.filter(d => ((e.appById.get(d.appId)?.supersederIds?.length || 0) > 0) === shouldHaveSuperseder);
        }
        continue;
    }
    const selectedValues = Array.isArray(f) ? f : (f ? [f] : []);
    selectedValues.length && (i = i.filter(d => { const g = e.appById.get(d.appId); return g && selectedValues.includes(z(g.attrs[m])) }));
} if (o.l1Id && (i = i.filter(m => m.l1Id === o.l1Id)), o.l2Id && (i = i.filter(m => m.l2Id === o.l2Id)), n) { const m = n.toLowerCase(); i = i.filter(f => { const d = e.l1ById.get(f.l1Id)?.name || "", g = e.l2ById.get(f.l2Id)?.name || "", v = e.appById.get(f.appId); const appName = v?.name || ""; const superseders = v?.supersederNames ? v.supersederNames.join(" ") : ""; return `${d} ${g} ${appName} ${superseders}`.toLowerCase().includes(m) }) } const r = new Set(i.map(m => m.l1Id)), s = new Set(i.map(m => m.l2Id)), p = new Map; for (const m of i) p.has(m.l2Id) || p.set(m.l2Id, new Set), p.get(m.l2Id).add(m.appId); return { rows: i, visibleL1: r, visibleL2: s, appsByL2: p } } const Xe = (window.EA_COLOR_CONFIG && window.EA_COLOR_CONFIG.attributeColors) || { Risk: { Critical: "#991B1B", High: "#DC2626", Medium: "#D97706", Low: "#059669", None: "#6B7280", Minimal: "#10B981" }, Lifecycle: { Active: "#059669", Production: "#059669", Development: "#2563EB", Invest: "#2563EB", Migrate: "#D97706", Tolerate: "#059669", Pilot: "#0891B2", Planning: "#6366F1", Planned: "#6366F1", Retiring: "#D97706", Retired: "#9CA3AF", "End of Life": "#DC2626", Sunset: "#D97706", Decommissioned: "#9CA3AF" }, Hosting: { Cloud: "#2563EB", SaaS: "#0891B2", "On-Premise": "#D97706", "On-Premises": "#D97706", Hybrid: "#7C3AED", Managed: "#059669" } }, je = (window.EA_COLOR_CONFIG && window.EA_COLOR_CONFIG.rangeColors) || {}, be = (window.EA_COLOR_CONFIG && window.EA_COLOR_CONFIG.fallbackPalette) || ["#2563EB", "#DC2626", "#059669", "#D97706", "#0891B2", "#B91C1C", "#15803D", "#CA8A04", "#0369A1", "#BE123C", "#4D7C0F", "#9A3412", "#0F766E", "#C2410C", "#1D4ED8", "#DB2777", "#65A30D", "#7C2D12", "#3730A3", "#E11D48", "#4338CA", "#0E7490", "#7C3AED", "#6D28D9"], qe = (window.EA_COLOR_CONFIG && window.EA_COLOR_CONFIG.defaultColor) || "#9CA3AF"; function Ye(e) { let a = 2166136261; for (let n = 0; n < e.length; n++)a ^= e.charCodeAt(n), a = Math.imul(a, 16777619); return a >>> 0 } function Qt(e, a) { const n = ((window.EA_COLOR_CONFIG || {}).rangeColors || {})[e]; if (!n || !Array.isArray(n)) return null; const o = et(a); if (o == null) return null; for (const i of n) { const r = Number(i?.min), s = i?.max == null ? null : Number(i.max); if ((!Number.isFinite(r) || o >= r) && (s == null || o <= s)) return i } return null } function D(e, a) { const n = (a ?? "").toString().trim(); if (!n) return qe; const o = Qt(e, n); if (o?.color) return o.color; const i = Xe[e]; if (i) { for (const [r, l] of Object.entries(i)) if (r.toLowerCase() === n.toLowerCase()) return l } return be[Ye(n.toLowerCase()) % be.length] } function Ke(e) { return z(e).toLowerCase() === z(c.app.region).toLowerCase() || z(e).toLowerCase() === "region" } function Jee(e) { const a = z(e).toLowerCase(); if (!a) return ""; if (a === "global") return "🌐"; const n = { us: "🇺🇸", usa: "🇺🇸", "united states": "🇺🇸", "united states of america": "🇺🇸", uk: "🇬🇧", "united kingdom": "🇬🇧", england: "🏴", gb: "🇬🇧", "great britain": "🇬🇧", germany: "🇩🇪", de: "🇩🇪", deutschland: "🇩🇪", france: "🇫🇷", fr: "🇫🇷", spain: "🇪🇸", es: "🇪🇸", italy: "🇮🇹", it: "🇮🇹", canada: "🇨🇦", ca: "🇨🇦", mexico: "🇲🇽", mx: "🇲🇽", brazil: "🇧🇷", br: "🇧🇷", india: "🇮🇳", in: "🇮🇳", china: "🇨🇳", cn: "🇨🇳", japan: "🇯🇵", jp: "🇯🇵", singapore: "🇸🇬", sg: "🇸🇬", australia: "🇦🇺", au: "🇦🇺", netherlands: "🇳🇱", nl: "🇳🇱", ireland: "🇮🇪", ie: "🇮🇪", switzerland: "🇨🇭", ch: "🇨🇭", sweden: "🇸🇪", se: "🇸🇪", norway: "🇳🇴", no: "🇳🇴", denmark: "🇩🇰", dk: "🇩🇰", poland: "🇵🇱", pl: "🇵🇱", austria: "🇦🇹", at: "🇦🇹", belgium: "🇧🇪", be: "🇧🇪", portugal: "🇵🇹", pt: "🇵🇹", "new zealand": "🇳🇿", nz: "🇳🇿", uae: "🇦🇪", "united arab emirates": "🇦🇪", "south africa": "🇿🇦", za: "🇿🇦" }; return n[a] || "" } window._eaColorFn = D; function we(e, a) { const n = D(e, a); return Le(n, .15) } function Ue(e, a) { const n = D(e, a); return Le(n, .45) } function Le(e, a) { const n = (e || "").replace("#", "").trim(); if (!n || n.length < 3) return `rgba(156,163,175,${a})`; const o = n.length === 3 ? n.split("").map(r => r + r).join("") : n, i = parseInt(o, 16); return `rgba(${i >> 16 & 255},${i >> 8 & 255},${i & 255},${a})` } let F; function Ze() { F = document.getElementById("capTree") } function G() {
    const e = t.model; if (!e || !F) return; const a = K(e, t.filters, t.search, t.selected), n = new Map, o = new Map; for (const s of a.rows) n.set(s.l1Id, (n.get(s.l1Id) || 0) + 1), o.set(s.l2Id, (o.get(s.l2Id) || 0) + 1); const i = t.search || Object.values(t.filters).some(Boolean) || t.selected.l1Id || t.selected.l2Id; F.innerHTML = "", F.classList.remove("empty"); let r = 0; for (const s of e.l1List) {
      const p = n.get(s.id) || 0; if (i && p === 0) continue; r++; const m = t.treeExpandedL1s.has(s.id), f = t.selected.l1Id === s.id && !t.selected.l2Id, d = document.createElement("div"); d.className = "tree-group"; const g = document.createElement("div"); if (g.className = `tree-item l1${f ? " selected" : ""}`, g.innerHTML = `
      <button class="tree-chevron${m ? " expanded" : ""}" aria-label="Toggle">
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="tree-name">${w(s.name)}</div>
      <div class="tree-count">${p}</div>
    `, g.querySelector(".tree-chevron").addEventListener("click", h => { h.stopPropagation(), t.treeExpandedL1s.has(s.id) ? t.treeExpandedL1s.delete(s.id) : t.treeExpandedL1s.add(s.id), G() }), g.addEventListener("click", () => { t.selected.l1Id === s.id && !t.selected.l2Id ? t.selected.l1Id = null : (t.selected.l1Id = s.id, t.selected.l2Id = null, t.treeExpandedL1s.add(s.id)), t.selected.appId = null, V("selection-changed") }), d.appendChild(g), m) {
        const h = document.createElement("div"); h.className = "tree-children"; for (const x of e.l2IdsByL1.get(s.id) || []) {
          const k = e.l2ById.get(x), B = o.get(x) || 0; if (i && B === 0) continue; const $ = document.createElement("div"), H = t.selected.l2Id === x; $.className = `tree-item l2${H ? " selected" : ""}`, $.innerHTML = `
          <div class="tree-name">${w(k.name)}</div>
          <div class="tree-count">${B}</div>
        `, $.addEventListener("click", te => { te.stopPropagation(), t.selected.l1Id = s.id, t.selected.l2Id = t.selected.l2Id === x ? null : x, t.selected.appId = null, V("selection-changed") }), h.appendChild($)
        } d.appendChild(h)
      } F.appendChild(d)
    } r === 0 && (F.classList.add("empty"), F.textContent = "No matches found.")
  } function Je() { const e = t.model; if (e) { for (const a of e.l1List) t.treeExpandedL1s.add(a.id); G() } } function Qe() { t.treeExpandedL1s.clear(), G() } let A; function _initMapCanvas() { A = document.getElementById("mapCanvas"), A && (A.addEventListener("click", tt), A.addEventListener("mouseenter", at, !0), A.addEventListener("mouseleave", nt, !0)) } function tt(e) { const supersederLink = e.target.closest(".superseder-link"); if (supersederLink) { const targetAppId = supersederLink.dataset.appId; if (targetAppId) { t.selected.appId = targetAppId; V("selection-changed"); setTimeout(() => yt(), 100); } e.stopPropagation(); return; } const a = e.target.closest(".app-tile"); if (a) { const o = a.dataset.appId; t.selected.appId = t.selected.appId === o ? null : o, V("selection-changed"); return } const n = e.target.closest(".l1-collapse-btn"); if (n) { const o = n.dataset.l1Id; t.collapsedL1s.has(o) ? t.collapsedL1s.delete(o) : t.collapsedL1s.add(o), _(); return } } function at(e) { if (t.density === "expanded") return; const a = e.target.closest(".app-tile"); if (!a || !t.model) return; const n = t.model.appById.get(a.dataset.appId); if (!n) return; const i = le().map(r => { const s = z(n.attrs[r]); return s ? `<div class="tt-row"><span class="tt-label">${w(r)}:</span> <span class="tt-value">${w(s)}</span></div>` : "" }).join(""); Fe(a, `<div class="tt-name">${w(n.name)}</div>${i}`) } function nt(e) { e.target.closest(".app-tile") && We() } function le() { return t.colorBy.filter(e => e && e !== "(None)") } function _() { const e = t.model; if (!e || !A) return; const a = K(e, t.filters, t.search, t.selected, true), n = t.search || Object.values(t.filters).some(Boolean) || t.selected.l1Id || t.selected.l2Id; A.className = `map-canvas layout-${t.mapLayout}`, A.style.setProperty("--block-w", `${t.blockWidth}px`), A.innerHTML = ""; const o = document.createElement("div"); o.className = "l1-board"; const i = document.createElement("div"); i.className = "l1-separated"; for (const r of e.l1List) { if (n && !a.visibleL1.has(r.id)) continue; const s = ot(r, e, a); s && (e.separatedL1Ids.has(r.id) ? i.appendChild(s) : o.appendChild(s)) } o.children.length && A.appendChild(o), i.children.length && A.appendChild(i), a.rows.length || (A.innerHTML = '<div class="map-empty">No rows match the current filters.</div>') } function ot(e, a, n) {
    const o = (a.l2IdsByL1.get(e.id) || []).filter(f => n.visibleL2.has(f)), i = o.reduce((f, d) => f + (n.appsByL2.get(d)?.size || 0), 0), r = t.collapsedL1s.has(e.id), s = document.createElement("div"); if (s.className = `l1-block${r ? " collapsed" : ""}`, t.mapLayout === "custom" && e.width && (s.style.width = `${e.width}px`), s.innerHTML = `
    <div class="l1-head">
      <div class="l1-left">
        <button class="l1-collapse-btn${r ? " collapsed" : ""}" data-l1-id="${w(e.id)}" title="${r ? "Expand" : "Collapse"}">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <div class="l1-name">${w(e.name)}</div>
      </div>
      <div class="l1-meta">${i}</div>
    </div>
  `, r) return s; const p = document.createElement("div"), m = a.l2LayoutsByL1.get(e.id) || "stack"; p.className = `l2-container l2-layout-${m}`; for (const f of o) { const d = a.l2ById.get(f), g = n.appsByL2.get(f); if (!g || g.size === 0) continue; const v = Array.from(g).sort((x, k) => { const B = a.appById.get(x), $ = a.appById.get(k); return B.order - $.order || B.name.localeCompare($.name) }), h = document.createElement("div"); h.className = "l2-row", h.innerHTML = `<div class="l2-head"><div class="l2-name">${w(d.name)}</div><div class="l2-meta">${v.length}</div></div>`, t.density === "heatmap" ? h.appendChild(it(v, a)) : h.appendChild(lt(v, f, a)), p.appendChild(h) } return s.appendChild(p), s
  } function lt(e, a, n) { 
    const o = n.appLayoutsByL2.get(a) || "row", i = document.createElement("div"); 
    i.className = `app-tiles app-layout-${o} density-${t.density}`; 
    const r = le(), s = r[0] || null; 
    for (const p of e) { 
      const m = n.appById.get(p);
      const group = document.createElement("div");
      group.className = "app-tile-group";
      group.style.display = "inline-flex";
      group.style.alignItems = "center";
      group.style.gap = "4px";
      group.style.flexWrap = "wrap";
      group.style.marginBottom = "4px";
      const f = document.createElement("div"); 
      f.className = `app-tile${t.selected.appId === p ? " selected" : ""}`; 
      f.dataset.appId = p; 
      const d = s ? z(m.attrs[s]) : ""; 
      if (d) { f.style.background = we(s, d); f.style.borderColor = Ue(s, d); } 
      let g = ""; 
      d && (g = `<span class="tile-dot" style="background:${D(s, d)}"></span>`); 
      if (t.density === "compact") { 
        const gName = m.name.length > 22 ? m.name.substring(0, 20) + ".." : m.name; 
        f.innerHTML = `${g}<span class="tile-label">${w(gName)}</span>`; 
        group.appendChild(f);
        if (m.supersederNames && m.supersederNames.length > 0) { 
          const firstSuperseder = m.supersederNames[0]; 
          const supId = m.supersederIds[0]; 
          const moreCount = m.supersederNames.length - 1; 
          const arrow = document.createElement("span"); 
          arrow.className = "superseder-arrow"; 
          arrow.innerHTML = "→"; 
          group.appendChild(arrow);
          const supPill = document.createElement("div"); 
          supPill.className = "app-tile superseder-link"; 
          supPill.dataset.appId = supId; 
          supPill.style.background = "var(--soft)"; 
          supPill.style.borderStyle = "dashed"; 
          supPill.style.borderColor = "var(--line)"; 
          supPill.innerHTML = `<span class="tile-label">${w(firstSuperseder)}</span>${moreCount > 0 ? `<span class="superseder-more">+${moreCount}</span>` : ""}`; 
          group.appendChild(supPill);
        } 
      } else { 
        let v = ""; 
        for (let h = 1; h < r.length; h++) { 
          const x = z(m.attrs[r[h]]); 
          if (x) { 
            const k = D(r[h], x), B = r[h].substring(0, 1).toUpperCase(), $ = Ke(r[h]), H = $ ? Jee(x) : ""; 
            v += $ && H ? `<span class="attr-dot attr-icon${H === "🌐" ? " attr-icon-global" : ""}" style="background:${k}" title="${w(r[h])}: ${w(x)}">${H}</span>` : `<span class="attr-dot" style="background:${k}" title="${w(r[h])}: ${w(x)}">${B}</span>`; 
          } 
        } 
        f.innerHTML = `${g}<span class="tile-label">${w(m.name)}</span>${v ? `<span class="attr-dots">${v}</span>` : ""}`; 
        group.appendChild(f);
        if (m.supersederNames && m.supersederNames.length > 0) { 
          const arrow = document.createElement("span"); 
          arrow.className = "superseder-arrow"; 
          arrow.innerHTML = "→"; 
          group.appendChild(arrow);
          const wrapDiv = document.createElement("div");
          wrapDiv.className = "superseder-names";
          m.supersederNames.forEach((name, idx) => { 
            const supId = m.supersederIds[idx]; 
            const supPill = document.createElement("div"); 
            supPill.className = "app-tile superseder-link"; 
            supPill.dataset.appId = supId; 
            supPill.style.background = "var(--soft)"; 
            supPill.style.borderStyle = "dashed"; 
            supPill.style.borderColor = "var(--line)"; 
            supPill.innerHTML = `<span class="tile-label">${w(name)}</span>`; 
            wrapDiv.appendChild(supPill);
          }); 
          group.appendChild(wrapDiv);
        } 
      } 
      i.appendChild(group); 
    } 
    return i; 
  } function it(e, a) { const o = le()[0] || null, i = document.createElement("div"); if (i.className = "heatmap-bar-wrap", !o) return i.innerHTML = `<div class="heatmap-bar"><div class="heatmap-segment" style="width:100%;background:#2563EB"></div></div><span class="heatmap-count">${e.length} apps</span>`, i; const r = new Map; for (const f of e) { const d = a.appById.get(f), g = z(d.attrs[o]) || "Unknown"; r.set(g, (r.get(g) || 0) + 1) } const s = e.length, m = Array.from(r.entries()).sort((f, d) => d[1] - f[1]).map(([f, d]) => { const g = d / s * 100, v = D(o, f === "Unknown" ? "" : f); return `<div class="heatmap-segment" style="width:${g}%;background:${v}" title="${w(f)}: ${d}"></div>` }).join(""); return i.innerHTML = `<div class="heatmap-bar">${m}</div><span class="heatmap-count">${s}</span>`, i } function st() { const e = t.model; if (e) { for (const a of e.l1List) t.collapsedL1s.add(a.id); _() } } function rt() { t.collapsedL1s.clear(), _() } let C = null; function Be() { C && requestAnimationFrame(() => { C.resize(), C.fit(void 0, 30) }) } let se; function ct() { se = document.getElementById("dashboardCanvas") } function Ee() {
    const e = t.model; if (!e || !se) return; const activeAppById = new Map(Array.from(e.appById.entries()).filter(([id]) => e.activeAppIds.has(id))); const a = activeAppById.size, n = e.l1List.length, o = e.l2ById.size, i = e.mappingRows.filter(mr => e.activeAppIds.has(mr.appId)).length, r = o > 0 ? (i / o).toFixed(1) : "0", s = z(e.heading.mainCurrency), p = []; let m = 0, f = 0; for (const [, d] of activeAppById) { const g = et(d.attrs[c.app.costYr]); g != null && (m += g, f++) } for (const d of e.l1List) for (const g of e.l2IdsByL1.get(d.id) || []) (!e.l2ToApps.has(g) || e.l2ToApps.get(g).size === 0 || Array.from(e.l2ToApps.get(g)).every(aid => !e.activeAppIds.has(aid))) && p.push({ l2: e.l2ById.get(g), l1: d }); const v = Array.from(e.appIdsByL2.entries()).map(([d, g]) => ({ l2: e.l2ById.get(d), count: g.filter(aid => e.activeAppIds.has(aid)).length })).sort((d, g) => g.count - d.count).slice(0, 8), h = Array.from(e.appToL2.entries()).filter(([d]) => e.activeAppIds.has(d)).map(([d, g]) => ({ app: e.appById.get(d), count: g.size })).filter(d => d.count > 1).sort((d, g) => g.count - d.count).slice(0, 8), x = Array.from(activeAppById.values()).map(d => ({ app: d, cost: et(d.attrs[c.app.costYr]) })).filter(d => d.cost != null).sort((d, g) => g.cost - d.cost).slice(0, 8), k = [c.app.lifecycle, c.app.roadmap, c.app.hosting, c.app.type, c.app.productCategory, c.app.costYr].filter(d => e.columnsPresent.includes(d)); se.innerHTML = `
    <div class="dash-stats">
      ${Z("Applications", a, "#2563EB")}
      ${Z("Capabilities (L1)", n, "#059669")}
      ${Z("Sub-capabilities (L2)", o, "#0891B2")}
      ${Z("Mappings", i, "#D97706")}
      ${Z("Avg Apps / L2", r, "#6366F1")}
      ${f ? Z("Total Cost / yr", Gt(m, s), "#7C3AED") : ""}
      ${f ? Z("Avg Cost / App", Gt(m / f, s), "#C026D3") : ""}
    </div>

    <div class="dash-grid">
      <div class="dash-charts">
        ${k.map(d => mt({ appById: activeAppById }, d, s)).join("")}
      </div>
      <div class="dash-lists">
        ${$e("Top Capabilities by App Count", v.map(d => ({ label: d.l2?.name || "?", value: d.count, color: "#2563EB" })))}
        ${$e("Most Connected Apps", h.map(d => ({ label: d.app?.name || "?", value: `${d.count} capabilities`, color: "#059669" })))}
        ${$e("Highest Annual Cost", x.map(d => ({ label: d.app?.name || "?", value: Gt(d.cost, z(d.app?.attrs[c.app.currency]) || s), color: "#7C3AED" })))}
        ${p.length ? ft(p) : ""}
      </div>
    </div>
  `} function Z(e, a, n) {
    return `
    <div class="stat-card">
      <div class="stat-value" style="color:${n}">${a}</div>
      <div class="stat-label">${w(e)}</div>
    </div>
  `} function mt(e, a, n) {
    const o = new Map, i = new Map; const _rc = ((window.EA_COLOR_CONFIG || {}).rangeColors || {}); const isRange = _rc[a] && Array.isArray(_rc[a]); for (const [, s] of e.appById) if (isRange) { const p = z(s.attrs[a]), m = Qt(a, p), f = m?.label || "Unknown"; o.set(f, (o.get(f) || 0) + 1), m?.color && i.set(f, m.color) } else { const p = z(s.attrs[a]) || "Unknown"; o.set(p, (o.get(p) || 0) + 1) } let r; if (isRange) { const rangeOrder = _rc[a].map(rng => rng.label); rangeOrder.push("Unknown"); r = rangeOrder.filter(lbl => o.has(lbl)).map(lbl => [lbl, o.get(lbl)]) } else { r = Array.from(o.entries()).sort((s, p) => p[1] - s[1]) } const l = r[0]?.[1] || 1, u = r.slice(0, 10).map(([s, p]) => {
      const m = Math.max(2, p / l * 100), f = isRange ? i.get(s) || D(a, "") : D(a, s === "Unknown" ? "" : s), d = s; return `
      <div class="bar-row">
        <span class="bar-label" title="${w(d)}">${w(d)}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width:${m}%;background:${f}"></div>
        </div>
        <span class="bar-value">${p}</span>
      </div>
    `}).join(""); return `
    <div class="dash-card">
      <div class="dash-card-title">${w(a)} Distribution</div>
      <div class="bar-chart">${u}</div>
      ${r.length > 10 ? `<div class="bar-overflow">+${r.length - 10} more</div>` : ""}
    </div>
  `} function $e(e, a) {
    if (!a.length) return ""; const n = a.map(o => `
    <div class="top-row">
      <span class="top-label">${w(o.label)}</span>
      <span class="top-value" style="color:${o.color}">${o.value}</span>
    </div>
  `).join(""); return `<div class="dash-card"><div class="dash-card-title">${w(e)}</div>${n}</div>`
  } function ft(e) {
    const a = e.slice(0, 10).map(n => `
    <div class="gap-row">
      <span class="gap-l1">${w(n.l1.name)}</span>
      <span class="gap-arrow">></span>
      <span class="gap-l2">${w(n.l2?.name || "?")}</span>
    </div>
  `).join(""); return `
    <div class="dash-card dash-card-warn">
      <div class="dash-card-title">Coverage Gaps (${e.length} L2s with 0 apps)</div>
      ${a}
      ${e.length > 10 ? `<div class="bar-overflow">+${e.length - 10} more</div>` : ""}
    </div>
  `} let T; function ut() { T = document.getElementById("detailsPanel") }
    let _csvDirHandle = null; let _csvState = {};
    function j(e, a, fld) {
      if (!a && !fld) return "";
      if (_csvDirHandle && fld) {
         return `<div class="kv-row"><span class="kv-label">${w(e)}</span><span class="kv-value editable-field" data-field="${w(fld)}">${w(a || "(empty)")}</span></div>`;
      }
      return a ? `<div class="kv-row"><span class="kv-label">${w(e)}</span><span class="kv-value">${w(a)}</span></div>` : "";
    }
    function gt(e, a) { return `<span class="detail-badge" style="border-color:${a};color:${a}">${w(e)}</span>` } 
    function ze() {
    const e = t.model; if (!(!e || !T)) {
      if (t.selected.appId) {
        const a = e.appById.get(t.selected.appId); if (!a) { Me(); return } const n = Array.from(e.appToL2.get(a.id) || []).map(p => { const m = e.l2ById.get(p); return { text: `${e.l1ById.get(m?.l1Id)?.name || ""} > ${m?.name || ""}`, l2Id: p } }).sort((p, m) => p.text.localeCompare(m.text)), o = [c.app.lifecycle, c.app.risk, c.app.roadmap, c.app.hosting, c.app.region, c.app.owner, c.app.type, c.app.productCategory, c.app.superseder, c.app.endDate], i = o.map(p => { const m = z(a.attrs[p]); return j(p, m, p) }).join(""), r = o.slice(0, 3).map(p => { const m = z(a.attrs[p]); return m ? gt(`${p}: ${m}`, D(p, m)) : "" }).join(""), s = n.map(p => `<div class="coverage-path">${w(p.text)}</div>`).join(""), p = z(a.attrs[c.app.comments]), m = z(a.attrs[c.app.costYr]), f = et(m), d = z(a.attrs[c.app.currency]) || e.heading.mainCurrency, x = j("App-ID", a.id, null), g = j(`${c.app.costYr} (Formatted)`, f != null ? Gt(f, d) : "", null), v = j(`${c.app.costYr} (Actual)`, m, c.app.costYr), h = j("Display Currency", d, c.app.currency); T.classList.remove("empty");
        let cmtsHTML = "";
        if (_csvDirHandle) {
          cmtsHTML = `<div class="detail-section"><div class="detail-section-title">Comments</div><div class="detail-comments editable-field" data-field="${w(c.app.comments)}" data-entity-type="app" data-id="${w(a.id)}">${w(p || "(empty)")}</div></div>`;
        } else if (p) {
          cmtsHTML = `<div class="detail-section"><div class="detail-section-title">Comments</div><div class="detail-comments">${w(p)}</div></div>`;
        }
        T.innerHTML = `
      <div class="detail-header" style="justify-content:space-between; align-items:flex-start;">
        <div>
           <h3 class="detail-title">${w(a.name)}</h3>
           ${r ? `<div class="detail-badges">${r}</div>` : ""}
        </div>
        ${_csvDirHandle ? `<button class="delete-entity-btn" data-id="${w(a.id)}" data-type="app" title="Delete Application">&#128465;</button>` : ""}
      </div>
      <div class="detail-section">
        <div class="detail-section-title">Attributes</div>
        <div class="kv-grid">${[x, g, v, h, i].map(html => html ? html.replace('class="kv-value editable-field"', `class="kv-value editable-field" data-entity-type="app" data-id="${w(a.id)}"`) : "").join("") || '<span class="kv-empty">No attributes found.</span>'}</div>
      </div>
      ${cmtsHTML}
      <div class="detail-section">
        <div class="detail-section-title">Capability Coverage (${n.length})</div>
        <div class="coverage-list">${s || '<span class="kv-empty">None</span>'}</div>
        ${_csvDirHandle ? `<button class="manage-mappings-btn" data-id="${w(a.id)}">Manage Mappings</button>` : ""}
      </div>
      ${a.supersederNames && a.supersederNames.length > 0 ? `<div class="detail-section">
        <div class="detail-section-title">Superseded By</div>
        <div class="detail-app-list">
          ${a.supersederNames.map((name, idx) => {
            const supId = a.supersederIds[idx];
            return `<div class="detail-app-chip superseder-chip" data-app-id="${w(supId)}">${w(name)}</div>`;
          }).join('')}
        </div>
      </div>` : ""}
      ${(() => {
        const supersededApps = e.supersededByApp.get(a.id);
        if (supersededApps && supersededApps.size > 0) {
          const supersededList = Array.from(supersededApps)
            .map(appId => {
              const supersededApp = e.appById.get(appId);
              return supersededApp ? { id: appId, name: supersededApp.name } : null;
            })
            .filter(Boolean)
            .sort((x, y) => x.name.localeCompare(y.name));
          return `<div class="detail-section">
            <div class="detail-section-title">Supersedes</div>
            <div class="detail-app-list">
              ${supersededList.map(item => `<div class="detail-app-chip superseded-chip" data-app-id="${w(item.id)}">${w(item.name)}</div>`).join('')}
            </div>
          </div>`;
        }
        return "";
      })()}
    `; 
    if (_csvDirHandle) bindCSVDetailsEvents(a, "app");
    T.querySelectorAll(".superseder-chip, .superseded-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const targetAppId = chip.dataset.appId;
        if (targetAppId) {
          t.selected.appId = targetAppId;
          V("selection-changed");
          setTimeout(() => yt(), 100);
        }
      });
    });
    return
      } if (t.selected.l2Id) {
        const a = e.l2ById.get(t.selected.l2Id), n = e.appIdsByL2.get(t.selected.l2Id) || []; T.classList.remove("empty");
        
        let descHtml = j("Description", a?.desc, c.l2.desc);
        let ownerHtml = j("Owner", a?.owner, c.l2.owner);
        if (_csvDirHandle) {
           descHtml = descHtml.replace('class="kv-value editable-field"', `class="kv-value editable-field" data-entity-type="l2" data-id="${w(a.id)}" data-internal-prop="desc"`);
           ownerHtml = ownerHtml.replace('class="kv-value editable-field"', `class="kv-value editable-field" data-entity-type="l2" data-id="${w(a.id)}" data-internal-prop="owner"`);
        }
        
        T.innerHTML = `
      <div class="detail-header" style="justify-content:space-between; align-items:flex-start;">
        <h3 class="detail-title">${w(a?.name || "")}</h3>
        ${_csvDirHandle ? `<button class="delete-entity-btn" data-id="${w(a.id)}" data-type="l2" title="Delete L2 Capability">&#128465;</button>` : ""}
      </div>
      <div class="detail-section">
        <div class="kv-grid">
          ${descHtml}
          ${ownerHtml}
          ${j("Applications", String(n.length), null)}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-title">Mapped Applications</div>
        <div class="detail-app-list">
          ${n.map(o => `<span class="detail-app-chip">${w(e.appById.get(o)?.name || o)}</span>`).join("")}
        </div>
      </div>
    `; 
    if (_csvDirHandle) bindCSVDetailsEvents(a, "l2");
    return
      } if (t.selected.l1Id) {
        const a = e.l1ById.get(t.selected.l1Id), n = e.l2IdsByL1.get(t.selected.l1Id) || [], o = new Set; for (const i of n) for (const r of e.l2ToApps.get(i) || []) o.add(r); T.classList.remove("empty");
        
        let descHtml = j("Description", a?.desc, c.l1.desc);
        let ownerHtml = j("Owner", a?.owner, c.l1.owner);
        if (_csvDirHandle) {
           descHtml = descHtml.replace('class="kv-value editable-field"', `class="kv-value editable-field" data-entity-type="l1" data-id="${w(a.id)}" data-internal-prop="desc"`);
           ownerHtml = ownerHtml.replace('class="kv-value editable-field"', `class="kv-value editable-field" data-entity-type="l1" data-id="${w(a.id)}" data-internal-prop="owner"`);
        }
        
        T.innerHTML = `
      <div class="detail-header" style="justify-content:space-between; align-items:flex-start;">
         <h3 class="detail-title">${w(a?.name || "")}</h3>
         ${_csvDirHandle ? `<button class="delete-entity-btn" data-id="${w(a.id)}" data-type="l1" title="Delete L1 Capability">&#128465;</button>` : ""}
      </div>
      <div class="detail-section">
        <div class="kv-grid">
          ${descHtml}
          ${ownerHtml}
          ${j("Sub-capabilities", String(n.length), null)}
          ${j("Total Applications", String(o.size), null)}
        </div>
      </div>
    `; 
    if (_csvDirHandle) bindCSVDetailsEvents(a, "l1");
    return
      } Me()
    }
  } function Me() { T && (T.classList.add("empty"), T.innerHTML = '<div class="detail-empty-msg">Select an app or capability to see details.</div>') } const l = { colorBy1: document.getElementById("colorBy1"), colorBy2: document.getElementById("colorBy2"), colorBy3: document.getElementById("colorBy3"), viewMode: document.getElementById("viewMode"), mapLayout: document.getElementById("mapLayout"), density: document.getElementById("density"), blockWidth: document.getElementById("blockWidth"), searchInput: document.getElementById("searchInput"), clearSearchBtn: document.getElementById("clearSearchBtn"), resetBtn: document.getElementById("resetBtn"), printBtn: document.getElementById("printBtn"), layout: document.querySelector(".layout"), navToggle: document.getElementById("navToggle"), detailsToggle: document.getElementById("detailsToggle"), filterContainer: document.getElementById("filterContainer"), legendItems: document.getElementById("legendItems"), legendTitle: document.getElementById("legendTitle"), emptyState: document.getElementById("emptyState"), mapView: document.getElementById("mapView"), dashboardView: document.getElementById("dashboardView"), mapCanvas: document.getElementById("mapCanvas"), statusText: document.getElementById("statusText"), headerTitle: document.getElementById("headerTitle"), headerDesc: document.getElementById("headerDesc"), headerCompany: document.getElementById("headerCompany"), mapHeaderTitle: document.getElementById("mapHeaderTitle"), mapHeaderDesc: document.getElementById("mapHeaderDesc"), mapHeaderCompany: document.getElementById("mapHeaderCompany"), zoomIn: document.getElementById("zoomInBtn"), zoomOut: document.getElementById("zoomOutBtn"), zoomReset: document.getElementById("zoomResetBtn"), zoomLevel: document.getElementById("zoomLevel"), fitScreen: document.getElementById("fitScreenBtn"), focusBtn: document.getElementById("focusModeBtn"), collapseAllBtn: document.getElementById("collapseAllBtn"), expandAllBtn: document.getElementById("expandAllBtn"), searchCount: document.getElementById("searchCount"), minimapContainer: document.getElementById("minimapContainer"), minimapCanvas: document.getElementById("minimapCanvas"), minimapToggleBtn: document.getElementById("minimapToggleBtn"), fileIndicator: document.getElementById("fileIndicator"), dataVersion: document.getElementById("dataVersion"), openFolderBtnWrap: document.getElementById("openFolderBtnWrap"), openFolderBtn: document.getElementById("openFolderBtn"), csvToolbar: document.getElementById("csvToolbar"), refreshDataBtn: document.getElementById("refreshDataBtn"), autoRefreshCb: document.getElementById("autoRefreshCb"), addEntityModal: document.getElementById("addEntityModal"), addEntityBtn: document.getElementById("addEntityBtn"), addEntityTitle: document.getElementById("addEntityTitle"), addEntityType: document.getElementById("addEntityType"), addEntityId: document.getElementById("addEntityId"), addEntityName: document.getElementById("addEntityName"), addEntityL1Wrap: document.getElementById("addEntityL1Wrap"), addEntityParentL1: document.getElementById("addEntityParentL1"), addEntitySaveBtn: document.getElementById("addEntitySaveBtn"), addEntityAppFieldsWrap: document.getElementById("addEntityAppFieldsWrap"), addEntityAppType: document.getElementById("addEntityAppType"), addEntityAppTypeOther: document.getElementById("addEntityAppTypeOther"), addEntityLifecycle: document.getElementById("addEntityLifecycle"), addEntityLifecycleOther: document.getElementById("addEntityLifecycleOther"), addEntityRisk: document.getElementById("addEntityRisk"), addEntityRiskOther: document.getElementById("addEntityRiskOther"), addEntityRoadmap: document.getElementById("addEntityRoadmap"), addEntityRoadmapOther: document.getElementById("addEntityRoadmapOther"), addEntityHosting: document.getElementById("addEntityHosting"), addEntityHostingOther: document.getElementById("addEntityHostingOther"), addEntityRegion: document.getElementById("addEntityRegion"), addEntityRegionOther: document.getElementById("addEntityRegionOther"), addEntityProductCategory: document.getElementById("addEntityProductCategory"), addEntityProductCategoryOther: document.getElementById("addEntityProductCategoryOther"), manageMappingsModal: document.getElementById("manageMappingsModal"), manageMappingsDesc: document.getElementById("manageMappingsDesc"), manageMappingsSearch: document.getElementById("manageMappingsSearch"), manageMappingsList: document.getElementById("manageMappingsList"), manageMappingsSaveBtn: document.getElementById("manageMappingsSaveBtn") }; function q(e) { l.statusText.textContent = e } Re(), Ze(), _initMapCanvas(), ct(), ut(); function ee(e) { t.viewMode = e, document.body.className = `view-${e}`, l.mapView.classList.toggle("hidden", e !== "map"), l.dashboardView.classList.toggle("hidden", e !== "dashboard"), e === "dashboard" && Ee() } function W() { G(), _(), ze(), Ae(), De(), t.viewMode === "dashboard" && Ee(), setTimeout(() => J(), 100) } function Ae() {
    if (!l.legendItems || !t.model) { l.legendItems && (l.legendItems.innerHTML = '<span class="legend-empty">Load data to show legend.</span>'); return } const e = t.colorBy.filter(i => i && i !== "(None)"); if (!e.length) { l.legendTitle.textContent = "Legend", l.legendItems.innerHTML = '<span class="legend-empty">Select an attribute to color by.</span>'; return } l.legendTitle.textContent = `Legend: ${e.join(", ")}`; const a = t.model, n = K(a, t.filters, t.search, t.selected, true); let o = ""; for (const i of e) {
      const _rc2 = ((window.EA_COLOR_CONFIG || {}).rangeColors || {}); if (_rc2[i] && Array.isArray(_rc2[i])) {
        o += `<span class="legend-field-label">${w(i)}:</span>`; for (const rng of _rc2[i]) {
          o += `
        <span class="legend-item">
          <span class="legend-swatch" style="background:${rng.color}"></span>
          ${w(rng.label)}
        </span>
      ` } o += `
        <span class="legend-item">
          <span class="legend-swatch" style="background:${qe}"></span>
          Unknown
        </span>
      ` } else {
        const r = [...new Set(n.rows.map(p => { const m = a.appById.get(p.appId); return m ? (m.attrs[i] || "").toString().trim() : "" }).filter(Boolean))].sort(), s = r.slice(0, 12); s.length && (o += `<span class="legend-field-label">${w(i)}:</span>`, o += s.map(p => { const m = Ke(i), f = m ? Jee(p) : ""; return `
        <span class="legend-item">
          <span class="legend-swatch${m && f ? " legend-icon" : ""}${f === "🌐" ? " legend-icon-global" : ""}" style="background:${D(i, p)}">${m && f ? f : ""}</span>
          ${w(p)}
        </span>
      ` }).join(""), r.length > 12 && (o += `<span class="legend-more">+${r.length - 12} more</span>`))
      }
    } l.legendItems.innerHTML = o || '<span class="legend-empty">No values in current view.</span>'
  } function re() {
    l.filterContainer.innerHTML = "";
    const e = t.model;

    function addMultiSelect(label, field, values) {
      const row = document.createElement("div");
      row.className = "filter-row";
      const fieldLabel = document.createElement("label");
      fieldLabel.textContent = label;
      const dropdown = document.createElement("details");
      dropdown.className = "multi-filter";
      const summary = document.createElement("summary");
      const menu = document.createElement("div");
      menu.className = "multi-filter-menu";
      const current = t.filters[field];
      const selected = new Set(Array.isArray(current) ? current : (current ? [current] : []));

      function updateSummary() {
        if (!selected.size) summary.textContent = "All";
        else if (selected.size <= 2) summary.textContent = Array.from(selected).join(", ");
        else summary.textContent = `${selected.size} selected`;
        summary.title = selected.size ? Array.from(selected).join(", ") : "All values";
      }

      const allOption = document.createElement("label");
      allOption.className = "multi-filter-option multi-filter-all";
      const allCheckbox = document.createElement("input");
      allCheckbox.type = "checkbox";
      allCheckbox.checked = selected.size === 0;
      allOption.append(allCheckbox, document.createTextNode("All"));
      menu.appendChild(allOption);

      const valueCheckboxes = [];
      for (const value of values) {
        const option = document.createElement("label");
        option.className = "multi-filter-option";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = value;
        checkbox.checked = selected.has(value);
        option.append(checkbox, document.createTextNode(value));
        menu.appendChild(option);
        valueCheckboxes.push(checkbox);
        checkbox.addEventListener("change", () => {
          checkbox.checked ? selected.add(value) : selected.delete(value);
          allCheckbox.checked = selected.size === 0;
          if (selected.size) t.filters[field] = Array.from(selected);
          else delete t.filters[field];
          updateSummary();
          t.selected.appId = null;
          V("filters-changed");
        });
      }

      allCheckbox.addEventListener("change", () => {
        selected.clear();
        valueCheckboxes.forEach(checkbox => { checkbox.checked = false; });
        allCheckbox.checked = true;
        delete t.filters[field];
        updateSummary();
        t.selected.appId = null;
        V("filters-changed");
      });

      updateSummary();
      dropdown.append(summary, menu);
      row.append(fieldLabel, dropdown);
      l.filterContainer.appendChild(row);
    }

    if (e?.filterFields?.length) {
      for (const field of e.filterFields) addMultiSelect(field, field, e.filterValues[field]);
    }
    addMultiSelect("Has Superseder", "_hasSuperseder", ["yes", "no"]);
  } function Te() { const e = t.model; e && ([l.colorBy1, l.colorBy2, l.colorBy3].forEach(a => { a.innerHTML = ""; for (const n of e.colorFields) { const o = document.createElement("option"); o.value = n, o.textContent = n, a.appendChild(o) } }), t.colorBy[0] || (t.colorBy[0] = e.colorFields.includes(c.app.lifecycle) ? c.app.lifecycle : "(None)"), t.colorBy[1] || (t.colorBy[1] = e.colorFields.includes(c.app.roadmap) ? c.app.roadmap : "(None)"), t.colorBy[2] || (t.colorBy[2] = "(None)"), l.colorBy1.value = t.colorBy[0], l.colorBy2.value = t.colorBy[1], l.colorBy3.value = t.colorBy[2]) } function Se() { const e = t.model?.heading || {}, a = t.model?.canvasHeading || {}; l.headerTitle.textContent = e.title || "Enterprise Architecture Landscape", l.headerDesc.textContent = e.description || "Capability Map + Relationship View", l.headerCompany.textContent = e.companyName || "", l.mapHeaderTitle.textContent = a.title || "Capability Map", l.mapHeaderDesc.textContent = a.description || "", l.mapHeaderCompany.textContent = a.companyName || "" } function De() { if (!l.searchCount || !t.model) { l.searchCount && (l.searchCount.textContent = ""); return } if (!t.search && !Object.values(t.filters).some(Boolean)) { l.searchCount.textContent = ""; return } const e = K(t.model, t.filters, t.search, t.selected), a = new Set(e.rows.map(n => n.appId)).size; l.searchCount.textContent = `${a} of ${t.model.appById.size}` } function N() { l.mapCanvas.style.transform = `scale(${t.zoom})`, l.zoomLevel.textContent = `${Math.round(t.zoom * 100)}%`, O("ea-zoom", t.zoom), J() } function He(e) { e === "nav" ? (t.navCollapsed = !t.navCollapsed, l.layout.classList.toggle("nav-collapsed", t.navCollapsed), O("ea-nav-collapsed", t.navCollapsed ? "1" : "0")) : (t.detailsCollapsed = !t.detailsCollapsed, l.layout.classList.toggle("details-collapsed", t.detailsCollapsed), O("ea-details-collapsed", t.detailsCollapsed ? "1" : "0")), Be() }

  async function loadCSVDir(dirHandle) {
    q("Loading CSVs...");
    try {
      const { modelData, fileState } = await window.EACSVStore.readAllCSVs(dirHandle);
      t.model = Ve(modelData);
      t.model.l1Rows = modelData.l1Rows;
      t.model.l2Rows = modelData.l2Rows;
      t.model.appRows = modelData.appRows;
      t.model.mapRows = modelData.mapRows;
      t.model.headingRows = modelData.headingRows;
      t.model.canvasHeadingRows = modelData.canvasHeadingRows;

      _csvDirHandle = dirHandle;
      _csvState = fileState;
      l.csvToolbar.classList.remove("hidden");
      l.autoRefreshCb.checked = false;

      // Reset UI state
      t.selected = { l1Id: null, l2Id: null, appId: null };
      t.filters = {};

      const a = t.model.appById.size; 
      if (a > 150 || a > 50 ? t.density = "compact" : t.density = "expanded", l.density.value = t.density, t.model.l1List.length > 8) t.treeExpandedL1s.clear(); else for (const o of t.model.l1List) t.treeExpandedL1s.add(o.id); 
      
      Te(); re(); Se(); W(); 
      l.emptyState && l.emptyState.remove(); 
      l.mapView.classList.remove("hidden"); 
      ee(t.viewMode);
      
      const n = t.model.invalidMappings ? `Loaded Folder (${t.model.invalidMappings} invalid mappings ignored).` : `Loaded Folder -- ${a} apps.`; 
      q(n);
      l.fileIndicator.textContent = `${dirHandle.name} (Live)`;
      l.dataVersion.textContent = t.model.canvasHeading?.version || "";
    } catch (e) {
      console.error(e);
      q(`CSV Error: ${e.message}`);
      alert(e.message);
    }
  }

  window.addEventListener("data-version-updated", event => {
    const detail = event.detail || {};
    if (l.dataVersion) l.dataVersion.textContent = detail.version || "";
    if (t.model && detail.rows) {
      t.model.canvasHeadingRows = detail.rows;
      t.model.canvasHeading.version = detail.version || "";
    }
    if (_csvState && detail.lastModified) _csvState["canvas_heading.csv"] = detail.lastModified;
  });

  ve("selection-changed", () => { G(), _(), ze(), Ae(), De(), yt(), window.dispatchEvent(new Event("inventory-refresh")) }), ve("filters-changed", () => { W(), window.dispatchEvent(new Event("inventory-refresh")) }), [l.colorBy1, l.colorBy2, l.colorBy3].forEach((e, a) => { e.addEventListener("change", () => { t.colorBy[a] = e.value, W() }) }), l.viewMode.addEventListener("change", () => ee(l.viewMode.value)), l.mapLayout.addEventListener("change", () => { t.mapLayout = l.mapLayout.value, O("ea-map-layout", t.mapLayout), _() }), l.density.addEventListener("change", () => { t.density = l.density.value, O("ea-density", t.density), _() }), l.blockWidth.addEventListener("change", () => { t.blockWidth = parseInt(l.blockWidth.value), O("ea-block-width", t.blockWidth), _() }); const ht = he(() => { t.search = l.searchInput.value.trim(), t.selected.appId = null, W(), window.dispatchEvent(new Event("inventory-refresh")) }, 200); l.searchInput.addEventListener("input", ht), l.clearSearchBtn.addEventListener("click", () => { l.searchInput.value = "", t.search = "", t.selected.appId = null, W() }), l.resetBtn.addEventListener("click", () => { t.model && (t.selected = { l1Id: null, l2Id: null, appId: null }, t.search = "", t.filters = {}, t.collapsedL1s.clear(), l.searchInput.value = "", re(), W(), q("Reset.")) }), l.printBtn.addEventListener("click", () => { window.print() }), l.navToggle.addEventListener("click", () => He("nav")), l.detailsToggle.addEventListener("click", () => He("details")), l.zoomIn.addEventListener("click", () => { t.zoom = Math.min(3, t.zoom + .1), N() }), l.zoomOut.addEventListener("click", () => { t.zoom = Math.max(.25, t.zoom - .1), N() }), l.zoomReset.addEventListener("click", () => { t.zoom = 1, N() }), l.fitScreen.addEventListener("click", () => { if (!l.mapCanvas.scrollWidth) return; const e = l.mapCanvas.parentElement.clientWidth, a = l.mapCanvas.parentElement.clientHeight, n = l.mapCanvas.scrollWidth, o = l.mapCanvas.scrollHeight; t.zoom = Math.max(.25, Math.min(1, Math.min(e / n, a / o) * .95)), N() }), l.focusBtn.addEventListener("click", () => { t.focusMode = !t.focusMode, t.focusMode ? (t.navCollapsed = !0, t.detailsCollapsed = !0) : (t.navCollapsed = !1, t.detailsCollapsed = !1), l.layout.classList.toggle("nav-collapsed", t.navCollapsed), l.layout.classList.toggle("details-collapsed", t.detailsCollapsed), l.layout.classList.toggle("focus-mode", t.focusMode), l.focusBtn.querySelector(".focus-text").textContent = t.focusMode ? "Exit Focus" : "Focus", Be() }), l.collapseAllBtn.addEventListener("click", () => { st(), Qe() }), l.expandAllBtn.addEventListener("click", () => { rt(), Je() }), l.mapCanvas.addEventListener("wheel", e => { (e.ctrlKey || e.metaKey) && (e.preventDefault(), t.zoom = Math.max(.25, Math.min(3, t.zoom + (e.deltaY > 0 ? -.1 : .1))), N()) }, { passive: !1 }); let E = { active: !1, startX: 0, startY: 0, scrollL: 0, scrollT: 0, spaceDown: !1 }; function Y() { return l.mapCanvas.parentElement } l.mapCanvas.addEventListener("mousedown", e => { if (!e.target.closest(".app-tile, .l1-collapse-btn, button, a, select, input") && (E.spaceDown || e.button === 1)) { e.preventDefault(); const a = Y(); E.active = !0, E.startX = e.clientX, E.startY = e.clientY, E.scrollL = a.scrollLeft, E.scrollT = a.scrollTop, l.mapCanvas.classList.add("panning"), l.mapCanvas.classList.remove("pan-ready") } }), document.addEventListener("mousemove", e => { if (!E.active) return; e.preventDefault(); const a = Y(); a.scrollLeft = E.scrollL - (e.clientX - E.startX), a.scrollTop = E.scrollT - (e.clientY - E.startY) }), document.addEventListener("mouseup", () => { E.active && (E.active = !1, l.mapCanvas.classList.remove("panning"), E.spaceDown && l.mapCanvas.classList.add("pan-ready"), J()) }), document.addEventListener("keydown", e => { e.key === " " && !e.target.closest("input, select, textarea") && t.viewMode === "map" && (e.preventDefault(), E.spaceDown = !0, E.active || l.mapCanvas.classList.add("pan-ready")); const a = e.ctrlKey || e.metaKey; a && (e.key === "=" || e.key === "+") ? (e.preventDefault(), t.zoom = Math.min(3, t.zoom + .1), N()) : a && e.key === "-" ? (e.preventDefault(), t.zoom = Math.max(.25, t.zoom - .1), N()) : a && e.key === "0" ? (e.preventDefault(), t.zoom = 1, N()) : e.key === "Escape" && t.focusMode && l.focusBtn.click() }), document.addEventListener("keyup", e => { e.key === " " && (E.spaceDown = !1, l.mapCanvas.classList.remove("pan-ready")) }), t.navCollapsed && l.layout.classList.add("nav-collapsed"), t.detailsCollapsed && l.layout.classList.add("details-collapsed"), l.mapLayout.value = t.mapLayout, l.density.value = t.density, l.blockWidth.value = String(t.blockWidth), N(); let P = { active: !1, offsetX: 0, offsetY: 0 }; function J() { if (!l.minimapCanvas || !t.model || l.minimapContainer.classList.contains("collapsed")) return; const e = Y(), a = l.mapCanvas.scrollWidth * t.zoom, n = l.mapCanvas.scrollHeight * t.zoom; if (!a || !n) return; const o = l.minimapCanvas.clientWidth || 204, i = o / a, r = Math.max(40, Math.min(160, n * i)); l.minimapCanvas.style.height = `${r}px`; const s = l.mapCanvas.querySelectorAll(".l1-block"); let p = ""; for (const v of s) { const h = v.offsetLeft * t.zoom * i, x = v.offsetTop * t.zoom * i, k = v.offsetWidth * t.zoom * i, B = v.offsetHeight * t.zoom * i; p += `<div class="minimap-block" style="left:${h}px;top:${x}px;width:${k}px;height:${B}px"></div>` } const m = e.scrollLeft * i, f = e.scrollTop * i, d = Math.min(o, e.clientWidth * i), g = Math.min(r, e.clientHeight * i); p += `<div class="minimap-viewport" id="minimapViewport" style="left:${m}px;top:${f}px;width:${d}px;height:${g}px"></div>`, l.minimapCanvas.innerHTML = p } Y().addEventListener("scroll", he(() => J(), 50)), l.minimapCanvas.addEventListener("mousedown", e => { const a = e.target.closest(".minimap-viewport"); if (a) { l.minimapCanvas.getBoundingClientRect(), P.active = !0, P.offsetX = e.clientX - a.getBoundingClientRect().left, P.offsetY = e.clientY - a.getBoundingClientRect().top; return } xt(e) }), document.addEventListener("mousemove", e => { if (!P.active) return; e.preventDefault(); const a = l.minimapCanvas.getBoundingClientRect(), n = l.minimapCanvas.clientWidth, o = l.mapCanvas.scrollWidth * t.zoom, i = n / o, r = Y(), s = e.clientX - a.left - P.offsetX, p = e.clientY - a.top - P.offsetY; r.scrollLeft = s / i, r.scrollTop = p / i }), document.addEventListener("mouseup", () => { P.active = !1 }); function xt(e) { const a = l.minimapCanvas.getBoundingClientRect(), n = l.minimapCanvas.clientWidth, o = l.mapCanvas.scrollWidth * t.zoom, i = n / o, r = Y(), s = e.clientX - a.left, p = e.clientY - a.top; r.scrollLeft = s / i - r.clientWidth / 2, r.scrollTop = p / i - r.clientHeight / 2 } l.minimapToggleBtn.addEventListener("click", () => { const e = l.minimapContainer.classList.toggle("collapsed"); l.minimapToggleBtn.innerHTML = e ? "&#9650;" : "&#9660;", O("ea-minimap-collapsed", e ? "1" : "0"), e || J() }), t.minimapCollapsed && (l.minimapContainer.classList.add("collapsed"), l.minimapToggleBtn.innerHTML = "&#9650;"); function yt() { if (t.viewMode !== "map" || !t.model) return; let e = null; if (t.selected.l2Id) { e = l.mapCanvas.querySelector(".l2-row .l2-name"); const a = t.model.l2ById.get(t.selected.l2Id)?.name; if (a) { const n = l.mapCanvas.querySelectorAll(".l2-name"); for (const o of n) if (o.textContent.trim() === a) { e = o.closest(".l2-row"); break } } } else if (t.selected.l1Id) { const a = t.model.l1ById.get(t.selected.l1Id)?.name; if (a) { const n = l.mapCanvas.querySelectorAll(".l1-name"); for (const o of n) if (o.textContent.trim() === a) { e = o.closest(".l1-block"); break } } } e && e.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }) }
  
  if (window.EACSVStore && window.EACSVStore.isFileSystemAccessSupported()) {
    l.openFolderBtnWrap.style.display = "";
    l.openFolderBtn.addEventListener("click", async () => {
      try {
        const dir = await window.EACSVStore.openDataFolder();
        await loadCSVDir(dir);
      } catch (err) {
        if (err.name !== 'AbortError') alert("Failed to open folder: " + err.message);
      }
    });

    l.refreshDataBtn.addEventListener("click", () => {
      if (_csvDirHandle) {
        l.refreshDataBtn.textContent = "↻...";
        loadCSVDir(_csvDirHandle).finally(() => l.refreshDataBtn.textContent = "↻ Reload");
      }
    });

    l.autoRefreshCb.addEventListener("change", () => {
      if (l.autoRefreshCb.checked) {
        window.EACSVStore.watchForChanges(_csvDirHandle, _csvState, () => {
           // On Change:
           if (_csvDirHandle && !document.querySelector(".kv-value-input, .detail-comments-input")) {
              loadCSVDir(_csvDirHandle);
           } else if (document.querySelector(".kv-value-input, .detail-comments-input")) {
              q("External change detected, will reload after edit concludes.");
              // Simplistic auto-reload deferral: uncheck auto refresh
              l.autoRefreshCb.checked = false;
              window.EACSVStore.stopWatching();
           }
        });
      } else {
        window.EACSVStore.stopWatching();
      }
    });
  }

  setupCRUDModals();
  q("Ready. Open a Data Folder to begin.");


// Helper to keep raw rows intact in model
function refreshModelRows() {
   const rm = t.model;
   t.model = Ve(rm);
   t.model.l1Rows = rm.l1Rows;
   t.model.l2Rows = rm.l2Rows;
   t.model.appRows = rm.appRows;
   t.model.mapRows = rm.mapRows;
   t.model.headingRows = rm.headingRows;
   t.model.canvasHeadingRows = rm.canvasHeadingRows;
}

// CRUD functions (inside IIFE scope)
const LOV_INLINE_FIELDS = [c.app.type, c.app.lifecycle, c.app.risk, c.app.roadmap, c.app.hosting, c.app.region, c.app.productCategory];

function bindCSVDetailsEvents(entity, type) {
  // bind inline edit
  T.querySelectorAll(".editable-field").forEach(el => {
    el.addEventListener("click", function() {
      if (this.querySelector("input") || this.querySelector("textarea") || this.querySelector("select")) return;
      const fieldName = this.dataset.field;
      const internalProp = this.dataset.internalProp;
      const currentVal = internalProp ? (entity[internalProp] || "") : (entity.attrs[fieldName] || "");
      const isLov = type === "app" && !internalProp && window._eaLov && LOV_INLINE_FIELDS.includes(fieldName);
      const isTextArea = fieldName === c.app.comments;
      const isDate = type === "app" && !internalProp && fieldName === c.app.endDate;

      const doSave = async (newVal) => {
         if (newVal !== currentVal) {
            try {
              let rowsToUpdate, filename;
              if (type === "app") {
                entity.attrs[fieldName] = newVal;
                rowsToUpdate = t.model.appRows;
                filename = "applications.csv";
                const row = rowsToUpdate.find(r => r[c.app.id] === entity.id);
                if (row) row[fieldName] = newVal;
              } else if (type === "l1") {
                entity[internalProp] = newVal;
                rowsToUpdate = t.model.l1Rows;
                filename = "capabilities_l1.csv";
                const row = rowsToUpdate.find(r => r[c.l1.id] === entity.id);
                if (row) row[fieldName] = newVal;
              } else if (type === "l2") {
                entity[internalProp] = newVal;
                rowsToUpdate = t.model.l2Rows;
                filename = "capabilities_l2.csv";
                const row = rowsToUpdate.find(r => r[c.l2.id] === entity.id);
                if (row) row[fieldName] = newVal;
              }
              const newTime = await window.EACSVStore.writeCSV(_csvDirHandle, filename, rowsToUpdate);
              _csvState[filename] = newTime;
              const dt = window.EACSVStore.serializeCSV(rowsToUpdate);
              if (type === "app") t.model.appRows = window.EACSVStore.parseCSV(dt);
              if (type === "l1") t.model.l1Rows = window.EACSVStore.parseCSV(dt);
              if (type === "l2") t.model.l2Rows = window.EACSVStore.parseCSV(dt);
              refreshModelRows();
              W(); // rerender
              setTimeout(() => {
                  const tgt = T.querySelector(`[data-field="${w(fieldName)}"]`);
                  if (tgt) { tgt.classList.add("save-success"); setTimeout(()=>tgt.classList.remove("save-success"), 1000); }
              }, 50);
            } catch(err) {
              alert("Save failed: " + err.message);
              ze();
            }
         } else { ze(); }
      };

      if (isLov) {
        const select = document.createElement("select");
        select.className = "kv-value-input";
        select.innerHTML = window._eaLov.optionsHTML(fieldName, currentVal);
        const otherInput = document.createElement("input");
        otherInput.type = "text";
        otherInput.className = "kv-value-input lov-other-input hidden";
        otherInput.value = window._eaLov.isOther(fieldName, currentVal) ? currentVal : "";
        this.innerHTML = "";
        this.appendChild(select);
        this.appendChild(otherInput);
        window._eaLov.bindOtherToggle(select, otherInput);
        select.focus();
        select.addEventListener("change", () => {
          if (select.value === window._eaLov.OTHER_VALUE) return;
          doSave(window._eaLov.readValue(select, otherInput));
        });
        select.addEventListener("keydown", e => { if (e.key === "Escape") ze(); });
        otherInput.addEventListener("blur", () => doSave(window._eaLov.readValue(select, otherInput)));
        otherInput.addEventListener("keydown", e => {
          if (e.key === "Enter") otherInput.blur();
          if (e.key === "Escape") ze();
        });
        return;
      }

      if (isDate && window.Pikaday) {
        const parseDMY = (str) => {
          const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((str || "").trim());
          if (!m) return null;
          const dd = parseInt(m[1], 10), mm = parseInt(m[2], 10) - 1, yyyy = parseInt(m[3], 10);
          const d = new Date(yyyy, mm, dd);
          return (d.getFullYear() === yyyy && d.getMonth() === mm && d.getDate() === dd) ? d : null;
        };
        const formatDMY = (date) => {
          const dd = String(date.getDate()).padStart(2, "0");
          const mm = String(date.getMonth() + 1).padStart(2, "0");
          return `${dd}/${mm}/${date.getFullYear()}`;
        };
        const dateInput = document.createElement("input");
        dateInput.type = "text";
        dateInput.className = "kv-value-input";
        dateInput.placeholder = "dd/mm/yyyy";
        dateInput.autocomplete = "off";
        this.innerHTML = "";
        this.appendChild(dateInput);

        let picker, saved = false;
        const finishSave = (val) => {
          if (saved) return;
          saved = true;
          if (picker) { picker.destroy(); picker = null; }
          doSave(val);
        };

        picker = new Pikaday({
          field: dateInput,
          format: "DD/MM/YYYY",
          toString: (date) => formatDMY(date),
          parse: (str) => parseDMY(str),
          onSelect: function() { finishSave(formatDMY(this.getDate())); }
        });
        picker.setDate(parseDMY(currentVal), true);
        dateInput.focus();
        picker.show();
        dateInput.addEventListener("blur", () => {
          setTimeout(() => finishSave(dateInput.value), 150);
        });
        dateInput.addEventListener("keydown", e => {
          if (e.key === "Enter") dateInput.blur();
          if (e.key === "Escape") { saved = true; if (picker) { picker.destroy(); picker = null; } ze(); }
        });
        return;
      }

      const input = document.createElement(isTextArea ? "textarea" : "input");
      input.className = isTextArea ? "detail-comments-input" : "kv-value-input";
      input.value = currentVal;
      this.innerHTML = "";
      this.appendChild(input);
      input.focus();
      input.addEventListener("blur", () => doSave(input.value));
      input.addEventListener("keydown", e => {
         if (e.key === "Enter" && !isTextArea) input.blur();
         if (e.key === "Escape") ze();
      });
    });
  });

  // bind delete
  const delBtn = T.querySelector(".delete-entity-btn");
  if (delBtn) {
    delBtn.addEventListener("click", async () => {
      if (!confirm(`Are you sure you want to delete this ${type.toUpperCase()}? This action cannot be undone.`)) return;
      try {
        if (type === "app") {
          t.model.appRows = t.model.appRows.filter(r => r[c.app.id] !== entity.id);
          t.model.mapRows = t.model.mapRows.filter(r => r[c.map.appId] !== entity.id);
          _csvState["applications.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "applications.csv", t.model.appRows);
          _csvState["app_capability_map.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "app_capability_map.csv", t.model.mapRows);
        } else if (type === "l2") {
          t.model.l2Rows = t.model.l2Rows.filter(r => r[c.l2.id] !== entity.id);
          t.model.mapRows = t.model.mapRows.filter(r => r[c.map.l2Id] !== entity.id);
          _csvState["capabilities_l2.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "capabilities_l2.csv", t.model.l2Rows);
          _csvState["app_capability_map.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "app_capability_map.csv", t.model.mapRows);
        } else if (type === "l1") {
          const l2Ids = Array.from(t.model.l2IdsByL1.get(entity.id) || []);
          if (l2Ids.length > 0) { alert("Warning: This L1 has child L2s! They will be orphaned."); }
          t.model.l1Rows = t.model.l1Rows.filter(r => r[c.l1.id] !== entity.id);
          _csvState["capabilities_l1.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "capabilities_l1.csv", t.model.l1Rows);
        }
        refreshModelRows();
        t.selected = { l1Id: null, l2Id: null, appId: null };
        W();
      } catch (e) { alert("Delete failed: " + e.message); }
    });
  }

  // bind manage mappings
  const mapBtn = T.querySelector(".manage-mappings-btn");
  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      openManageMappingsModal(entity);
    });
  }
}

function openManageMappingsModal(appEntity) {
  l.manageMappingsDesc.textContent = `Mappings for: ${appEntity.name}`;
  const allL2s = Array.from(t.model.l2ById.values()).sort((a,b) => a.name.localeCompare(b.name));
  const currentMappings = t.model.appToL2.get(appEntity.id) || new Set();
  
  const renderList = (filterStr = "") => {
    l.manageMappingsList.innerHTML = allL2s.filter(l2 => {
      const l1Name = t.model.l1ById.get(l2.l1Id)?.name || "";
      return `${l1Name} ${l2.name}`.toLowerCase().includes(filterStr.toLowerCase());
    }).map(l2 => {
      const l1Name = t.model.l1ById.get(l2.l1Id)?.name || "";
      const isChecked = currentMappings.has(l2.id) ? "checked" : "";
      return `
        <label class="ea-mapping-item">
          <input type="checkbox" value="${w(l2.id)}" ${isChecked}>
          <div><strong>${w(l2.name)}</strong> <span style="color:var(--muted);font-size:11px;">(${w(l1Name)})</span></div>
        </label>
      `;
    }).join("");
  };
  
  renderList("");
  
  l.manageMappingsSearch.value = "";
  l.manageMappingsSearch.oninput = (e) => renderList(e.target.value);
  
  l.manageMappingsSaveBtn.onclick = async () => {
    try {
      const selectedL2s = Array.from(l.manageMappingsList.querySelectorAll("input:checked")).map(el => el.value);
      // Remove old mappings for this app
      t.model.mapRows = t.model.mapRows.filter(r => r[c.map.appId] !== appEntity.id);
      // Add new mappings
      for (const l2Id of selectedL2s) {
        const newRow = {};
        newRow[c.map.appId] = appEntity.id;
        newRow[c.map.l2Id] = l2Id;
        t.model.mapRows.push(newRow);
      }
      _csvState["app_capability_map.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "app_capability_map.csv", t.model.mapRows);
      refreshModelRows();
      W();
      l.manageMappingsModal.classList.add("hidden");
    } catch(err) { alert("Save failed: " + err.message); }
  };
  
  l.manageMappingsModal.classList.remove("hidden");
}

function setupCRUDModals() {
  document.querySelectorAll(".ea-modal-close, .ea-modal-cancel").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.modal).classList.add("hidden");
    });
  });

  const ADD_ENTITY_LOV_FIELDS = [
    { field: c.app.type, select: "addEntityAppType", other: "addEntityAppTypeOther" },
    { field: c.app.lifecycle, select: "addEntityLifecycle", other: "addEntityLifecycleOther" },
    { field: c.app.risk, select: "addEntityRisk", other: "addEntityRiskOther" },
    { field: c.app.roadmap, select: "addEntityRoadmap", other: "addEntityRoadmapOther" },
    { field: c.app.hosting, select: "addEntityHosting", other: "addEntityHostingOther" },
    { field: c.app.region, select: "addEntityRegion", other: "addEntityRegionOther" },
    { field: c.app.productCategory, select: "addEntityProductCategory", other: "addEntityProductCategoryOther" }
  ];

  function resetAddEntityLovFields() {
    if(!window._eaLov) return;
    ADD_ENTITY_LOV_FIELDS.forEach(({field, select, other}) => {
      const selectEl = l[select], otherEl = l[other];
      if(!selectEl) return;
      selectEl.innerHTML = window._eaLov.optionsHTML(field, "");
      otherEl.value = "";
      window._eaLov.bindOtherToggle(selectEl, otherEl);
    });
  }

  if(l.addEntityBtn) {
    l.addEntityBtn.addEventListener("click", () => {
      if(!_csvDirHandle) return alert("Open a data folder first!");
      l.addEntityModal.classList.remove("hidden");
      l.addEntityId.value = "";
      l.addEntityName.value = "";
      l.addEntityType.value = "app";
      l.addEntityL1Wrap.classList.add("hidden");
      if(l.addEntityAppFieldsWrap) l.addEntityAppFieldsWrap.classList.remove("hidden");
      resetAddEntityLovFields();

      // Populate L1 dropdown for L2 creation
      l.addEntityParentL1.innerHTML = Array.from(t.model.l1ById.values())
        .sort((a,b)=>a.name.localeCompare(b.name))
        .map(l1 => `<option value="${w(l1.id)}">${w(l1.name)}</option>`).join("");
    });
  }

  if(l.addEntityType) {
    l.addEntityType.addEventListener("change", (e) => {
      l.addEntityL1Wrap.classList.toggle("hidden", e.target.value !== "l2");
      if(l.addEntityAppFieldsWrap) l.addEntityAppFieldsWrap.classList.toggle("hidden", e.target.value !== "app");
    });
  }

  if(l.addEntitySaveBtn) {
    l.addEntitySaveBtn.addEventListener("click", async () => {
      const type = l.addEntityType.value;
      const id = l.addEntityId.value.trim();
      const name = l.addEntityName.value.trim();
      
      if(!id || !name) return alert("ID and Name are required!");
      
      try {
        if (type === "app") {
          if(t.model.appById.has(id)) return alert("ID already exists!");
          const newRow = {};
          newRow[c.app.id] = id;
          newRow[c.app.name] = name;
          if(window._eaLov) {
            ADD_ENTITY_LOV_FIELDS.forEach(({field, select, other}) => {
              const val = window._eaLov.readValue(l[select], l[other]);
              if(val) newRow[field] = val;
            });
          }
          t.model.appRows.push(newRow);
          _csvState["applications.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "applications.csv", t.model.appRows);
        } else if (type === "l1") {
          if(t.model.l1ById.has(id)) return alert("ID already exists!");
          const newRow = {};
          newRow[c.l1.id] = id;
          newRow[c.l1.name] = name;
          t.model.l1Rows.push(newRow);
          _csvState["capabilities_l1.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "capabilities_l1.csv", t.model.l1Rows);
        } else if (type === "l2") {
          if(t.model.l2ById.has(id)) return alert("ID already exists!");
          const parent = l.addEntityParentL1.value;
          if(!parent) return alert("Parent L1 is required!");
          const newRow = {};
          newRow[c.l2.id] = id;
          newRow[c.l2.name] = name;
          newRow[c.l2.l1Id] = parent;
          t.model.l2Rows.push(newRow);
          _csvState["capabilities_l2.csv"] = await window.EACSVStore.writeCSV(_csvDirHandle, "capabilities_l2.csv", t.model.l2Rows);
        }
        
        refreshModelRows();
        W();
        l.addEntityModal.classList.add("hidden");
      } catch(err) {
        alert("Failed to add entity: " + err.message);
      }
    });
  }
}

})();
