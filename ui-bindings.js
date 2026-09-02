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

  const METHOD_COPY = {
    ru: { title: 'Методы', method: 'Метод 6 шагов', sports: 'Спорт по Марсу', learning: 'Обучение по Меркурию', tips: '10 советов родителям', consultation: 'Помощник для родителей' },
    ua: { title: 'Методи', method: 'Метод 6 кроків', sports: 'Спорт за Марсом', learning: 'Навчання за Меркурієм', tips: '10 порад батькам', consultation: 'Помічник для батьків' },
    en: { title: 'Methods', method: '6-step Method', sports: 'Sports by Mars', learning: 'Learning by Mercury', tips: '10 Tips for Parents', consultation: 'Parent Guide' },
    nl: { title: 'Methodes', method: '6-stappenmethode', sports: 'Sport via Mars', learning: 'Leren via Mercurius', tips: '10 tips voor ouders', consultation: 'Oudergids' }
  };

  function currentLanguage() {
    const value = localStorage.getItem('language') || window.currentLanguage || 'nl';
    return METHOD_COPY[value] ? value : 'nl';
  }

  function ensureMethodsHub() {
    let section = document.getElementById('methods-hub');
    if (!section) {
      section = document.createElement('section');
      section.id = 'methods-hub';
      section.className = 'section';
      document.querySelector('.main-content')?.appendChild(section);
    }
    const copy = METHOD_COPY[currentLanguage()];
    section.innerHTML = `
      <div class="card methods-hub-card">
        <h2 class="card-title">✨ ${copy.title}</h2>
        <div class="methods-hub-grid">
          <button type="button" class="action-card" data-section="method"><span class="action-icon">✨</span><span class="action-title">${copy.method}</span></button>
          <button type="button" class="action-card" data-section="sports"><span class="action-icon">🏃</span><span class="action-title">${copy.sports}</span></button>
          <button type="button" class="action-card" data-section="learning"><span class="action-icon">📚</span><span class="action-title">${copy.learning}</span></button>
          <button type="button" class="action-card" data-section="tips"><span class="action-icon">💡</span><span class="action-title">${copy.tips}</span></button>
          <button type="button" class="action-card" data-section="consultation"><span class="action-icon">💬</span><span class="action-title">${copy.consultation}</span></button>
        </div>
      </div>`;
    if (!document.getElementById('methodsHubStyles')) {
      const style = document.createElement('style');
      style.id = 'methodsHubStyles';
      style.textContent = `
        .methods-hub-card{display:block!important;width:100%;max-width:100%;padding:24px!important}
        .methods-hub-card>.card-title{display:block!important;width:100%;margin:0 0 18px!important;text-align:left}
        .methods-hub-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;width:100%}
        .methods-hub-grid .action-card{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:10px;width:100%;min-width:0;min-height:122px;height:auto;padding:18px 14px!important;text-align:center!important;border-radius:20px}
        .methods-hub-grid .action-icon{display:block;font-size:34px;line-height:1}
        .methods-hub-grid .action-title{display:block;width:100%;font-size:18px;line-height:1.2;text-align:center;overflow-wrap:anywhere}
        @media(max-width:600px){
          .methods-hub-card{padding:18px 14px!important}
          .methods-hub-card>.card-title{font-size:28px!important;margin-bottom:14px!important}
          .methods-hub-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
          .methods-hub-grid .action-card{min-height:112px;padding:14px 10px!important;border-radius:18px}
          .methods-hub-grid .action-icon{font-size:30px}
          .methods-hub-grid .action-title{font-size:15px;line-height:1.18}
          .methods-hub-grid .action-card:last-child:nth-child(odd){grid-column:1/-1;min-height:96px}
        }
        @media(max-width:360px){
          .methods-hub-grid{gap:8px}
          .methods-hub-grid .action-card{min-height:104px;padding:12px 8px!important}
          .methods-hub-grid .action-title{font-size:14px}
        }
      `;
      document.head.appendChild(style);
    }
    return section;
  }

  function openMethodsHub(event) {
    event?.preventDefault?.();
    window.closeMobileMethods?.();
    ensureMethodsHub();
    window.showSection?.('methods-hub', event);
  }

  window.openMethodsHub = openMethodsHub;

  document.addEventListener('click', (event) => {
    const languageButton = event.target.closest('.lang-btn[data-language]');
    if (languageButton) {
      window.changeLanguage?.(languageButton.dataset.language, event);
      if (document.getElementById('methods-hub')?.classList.contains('active')) ensureMethodsHub();
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
    if (action === 'toggle-mobile-methods') openMethodsHub(event);
    if (action === 'close-mobile-methods') window.closeMobileMethods?.();
    if (action === 'show-child-analysis') window.showChildAnalysis?.(Number(actionButton.dataset.childId));
    if (action === 'delete-child') window.deleteChild?.(Number(actionButton.dataset.childId));
    if (action === 'delete-note') window.deleteNote?.(Number(actionButton.dataset.noteId));
  });
})();