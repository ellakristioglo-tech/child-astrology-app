const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');

test('city search is bundled and sends no birthplace query to a remote geocoder', () => {
  const sources = ['index.html','city-search.js','child-modal.js','family-scent.js'].map(read).join('\n');
  assert.doesNotMatch(sources, /geocoding-api|open-meteo\.com/i);
  assert.match(read('index.html'), /city-search\.js/);
  const cities = JSON.parse(read('assets/cities-15000.min.json'));
  assert.ok(cities.length > 20000);
  assert.ok(cities.some((row) => row[1] === 'Comrat' && row[7]));
  assert.ok(cities.some((row) => row[1] === 'Utrecht' && row[7]));
  assert.ok(cities.some((row) => row[1] === 'Kyiv' && row[7]));
});

test('coordinates are removed before child data is persisted', () => {
  const analysis = read('child-analysis.js');
  const modal = read('child-modal.js');
  assert.match(analysis, /delete stored\.latitude;\s*delete stored\.longitude;\s*localStorage\.setItem\('children'/);
  assert.match(analysis, /if \(!force && child\.natalChart\?\.calculationVersion === CALCULATION_VERSION\)/);
  assert.match(modal, /calculateChildNatalChart\(child, true\)/);
  const beforeCalculation = modal.slice(modal.indexOf('function saveChildProfile'), modal.indexOf('calculateChildNatalChart(child, true)'));
  assert.doesNotMatch(beforeCalculation, /localStorage\.setItem\('children'/);
});

test('authority is confirmed for every child and the child privacy notice is linked', () => {
  const privacy = read('privacy-controls.js');
  const modal = read('child-modal.js');
  const gate = privacy.slice(privacy.indexOf('function parentGate'), privacy.indexOf('function wrapAddChild'));
  assert.doesNotMatch(gate, /if\s*\(localStorage\.getItem\(PARENT_KEY\)\)\s*\{next\(\);return\}/);
  assert.match(gate, /const adultConfirmed=Boolean\(localStorage\.getItem\(PARENT_KEY\)\)/);
  assert.match(gate, /legal\.html\?lang=\$\{language\(\)\}&doc=privacy/);
  assert.match(gate, /next\(\{confirmedAt,version\}\)/);
  assert.match(privacy, /childCheck:'Я подтверждаю, что имею право добавить данные этого ребёнка\.'/);
  assert.match(modal, /authorityConfirmedAt: wizard\.authorityEvidence\.confirmedAt/);
  assert.match(modal, /authorityConfirmationVersion: wizard\.authorityEvidence\.version/);
});

test('JSON transfer restores portable data without importing consent or the general authority confirmation', () => {
  const storage = new Map([
    ['children', JSON.stringify([{id:1,name:'Old'}])],
    ['notes', JSON.stringify([{id:2,childId:1,title:'Old note'}])],
    ['child_astrology_analytics_consent_v2', 'granted'],
    ['child_astrology_parent_confirmed_v1', JSON.stringify({confirmedAt:'old'})]
  ]);
  const localStorage = {
    getItem:(key)=>storage.has(key)?storage.get(key):null,
    setItem:(key,value)=>storage.set(key,String(value)),
    removeItem:(key)=>storage.delete(key)
  };
  const window = {confirm:()=>true,alert(){}};
  const context = {
    window,localStorage,
    document:{addEventListener(){},querySelector(){return null;},getElementById(){return null;}},
    location:{origin:'https://childastrologyapp.com',reload(){}},
    URL,Blob,Map,Event:function Event(type){this.type=type;},console,setTimeout
  };
  vm.runInNewContext(read('privacy-controls.js'), context);
  const restored = window.PrivacyControls.restoreBackup({
    app:'Child Astrology',
    data:{
      children:[{id:3,name:'New'}],
      language:'nl',
      child_astrology_analytics_consent_v2:'denied',
      child_astrology_parent_confirmed_v1:{confirmedAt:'imported'}
    }
  }, false);
  assert.equal(restored, true);
  assert.deepEqual(JSON.parse(storage.get('children')), [{id:3,name:'New'}]);
  assert.equal(storage.has('notes'), false);
  assert.equal(storage.get('language'), 'nl');
  assert.equal(storage.get('child_astrology_analytics_consent_v2'), 'granted');
  assert.deepEqual(JSON.parse(storage.get('child_astrology_parent_confirmed_v1')), {confirmedAt:'old'});
  assert.throws(()=>window.PrivacyControls.restoreBackup({app:'Other',data:{children:[]}},false),/invalid-backup/);
});

test('sensitive questions are blocked before storage and analytics', () => {
  const source = read('consultation-chat.js');
  const sensitive = source.indexOf('const sensitive = sensitiveKind(question)');
  const analytics = source.indexOf("document.dispatchEvent(new CustomEvent('app:consultation-question'", sensitive);
  const history = source.indexOf('history.push(', sensitive);
  assert.ok(sensitive > 0 && analytics > sensitive && history > analytics);
  assert.match(source, /ADHD|adhd/);
  assert.match(source, /speech delay|spraakachterstand|задержк/);
  for (const route of ['development','medical','travel','legal','restricted','emergency']) assert.match(source, new RegExp(`return '${route}'`));
  assert.match(source, /const layers = \['astrology','evidence','help'\]/);
  assert.match(source, /consultant-safety-layer/);
  assert.match(source, /rijksoverheid\.nl\/vraag-en-antwoord\/zwangerschap-en-geboorte/);
  assert.match(source, /thuisarts\.nl\/slecht-horen\/ik-denk-dat-mijn-kind-slecht-hoort/);
  assert.match(source, /nederlandwereldwijd\.nl\/reisadvies/);
  assert.match(source, /rijksoverheid\.nl\/service\/contact\/contactgids\/j\/juridisch-loket/);
  assert.match(source, /Verified 28 August 2026/);
  assert.match(source, /sexual|сексуал/);
  assert.match(source, /RETENTION_MS = 90/);
  assert.match(source, /createdAt/);
  assert.doesNotMatch(source, /api\.openai\.com|anthropic\.com|generativelanguage\.googleapis\.com/);
});

test('health boundary is visible in onboarding, terms and generated child analysis', () => {
  const onboarding = read('child-modal.js');
  const legal = read('legal.js');
  const analysis = read('child-analysis.js');
  assert.match(onboarding,/Не откладывайте консультацию квалифицированного специалиста/);
  assert.match(onboarding,/Do not delay qualified professional care/);
  assert.match(legal,/HEALTH_NOTICE/);
  assert.match(legal,/не могут устанавливать причину особенностей развития ребёнка/);
  assert.match(analysis,/Научных доказательств, что ретроградный Меркурий вызывает задержку речи[^.]*, нет/);
  assert.match(analysis,/натальная карта определяет гиперактивность или СДВГ, нет: это не диагноз/);
});

test('navigation is keyboard native and script CSP has no unsafe inline exception', () => {
  const html = read('index.html');
  const scripts = ['index.html','app.js','child-analysis.js'].map(read).join('\n');
  assert.doesNotMatch(scripts, /\bon[a-z]+\s*=/i);
  assert.match(html, /script-src 'self' https:\/\/www\.googletagmanager\.com/);
  assert.doesNotMatch(html, /script-src[^;]*'unsafe-inline'/);
  assert.match(html, /<button[^>]+class="nav-link/);
  assert.match(html, /<button[^>]+class="action-card/);
  assert.match(html, /ui-bindings\.js/);
  assert.match(read('ui-bindings.js'), /activateFocusTrap/);
  assert.match(read('privacy-controls.js'), /AppModalFocus/);
  assert.match(read('child-modal.js'), /AppModalFocus/);
  assert.match(read('child-analysis.js'), /AppModalFocus/);
});

test('new domain has crawl, sharing and security discovery files', () => {
  const html = read('index.html');
  assert.match(html, /<html lang="nl">/);
  assert.match(html, /meta name="description"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:image" content="https:\/\/childastrologyapp\.com\//);
  assert.match(read('robots.txt'), /Sitemap: https:\/\/childastrologyapp\.com\/sitemap\.xml/);
  assert.match(read('sitemap.xml'), /https:\/\/childastrologyapp\.com\//);
  assert.match(read('.well-known/security.txt'), /Canonical: https:\/\/childastrologyapp\.com\/\.well-known\/security\.txt/);
});

test('founder pack fixes product scope and child safety boundaries', () => {
  for (const file of [
    'founder-pack/PRODUCT_VISION.md',
    'founder-pack/CONTENT_ASTROLOGY_FRAMEWORK.md',
    'founder-pack/CHILD_SAFETY_AI_RULES.md',
    'founder-pack/MVP_SPECIFICATION.md'
  ]) assert.ok(fs.statSync(path.join(root,file)).size > 1000,`${file} must be substantive`);
  const specification = read('founder-pack/MVP_SPECIFICATION.md');
  assert.match(specification,/No account, cloud database, payment, subscription or external AI/);
  assert.match(read('child-analysis.js'), /ageContextSection/);
});

test('deployment builds a local city dataset and offline shell includes core code', () => {
  const workflow = read('.github/workflows/pages.yml');
  assert.match(workflow,/Build local city search data/);
  assert.match(workflow,/scripts\/generate-cities\.mjs/);
  const worker = read('sw.js');
  assert.match(worker,/\.\/ui-bindings\.js/);
  assert.match(worker,/\.\/assets\/cities-15000\.min\.json/);
});

test('analytics is consent-gated and strictly allow-listed', () => {
  const source = read('analytics.js');
  assert.match(source, /if \(!validMeasurementId\(\) \|\| !consentGranted\(\)/);
  assert.match(source, /const ALLOWED_EVENTS = new Set/);
  assert.match(source, /const SAFE_PARAMS = new Set\(\['section', 'topic', 'language', 'mode', 'source'\]\)/);
  assert.doesNotMatch(source, /SAFE_PARAMS[^;]*(name|birthDate|birthPlace|latitude|longitude|question|text)/);
  assert.match(source, /allow_google_signals: false/);
  assert.match(source, /cookie_expires: COOKIE_LIFETIME_SECONDS/);
});

test('Delete Child cascades to linked local records', () => {
  const source = read('app.js');
  const storage = new Map([
    ['childAstrologyConsultationHistory', JSON.stringify({'1':[{role:'user',text:'x'}],'2':[{role:'user',text:'y'}]})],
    ['childAstrologyConsultationChild','1'],
    ['familyScentCodeV1','legacy child-linked result'],
    ['parentScentCodeV2','adult-only result']
  ]);
  const localStorage = {getItem:(key)=>storage.has(key)?storage.get(key):null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:(key)=>storage.delete(key)};
  const context = {
    document:{addEventListener(){},getElementById(){return null;},querySelectorAll(){return[];}},
    localStorage, location:{hash:''}, window:{}, confirm:()=>true, alert(){}, prompt(){},
    CustomEvent:function(name,options){this.type=name;this.detail=options?.detail;}, Event:function(name){this.type=name;},
    children:[{id:1,name:'A'},{id:2,name:'B'}], notes:[{id:10,childId:1},{id:11,childId:2}],
    currentLanguage:'en', translations:{en:{}}, sportsData:{}, learningData:{}, tipsData:{}
  };
  context.document.dispatchEvent=()=>{};
  vm.createContext(context);
  vm.runInContext(source,context);
  context.deleteChild(1);
  assert.deepEqual(context.children.map((child)=>child.id),[2]);
  assert.deepEqual(context.notes.map((note)=>note.id),[11]);
  assert.deepEqual(Object.keys(JSON.parse(storage.get('childAstrologyConsultationHistory'))),['2']);
  assert.equal(storage.has('childAstrologyConsultationChild'),false);
  assert.equal(storage.has('familyScentCodeV1'),false);
  assert.equal(storage.get('parentScentCodeV2'),'adult-only result');
});

test('Tarot exposes only Card of the Day', () => {
  const source = read('tarot-thoth.js');
  const render = source.slice(source.indexOf('function resultHtml'), source.indexOf('const traitMap'));
  const draw = source.slice(source.indexOf('function draw(){'), source.indexOf('const previousChangeLanguage'));
  assert.match(render,/id="tarotDrawDay"/);
  assert.doesNotMatch(render,/tarotDrawFive|tarotQuestion|tarotSignificator|tarotAdjectives/);
  assert.match(draw,/randomCards\(1\)/);
  assert.doesNotMatch(draw,/app:tarot-five-card|mode==='five'/);
  assert.match(read('founder-pack/MVP_SPECIFICATION.md'),/only one Card of the Day/);
});

test('Parent Scent is adult-only and never reads child profiles', () => {
  const source = read('family-scent.js');
  assert.match(source,/const STORE='parentScentCodeV2'/);
  assert.match(source,/const rolesFor=\{my:\['self'\],parents:\['self','partner'\]\}/);
  assert.match(source,/id="scentAdultConfirm"/);
  assert.match(source,/setFullYear\(d\.getFullYear\(\)-18\)/);
  assert.match(source,/if\(p\.birthDate>adultDateMax\(\)\)return c\(\)\.adultDate/);
  assert.doesNotMatch(source,/function savedChildren|data-saved-child|savedChildId|role==='child'|app:child-deleted/);
  assert.match(source,/localStorage\.removeItem\(LEGACY_STORE\)/);
  assert.match(read('privacy-controls.js'),/parentScentCodeV2/);
});

test('mobile Methods menu exposes every desktop-only section', () => {
  const html = read('index.html');
  for (const section of ['method','sports','learning','tips','consultation','settings']) {
    assert.match(html,new RegExp(`mobile-method-option[^>]+data-section="${section}"`));
  }
  for (const section of ['home','children','family-scent','tarot']) {
    assert.match(html,new RegExp(`mobile-nav-link[^>]+data-section="${section}"`));
  }
  assert.match(read('mobile-nav.css'),/@media\(max-width:768px\)[\s\S]*mobile-methods-menu\.open/);
});

test('exports, retention, legal documents and safety records exist', () => {
  const privacy = read('privacy-controls.js');
  assert.match(privacy,/exportReadable/);
  assert.match(privacy,/child-astrology-readable/);
  assert.match(privacy,/data-privacy="import"/);
  assert.match(privacy,/restoreBackup/);
  assert.doesNotMatch(privacy.slice(privacy.indexOf('const EXPORT_KEYS'),privacy.indexOf('const APP_KEYS')),/analytics_consent|PARENT_KEY/);
  assert.match(read('privacy-import.css'),/display:\s*none/);
  assert.match(read('index.html'),/rel="canonical" href="https:\/\/childastrologyapp\.com\/"/);
  assert.equal(read('CNAME').trim(),'childastrologyapp.com');
  assert.match(read('family-scent.js'),/RETENTION_MS=90/);
  for (const file of ['legal.html','legal.js','compliance/DATA_MAP.md','compliance/ROPA.md','compliance/LIA.md','compliance/DPIA.md','compliance/VENDOR_REGISTER.md','compliance/RETENTION_AND_DELETION.md','compliance/DSR_PROCEDURE.md','compliance/INCIDENT_RESPONSE.md','compliance/BREACH_REGISTER_TEMPLATE.md','compliance/AI_POLICY.md','compliance/LAUNCH_CHECKLIST.md']) {
    assert.ok(fs.statSync(path.join(root,file)).size > 100,`${file} must be substantive`);
  }
});

test('user-controlled text is escaped before main app innerHTML rendering', () => {
  const source = read('app.js');
  assert.match(source,/function escapeAppHtml/);
  assert.match(source,/escapeAppHtml\(child\.name\)/);
  assert.match(source,/escapeAppHtml\(note\.title\)/);
  assert.match(source,/escapeAppHtml\(note\.content\)/);
});
