// Force the current launch consent screen once for existing installations.
// After the user confirms it, the gate will not repeat on every app open.
(function refreshLaunchConsentOnce() {
  const refreshKey = 'child_astrology_consent_refresh_20260902_v1';
  const parentKey = 'child_astrology_parent_confirmed_v1';
  try {
    if (!localStorage.getItem(refreshKey)) {
      localStorage.removeItem(parentKey);
      localStorage.setItem(refreshKey, '1');
    }
  } catch (_) {}
})();

// Production GA4 stream for childastrologyapp.com
window.CHILD_ASTROLOGY_ANALYTICS = Object.freeze({
  measurementId: 'G-SZHFB9KVM4',
  dashboardUrl: 'https://analytics.google.com/analytics/web/'
});

(function setupMethodsHub(){
  'use strict';
  const COPY={
    ru:{title:'Все методы',intro:'Выберите нужный раздел.',method:'Метод 6 шагов',sports:'Спорт по Марсу',learning:'Обучение по Меркурию',tips:'10 советов родителям',consultation:'Помощник для родителей'},
    ua:{title:'Усі методи',intro:'Оберіть потрібний розділ.',method:'Метод 6 кроків',sports:'Спорт за Марсом',learning:'Навчання за Меркурієм',tips:'10 порад батькам',consultation:'Помічник для батьків'},
    en:{title:'All methods',intro:'Choose the section you need.',method:'6-step method',sports:'Sports by Mars',learning:'Learning by Mercury',tips:'10 tips for parents',consultation:'Parent guide'},
    nl:{title:'Alle methoden',intro:'Kies het onderdeel dat je nodig hebt.',method:'6-stappenmethode',sports:'Sport via Mars',learning:'Leren via Mercurius',tips:'10 tips voor ouders',consultation:'Oudergids'}
  };
  const lang=()=>COPY[localStorage.getItem('language')]?localStorage.getItem('language'):(COPY[window.currentLanguage]?window.currentLanguage:'nl');
  const text=()=>COPY[lang()]||COPY.nl;
  function installStyles(){
    if(document.getElementById('methodsHubStyles'))return;
    const style=document.createElement('style');style.id='methodsHubStyles';style.textContent=`
      .methods-hub{padding:4px 0 10px}.methods-hub-title{font-size:clamp(28px,7vw,42px);line-height:1.05;color:#5b2b87;margin:0 0 8px}.methods-hub-intro{font-size:16px;color:#586174;margin:0 0 22px}.methods-hub-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.methods-hub-card{min-height:132px;border:1px solid rgba(91,43,135,.16);border-radius:22px;background:#fff;box-shadow:0 10px 28px rgba(57,33,95,.08);padding:18px;text-align:left;display:flex;flex-direction:column;justify-content:center;gap:10px;color:#4e2873;font-weight:800;font-size:18px}.methods-hub-card .methods-hub-icon{font-size:34px;line-height:1}.methods-hub-card:active{transform:scale(.985)}
      @media(max-width:620px){.methods-hub-grid{grid-template-columns:1fr}.methods-hub-card{min-height:106px;flex-direction:row;align-items:center;justify-content:flex-start;font-size:18px}.methods-hub-card .methods-hub-icon{font-size:30px}}
    `;document.head.appendChild(style);
  }
  function render(){
    const section=document.getElementById('settings');if(!section)return;
    installStyles();
    const t=text();
    section.innerHTML=`<div class="card"><div class="methods-hub"><h2 class="methods-hub-title">✨ ${t.title}</h2><p class="methods-hub-intro">${t.intro}</p><div class="methods-hub-grid"><button type="button" class="methods-hub-card" data-section="method"><span class="methods-hub-icon">✨</span><span>${t.method}</span></button><button type="button" class="methods-hub-card" data-section="sports"><span class="methods-hub-icon">🏃</span><span>${t.sports}</span></button><button type="button" class="methods-hub-card" data-section="learning"><span class="methods-hub-icon">📚</span><span>${t.learning}</span></button><button type="button" class="methods-hub-card" data-section="tips"><span class="methods-hub-icon">💡</span><span>${t.tips}</span></button><button type="button" class="methods-hub-card" data-section="consultation"><span class="methods-hub-icon">💬</span><span>${t.consultation}</span></button></div></div></div>`;
    document.querySelectorAll('[data-section="settings"] [data-lang="nav_settings"], .mobile-method-option[data-section="settings"] span').forEach(el=>{el.textContent=t.title;});
  }
  window.addEventListener('load',()=>window.setTimeout(render,80),{once:true});
  document.addEventListener('click',(event)=>{
    if(event.target.closest('[data-language]'))window.setTimeout(render,80);
  });
})();

(function addTomaKristiogloCredit(){
  'use strict';
  function installStyle(){
    if(document.getElementById('tomaKristiogloCreditStyle'))return;
    const style=document.createElement('style');
    style.id='tomaKristiogloCreditStyle';
    style.textContent='.toma-kristioglo-credit{margin:22px 0 8px;text-align:center;color:rgba(255,255,255,.82);font-size:13px;font-weight:600;letter-spacing:.08em}.toma-kristioglo-credit::before{content:"✦ ";color:#d4af37}.toma-kristioglo-credit::after{content:" ✦";color:#d4af37}';
    document.head.appendChild(style);
  }
  function renderCredit(){
    const root=document.getElementById('familyScentApp');
    if(!root)return;
    installStyle();
    let credit=root.querySelector('.toma-kristioglo-credit');
    if(!credit){
      credit=document.createElement('div');
      credit.className='toma-kristioglo-credit';
      root.appendChild(credit);
    }
    credit.textContent='Toma Kristioglo';
  }
  window.addEventListener('load',()=>{
    const root=document.getElementById('familyScentApp');
    if(!root)return;
    renderCredit();
    new MutationObserver(()=>renderCredit()).observe(root,{childList:true,subtree:false});
  },{once:true});
})();
