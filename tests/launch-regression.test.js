const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');

function evalWithExport(file, exportName, prelude = '') {
  const context = {};
  vm.createContext(context);
  const source = `${prelude}\n${read(file)}\nglobalThis.__value = ${exportName};`;
  vm.runInContext(source, context, { filename: file });
  return context.__value;
}

const languages = ['ru', 'ua', 'en', 'nl'];
const signs = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];

test('all core UI languages expose the same launch-critical keys', () => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${read('translations.js')}\n${read('ui-translations-fix.js').split('(function launchPolish')[0]}\nglobalThis.__translations = translations;`, context);
  const translations = context.__translations;
  const required = [
    'nav_home','nav_children','nav_tarot','nav_method','nav_sports','nav_learning','nav_tips','nav_consultation','nav_settings',
    'children_title','btn_add_child','method_title','method_step1_title','method_step1_desc','method_step6_title','method_step6_desc',
    'sports_title','sports_intro','learning_title','learning_intro','tips_title','settings_title','settings_language'
  ];
  for (const language of languages) {
    assert.ok(translations[language], `missing language ${language}`);
    for (const key of required) assert.ok(String(translations[language][key] || '').trim(), `${language}.${key} is missing`);
  }
});

test('sports, learning and parent tips contain all 12 signs in all languages', () => {
  const sports = evalWithExport('sports-data.js', 'sportsTranslations', 'var currentLanguage = "nl";');
  const learning = evalWithExport('learning-data.js', 'learningTranslations', 'var currentLanguage = "nl";');
  const tips = evalWithExport('tips-data.js', 'tipsTranslations', 'var currentLanguage = "nl";');
  for (const language of languages) {
    for (const sign of signs) {
      assert.ok(sports[language][sign]?.title, `sports ${language}/${sign} title missing`);
      assert.ok(sports[language][sign]?.suitable, `sports ${language}/${sign} suitable missing`);
      assert.ok(sports[language][sign]?.avoid, `sports ${language}/${sign} avoid missing`);
      assert.ok(learning[language][sign]?.title, `learning ${language}/${sign} title missing`);
      assert.ok(learning[language][sign]?.how, `learning ${language}/${sign} how missing`);
      assert.ok(learning[language][sign]?.tips, `learning ${language}/${sign} tips missing`);
      assert.equal(tips[language][sign]?.tips?.length, 10, `tips ${language}/${sign} must contain 10 tips`);
    }
  }
});

test('English and Dutch dynamic method content contains no Cyrillic leakage', () => {
  const files = ['sports-data.js','learning-data.js','tips-data.js'];
  for (const file of files) {
    const name = file.startsWith('sports') ? 'sportsTranslations' : file.startsWith('learning') ? 'learningTranslations' : 'tipsTranslations';
    const data = evalWithExport(file, name, 'var currentLanguage = "nl";');
    for (const language of ['en','nl']) {
      const serialized = JSON.stringify(data[language]);
      assert.equal(/[А-Яа-яЁёІіЇїЄє]/.test(serialized), false, `${file} leaks Cyrillic into ${language}`);
    }
  }
});

test('mobile Methods menu exposes every grouped section', () => {
  const html = read('index.html');
  for (const section of ['method','sports','learning','tips','consultation','settings']) {
    assert.match(html, new RegExp(`class="mobile-method-option"[^>]+data-section="${section}"`), `missing mobile method ${section}`);
  }
});

test('launch-critical data actions have delegated handlers', () => {
  const html = read('index.html');
  const bindings = read('ui-bindings.js');
  const actions = [...html.matchAll(/data-action="([^"]+)"/g)].map((match) => match[1]);
  for (const action of new Set(actions)) {
    assert.ok(bindings.includes(`action === '${action}'`) || action === 'close-mobile-methods', `no delegated handler found for ${action}`);
  }
});

test('PWA update path is build-versioned and network-first', () => {
  const workflow = read('.github/workflows/pages.yml');
  const updater = read('pwa-update.js');
  const sw = read('sw.js');
  assert.match(workflow, /__APP_BUILD_VERSION__/);
  assert.match(updater, /registration\.update\(\)/);
  assert.match(updater, /version\.json/);
  assert.match(sw, /fetch\(request, \{ cache: 'no-store' \}\)/);
});

test('privacy controls include export and import in all four languages', () => {
  const source = read('privacy-controls.js');
  for (const language of languages) {
    assert.match(source, new RegExp(`Object\\.assign\\(COPY\\.${language},\\{[\\s\\S]*?export:`));
    assert.match(source, new RegExp(`Object\\.assign\\(COPY\\.${language},\\{[\\s\\S]*?import:`));
  }
});
