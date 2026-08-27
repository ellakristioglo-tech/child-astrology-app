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

  Object.assign(COPY.ru,{summary:'Профили, расчёты, заметки и история хранятся только на этом устройстве. Координаты удаляются сразу после расчёта. История вопросов и Family Scent удаляется через 90 дней.',ai:'Ответы формируются автоматически на устройстве по фиксированным правилам, без внешнего ИИ. Они не заменяют специалиста и не ставят диагнозы.',export:'Скачать JSON',import:'Перенести данные из JSON',readable:'Скачать читаемую копию',importConfirm:'Импорт заменит профили, заметки и историю, которые уже сохранены на этом устройстве. Согласие на аналитику и общее подтверждение 18+ не переносятся. Продолжить?',importSuccess:'Данные перенесены. Приложение сейчас обновится.',importError:'Не удалось перенести данные. Выберите JSON-файл, скачанный из Child Astrology.',parentText:'Добавляйте данные только если вы родитель, законный представитель или имеете иное законное право их предоставить.',parentCheck:'Мне исполнилось 18 лет, и я являюсь родителем/законным представителем или имею иное законное полномочие.',childTitle:'Подтвердите право добавить ребёнка',childText:'Для каждого нового профиля отдельно подтвердите, что имеете право предоставить данные этого ребёнка.',childCheck:'Я подтверждаю, что имею право добавить данные этого ребёнка.',childPolicy:'Как мы защищаем данные детей',nickname:'Используйте псевдоним — полное имя ребёнка не требуется.',policy:'Кратко о защите данных',legal:'Privacy, Cookies и Условия'});
  Object.assign(COPY.ua,{summary:'Профілі, розрахунки, нотатки та історія зберігаються лише на цьому пристрої. Координати видаляються одразу після розрахунку. Історія запитань і Family Scent видаляється через 90 днів.',ai:'Відповіді формуються автоматично на пристрої за фіксованими правилами, без зовнішнього ШІ. Вони не замінюють фахівця й не ставлять діагнози.',export:'Завантажити JSON',import:'Перенести дані з JSON',readable:'Завантажити читабельну копію',importConfirm:'Імпорт замінить профілі, нотатки та історію, уже збережені на цьому пристрої. Згода на аналітику та загальне підтвердження 18+ не переносяться. Продовжити?',importSuccess:'Дані перенесено. Застосунок зараз оновиться.',importError:'Не вдалося перенести дані. Виберіть JSON-файл, завантажений із Child Astrology.',parentText:'Додавайте дані лише якщо ви є одним із батьків, законним представником або маєте інше законне право їх надати.',parentCheck:'Мені виповнилося 18 років, і я є одним із батьків/законним представником або маю інше законне повноваження.',childTitle:'Підтвердьте право додати дитину',childText:'Для кожного нового профілю окремо підтвердьте, що маєте право надати дані цієї дитини.',childCheck:'Я підтверджую, що маю право додати дані цієї дитини.',childPolicy:'Як ми захищаємо дані дітей',nickname:'Використовуйте псевдонім — повне ім’я дитини не потрібне.',policy:'Коротко про захист даних',legal:'Privacy, Cookies та Умови'});
  Object.assign(COPY.en,{summary:'Profiles, calculations, notes and history stay only on this device. Coordinates are deleted immediately after calculation. Question history and Family Scent expire after 90 days.',ai:'Responses are generated automatically on this device from fixed rules, without external AI. They do not replace a professional and do not diagnose.',export:'Download JSON',import:'Transfer data from JSON',readable:'Download readable copy',importConfirm:'Importing replaces profiles, notes and history already saved on this device. Analytics consent and the general 18+ confirmation are not transferred. Continue?',importSuccess:'Your data was transferred. The app will now refresh.',importError:'The data could not be transferred. Choose a JSON file downloaded from Child Astrology.',parentText:'Only add data if you are a parent, legal guardian, or otherwise have a legal right to provide it.',parentCheck:'I am 18 or older and I am the parent/legal guardian or otherwise have legal authority.',childTitle:'Confirm your right to add this child',childText:'For every new profile, separately confirm that you have the right to provide this child’s data.',childCheck:'I confirm that I have the right to add this child’s data.',childPolicy:'How we protect children’s data',nickname:'Use a nickname — the child’s full name is not required.',policy:'Data protection summary',legal:'Privacy, Cookies and Terms'});
  Object.assign(COPY.nl,{summary:'Profielen, berekeningen, notities en geschiedenis blijven alleen op dit apparaat. Coördinaten worden direct na de berekening verwijderd. Vraaggeschiedenis en Family Scent verlopen na 90 dagen.',ai:'Antwoorden worden automatisch op dit apparaat samengesteld met vaste regels, zonder externe AI. Ze vervangen geen deskundige en stellen geen diagnose.',export:'JSON downloaden',import:'Gegevens uit JSON overzetten',readable:'Leesbare kopie downloaden',importConfirm:'Importeren vervangt profielen, notities en geschiedenis die al op dit apparaat staan. Toestemming voor analyse en de algemene 18+-bevestiging worden niet overgezet. Doorgaan?',importSuccess:'De gegevens zijn overgezet. De app wordt nu vernieuwd.',importError:'De gegevens konden niet worden overgezet. Kies een JSON-bestand dat vanuit Child Astrology is gedownload.',parentText:'Voeg alleen gegevens toe als je ouder/wettelijke vertegenwoordiger bent of een ander wettelijk recht hebt om ze te verstrekken.',parentCheck:'Ik ben 18 jaar of ouder en ben ouder/wettelijke vertegenwoordiger of heb een andere wettelijke bevoegdheid.',childTitle:'Bevestig dat je dit kind mag toevoegen',childText:'Bevestig voor ieder nieuw profiel afzonderlijk dat je de gegevens van dit kind mag verstrekken.',childCheck:'Ik bevestig dat ik de gegevens van dit kind mag toevoegen.',childPolicy:'Hoe we kindgegevens beschermen',nickname:'Gebruik een bijnaam — de volledige naam van het kind is niet nodig.',policy:'Samenvatting gegevensbescherming',legal:'Privacy, Cookies en Voorwaarden'});

  function language(){const value=localStorage.getItem('language')||window.currentLanguage||'nl';return COPY[value]?value:'nl'}
  function t(){return COPY[language()]}
  function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function analyticsState(){return window.AppAnalytics?.getConsent?.()||localStorage.getItem('child_astrology_analytics_consent')||'unset'}
  function render(){
    const root=document.getElementById('privacyControls');if(!root)return;
    const ui=t(),state=analyticsState();
    root.innerHTML=`<div class="settings-group privacy-card"><h3>🔒 ${escapeHtml(ui.title)}</h3><p>${escapeHtml(ui.summary)}</p><details><summary>${escapeHtml(ui.policy)}</summary><p>${escapeHtml(ui.ga)}</p><p>${escapeHtml(ui.ai)}</p></details><a class="privacy-legal-link" href="legal.html?lang=${language()}&doc=privacy">${escapeHtml(ui.legal)} →</a><div class="privacy-consent-row"><strong>${escapeHtml(ui.analytics)}</strong><span class="privacy-status ${state}">${escapeHtml(ui[state]||ui.unset)}</span><div><button type="button" data-privacy="analytics-yes">${escapeHtml(ui.allow)}</button><button type="button" data-privacy="analytics-no">${escapeHtml(ui.deny)}</button></div></div><div class="privacy-actions"><button type="button" data-privacy="export">${escapeHtml(ui.export)}</button><button type="button" data-privacy="import">${escapeHtml(ui.import)}</button><input class="privacy-import-input" type="file" accept="application/json,.json" data-privacy="import-file"><button type="button" data-privacy="readable">${escapeHtml(ui.readable)}</button><button type="button" data-privacy="chat">${escapeHtml(ui.clearChat)}</button><button class="danger" type="button" data-privacy="all">${escapeHtml(ui.clearAll)}</button></div></div>`;
    root.querySelector('[data-privacy="analytics-yes"]')?.addEventListener('click',()=>{window.AppAnalytics?.setConsent(true);render()});
    root.querySelector('[data-privacy="analytics-no"]')?.addEventListener('click',()=>{window.AppAnalytics?.setConsent(false);render()});
    root.querySelector('[data-privacy="export"]')?.addEventListener('click',exportData);
    const importInput=root.querySelector('[data-privacy="import-file"]');
    root.querySelector('[data-privacy="import"]')?.addEventListener('click',()=>importInput?.click());
    importInput?.addEventListener('change',importData);
    root.querySelector('[data-privacy="readable"]')?.addEventListener('click',exportReadable);
    root.querySelector('[data-privacy="chat"]')?.addEventListener('click',clearChat);
    root.querySelector('[data-privacy="all"]')?.addEventListener('click',clearAll);
  }
  function exportData(){
    const data={exportVersion:1,exportedAt:new Date().toISOString(),app:'Child Astrology',sourceOrigin:location.origin,data:{}};
    EXPORT_KEYS.forEach((key)=>{const raw=localStorage.getItem(key);if(raw!==null){try{data.data[key]=JSON.parse(raw)}catch(_){data.data[key]=raw}}});
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),link=document.createElement('a');
    link.href=URL.createObjectURL(blob);link.download=`child-astrology-data-${new Date().toISOString().slice(0,10)}.json`;link.click();window.setTimeout(()=>URL.revokeObjectURL(link.href),1000);
  }
  function validBackupValue(key,value){
    if(key==='children'||key==='notes')return Array.isArray(value);
    if(key==='childAstrologyConsultationHistory'||key==='child_astrology_local_analytics_v1')return Boolean(value)&&typeof value==='object'&&!Array.isArray(value);
    if(key==='childAstrologyConsultationChild')return typeof value==='string'||typeof value==='number';
    if(key==='familyScentCodeV1')return Boolean(value)&&typeof value==='object'&&!Array.isArray(value);
    if(key==='language')return ['ru','ua','en','nl'].includes(value);
    return false;
  }
  function storageValue(key,value){return key==='language'||key==='childAstrologyConsultationChild'?String(value):JSON.stringify(value)}
  function restoreBackup(payload,confirmWrite=true){
    if(!payload||payload.app!=='Child Astrology'||!payload.data||typeof payload.data!=='object'||Array.isArray(payload.data))throw new Error('invalid-backup');
    const entries=EXPORT_KEYS.filter((key)=>Object.prototype.hasOwnProperty.call(payload.data,key)).map((key)=>[key,payload.data[key]]);
    if(!entries.length||entries.some(([key,value])=>!validBackupValue(key,value)))throw new Error('invalid-backup-data');
    if(confirmWrite&&!window.confirm(t().importConfirm))return false;
    const previous=new Map(EXPORT_KEYS.map((key)=>[key,localStorage.getItem(key)]));
    try{
      EXPORT_KEYS.forEach((key)=>localStorage.removeItem(key));
      entries.forEach(([key,value])=>localStorage.setItem(key,storageValue(key,value)));
    }catch(error){
      EXPORT_KEYS.forEach((key)=>localStorage.removeItem(key));
      previous.forEach((value,key)=>{if(value!==null)localStorage.setItem(key,value)});
      throw error;
    }
    return true;
  }
  async function importData(event){
    const input=event.currentTarget,file=input.files?.[0];input.value='';if(!file)return;
    if(file.size>5*1024*1024){window.alert(t().importError);return}
    try{
      const payload=JSON.parse(await file.text());
      if(!restoreBackup(payload,true))return;
      window.alert(t().importSuccess);location.reload();
    }catch(_){window.alert(t().importError)}
  }
  function exportReadable(){
    const sections=EXPORT_KEYS.map((key)=>{const raw=localStorage.getItem(key);if(raw===null)return'';let value=raw;try{value=JSON.stringify(JSON.parse(raw),null,2)}catch(_){}return `<section><h2>${escapeHtml(key)}</h2><pre>${escapeHtml(value)}</pre></section>`}).filter(Boolean).join('');
    const html=`<!doctype html><meta charset="utf-8"><title>Child Astrology data export</title><style>body{max-width:900px;margin:40px auto;padding:0 20px;font:16px/1.55 system-ui;color:#24213a}h1,h2{color:#4a2c7a}section{padding:16px 0;border-top:1px solid #ddd}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f6f3fa;padding:16px;border-radius:12px}</style><h1>Child Astrology — readable data export</h1><p>${new Date().toISOString()}</p>${sections||'<p>No saved app data.</p>'}`;
    const blob=new Blob([html],{type:'text/html'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`child-astrology-readable-${new Date().toISOString().slice(0,10)}.html`;link.click();window.setTimeout(()=>URL.revokeObjectURL(link.href),1000);
  }
  function clearChat(){if(!window.confirm(t().confirmChat))return;localStorage.removeItem('childAstrologyConsultationHistory');document.dispatchEvent(new Event('app:privacy-data-changed'));render()}
  function clearAll(){if(!window.confirm(t().confirmAll))return;window.AppAnalytics?.setConsent?.(false);APP_KEYS.forEach((key)=>localStorage.removeItem(key));location.reload()}
  function parentGate(next){
    const adultConfirmed=Boolean(localStorage.getItem(PARENT_KEY));
    document.querySelector('.parent-consent-modal')?.remove();const ui=t(),modal=document.createElement('div');modal.className='parent-consent-modal';
    const title=adultConfirmed?ui.childTitle:ui.parentTitle,text=adultConfirmed?ui.childText:ui.parentText,checkText=adultConfirmed?ui.childCheck:ui.parentCheck;
    modal.innerHTML=`<div class="parent-consent-overlay"><div class="parent-consent-dialog" role="dialog" aria-modal="true" aria-labelledby="parentConsentTitle"><button type="button" class="parent-consent-close" aria-label="${escapeHtml(ui.cancel)}">×</button><h2 id="parentConsentTitle">${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p><p class="parent-consent-tip">${escapeHtml(ui.nickname)}</p><a class="parent-consent-policy-link" href="legal.html?lang=${language()}&doc=privacy" target="_blank" rel="noopener">${escapeHtml(ui.childPolicy)} →</a><label><input type="checkbox"> <span>${escapeHtml(checkText)}</span></label><div class="parent-consent-buttons"><button type="button" data-parent="cancel">${escapeHtml(ui.cancel)}</button><button type="button" data-parent="continue" disabled>${escapeHtml(ui.continue)}</button></div></div></div>`;
    let releaseFocus=()=>{};
    const close=()=>{releaseFocus();modal.remove()},check=modal.querySelector('input'),continueButton=modal.querySelector('[data-parent="continue"]');
    check.addEventListener('change',()=>{continueButton.disabled=!check.checked});
    modal.querySelector('.parent-consent-close').addEventListener('click',close);modal.querySelector('[data-parent="cancel"]').addEventListener('click',close);
    modal.addEventListener('keydown',(event)=>{if(event.key==='Escape')close()});
    continueButton.addEventListener('click',()=>{const confirmedAt=new Date().toISOString(),version='2026-08-27';if(!adultConfirmed)localStorage.setItem(PARENT_KEY,JSON.stringify({confirmedAt,adult:true,authority:true,version}));close();next({confirmedAt,version})});document.body.appendChild(modal);releaseFocus=window.AppModalFocus?.activate(modal,'.parent-consent-close')||releaseFocus;
  }
  function wrapAddChild(){const original=window.addChild;if(typeof original!=='function'||original.__privacyWrapped)return;const wrapped=function(){parentGate((authorityEvidence)=>original(authorityEvidence))};wrapped.__privacyWrapped=true;window.addChild=wrapped}
  const previousChangeLanguage=window.changeLanguage;
  if(typeof previousChangeLanguage==='function'){window.changeLanguage=function(language,event){const result=previousChangeLanguage(language,event);render();return result}}
  document.addEventListener('app:privacy-data-changed',()=>{if(typeof window.renderConsultant==='function')window.renderConsultant()});
  document.addEventListener('DOMContentLoaded',()=>{wrapAddChild();render()});
  window.PrivacyControls={render,parentGate,restoreBackup};
})();
