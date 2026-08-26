(function () {
  'use strict';

  const CONFIG = window.CHILD_ASTROLOGY_ANALYTICS || {};
  const CONSENT_KEY = 'child_astrology_analytics_consent';
  const LOCAL_KEY = 'child_astrology_local_analytics_v1';
  const OWNER_KEY = 'child_astrology_owner_analytics';
  const ALLOWED_EVENTS = new Set([
    'app_open','section_view','child_profile_created','child_analysis_generated',
    'consultation_question','question_emotion','question_fear','question_learning',
    'question_communication','question_sport','question_health','question_other',
    'tarot_day_card','tarot_five_card','scent_generated','scent_order_started'
  ]);
  const SAFE_PARAMS = new Set(['section','topic','language','mode','source']);
  const COPY = {
    ru:{title:'Аналитика приложения',connected:'Анонимная аналитика подключена.',pending:'Модуль аналитики готов. Для общего счётчика нужно добавить идентификатор Google Analytics.',privacy:'Передаются только просмотры разделов и категории вопросов. Имена, даты рождения и текст вопросов не отправляются.',open:'Открыть общую аналитику',device:'На этом устройстве',opens:'Открытий',questions:'Вопросов',topics:'Темы вопросов',consent:'Разрешить анонимную аналитику',allow:'Разрешить',decline:'Не сейчас',empty:'Данных пока нет.'},
    ua:{title:'Аналітика застосунку',connected:'Анонімну аналітику підключено.',pending:'Модуль аналітики готовий. Для загального лічильника потрібно додати ідентифікатор Google Analytics.',privacy:'Передаються лише перегляди розділів і категорії запитань. Імена, дати народження й тексти запитань не надсилаються.',open:'Відкрити загальну аналітику',device:'На цьому пристрої',opens:'Відкриттів',questions:'Запитань',topics:'Теми запитань',consent:'Дозволити анонімну аналітику',allow:'Дозволити',decline:'Не зараз',empty:'Даних поки немає.'},
    en:{title:'App analytics',connected:'Anonymous analytics is connected.',pending:'The analytics module is ready. Add a Google Analytics ID to enable totals across all devices.',privacy:'Only section views and question categories are sent. Names, birth details and question text are never sent.',open:'Open overall analytics',device:'On this device',opens:'Opens',questions:'Questions',topics:'Question topics',consent:'Allow anonymous analytics',allow:'Allow',decline:'Not now',empty:'No data yet.'},
    nl:{title:'App-analyse',connected:'Anonieme analyse is verbonden.',pending:'De analysemodule is gereed. Voeg een Google Analytics-ID toe om totalen van alle apparaten te zien.',privacy:'Alleen bekeken onderdelen en vraagcategorieën worden verzonden. Namen, geboortegegevens en vraagteksten worden nooit verzonden.',open:'Totale analyse openen',device:'Op dit apparaat',opens:'Openingen',questions:'Vragen',topics:'Vraagthema’s',consent:'Anonieme analyse toestaan',allow:'Toestaan',decline:'Niet nu',empty:'Nog geen gegevens.'}
  };
  const TOPIC_LABELS = {
    ru:{emotion:'Эмоции',fear:'Тревога и страх',learning:'Обучение',communication:'Общение',sport:'Спорт',health:'Здоровье',other:'Другое'},
    ua:{emotion:'Емоції',fear:'Тривога і страх',learning:'Навчання',communication:'Спілкування',sport:'Спорт',health:'Здоров’я',other:'Інше'},
    en:{emotion:'Emotions',fear:'Anxiety and fear',learning:'Learning',communication:'Communication',sport:'Sport',health:'Health',other:'Other'},
    nl:{emotion:'Emoties',fear:'Angst en spanning',learning:'Leren',communication:'Communicatie',sport:'Sport',health:'Gezondheid',other:'Overig'}
  };

  function language(){const value=localStorage.getItem('language')||window.currentLanguage||'nl';return COPY[value]?value:'nl'}
  function text(){return COPY[language()]}
  function validMeasurementId(){return /^G-[A-Z0-9]{6,}$/i.test(String(CONFIG.measurementId||'').trim())}
  function consent(){return localStorage.getItem(CONSENT_KEY)==='granted'}
  function readLocal(){try{return JSON.parse(localStorage.getItem(LOCAL_KEY)||'{"events":{},"topics":{}}')}catch(_){return{events:{},topics:{}}}}
  function writeLocal(data){try{localStorage.setItem(LOCAL_KEY,JSON.stringify(data))}catch(_){}}
  function remember(eventName,params){const data=readLocal();data.events[eventName]=(data.events[eventName]||0)+1;if(eventName==='consultation_question'&&params.topic)data.topics[params.topic]=(data.topics[params.topic]||0)+1;writeLocal(data)}
  function safeParams(params){const output={};Object.entries(params||{}).forEach(([key,value])=>{if(SAFE_PARAMS.has(key)&&['string','number','boolean'].includes(typeof value))output[key]=String(value).slice(0,40)});output.language=language();return output}
  function loadGoogleTag(){
    if(!validMeasurementId()||!consent()||window.__childAstrologyGtagLoaded)return;
    window.__childAstrologyGtagLoaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
    window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js',new Date());
    window.gtag('config',CONFIG.measurementId,{send_page_view:true,allow_google_signals:false,allow_ad_personalization_signals:false});
    const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(CONFIG.measurementId)}`;document.head.appendChild(script);
  }
  function track(eventName,params){
    if(!ALLOWED_EVENTS.has(eventName))return;
    const clean=safeParams(params);
    remember(eventName,clean);
    if(validMeasurementId()&&consent()){loadGoogleTag();window.gtag?.('event',eventName,clean)}
    renderPanel();
  }
  function setConsent(value){localStorage.setItem(CONSENT_KEY,value?'granted':'denied');if(value)loadGoogleTag();else window.gtag?.('consent','update',{analytics_storage:'denied'});renderPanel()}
  function ownerMode(){const query=new URLSearchParams(location.search);if(query.get('owner')==='ella')localStorage.setItem(OWNER_KEY,'1');return localStorage.getItem(OWNER_KEY)==='1'}
  function renderConsent(){
    document.getElementById('analyticsConsentPrompt')?.remove();
    if(!validMeasurementId()||localStorage.getItem(CONSENT_KEY))return;
    const ui=text(),box=document.createElement('div');box.id='analyticsConsentPrompt';box.className='analytics-consent-prompt';
    box.innerHTML=`<strong>${ui.consent}</strong><p>${ui.privacy}</p><div><button type="button" data-consent="no">${ui.decline}</button><button class="primary" type="button" data-consent="yes">${ui.allow}</button></div>`;
    box.querySelector('[data-consent="no"]').addEventListener('click',()=>{setConsent(false);box.remove()});
    box.querySelector('[data-consent="yes"]').addEventListener('click',()=>{setConsent(true);box.remove()});document.body.appendChild(box);
  }
  function renderPanel(){
    const root=document.getElementById('analyticsPanel');if(!root)return;
    if(!ownerMode()){root.hidden=true;return}root.hidden=false;
    const ui=text(),data=readLocal(),topics=Object.entries(data.topics||{}).sort((a,b)=>b[1]-a[1]);
    root.innerHTML=`<div class="analytics-card"><div class="analytics-heading"><span class="analytics-symbol" aria-hidden="true">↗</span><div><h3>${ui.title}</h3><p>${validMeasurementId()?ui.connected:ui.pending}</p></div></div><p class="analytics-privacy">${ui.privacy}</p>${validMeasurementId()?`<label class="analytics-consent"><input id="analyticsConsent" type="checkbox" ${consent()?'checked':''}><span>${ui.consent}</span></label>`:''}<div class="analytics-local"><strong>${ui.device}</strong><div class="analytics-kpis"><span><b>${data.events?.app_open||0}</b>${ui.opens}</span><span><b>${data.events?.consultation_question||0}</b>${ui.questions}</span></div><h4>${ui.topics}</h4>${topics.length?`<ol>${topics.map(([key,count])=>`<li><span>${TOPIC_LABELS[language()][key]||key}</span><b>${count}</b></li>`).join('')}</ol>`:`<p>${ui.empty}</p>`}</div>${validMeasurementId()?`<a class="btn analytics-open" href="${CONFIG.dashboardUrl}" target="_blank" rel="noopener">${ui.open}</a>`:''}</div>`;
    root.querySelector('#analyticsConsent')?.addEventListener('change',event=>setConsent(event.target.checked));
  }
  function bindNavigation(){
    const original=window.showSection;if(typeof original==='function'&&!original.__analyticsWrapped){const wrapped=function(sectionId,event){const result=original(sectionId,event);track('section_view',{section:sectionId});return result};wrapped.__analyticsWrapped=true;window.showSection=wrapped}
    const change=window.changeLanguage;if(typeof change==='function'&&!change.__analyticsWrapped){const wrapped=function(language,event){const result=change(language,event);renderPanel();renderConsent();return result};wrapped.__analyticsWrapped=true;window.changeLanguage=wrapped}
  }
  window.AppAnalytics={track,render:renderPanel,setConsent,isConnected:validMeasurementId};
  document.addEventListener('app:consultation-question',event=>{const topic=event.detail?.topic||'other';track('consultation_question',{topic});track(`question_${TOPIC_LABELS.en[topic]?topic:'other'}`,{topic})});
  document.addEventListener('app:child-created',()=>track('child_profile_created'));
  document.addEventListener('app:child-analysis',()=>track('child_analysis_generated'));
  document.addEventListener('app:tarot-day-card',()=>track('tarot_day_card'));
  document.addEventListener('app:tarot-five-card',()=>track('tarot_five_card'));
  document.addEventListener('app:scent-generated',event=>track('scent_generated',{mode:event.detail?.mode||'family'}));
  document.addEventListener('app:scent-order',event=>track('scent_order_started',{mode:event.detail?.mode||'family'}));
  document.addEventListener('DOMContentLoaded',()=>{loadGoogleTag();bindNavigation();track('app_open',{source:window.matchMedia?.('(display-mode: standalone)').matches?'installed':'browser'});renderPanel();renderConsent()});
})();
