const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('legal page normalizes Ukrainian and rejects unsupported stored languages', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'legal.js'), 'utf8');
  const start = source.indexOf('  function supportedLanguage(');
  const end = source.indexOf('  let selected=', start);
  assert.ok(start >= 0 && end > start);
  for (const [query, stored, expected] of [
    ['uk', 'nl', 'ua'], [null, 'uk', 'ua'], [null, 'invalid', 'nl'],
    ['invalid', 'en', 'en'], ['ru', 'nl', 'ru'], [null, null, 'nl']
  ]) {
    const context = { params: { get: () => query }, localStorage: { getItem: () => stored } };
    vm.createContext(context);
    assert.equal(vm.runInContext(source.slice(start, end) + '\nlanguage;', context), expected);
  }
});
