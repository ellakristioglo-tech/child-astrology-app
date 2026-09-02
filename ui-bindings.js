(function setupAccessibleUiBindings() {
  'use strict';

  try {
    Object.defineProperty(window, 'children', {
      configurable: true,
      get: function getCurrentChildren() { return typeof children !== 'undefined' ? children : []; }
    });
  } catch (_) {}

  const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function activateFocusTrap(container, initialSelector) {
    if (!container) return function noop() {};
    const returnTarget = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKeydown = (event) => {
      if (event.key !== 'Tab') return;
      const focusable = [...container.querySelectorAll(FOCUSABLE)].filter((node) => !node.hidden && node.getClientRects().length);
      if (!focusable.length) { event.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    container.addEventListener('keydown', onKeydown);
    window.setTimeout(() => {
      const initial = initialSelector ? container.querySelector(initialSelector) : null;
      (initial || container.querySelector(FOCUSABLE))?.focus({ preventScroll: true });
    }, 0);
    return function releaseFocusTrap() {
      container.removeEventListener('keydown', onKeydown);
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
    };
  }

  window.AppModalFocus = { activate: activateFocusTrap };

  document.addEventListener('click', (event) => {
    const languageButton = event.target.closest('.lang-btn[data-language]');
    if (languageButton) {
      window.changeLanguage?.(languageButton.dataset.language, event);
      return;
    }

    const sectionButton = event.target.closest('[data-section]');
    if (sectionButton) {
      const sectionId = sectionButton.dataset.section;
      if (sectionButton.classList.contains('mobile-method-option')) window.openMobileMethodSection?.(sectionId, event);
      else window.showSection?.(sectionId, event);
      return;
    }

    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    if (action === 'add-child') window.addChild?.();
    if (action === 'save-note') window.saveNote?.();
    if (action === 'toggle-mobile-methods') window.toggleMobileMethods?.(event);
    if (action === 'close-mobile-methods') window.closeMobileMethods?.();
    if (action === 'show-child-analysis') window.showChildAnalysis?.(Number(actionButton.dataset.childId));
    if (action === 'delete-child') window.deleteChild?.(Number(actionButton.dataset.childId));
    if (action === 'delete-note') window.deleteNote?.(Number(actionButton.dataset.noteId));
  });
})();
