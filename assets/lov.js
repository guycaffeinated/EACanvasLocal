/**
 * List-of-Values (LOV) helper for predefined-value application fields.
 * Reads lov.csv (Field,Value,Order rows) via csv-store.js's 'lov-loaded' event
 * and exposes a shared way to build <select> option markup for Add/Edit UI,
 * used by both app.js and edit-app.js.
 */
(function () {
  'use strict';

  var FIELDS = ['Application Type', 'Lifecycle', 'Roadmap', 'Hosting', 'Region', 'Product Category', 'Risk'];
  var OTHER_VALUE = '__other__';
  var valuesByField = {};

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function rebuild(rows) {
    var byField = {};
    (rows || []).forEach(function (row) {
      var field = (row['Field'] || '').trim();
      var value = (row['Value'] || '').trim();
      if (!field || !value) return;
      var order = parseFloat(row['Order']);
      if (!byField[field]) byField[field] = [];
      byField[field].push({ value: value, order: isNaN(order) ? Number.MAX_SAFE_INTEGER : order });
    });
    valuesByField = {};
    Object.keys(byField).forEach(function (field) {
      var list = byField[field].slice();
      list.sort(function (a, b) {
        if (a.order !== b.order) return a.order - b.order;
        return a.value.localeCompare(b.value);
      });
      valuesByField[field] = list.map(function (item) { return item.value; });
    });
  }

  function valuesFor(field) {
    return (valuesByField[field] || []).slice();
  }

  function isKnownValue(field, value) {
    var v = (value || '').trim();
    if (!v) return false;
    return valuesFor(field).indexOf(v) !== -1;
  }

  // True when value is non-empty but not present in the LOV for this field —
  // callers use this to decide whether to reveal/prefill the "Other" sidecar input.
  function isOther(field, value) {
    var v = (value || '').trim();
    return v !== '' && !isKnownValue(field, v);
  }

  // Returns <option> markup: a blank option, one per LOV value, then "Other…".
  // The option matching currentValue (or "Other…" if unmatched/non-empty) is marked selected.
  function optionsHTML(field, currentValue) {
    var v = (currentValue || '').trim();
    var known = isKnownValue(field, v);
    var other = isOther(field, v);
    var html = '<option value=""' + (!v ? ' selected' : '') + '>(empty)</option>';
    valuesFor(field).forEach(function (opt) {
      html += '<option value="' + escapeHtml(opt) + '"' + (known && opt === v ? ' selected' : '') + '>' + escapeHtml(opt) + '</option>';
    });
    html += '<option value="' + OTHER_VALUE + '"' + (other ? ' selected' : '') + '>Other…</option>';
    return html;
  }

  function loadFromRows(rows) {
    rebuild(rows);
  }

  // Wires a select+sidecar pair: shows/focuses the sidecar text input when
  // "Other…" is chosen, hides it otherwise. Call once per pair after building options.
  function bindOtherToggle(selectEl, otherEl) {
    if (!selectEl || !otherEl) return;
    function sync() {
      if (selectEl.value === OTHER_VALUE) {
        otherEl.classList.remove('hidden');
      } else {
        otherEl.classList.add('hidden');
      }
    }
    selectEl.addEventListener('change', function () {
      sync();
      if (selectEl.value === OTHER_VALUE) otherEl.focus();
    });
    sync();
  }

  // Resolves the final string value for a select+sidecar pair: the sidecar's
  // text when "Other…" is selected, otherwise the select's value ("" for blank).
  function readValue(selectEl, otherEl) {
    if (!selectEl) return '';
    if (selectEl.value === OTHER_VALUE) return (otherEl && otherEl.value || '').trim();
    return selectEl.value;
  }

  window.addEventListener('lov-loaded', function (e) {
    loadFromRows(e.detail || []);
  });

  window._eaLov = {
    FIELDS: FIELDS,
    OTHER_VALUE: OTHER_VALUE,
    valuesFor: valuesFor,
    isKnownValue: isKnownValue,
    isOther: isOther,
    optionsHTML: optionsHTML,
    loadFromRows: loadFromRows,
    bindOtherToggle: bindOtherToggle,
    readValue: readValue
  };

  // Pick up rows if csv-store already loaded a folder before this script ran.
  if (window.EACSVStore && window.EACSVStore._lovRows && window.EACSVStore._lovRows.length) {
    loadFromRows(window.EACSVStore._lovRows);
  }
})();
