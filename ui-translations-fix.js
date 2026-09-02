Object.assign(translations.nl,{
  home_title:'Welkom bij Child Astrology',
  nav_children_short:'Kinderen',
  nav_consultation_short:'Consultaties',
  nav_scent_short:'Geur',
  nav_methods_menu:'Methodes',
  note_title_placeholder:'Bijvoorbeeld: observatie van de stemming',
  note_content_placeholder:'Beschrijf je observaties...',
  note_tags_placeholder:'#gedrag #emoties #ontwikkeling',
  nav_scent:'Geur voor ouders',action_scent:'Parent Scent Code · 18+',action_scent_desc:'Een persoonlijke geur uitsluitend voor volwassen ouders en partners',
  method_title:'De 6-stappenmethode',
  method_step1_desc:'Let op het gedrag, de emoties en reacties van je kind zonder oordeel.',
  method_step2_desc:'Maak contact met je eigen gevoel en met wat je kind mogelijk ervaart.',
  method_step3_desc:'Gebruik tarot of astrologische inzichten als hulpmiddel voor reflectie.',
  method_step4_desc:'Herken patronen en mogelijke behoeften achter het gedrag.',
  method_step5_desc:'Kies bewuste, praktische manieren om je kind te ondersteunen.',
  method_step6_desc:'Kijk terug op wat werkte en pas aan waar dat nodig is.',
  sports_intro:'Mars wordt in astrologie verbonden met energie, initiatief en beweging. Zoek het Mars-teken in de geboortehoroscoop van je kind en gebruik de suggesties als inspiratie, niet als vaste regel.',
  learning_title:'Hoe je kind leert',
  learning_intro:'Mercurius wordt in astrologie verbonden met leren en informatie verwerken. Gebruik het Mercurius-teken als extra observatiepunt naast wat je in het dagelijks leven ziet.'
});

Object.assign(translations.ru,{
  home_title:'Добро пожаловать в Child Astrology',
  nav_children_short:'Дети',
  nav_consultation_short:'Консультации',
  nav_scent_short:'Аромат',
  nav_methods_menu:'Методы',
  note_title_placeholder:'Например: наблюдение за настроением',
  note_content_placeholder:'Опишите ваши наблюдения...',
  note_tags_placeholder:'#поведение #эмоции #развитие',
  nav_scent:'Свечи для родителей',action_scent:'Parent Scent Code · 18+',action_scent_desc:'Персональный аромат только для совершеннолетних родителей и партнёров',
  sports_intro:'В астрологии Марс связывают с энергией, инициативой и движением. Найдите знак Марса в натальной карте ребёнка и используйте рекомендации как идеи для наблюдения, а не как строгие правила.',
  learning_title:'Как учится ваш ребёнок',
  learning_intro:'В астрологии Меркурий связывают с обучением и восприятием информации. Используйте знак Меркурия как дополнительную подсказку вместе с реальными наблюдениями за ребёнком.'
});

Object.assign(translations.ua,{
  home_title:'Ласкаво просимо до Child Astrology',
  nav_children_short:'Діти',
  nav_consultation_short:'Консультації',
  nav_scent_short:'Аромат',
  nav_methods_menu:'Методи',
  note_title_placeholder:'Наприклад: спостереження за настроєм',
  note_content_placeholder:'Опишіть ваші спостереження...',
  note_tags_placeholder:'#поведінка #емоції #розвиток',
  nav_scent:'Свічки для батьків',action_scent:'Parent Scent Code · 18+',action_scent_desc:'Персональний аромат лише для повнолітніх батьків і партнерів',
  sports_intro:'В астрології Марс пов’язують з енергією, ініціативою та рухом. Знайдіть знак Марса в натальній карті дитини й використовуйте рекомендації як ідеї для спостереження, а не як суворі правила.',
  learning_title:'Як навчається ваша дитина',
  learning_intro:'В астрології Меркурій пов’язують із навчанням і сприйняттям інформації. Використовуйте знак Меркурія як додаткову підказку разом із реальними спостереженнями за дитиною.'
});

