/**
 * EA Landscape Viewer – Colour Configuration
 * ────────────────────────────────────────────
 * Edit the values below to customise how applications are
 * coloured on the Capability Map, Dashboard and Network views.
 *
 * attributeColors : named maps for specific field values
 *                   (case-insensitive matching)
 * rangeColors     : numeric range rules by field
 *                   (first matching rule wins)
 * fallbackPalette : colours assigned to values that don't
 *                   appear in attributeColors (hash-based)
 * defaultColor    : used when a value is empty / blank
 */
window.EA_COLOR_CONFIG = {

  /* ── Roadmap ──────────────────────────────── */
  /* ── Lifecycle ────────────────────────────── */
  /* ── Hosting ──────────────────────────────── */
  attributeColors: {
    Roadmap: {
      Planned: "#6366F1",
      "In Progress": "#2563EB",
      Complete: "#059669",
      Deferred: "#D97706",
      Blocked: "#DC2626",
      Cancelled: "#9CA3AF",
      OnHold: "#D97706",
      "On Hold": "#D97706",
      Backlog: "#7C3AED"
    },
    Lifecycle: {
      Active: "#059669",
      Production: "#059669",
      Development: "#2563EB",
      Invest: "#2563EB",
      Migrate: "#D97706",
      Tolerate: "#059669",
      Pilot: "#0891B2",
      Planning: "#6366F1",
      Planned: "#6366F1",
      Retiring: "#D97706",
      Retired: "#9CA3AF",
      "End of Life": "#DC2626",
      Sunset: "#D97706",
      Decommissioned: "#9CA3AF"
    },
    Hosting: {
      Cloud: "#2563EB",
      SaaS: "#0891B2",
      "On-Premise": "#D97706",
      "On-Premises": "#D97706",
      Hybrid: "#7C3AED",
      Managed: "#059669"
    }
  },

  /* ── Numeric range colours (editable) ─────── */
  rangeColors: {
    "Annual cost": [
      { min: 0, max: 99999, label: "0 - 99K", color: "#DBEAFE" },
      { min: 100000, max: 249999, label: "100K - 249K", color: "#93C5FD" },
      { min: 250000, max: 499999, label: "250K - 499K", color: "#60A5FA" },
      { min: 500000, max: 999999, label: "500K - 999K", color: "#3B82F6" },
      { min: 1000000, max: null, label: "1M+", color: "#1D4ED8" }
    ]
  },

  /* ── Fallback palette (for unmapped values) ─ */
  fallbackPalette: [
    "#2563EB", "#DC2626", "#059669", "#D97706",
    "#0891B2", "#B91C1C", "#15803D", "#CA8A04",
    "#0369A1", "#BE123C", "#4D7C0F", "#9A3412",
    "#0F766E", "#C2410C", "#1D4ED8", "#DB2777",
    "#65A30D", "#7C2D12", "#3730A3", "#E11D48",
    "#4338CA", "#0E7490", "#7C3AED", "#6D28D9"
  ],

  /* ── Default colour (empty / blank values) ── */
  defaultColor: "#9CA3AF"
};
