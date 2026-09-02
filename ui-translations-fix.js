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
  const LANGS=['ru','ua','en','nl'];
  const RELEASE='2026.09.02';
  const copy={
    ru:{toolbar:'Язык',close:'Закрыть',skip:'Пропустить',next:'Далее',start:'Начать',welcome:'Добро пожаловать в Child Astrology',welcomeText:'Приложение помогает наблюдать характер, эмоции, обучение и сильные стороны ребёнка через астрологические символы и практические вопросы.',privacy:'Данные остаются у вас',privacyText:'Профили, заметки и история хранятся на этом устройстве. Полное имя ребёнка не требуется. Астрология не используется для диагнозов или важных медицинских, юридических и безопасностных решений.',begin:'Начните с профиля ребёнка',beginText:'Добавьте ребёнка один раз, затем переходите к его разбору, обучению, спорту, советам и помощнику для родителей.',analysis:'Разбор',learning:'Обучение',sport:'Спорт',ask:'Спросить',release:'Версия для запуска'},
    ua:{toolbar:'Мова',close:'Закрити',skip:'Пропустити',next:'Далі',start:'Почати',welcome:'Ласкаво просимо до Child Astrology',welcomeText:'Застосунок допомагає спостерігати характер, емоції, навчання та сильні сторони дитини через астрологічні символи й практичні запитання.',privacy:'Дані залишаються у вас',privacyText:'Профілі, нотатки та історія зберігаються на цьому пристрої. Повне ім’я дитини не потрібне. Астрологія не використовується для діагнозів або важливих медичних, юридичних і безпекових рішень.',begin:'Почніть із профілю дитини',beginText:'Додайте дитину один раз, а потім переходьте до її розбору, навчання, спорту, порад і помічника для батьків.',analysis:'Розбір',learning:'Навчання',sport:'Спорт',ask:'Запитати',release:'Версія для запуску'},
    en:{toolbar:'Language',close:'Close',skip:'Skip',next:'Next',start:'Get started',welcome:'Welcome to Child Astrology',welcomeText:'The app helps you observe a child’s character, emotions, learning style and strengths through astrological symbols and practical questions.',privacy:'Your data stays with you',privacyText:'Profiles, notes and history stay on this device. A child’s full name is not required. Astrology is not used for diagnosis or important medical, legal or safety decisions.',begin:'Start with a child profile',beginText:'Add a child once, then move directly to their analysis, learning, sport, tips and parent guide.',analysis:'Analysis',learning:'Learning',sport:'Sport',ask:'Ask',release:'Launch version'},
    nl:{toolbar:'Taal',close:'Sluiten',skip:'Overslaan',next:'Volgende',start:'Aan de slag',welcome:'Welkom bij Child Astrology',welcomeText:'De app helpt je karakter, emoties, leerstijl en sterke kanten van een kind te observeren via astrologische symbolen en praktische vragen.',privacy:'Je gegevens blijven bij jou',privacyText:'Profielen, notities en geschiedenis blijven op dit apparaat. De volledige naam van een kind is niet nodig. Astrologie wordt niet gebruikt voor diagnoses of belangrijke medische, juridische of veiligheidsbeslissingen.',begin:'Begin met een kinderprofiel',beginText:'Voeg een kind één keer toe en ga daarna direct naar analyse, leren, sport, tips en de oudergids.',analysis:'Analyse',learning:'Leren',sport:'Sport',ask:'Vraag',release:'Launchversie'}
  };
  const lang=()=>LANGS.includes(window.currentLanguage)?window.currentLanguage:(LANGS.includes(localStorage.getItem('language'))?localStorage.getItem('language'):'nl');
  const t=()=>copy[lang()]||copy.nl;
  function installStyles(){
    if(document.getElementById('launchPolishStyles'))return;
    const style=document.createElement('style');style.id='launchPolishStyles';style.textContent=`
      :root{--safe-bottom:env(safe-area-inset-bottom,0px)}
      body{padding-bottom:var(--safe-bottom)}
      .launch-onboarding{position:fixed;inset:0;z-index:10000;background:rgba(16,11,45,.78);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px}
      .launch-onboarding-card{width:min(520px,100%);background:#fff;border-radius:28px;padding:26px;box-shadow:0 24px 80px rgba(0,0,0,.35);color:#20253b}
      .launch-onboarding-card h2{margin:8px 0 12px;color:#5b2b87;font-size:clamp(26px,7vw,38px);line-height:1.05}.launch-onboarding-card p{font-size:17px;line-height:1.6;margin:0 0 20px}.launch-onboarding-icon{font-size:46px}.launch-onboarding-actions{display:flex;gap:10px;justify-content:space-between;align-items:center}.launch-onboarding-actions button{min-height:48px;border-radius:16px;padding:0 18px;border:1px solid #ddd;background:#fff;font-weight:700}.launch-onboarding-actions .primary{border:0;background:#f2c52e;color:#39215f}
      .child-launch-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}.child-launch-actions button{min-height:42px;border:1px solid rgba(91,43,135,.18);border-radius:12px;background:#faf8ff;color:#4b276f;font-weight:700;padding:8px}
      .launch-release{font-size:12px;opacity:.65;text-align:center;margin-top:14px}.main-toolbar [data-analysis-label="language"]{min-width:64px}
      @media(max-width:768px){.main-content{padding-bottom:calc(96px + var(--safe-bottom))}.mobile-bottom-nav{padding-bottom:var(--safe-bottom)}.launch-onboarding{align-items:flex-end;padding:10px}.launch-onboarding-card{border-radius:26px 26px 18px 18px;max-height:88vh;overflow:auto}.info-block{overflow-wrap:anywhere}.card-title{line-height:1.08}.child-launch-actions{grid-template-columns:1fr 1fr}}
      @media(max-width:390px){.child-launch-actions{grid-template-columns:1fr}.lang-btn{min-width:0}.main-language-buttons{gap:6px}}
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
  function renderOnboarding(step=0){
    let root=document.querySelector('.launch-onboarding');
    if(!root){root=document.createElement('div');root.className='launch-onboarding';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');document.body.appendChild(root);}
    const text=t();const pages=[{icon:'✨',title:text.welcome,body:text.welcomeText},{icon:'🔒',title:text.privacy,body:text.privacyText},{icon:'👶',title:text.begin,body:text.beginText}];const page=pages[step];
    root.innerHTML=`<div class="launch-onboarding-card"><div class="launch-onboarding-icon" aria-hidden="true">${page.icon}</div><h2>${page.title}</h2><p>${page.body}</p><div class="launch-onboarding-actions"><button type="button" data-onboarding-skip>${text.skip}</button><span>${step+1}/3</span><button type="button" class="primary" data-onboarding-next>${step===2?text.start:text.next}</button></div></div>`;
    root.querySelector('[data-onboarding-skip]').onclick=()=>finishOnboarding(false);
    root.querySelector('[data-onboarding-next]').onclick=()=>step===2?finishOnboarding(true):renderOnboarding(step+1);
    window.AppModalFocus?.activate(root,'[data-onboarding-next]');
  }
  function finishOnboarding(openChildren){
    localStorage.setItem(ONBOARDING_KEY,'done');document.querySelector('.launch-onboarding')?.remove();if(openChildren)window.showSection?.('children');
  }
  function install(){
    installStyles();syncA11y();enhanceChildCards();addReleaseBadge();
    const originalLoad=window.loadChildren;if(typeof originalLoad==='function'&&!originalLoad.__launchPolished){const wrapped=function(){const result=originalLoad.apply(this,arguments);enhanceChildCards();return result;};wrapped.__launchPolished=true;window.loadChildren=wrapped;}
    const originalLanguage=window.changeLanguage;if(typeof originalLanguage==='function'&&!originalLanguage.__launchPolished){const wrapped=function(){const result=originalLanguage.apply(this,arguments);setTimeout(()=>{syncA11y();enhanceChildCards();document.querySelector('.launch-release')?.remove();addReleaseBadge();if(document.querySelector('.launch-onboarding'))renderOnboarding(0);},0);return result;};wrapped.__launchPolished=true;window.changeLanguage=wrapped;}
    const grid=document.getElementById('childrenGrid');if(grid)new MutationObserver(()=>enhanceChildCards()).observe(grid,{childList:true});
    if(!localStorage.getItem(ONBOARDING_KEY))setTimeout(()=>renderOnboarding(0),350);
  }
  window.addEventListener('load',install,{once:true});
})();