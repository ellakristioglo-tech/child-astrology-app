(function () {
  'use strict';

  const PARENT_KEY = 'child_astrology_parent_confirmed_v1';
  const EXPORT_KEYS = [
    'children','notes','childAstrologyConsultationHistory','childAstrologyConsultationChild',
    'familyScentCodeV1','child_astrology_local_analytics_v1','language'
  ];
  const APP_KEYS = [
    ...EXPORT_KEYS,
    PARENT_KEY,
    'child_astrology_analytics_consent_v2',
    'child_astrology_analytics_consent'
  ];
  const COPY = {
    ru:{title:'Приватность и данные',summary:'Профили, натальные расчёты, заметки и история консультаций хранятся только на этом устройстве. Необязательная Google Analytics включается только с вашего согласия.',ga:'В Google Analytics никогда не отправляются имена, даты, время и место рождения, координаты, данные карты или текст вопроса. Передаются только технические события, язык и безопасные общие категории.',ai:'Ответы в помощнике формируются автоматически и не заменяют врача, психолога, логопеда, учителя или другого специалиста. Приложение не ставит диагнозы.',export:'Скачать мои данные',clearChat:'Удалить историю вопросов',clearAll:'Удалить все данные',analytics:'Настройки аналитики',allow:'Разрешить',deny:'Запретить',unset:'Не выбрано',granted:'Разрешено',denied:'Запрещено',confirmExport:'Файл с данными создан на вашем устройстве.',confirmChat:'Удалить всю историю вопросов на этом устройстве?',confirmAll:'Удалить профили детей, заметки, расчёты и настройки с этого устройства? Это действие нельзя отменить.',parentTitle:'Перед добавлением ребёнка',parentText:'Подтвердите, что вы родитель, законный представитель или имеете разрешение на внесение данных ребёнка.',parentCheck:'Мне исполнилось 18 лет, и я имею право использовать эти данные.',nickname:'Можно указать псевдоним вместо полного имени ребёнка.',continue:'Продолжить',cancel:'Отмена',policy:'Подробнее о правилах приватности'},
    ua:{title:'Приватність і дані',summary:'Профілі, натальні розрахунки, нотатки та історія консультацій зберігаються лише на цьому пристрої. Необов’язкова Google Analytics вмикається тільки за вашою згодою.',ga:'У Google Analytics ніколи не надсилаються імена, дати, час і місце народження, координати, дані карти або текст запитання. Надсилаються лише технічні події, мова й безпечні загальні категорії.',ai:'Відповіді в помічнику формуються автоматично й не замінюють лікаря, психолога, логопеда, учителя чи іншого фахівця. Застосунок не ставить діагнози.',export:'Завантажити мої дані',clearChat:'Видалити історію запитань',clearAll:'Видалити всі дані',analytics:'Налаштування аналітики',allow:'Дозволити',deny:'Заборонити',unset:'Не вибрано',granted:'Дозволено',denied:'Заборонено',confirmExport:'Файл із даними створено на вашому пристрої.',confirmChat:'Видалити всю історію запитань на цьому пристрої?',confirmAll:'Видалити профілі дітей, нотатки, розрахунки й налаштування з цього пристрою? Дію не можна скасувати.',parentTitle:'Перед додаванням дитини',parentText:'Підтвердьте, що ви є одним із батьків, законним представником або маєте дозвіл на внесення даних дитини.',parentCheck:'Мені виповнилося 18 років, і я маю право використовувати ці дані.',nickname:'Можна вказати псевдонім замість повного імені дитини.',continue:'Продовжити',cancel:'Скасувати',policy:'Докладніше про правила приватності'},
    en:{title:'Privacy and data',summary:'Profiles, natal calculations, notes and consultation history are stored only on this device. Optional Google Analytics is enabled only with your consent.',ga:'Google Analytics never receives names, dates, birth time or place, coordinates, chart data or question text. Only technical events, language and safe broad categories are sent.',ai:'Guide responses are generated automatically and do not replace a doctor, psychologist, speech therapist, teacher or other professional. The app does not diagnose.',export:'Download my data',clearChat:'Delete question history',clearAll:'Delete all data',analytics:'Analytics settings',allow:'Allow',deny:'Deny',unset:'Not selected',granted:'Allowed',denied:'Denied',confirmExport:'The data file was created on your device.',confirmChat:'Delete all question history on this device?',confirmAll:'Delete child profiles, notes, calculations and settings from this device? This cannot be undone.',parentTitle:'Before adding a child',parentText:'Confirm that you are a parent, legal guardian, or have permission to enter the child’s data.',parentCheck:'I am 18 or older and I am authorised to use this data.',nickname:'You may use a nickname instead of the child’s full name.',continue:'Continue',cancel:'Cancel',policy:'More about privacy'},
    nl:{title:'Privacy en gegevens',summary:'Profielen, geboortehoroscoopberekeningen, notities en consultatiegeschiedenis worden alleen op dit apparaat bewaard. Optionele Google Analytics wordt alleen met jouw toestemming ingeschakeld.',ga:'Google Analytics ontvangt nooit namen, geboortedatum, tijd of plaats, coördinaten, horoscoopgegevens of vraagtekst. Alleen technische gebeurtenissen, taal en veilige algemene categorieën worden verzonden.',ai:'Antwoorden van de gids worden automatisch samengesteld en vervangen geen arts, psycholoog, logopedist, leerkracht of andere professional. De app stelt geen diagnose.',export:'Mijn gegevens downloaden',clearChat:'Vraaggeschiedenis verwijderen',clearAll:'Alle gegevens verwijderen',analytics:'Analyse-instellingen',allow:'Toestaan',deny:'Weigeren',unset:'Niet gekozen',granted:'Toegestaan',denied:'Geweigerd',confirmExport:'Het gegevensbestand is op je apparaat aangemaakt.',confirmChat:'Alle vraaggeschiedenis op dit apparaat verwijderen?',confirmAll:'Kinderprofielen, notities, berekeningen en instellingen van dit apparaat verwijderen? Dit kan niet ongedaan worden gemaakt.',parentTitle:'Voordat je een kind toevoegt',parentText:'Bevestig dat je ouder of wettelijke vertegenwoordiger bent, of toestemming hebt om de gegevens van het kind in te voeren.',parentCheck:'Ik ben 18 jaar of ouder en mag deze gegevens gebruiken.',nickname:'Je kunt een bijnaam gebruiken in plaats van de volledige naam van het kind.',continue:'Doorgaan',cancel:'Annuleren',policy:'Meer over privacy'}
  };

  function language(){const value=localStorage.getItem('language')||window.currentLanguage||'nl';return COPY[value]?value:'nl'}
  function t(){return COPY[language()]}
  function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function analyticsState(){return window.AppAnalytics?.getConsent?.()||localStorage.getItem('child_astrology_analytics_consent')||'unset'}
  function render(){
    const root=document.getElementById('privacyControls');if(!root)return;
    const ui=t(),state=analyticsState();
    root.innerHTML=`<div class="settings-group privacy-card"><h3>🔒 ${escapeHtml(ui.title)}</h3><p>${escapeHtml(ui.summary)}</p><details><summary>${escapeHtml(ui.policy)}</summary><p>${escapeHtml(ui.ga)}</p><p>${escapeHtml(ui.ai)}</p></details><div class="privacy-consent-row"><strong>${escapeHtml(ui.analytics)}</strong><span class="privacy-status ${state}">${escapeHtml(ui[state]||ui.unset)}</span><div><button type="button" data-privacy="analytics-yes">${escapeHtml(ui.allow)}</button><button type="button" data-privacy="analytics-no">${escapeHtml(ui.deny)}</button></div></div><div class="privacy-actions"><button type="button" data-privacy="export">${escapeHtml(ui.export)}</button><button type="button" data-privacy="chat">${escapeHtml(ui.clearChat)}</button><button class="danger" type="button" data-privacy="all">${escapeHtml(ui.clearAll)}</button></div></div>`;
    root.querySelector('[data-privacy="analytics-yes"]')?.addEventListener('click',()=>{window.AppAnalytics?.setConsent(true);render()});
    root.querySelector('[data-privacy="analytics-no"]')?.addEventListener('click',()=>{window.AppAnalytics?.setConsent(false);render()});
    root.querySelector('[data-privacy="export"]')?.addEventListener('click',exportData);
    root.querySelector('[data-privacy="chat"]')?.addEventListener('click',clearChat);
    root.querySelector('[data-privacy="all"]')?.addEventListener('click',clearAll);
  }
  function exportData(){
    const data={exportedAt:new Date().toISOString(),app:'Child Astrology',data:{}};
    EXPORT_KEYS.forEach((key)=>{const raw=localStorage.getItem(key);if(raw!==null){try{data.data[key]=JSON.parse(raw)}catch(_){data.data[key]=raw}}});
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),link=document.createElement('a');
    link.href=URL.createObjectURL(blob);link.download=`child-astrology-data-${new Date().toISOString().slice(0,10)}.json`;link.click();window.setTimeout(()=>URL.revokeObjectURL(link.href),1000);
  }
  function clearChat(){if(!window.confirm(t().confirmChat))return;localStorage.removeItem('childAstrologyConsultationHistory');document.dispatchEvent(new Event('app:privacy-data-changed'));render()}
  function clearAll(){if(!window.confirm(t().confirmAll))return;window.AppAnalytics?.setConsent?.(false);APP_KEYS.forEach((key)=>localStorage.removeItem(key));location.reload()}
  function parentGate(next){
    if(localStorage.getItem(PARENT_KEY)==='yes'){next();return}
    document.querySelector('.parent-consent-modal')?.remove();const ui=t(),modal=document.createElement('div');modal.className='parent-consent-modal';
    modal.innerHTML=`<div class="parent-consent-overlay"><div class="parent-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="parentConsentTitle"><button type="button" class="parent-consent-close" aria-label="${escapeHtml(ui.cancel)}">×</button><h2 id="parentConsentTitle">${escapeHtml(ui.parentTitle)}</h2><p>${escapeHtml(ui.parentText)}</p><p class="parent-consent-tip">${escapeHtml(ui.nickname)}</p><label><input type="checkbox"> <span>${escapeHtml(ui.parentCheck)}</span></label><div class="parent-consent-buttons"><button type="button" data-parent="cancel">${escapeHtml(ui.cancel)}</button><button type="button" data-parent="continue" disabled>${escapeHtml(ui.continue)}</button></div></div></div>`;
    const close=()=>modal.remove(),check=modal.querySelector('input'),continueButton=modal.querySelector('[data-parent="continue"]');
    check.addEventListener('change',()=>{continueButton.disabled=!check.checked});
    modal.querySelector('.parent-consent-close').addEventListener('click',close);modal.querySelector('[data-parent="cancel"]').addEventListener('click',close);
    continueButton.addEventListener('click',()=>{localStorage.setItem(PARENT_KEY,'yes');close();next()});document.body.appendChild(modal);
  }
  function wrapAddChild(){const original=window.addChild;if(typeof original!=='function'||original.__privacyWrapped)return;const wrapped=function(){parentGate(()=>original())};wrapped.__privacyWrapped=true;window.addChild=wrapped}
  const previousChangeLanguage=window.changeLanguage;
  if(typeof previousChangeLanguage==='function'){window.changeLanguage=function(language,event){const result=previousChangeLanguage(language,event);render();return result}}
  document.addEventListener('app:privacy-data-changed',()=>{if(typeof window.renderConsultant==='function')window.renderConsultant()});
  document.addEventListener('DOMContentLoaded',()=>{wrapAddChild();render()});
  window.PrivacyControls={render,parentGate};
})();