Object.assign(translations.en,{
  home_title:'Welcome to Child Astrology',
  nav_children_short:'Children',
  nav_consultation_short:'Consultations',
  nav_scent_short:'Scent',
  nav_methods_menu:'Methods',
  note_title_placeholder:'For example: mood observation',
  note_content_placeholder:'Describe your observations...',
  note_tags_placeholder:'#behaviour #emotions #development',
  nav_scent:'Parent Scent',action_scent:'Parent Scent Code · 18+',action_scent_desc:'A personal scent only for adult parents and partners',
  sports_intro:"In astrology, Mars is associated with energy, initiative and movement. Find your child's Mars sign and use the suggestions as ideas for observation, not fixed rules.",
  learning_title:'How your child learns',
  learning_intro:"In astrology, Mercury is associated with learning and processing information. Use your child's Mercury sign as an extra observation point alongside what you see in everyday life."
});

(function launchPolish(){
  'use strict';
  const ONBOARDING_KEY='child_astrology_onboarding_v2';
  const PARENT_KEY='child_astrology_parent_confirmed_v1';
  const LANGS=['ru','ua','en','nl'];
  const RELEASE='2026.09.02';
  const copy={
    ru:{toolbar:'Язык',close:'Закрыть',analysis:'Разбор',learning:'Обучение',sport:'Спорт',ask:'Спросить',release:'Версия для запуска',gateTitle:'Перед началом',gateLead:'Child Astrology предназначено для совершеннолетних родителей и законных представителей. Перед входом подтвердите обязательные пункты и выберите настройку необязательной аналитики.',adult:'Мне исполнилось 18 лет.',terms:'Я ознакомилась/ознакомился с Privacy, Cookies и Условиями и понимаю, что данные ребёнка можно добавлять только при наличии законного права.',analyticsTitle:'Необязательная аналитика',analyticsText:'Google Analytics помогает считать открытия и использование разделов. Имена, даты и места рождения, координаты и текст вопросов не отправляются.',allowAnalytics:'Разрешить',denyAnalytics:'Не разрешать',openApp:'Открыть приложение',required:'Обязательное подтверждение',legal:'Privacy, Cookies и Условия',choiceRequired:'Выберите, разрешать ли необязательную аналитику.'},
    ua:{toolbar:'Мова',close:'Закрити',analysis:'Розбір',learning:'Навчання',sport:'Спорт',ask:'Запитати',release:'Версія для запуску',gateTitle:'Перед початком',gateLead:'Child Astrology призначено для повнолітніх батьків і законних представників. Перед входом підтвердьте обов’язкові пункти та виберіть налаштування необов’язкової аналітики.',adult:'Мені виповнилося 18 років.',terms:'Я ознайомилася/ознайомився з Privacy, Cookies та Умовами й розумію, що дані дитини можна додавати лише за наявності законного права.',analyticsTitle:'Необов’язкова аналітика',analyticsText:'Google Analytics допомагає рахувати відкриття та використання розділів. Імена, дати й місця народження, координати та текст запитань не надсилаються.',allowAnalytics:'Дозволити',denyAnalytics:'Не дозволяти',openApp:'Відкрити застосунок',required:'Обов’язкове підтвердження',legal:'Privacy, Cookies та Умови',choiceRequired:'Оберіть, чи дозволяти необов’язкову аналітику.'},
    en:{toolbar:'Language',close:'Close',analysis:'Analysis',learning:'Learning',sport:'Sport',ask:'Ask',release:'Launch version',gateTitle:'Before you begin',gateLead:'Child Astrology is intended for adult parents and legal guardians. Before entering, confirm the required items and choose your optional analytics preference.',adult:'I am 18 years old or older.',terms:'I have read the Privacy, Cookies and Terms information and understand that I may add child data only when I have the legal right to do so.',analyticsTitle:'Optional analytics',analyticsText:'Google Analytics helps count app opens and section usage. Names, birth dates and places, coordinates and question text are never sent.',allowAnalytics:'Allow',denyAnalytics:'Do not allow',openApp:'Open the app',required:'Required confirmation',legal:'Privacy, Cookies and Terms',choiceRequired:'Choose whether to allow optional analytics.'},
    nl:{toolbar:'Taal',close:'Sluiten',analysis:'Analyse',learning:'Leren',sport:'Sport',ask:'Vraag',release:'Launchversie',gateTitle:'Voordat je begint',gateLead:'Child Astrology is bedoeld voor volwassen ouders en wettelijke vertegenwoordigers. Bevestig vóór toegang de verplichte punten en kies je voorkeur voor optionele analyse.',adult:'Ik ben 18 jaar of ouder.',terms:'Ik heb de Privacy-, Cookie- en Voorwaardeninformatie gelezen en begrijp dat ik gegevens van een kind alleen mag toevoegen als ik daartoe wettelijk bevoegd ben.',analyticsTitle:'Optionele analyse',analyticsText:'Google Analytics helpt app-openingen en gebruik van onderdelen te tellen. Namen, geboortedata en -plaatsen, coördinaten en vraagteksten worden nooit verzonden.',allowAnalytics:'Toestaan',denyAnalytics:'Niet toestaan',openApp:'App openen',required:'Verplichte bevestiging',legal:'Privacy, Cookies en Voorwaarden',choiceRequired:'Kies of je optionele analyse wilt toestaan.'}
  };
  const lang=()=>LANGS.includes(window.currentLanguage)?window.currentLanguage:(LANGS.includes(localStorage.getItem('language'))?localStorage.getItem('language'):'nl');
  const t=()=>copy[lang()]||copy.nl;
  function launchGateAlreadyAccepted(){
    try{const value=JSON.parse(localStorage.getItem(PARENT_KEY)||'null');return Boolean(value&&value.launchGate===true);}catch(_){return false;}
  }
  function installStyles(){
    if(document.getElementById('launchPolishStyles'))return;
    const style=document.createElement('style');style.id='launchPolishStyles';style.textContent=`
      :root{--safe-bottom:env(safe-area-inset-bottom,0px)}
      body{padding-bottom:var(--safe-bottom)}
      body.launch-gate-open{overflow:hidden;touch-action:none}
      .launch-gate{position:fixed;inset:0;z-index:20000;background:linear-gradient(160deg,rgba(20,13,57,.98),rgba(85,35,120,.97));display:flex;align-items:center;justify-content:center;padding:18px;overflow:auto}
      .launch-gate-card{width:min(560px,100%);max-height:94vh;overflow:auto;background:#fff;border:1px solid rgba(232,194,61,.55);border-radius:28px;padding:26px;box-shadow:0 28px 90px rgba(0,0,0,.45);color:#273247}
      .launch-gate-brand{text-align:center;margin-bottom:12px}.launch-gate-brand strong{display:block;color:#5b2b87;font-size:22px}.launch-gate-brand span{font-size:13px;opacity:.7}
      .launch-gate h2{margin:8px 0 10px;color:#5b2b87;font-size:clamp(27px,7vw,38px);line-height:1.06}.launch-gate p{font-size:16px;line-height:1.55}.launch-gate-language{display:flex;gap:8px;justify-content:center;margin:14px 0 18px}.launch-gate-language button{min-width:54px;min-height:42px;border-radius:14px;border:1px solid #d9d1e4;background:#fff;font-weight:800;color:#4f2a73}.launch-gate-language button.active{background:#f3ca35;border-color:#f3ca35;color:#37205c;box-shadow:0 7px 18px rgba(243,202,53,.3)}
      .launch-gate-required{background:#faf8fd;border:1px solid #e8e0ef;border-radius:18px;padding:14px;margin:16px 0}.launch-gate-required strong{display:block;color:#55307c;margin-bottom:10px}.launch-gate-check{display:flex;gap:10px;align-items:flex-start;margin:11px 0;font-size:15px;line-height:1.42}.launch-gate-check input{width:20px;height:20px;margin-top:1px;flex:0 0 auto}
      .launch-gate-legal{display:inline-block;margin:4px 0 8px;color:#5b2b87;font-weight:800;text-decoration:none}.launch-gate-analytics{border-top:1px solid #eee;padding-top:14px}.launch-gate-analytics h3{color:#55307c;margin:0 0 6px}.launch-gate-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}.launch-gate-option{border:1px solid #d9d1e4;border-radius:16px;padding:12px;display:flex;gap:8px;align-items:center;font-weight:800;color:#4f2a73;background:#fff}.launch-gate-option:has(input:checked){border-color:#e0b71e;background:#fff9df}.launch-gate-option input{width:20px;height:20px}
      .launch-gate-note{font-size:13px!important;opacity:.72}.launch-gate-open-btn{width:100%;min-height:54px;border:0;border-radius:16px;background:#f3ca35;color:#3f235f;font-size:17px;font-weight:900;margin-top:8px}.launch-gate-open-btn:disabled{opacity:.42;filter:grayscale(.2)}
      .child-launch-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}.child-launch-actions button{min-height:42px;border:1px solid rgba(91,43,135,.18);border-radius:12px;background:#faf8ff;color:#4b276f;font-weight:700;padding:8px}
      .launch-release{font-size:12px;opacity:.65;text-align:center;margin-top:14px}.main-toolbar [data-analysis-label="language"]{min-width:64px}
      @media(max-width:768px){.main-content{padding-bottom:calc(96px + var(--safe-bottom))}.mobile-bottom-nav{padding-bottom:var(--safe-bottom)}.launch-gate{align-items:flex-end;padding:10px}.launch-gate-card{border-radius:26px 26px 18px 18px;max-height:92vh;padding:22px 18px}.info-block{overflow-wrap:anywhere}.card-title{line-height:1.08}.child-launch-actions{grid-template-columns:1fr 1fr}}
      @media(max-width:390px){.child-launch-actions{grid-template-columns:1fr}.lang-btn{min-width:0}.main-language-buttons{gap:6px}.launch-gate-options{grid-template-columns:1fr}.launch-gate-language{gap:5px}.launch-gate-language button{min-width:48px}}
    `;document.head.appendChild(style);
  }
  function syncA11y(){
    document.querySelectorAll('.lang-btn[data-language]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.language===lang())));
    const label=document.querySelector('[data-analysis-label="language"]');if(label)label.textContent=t().toolbar;
    const close=document.querySelector('.mobile-methods-close');if(close)close.setAttribute('aria-label',t().close);
  }
  function enhanceChildCards(){
    const grid=document.getElementById('childrenGrid');if(!grid)return;
    const cards=[...grid.querySelectorAll('.child-card')];
    cards.forEach((card,index)=>{
      if(card.querySelector('.child-launch-actions'))return;
      const child=window.children?.[index] || window.children?.find?.(item=>card.textContent.includes(item.name));
      if(!child)return;
      const actions=document.createElement('div');actions.className='child-launch-actions';
      actions.innerHTML=`<button type="button" data-action="show-child-analysis" data-child-id="${Number(child.id)}">✨ ${t().analysis}</button><button type="button" data-section="learning">📚 ${t().learning}</button><button type="button" data-section="sports">🏃 ${t().sport}</button><button type="button" data-section="consultation">💬 ${t().ask}</button>`;
      card.appendChild(actions);
    });
  }
  function addReleaseBadge(){
    const settings=document.getElementById('settings');if(!settings||settings.querySelector('.launch-release'))return;
    const badge=document.createElement('div');badge.className='launch-release';badge.textContent=`${t().release}: ${RELEASE}`;settings.querySelector('.card')?.appendChild(badge);
  }
  function setAppInert(value){
    document.querySelector('.app')?.toggleAttribute('inert',value);
    document.querySelector('.mobile-bottom-nav')?.toggleAttribute('inert',value);
    document.querySelector('#mobileMethodsMenu')?.toggleAttribute('inert',value);
  }
  function renderLaunchGate(){
    let root=document.querySelector('.launch-gate');if(!root){root=document.createElement('div');root.className='launch-gate';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');document.body.appendChild(root);}
    document.body.classList.add('launch-gate-open');setAppInert(true);
    const text=t();
    root.innerHTML=`<div class="launch-gate-card"><div class="launch-gate-brand"><strong>CHILD ASTROLOGY</strong><span>EK · Ella Kristioglo</span></div><div class="launch-gate-language">${LANGS.map(code=>`<button type="button" data-gate-lang="${code}" class="${code===lang()?'active':''}" aria-pressed="${code===lang()}">${code.toUpperCase()}</button>`).join('')}</div><h2>${text.gateTitle}</h2><p>${text.gateLead}</p><div class="launch-gate-required"><strong>${text.required}</strong><label class="launch-gate-check"><input type="checkbox" data-gate-adult><span>${text.adult}</span></label><label class="launch-gate-check"><input type="checkbox" data-gate-terms><span>${text.terms}</span></label><a class="launch-gate-legal" href="legal.html?lang=${lang()}" target="_blank" rel="noopener">${text.legal} →</a></div><div class="launch-gate-analytics"><h3>${text.analyticsTitle}</h3><p>${text.analyticsText}</p><div class="launch-gate-options"><label class="launch-gate-option"><input type="radio" name="launchAnalytics" value="yes"><span>${text.allowAnalytics}</span></label><label class="launch-gate-option"><input type="radio" name="launchAnalytics" value="no"><span>${text.denyAnalytics}</span></label></div><p class="launch-gate-note">${text.choiceRequired}</p></div><button class="launch-gate-open-btn" type="button" disabled>${text.openApp}</button></div>`;
    const adult=root.querySelector('[data-gate-adult]'),terms=root.querySelector('[data-gate-terms]'),open=root.querySelector('.launch-gate-open-btn');
    const refresh=()=>{open.disabled=!(adult.checked&&terms.checked&&root.querySelector('input[name="launchAnalytics"]:checked'));};
    adult.addEventListener('change',refresh);terms.addEventListener('change',refresh);root.querySelectorAll('input[name="launchAnalytics"]').forEach(input=>input.addEventListener('change',refresh));
    root.querySelectorAll('[data-gate-lang]').forEach(button=>button.addEventListener('click',()=>{const chosen=button.dataset.gateLang;localStorage.setItem('language',chosen);try{window.changeLanguage?.(chosen);}catch(_){}renderLaunchGate();}));
    open.addEventListener('click',()=>{
      const analyticsChoice=root.querySelector('input[name="launchAnalytics"]:checked')?.value;if(!adult.checked||!terms.checked||!analyticsChoice)return;
      const granted=analyticsChoice==='yes';
      if(window.AppAnalytics?.setConsent)window.AppAnalytics.setConsent(granted);else localStorage.setItem('child_astrology_analytics_consent_v2',granted?'granted':'denied');
      localStorage.setItem(PARENT_KEY,JSON.stringify({confirmedAt:new Date().toISOString(),adult:true,authorityNotice:true,termsAccepted:true,launchGate:true,version:'2026-09-02'}));
      localStorage.setItem(ONBOARDING_KEY,'done');
      setAppInert(false);document.body.classList.remove('launch-gate-open');root.remove();window.showSection?.('home');
    });
    window.AppModalFocus?.activate(root,'[data-gate-adult]');
  }
  function install(){
    installStyles();syncA11y();enhanceChildCards();addReleaseBadge();
    const originalLoad=window.loadChildren;if(typeof originalLoad==='function'&&!originalLoad.__launchPolished){const wrapped=function(){const result=originalLoad.apply(this,arguments);enhanceChildCards();return result;};wrapped.__launchPolished=true;window.loadChildren=wrapped;}
    const originalLanguage=window.changeLanguage;if(typeof originalLanguage==='function'&&!originalLanguage.__launchPolished){const wrapped=function(){const result=originalLanguage.apply(this,arguments);setTimeout(()=>{syncA11y();enhanceChildCards();document.querySelector('.launch-release')?.remove();addReleaseBadge();if(document.querySelector('.launch-gate'))renderLaunchGate();},0);return result;};wrapped.__launchPolished=true;window.changeLanguage=wrapped;}
    const grid=document.getElementById('childrenGrid');if(grid)new MutationObserver(()=>enhanceChildCards()).observe(grid,{childList:true});
    if(!launchGateAlreadyAccepted())setTimeout(renderLaunchGate,120);else localStorage.setItem(ONBOARDING_KEY,'done');
  }
  window.addEventListener('load',install,{once:true});
})();