(function setupMobileMethodsMenu() {
  'use strict';

  const groupedSections = new Set(['method', 'sports', 'learning', 'tips', 'consultation', 'settings', 'support']);
  let releaseMenuFocus = () => {};

  function menu() { return document.getElementById('mobileMethodsMenu'); }
  function trigger() { return document.querySelector('.mobile-methods-trigger'); }
  function backdrop() { return document.querySelector('.mobile-methods-backdrop'); }

  function syncActive(sectionId) {
    const button = trigger();
    button?.classList.toggle('active', groupedSections.has(sectionId));
    document.querySelectorAll('.mobile-method-option').forEach((option) => {
      option.classList.toggle('active', option.dataset.section === sectionId);
    });
  }

  function closeMobileMethods() {
    const panel = menu();
    panel?.classList.remove('open');
    if (panel) panel.hidden = true;
    backdrop()?.classList.remove('open');
    trigger()?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-methods-open');
    releaseMenuFocus();
    releaseMenuFocus = () => {};
  }

  function toggleMobileMethods(event) {
    event?.preventDefault();
    const panel = menu();
    if (!panel) return;
    if (panel.classList.contains('open')) {
      closeMobileMethods();
      return;
    }
    panel.hidden = false;
    panel.classList.add('open');
    backdrop()?.classList.add('open');
    trigger()?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-methods-open');
    releaseMenuFocus = window.AppModalFocus?.activate(panel,'.mobile-method-option.active, .mobile-method-option') || releaseMenuFocus;
  }

  function openMobileMethodSection(sectionId, event) {
    closeMobileMethods();
    window.showSection(sectionId, event);
  }

  const originalShowSection = window.showSection;
  if (typeof originalShowSection === 'function') {
    window.showSection = function mobileAwareShowSection(sectionId, event) {
      closeMobileMethods();
      const result = originalShowSection(sectionId, event);
      syncActive(sectionId);
      return result;
    };
  }

  window.closeMobileMethods = closeMobileMethods;
  window.toggleMobileMethods = toggleMobileMethods;
  window.openMobileMethodSection = openMobileMethodSection;

  document.addEventListener('DOMContentLoaded', () => {
    backdrop()?.addEventListener('click', closeMobileMethods);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMobileMethods();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMobileMethods();
    });
    const activeSection = document.querySelector('.section.active')?.id || 'home';
    syncActive(activeSection);
  });
})();

(function loadSupportCenter(){
  if(document.querySelector('script[data-support-center]')) return;
  const script=document.createElement('script');
  script.src='support-center.js?v=20260902b';
  script.defer=true;
  script.dataset.supportCenter='1';
  document.head.appendChild(script);
})();
