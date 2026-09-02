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
    ru: { title: 'Методы', method: 'Метод 6 шагов', sports: 'Спорт по Марсу', learning: 'Обучение по Меркурию', tips: '10 советов родителям', consultation: 'Помощник для родителей', support: 'Поддержка' },
    ua: { title: 'Методи', method: 'Метод 6 кроків', sports: 'Спорт за Марсом', learning: 'Навчання за Меркурієм', tips: '10 порад батькам', consultation: 'Помічник для батьків', support: 'Підтримка' },
    en: { title: 'Methods', method: '6-step Method', sports: 'Sports by Mars', learning: 'Learning by Mercury', tips: '10 Tips for Parents', consultation: 'Parent Guide', support: 'Support' },
    nl: { title: 'Methodes', method: '6-stappenmethode', sports: 'Sport via Mars', learning: 'Leren via Mercurius', tips: '10 tips voor ouders', consultation: 'Oudergids', support: 'Support' }
  };

  function currentLanguage() {
    const value = localStorage.getItem('language') || window.currentLanguage || 'nl';
    return METHOD_COPY[value] ? value : 'nl';
  }

  function installMethodsHubStyles() {
    let style = document.getElementById('methodsHubStyles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'methodsHubStyles';
      document.head.appendChild(style);
    }
    style.textContent = `
      #methods-hub{width:100%!important;max-width:100%!important}
      #methods-hub .methods-hub-card{display:block!important;width:100%!important;max-width:100%!important;margin:20px 0!important;padding:22px!important;box-sizing:border-box!important}
      #methods-hub .methods-hub-title{display:block!important;width:100%!important;margin:0 0 18px!important;color:var(--cosmic-purple);font-size:28px;font-weight:800;line-height:1.15;text-align:left!important}
      #methods-hub .methods-hub-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:14px!important;width:100%!important;max-width:100%!important;margin:0!important;padding:0!important}
      #methods-hub .methods-hub-button{appearance:none;-webkit-appearance:none;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:10px!important;width:100%!important;min-width:0!important;max-width:none!important;height:132px!important;min-height:132px!important;margin:0!important;padding:16px 12px!important;border:1px solid rgba(74,44,122,.10)!important;border-radius:20px!important;background:linear-gradient(135deg,#fff 0%,#faf8fd 100%)!important;box-shadow:0 8px 22px rgba(49,33,91,.08)!important;color:var(--cosmic-purple)!important;font:inherit!important;text-align:center!important;cursor:pointer!important;box-sizing:border-box!important}
      #methods-hub .methods-hub-button:active{transform:scale(.98)}
      #methods-hub .methods-hub-icon{display:block!important;font-size:32px!important;line-height:1!important;margin:0!important}
      #methods-hub .methods-hub-label{display:block!important;width:100%!important;margin:0!important;font-size:17px!important;font-weight:800!important;line-height:1.15!important;text-align:center!important;overflow-wrap:anywhere!important;word-break:normal!important}
      @media(max-width:600px){
        #methods-hub .methods-hub-card{margin:8px 0 110px!important;padding:18px 14px!important;border-radius:22px!important}
        #methods-hub .methods-hub-title{font-size:26px!important;margin:0 0 14px!important}
        #methods-hub .methods-hub-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}
        #methods-hub .methods-hub-button{height:118px!important;min-height:118px!important;padding:12px 8px!important;border-radius:18px!important}
        #methods-hub .methods-hub-icon{font-size:29px!important}
        #methods-hub .methods-hub-label{font-size:15px!important;line-height:1.16!important}
        #methods-hub .methods-hub-button:last-child{grid-column:1/-1!important;height:94px!important;min-height:94px!important;flex-direction:row!important;gap:12px!important}
      }
      @media(max-width:360px){
        #methods-hub .methods-hub-grid{gap:8px!important}
        #methods-hub .methods-hub-button{height:108px!important;min-height:108px!important;padding:10px 7px!important}
        #methods-hub .methods-hub-label{font-size:14px!important}
      }
    `;
  }

  function ensureMethodsHub() {
    installMethodsHubStyles();
    let section = document.getElementById('methods-hub');
    if (!section) {
      section = document.createElement('section');
      section.id = 'methods-hub';
      section.className = 'section';
      document.querySelector('.main-content')?.appendChild(section);
    }
    const copy = METHOD_COPY[currentLanguage()];
    section.innerHTML = `
      <div class="methods-hub-card card">
        <h2 class="methods-hub-title">✨ ${copy.title}</h2>
        <div class="methods-hub-grid">
          <button type="button" class="methods-hub-button" data-section="method"><span class="methods-hub-icon">✨</span><span class="methods-hub-label">${copy.method}</span></button>
          <button type="button" class="methods-hub-button" data-section="sports"><span class="methods-hub-icon">🏃</span><span class="methods-hub-label">${copy.sports}</span></button>
          <button type="button" class="methods-hub-button" data-section="learning"><span class="methods-hub-icon">📚</span><span class="methods-hub-label">${copy.learning}</span></button>
          <button type="button" class="methods-hub-button" data-section="tips"><span class="methods-hub-icon">💡</span><span class="methods-hub-label">${copy.tips}</span></button>
          <button type="button" class="methods-hub-button" data-section="consultation"><span class="methods-hub-icon">💬</span><span class="methods-hub-label">${copy.consultation}</span></button>
          <button type="button" class="methods-hub-button" data-section="support"><span class="methods-hub-icon">🛟</span><span class="methods-hub-label">${copy.support}</span></button>
        </div>
      </div>`;
    return section;
  }

  function openMethodsHub(event) {
    event?.preventDefault?.();
    window.closeMobileMethods?.();
    ensureMethodsHub();
    window.showSection?.('methods-hub', event);
  }

  window.openMethodsHub = openMethodsHub;

  function restoreSection(sectionId) {
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (!section) return;
    if (!section.classList.contains('active')) window.showSection?.(sectionId);
  }

  function lockVisibleSection(sectionId) {
    const sections = [...document.querySelectorAll('.section')];
    sections.forEach((section) => {
      section.dataset.languageSwitchDisplay = section.style.display || '';
      if (section.id === sectionId) {
        section.style.setProperty('display', 'block', 'important');
      } else {
        section.style.setProperty('display', 'none', 'important');
      }
    });
    return function unlockVisibleSection() {
      sections.forEach((section) => {
        const previous = section.dataset.languageSwitchDisplay || '';
        section.style.removeProperty('display');
        if (previous) section.style.display = previous;
        delete section.dataset.languageSwitchDisplay;
      });
    };
  }

  document.addEventListener('click', (event) => {
    const languageButton = event.target.closest('.lang-btn[data-language]');
    if (languageButton) {
      const activeSectionId = document.querySelector('.section.active')?.id || 'home';
      const unlockVisibleSection = lockVisibleSection(activeSectionId);
      window.changeLanguage?.(languageButton.dataset.language, event);
      if (activeSectionId === 'methods-hub') ensureMethodsHub();
      restoreSection(activeSectionId);
      window.requestAnimationFrame(() => restoreSection(activeSectionId));
      window.setTimeout(() => {
        restoreSection(activeSectionId);
        unlockVisibleSection();
        restoreSection(activeSectionId);
      }, 220);
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