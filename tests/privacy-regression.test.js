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

test('sensitive questions are blocked before storage and analytics', () => {
  const source = read('consultation-chat.js');
  const sensitive = source.indexOf('const sensitive = sensitiveKind(question)');
  const analytics = source.indexOf("document.dispatchEvent(new CustomEvent('app:consultation-question'", sensitive);
  const history = source.indexOf('history.push(', sensitive);
  assert.ok(sensitive > 0 && analytics > sensitive && history > analytics);
  assert.match(source, /ADHD|adhd/);
  assert.match(source, /sexual|сексуал/);
  assert.match(source, /RETENTION_MS = 90/);
  assert.match(source, /createdAt/);
  assert.doesNotMatch(source, /api\.openai\.com|anthropic\.com|generativelanguage\.googleapis\.com/);
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
    ['familyScentCodeV1','result']
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
