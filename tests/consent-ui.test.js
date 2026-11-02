const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'analytics.js'), 'utf8');
function harness(parent, consent = null, gate = null) {
  const result = { removed: 0, appended: 0 };
  const context = {
    localStorage: { getItem: () => parent },
    validMeasurementId: () => true,
    consentState: () => consent,
    text: () => ({}), escapeHtml: () => '', setConsent() {}, openPreferences() {},
    document: {
      getElementById: () => ({ remove: () => result.removed++ }),
      querySelector: (selector) => selector === gate ? {} : null,
      createElement: () => ({ setAttribute() {}, querySelector: () => ({ addEventListener() {} }) }),
      body: { appendChild: () => result.appended++ }
    }
  };
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('  function launchConsentPending()'), source.indexOf('  function renderPanel()')) + '\nrenderConsent();', context);
  return result;
}

test('launch gate is the only initial consent UI, even before its delayed render', () => {
  for (const parent of [null, '{invalid', '{}', '{"launchGate":false}']) {
    assert.equal(harness(parent).appended, 0);
  }
});
test('no duplicate consent prompt behind launch or authentication gates', () => {
  for (const gate of ['.launch-gate', '#auth-gate:not([hidden])']) {
    const result = harness('{"launchGate":true}', null, gate);
    assert.equal(result.removed, 1);
    assert.equal(result.appended, 0);
  }
});
test('saved grants and refusals are never prompted again', () => {
  for (const consent of ['granted', 'denied']) {
    assert.equal(harness('{"launchGate":true}', consent).appended, 0);
  }
});
test('returning users can still choose after resetting consent', () => {
  assert.equal(harness('{"launchGate":true}').appended, 1);
});
test('gate and language updates re-evaluate consent UI', () => {
  assert.match(source, /addEventListener\('app:launch-gate-changed', renderConsent\)/);
  assert.match(source, /addEventListener\('app:language-changed', \(\) => \{ renderPanel\(\); renderConsent\(\); \}\)/);
});
