(function() {
  'use strict';

  const editAppModal = document.getElementById('editAppModal');
  const editAppSaveBtn = document.getElementById('editAppSaveBtn');
  let currentEditingAppId = null;

  // End Date picker (dd/mm/yyyy). Uses Pikaday (a self-contained popup calendar,
  // not the native OS date picker) since native pickers can fail to render in
  // some remote-desktop/VDI or locked-down browser environments.
  function formatDMY(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${date.getFullYear()}`;
  }

  function parseDMY(str) {
    const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((str || '').trim());
    if (!m) return null;
    const dd = parseInt(m[1], 10), mm = parseInt(m[2], 10) - 1, yyyy = parseInt(m[3], 10);
    const date = new Date(yyyy, mm, dd);
    return (date.getFullYear() === yyyy && date.getMonth() === mm && date.getDate() === dd) ? date : null;
  }

  const editAppEndDateInput = document.getElementById('editAppEndDate');
  const editAppEndDatePicker = (editAppEndDateInput && window.Pikaday) ? new Pikaday({
    field: editAppEndDateInput,
    format: 'DD/MM/YYYY',
    toString: (date) => formatDMY(date),
    parse: (str) => parseDMY(str)
  }) : null;

  // CSV column name -> {select, other} element ids for LOV-backed fields
  const LOV_FIELD_ELS = {
    'Application Type': { select: 'editAppType', other: 'editAppTypeOther' },
    'Lifecycle': { select: 'editAppLifecycle', other: 'editAppLifecycleOther' },
    'Risk': { select: 'editAppRisk', other: 'editAppRiskOther' },
    'Roadmap': { select: 'editAppRoadmap', other: 'editAppRoadmapOther' },
    'Hosting': { select: 'editAppHosting', other: 'editAppHostingOther' },
    'Region': { select: 'editAppRegion', other: 'editAppRegionOther' },
    'Product Category': { select: 'editAppProductCategory', other: 'editAppProductCategoryOther' }
  };

  function populateLovField(field, currentValue) {
    const els = LOV_FIELD_ELS[field];
    const selectEl = document.getElementById(els.select);
    const otherEl = document.getElementById(els.other);
    if (!selectEl || !window._eaLov) return;
    selectEl.innerHTML = window._eaLov.optionsHTML(field, currentValue);
    otherEl.value = window._eaLov.isOther(field, currentValue) ? (currentValue || '') : '';
    window._eaLov.bindOtherToggle(selectEl, otherEl);
  }

  function readLovField(field) {
    const els = LOV_FIELD_ELS[field];
    const selectEl = document.getElementById(els.select);
    const otherEl = document.getElementById(els.other);
    return window._eaLov ? window._eaLov.readValue(selectEl, otherEl) : '';
  }

  // Modal control functions
  function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  // Close modal when clicking close button or cancel
  document.querySelectorAll('.ea-modal-close, .ea-modal-cancel').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modalId = btn.getAttribute('data-modal');
      if (modalId) {
        hideModal(modalId);
      }
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll('.ea-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Function to open edit modal with app data
  window.openEditAppModal = function(appId) {
    const state = window._eaState;
    const model = state?.model;
    
    if (!model || !appId) return;
    
    const app = model.appById.get(appId);
    if (!app) return;

    currentEditingAppId = appId;

    // Populate form fields
    document.getElementById('editAppName').value = app.name || '';
    populateLovField('Application Type', app.type || '');
    populateLovField('Lifecycle', app.lifecycle || '');
    populateLovField('Risk', app.risk || '');
    populateLovField('Roadmap', app.roadmap || '');
    document.getElementById('editAppCost').value = app.costYr || '';
    document.getElementById('editAppCurrency').value = app.currency || '';
    document.getElementById('editAppOwner').value = app.owner || '';
    populateLovField('Hosting', app.hosting || '');
    populateLovField('Region', app.region || '');
    populateLovField('Product Category', app.productCategory || '');
    document.getElementById('editAppComments').value = app.attrs['Comments'] || '';
    if (editAppEndDatePicker) {
      editAppEndDatePicker.setDate(parseDMY(app.endDate), true);
    } else if (editAppEndDateInput) {
      editAppEndDateInput.value = app.endDate || '';
    }

    showModal('editAppModal');
  };

  // Save button handler
  editAppSaveBtn.addEventListener('click', async () => {
    if (!currentEditingAppId) return;

    const state = window._eaState;
    const model = state?.model;
    
    if (!model) return;

    const app = model.appById.get(currentEditingAppId);
    if (!app) return;

    // Get updated values
    const updatedData = {
      'Application Name': document.getElementById('editAppName').value.trim(),
      'Application Type': readLovField('Application Type'),
      'Lifecycle': readLovField('Lifecycle'),
      'Risk': readLovField('Risk'),
      'Roadmap': readLovField('Roadmap'),
      'Annual cost': document.getElementById('editAppCost').value.trim(),
      'Currency': document.getElementById('editAppCurrency').value.trim(),
      'Owner': document.getElementById('editAppOwner').value.trim(),
      'Hosting': readLovField('Hosting'),
      'Region': readLovField('Region'),
      'Product Category': readLovField('Product Category'),
      'Comments': document.getElementById('editAppComments').value.trim(),
      'End Date': document.getElementById('editAppEndDate').value.trim()
    };

    // Update the app object
    app.name = updatedData['Application Name'];
    app.type = updatedData['Application Type'];
    app.lifecycle = updatedData['Lifecycle'];
    app.risk = updatedData['Risk'];
    app.roadmap = updatedData['Roadmap'];
    app.costYr = updatedData['Annual cost'];
    app.currency = updatedData['Currency'];
    app.owner = updatedData['Owner'];
    app.hosting = updatedData['Hosting'];
    app.region = updatedData['Region'];
    app.productCategory = updatedData['Product Category'];
    app.endDate = updatedData['End Date'];

    // Update attrs object (empty string clears a previously-set attr)
    for (const [key, value] of Object.entries(updatedData)) {
      if (value) {
        app.attrs[key] = value;
      } else {
        delete app.attrs[key];
      }
    }

    // Keep the model's active/end-dated set in sync so Map + Dashboard re-render correctly without a reload
    if (model.activeAppIds) {
      if (app.endDate) {
        model.activeAppIds.delete(currentEditingAppId);
      } else {
        model.activeAppIds.add(currentEditingAppId);
      }
    }

    // Save to CSV if file system access is available
    const dirHandle = window.EACSVStore && window.EACSVStore._dirHandle;
    if (dirHandle) {
      try {
        const appRows = window._eaState.model.appRows;
        const rowIndex = appRows.findIndex(row => row['App_ID'] === currentEditingAppId);
        if (rowIndex !== -1) {
          appRows[rowIndex] = {
            ...appRows[rowIndex],
            ...updatedData
          };
          await window.EACSVStore.writeCSV(dirHandle, 'applications.csv', appRows);
          showToast('Application updated successfully', 'success');
        }
      } catch (error) {
        console.error('Error saving app data:', error);
        showToast('Error saving changes', 'error');
      }
    }

    // Trigger UI refresh
    if (window._eaEventTarget) {
      window._eaEventTarget.dispatchEvent(new CustomEvent('selection-changed'));
    }

    hideModal('editAppModal');
  });

  // Toast notification function
  function showToast(message, type = 'info') {
    const container = document.querySelector('.ea-toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `ea-toast ea-toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'ea-toast-container';
    document.body.appendChild(container);
    return container;
  }

  // Add edit button to detail panel when app is selected
  if (window._eaEventTarget) {
    window._eaEventTarget.addEventListener('selection-changed', () => {
      setTimeout(() => {
        const detailsPanel = document.getElementById('detailsPanel');
        if (!detailsPanel) return;

        const state = window._eaState;
        if (!state?.selected?.appId) return;

        const detailHeader = detailsPanel.querySelector('.detail-header');
        if (!detailHeader) return;

        // Check if edit button already exists
        if (detailHeader.querySelector('.edit-entity-btn')) return;

        // Find or create actions container
        let actionsContainer = detailHeader.querySelector('.detail-header-actions');
        if (!actionsContainer) {
          actionsContainer = document.createElement('div');
          actionsContainer.className = 'detail-header-actions';
          
          // Move delete button if it exists
          const deleteBtn = detailHeader.querySelector('.delete-entity-btn');
          if (deleteBtn) {
            actionsContainer.appendChild(deleteBtn);
          }
          
          detailHeader.appendChild(actionsContainer);
        }

        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-entity-btn';
        editBtn.title = 'Edit Application';
        editBtn.innerHTML = '✏️';
        editBtn.addEventListener('click', () => {
          window.openEditAppModal(state.selected.appId);
        });

        // Insert before delete button if it exists
        const deleteBtn = actionsContainer.querySelector('.delete-entity-btn');
        if (deleteBtn) {
          actionsContainer.insertBefore(editBtn, deleteBtn);
        } else {
          actionsContainer.appendChild(editBtn);
        }
      }, 100);
    });
  }

})();
