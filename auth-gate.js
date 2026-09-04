/* ================================================================
   Child Astrology — e-mail sign-in gate
   Shows AFTER the compliance launch gate, BEFORE the app.
   Layout matches the reference mockup: centered, minimal.
   No build step, no inline script (CSP-safe). Load order in
   index.html:  vendor/supabase.js  ->  auth-gate.js (defer)
   ================================================================ */
(function () {
  'use strict';

  /* ==== CONFIG — Supabase project (Project Settings -> API) ====
     The publishable/anon key is safe in client code. */
  var SUPABASE_URL = 'https://hcxwzsvicihnkmlrsftv.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_2bOBvAgrLzuhfPH7LVA0nQ_qqxRJakF';
  /* ============================================================= */

  var AUTHED_KEY  = 'ca_authed';
  var LANG_KEY    = 'language';
  var PARENT_KEY  = 'child_astrology_parent_confirmed_v1';   // set by the compliance gate
  var DEFAULT_LANG = 'nl';
  var LANGS = ['nl', 'ru', 'ua', 'en'];

  var I18N = {
    nl: {
      h1:'Maak kennis met de wereld van je kind',
      sub:'Maak een profiel voor je kind en ontdek de geboortehoroscoop, karaktereigenschappen, emoties en talenten.',
      emailPh:'Je e-mailadres', continue:'Doorgaan',
      codeH1:'Controleer je e-mail', sentTo:'We hebben een 6-cijferige code gestuurd naar',
      noMail:'Geen e-mail ontvangen?', resend:'Code opnieuw versturen', verify:'Bevestigen',
      errEmail:'Vul een geldig e-mailadres in', errCode:'Code onjuist — probeer het opnieuw',
      errSend:'Versturen mislukt — probeer het later opnieuw', sending:'Versturen…', checking:'Controleren…'
    },
    ru: {
      h1:'Познакомьтесь с миром вашего ребёнка',
      sub:'Создайте профиль ребёнка и откройте его натальную карту, особенности характера, эмоций и потенциала.',
      emailPh:'Ваш e-mail', continue:'Продолжить',
      codeH1:'Проверьте почту', sentTo:'Мы отправили 6-значный код на',
      noMail:'Не получили письмо?', resend:'Отправить код ещё раз', verify:'Подтвердить',
      errEmail:'Введите корректный e-mail', errCode:'Код неверный — попробуйте ещё раз',
      errSend:'Не удалось отправить — попробуйте позже', sending:'Отправляем…', checking:'Проверяем…'
    },
    ua: {
      h1:'Пізнайте світ вашої дитини',
      sub:'Створіть профіль дитини й відкрийте її натальну карту, особливості характеру, емоцій і потенціалу.',
      emailPh:'Ваш e-mail', continue:'Продовжити',
      codeH1:'Перевірте пошту', sentTo:'Ми надіслали 6-значний код на',
      noMail:'Не отримали лист?', resend:'Надіслати код ще раз', verify:'Підтвердити',
      errEmail:'Введіть коректний e-mail', errCode:'Код невірний — спробуйте ще раз',
      errSend:'Не вдалося надіслати — спробуйте пізніше', sending:'Надсилаємо…', checking:'Перевіряємо…'
    },
    en: {
      h1:'Meet the world of your child',
      sub:'Create your child’s profile and discover their birth chart, character traits, emotions and potential.',
      emailPh:'Your e-mail', continue:'Continue',
      codeH1:'Check your e-mail', sentTo:'We’ve sent a 6-digit code to',
      noMail:'Didn’t get the e-mail?', resend:'Resend code', verify:'Confirm',
      errEmail:'Enter a valid e-mail', errCode:'Wrong code — try again',
      errSend:'Could not send — try again later', sending:'Sending…', checking:'Checking…'
    }
  };

  var EMBLEM =
    '<svg width="46" height="46" viewBox="0 0 46 46" fill="none" stroke="#e6c9a0" stroke-width="1.2">' +
      '<circle cx="23" cy="23" r="20"/>' +
      '<path d="M30 12a12 12 0 1 0 0 22 9.5 9.5 0 0 1 0-22Z" stroke-linejoin="round"/>' +
      '<circle cx="19" cy="30" r="3.4"/>' +
      '<circle cx="16.5" cy="19" r="1" fill="#e6c9a0" stroke="none"/>' +
      '<circle cx="34" cy="16" r=".9" fill="#e6c9a0" stroke="none"/>' +
      '<circle cx="35" cy="30" r=".8" fill="#e6c9a0" stroke="none"/>' +
    '</svg>';

  var MARKUP =
    '<div class="ag-sky" aria-hidden="true">' +
      '<svg class="ag-stars" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">' +
        '<g stroke="#e6c9a0" stroke-width="0.6" stroke-opacity="0.2" fill="none" stroke-linejoin="round">' +
          '<polyline points="52,120 140,110 165,175 120,225 52,120"/>' +
          '<polyline points="250,60 288,104 340,120 315,150"/>' +
          '<polyline points="210,300 248,332 292,312 322,358"/>' +
        '</g>' +
        '<g fill="#ffffff">' +
          '<circle cx="28" cy="60" r="1" opacity=".5"/><circle cx="95" cy="150" r="1.1" opacity=".7"/>' +
          '<circle cx="165" cy="175" r="1" opacity=".6" style="animation:ag-tw 2.8s ease-in-out infinite"/>' +
          '<circle cx="72" cy="255" r=".9" opacity=".45"/><circle cx="200" cy="80" r="1" opacity=".55"/>' +
          '<circle cx="315" cy="150" r="1" opacity=".6"/><circle cx="360" cy="90" r=".9" opacity=".5"/>' +
          '<circle cx="40" cy="340" r=".8" opacity=".4"/><circle cx="90" cy="400" r="1" opacity=".5"/>' +
          '<circle cx="150" cy="360" r=".9" opacity=".45"/><circle cx="300" cy="420" r="1" opacity=".55"/>' +
          '<circle cx="350" cy="380" r=".8" opacity=".4"/><circle cx="180" cy="440" r=".9" opacity=".45"/>' +
          '<circle cx="60" cy="470" r="1" opacity=".5"/><circle cx="250" cy="480" r=".85" opacity=".4"/>' +
          '<circle cx="120" cy="500" r=".9" opacity=".45"/><circle cx="330" cy="510" r="1" opacity=".5"/>' +
          '<circle cx="20" cy="180" r=".9" opacity=".5"/><circle cx="370" cy="240" r="1" opacity=".55"/>' +
          '<circle cx="190" cy="210" r="1" opacity=".6"/><circle cx="270" cy="180" r=".9" opacity=".5"/>' +
        '</g>' +
        '<g fill="#e6c9a0">' +
          '<circle cx="52" cy="120" r="1.6" opacity=".9" style="animation:ag-tw 3.2s ease-in-out infinite"/>' +
          '<circle cx="140" cy="110" r="1.4" opacity=".85"/><circle cx="120" cy="225" r="1.3" opacity=".8"/>' +
          '<circle cx="250" cy="60" r="1.5" opacity=".85" style="animation:ag-tw 4s ease-in-out infinite .5s"/>' +
          '<circle cx="288" cy="104" r="1.2" opacity=".72"/>' +
          '<circle cx="340" cy="120" r="1.4" opacity=".8" style="animation:ag-tw 4.4s ease-in-out infinite .2s"/>' +
          '<circle cx="210" cy="300" r="1.3" opacity=".8"/><circle cx="248" cy="332" r="1.1" opacity=".7"/>' +
          '<circle cx="292" cy="312" r="1.4" opacity=".85" style="animation:ag-tw 3.6s ease-in-out infinite .8s"/>' +
        '</g>' +
        '<g><circle cx="330" cy="76" r="13" fill="#f0dcc0" fill-opacity=".9"/><circle cx="324" cy="71" r="12" fill="#0c0d2c"/></g>' +
      '</svg>' +
      '<svg class="ag-horizon" viewBox="0 0 390 340" preserveAspectRatio="xMidYMax slice">' +
        '<defs>' +
          '<radialGradient id="agGlow" cx="50%" cy="88%" r="62%">' +
            '<stop offset="0%" stop-color="#ffc099" stop-opacity=".72"/>' +
            '<stop offset="34%" stop-color="#f0869e" stop-opacity=".3"/>' +
            '<stop offset="100%" stop-color="#f0869e" stop-opacity="0"/>' +
          '</radialGradient>' +
          '<radialGradient id="agHalo" cx="50%" cy="50%" r="50%">' +
            '<stop offset="0%" stop-color="#ffd0a8" stop-opacity=".55"/>' +
            '<stop offset="60%" stop-color="#ffb488" stop-opacity=".18"/>' +
            '<stop offset="100%" stop-color="#ffb488" stop-opacity="0"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<rect x="0" y="0" width="390" height="340" fill="url(#agGlow)"/>' +
        '<path d="M0,150 L60,86 L120,140 L180,66 L250,128 L320,80 L390,120 L390,340 L0,340 Z" fill="#241c44" opacity=".9"/>' +
        '<path d="M0,196 L80,150 L150,188 L230,140 L300,186 L360,158 L390,182 L390,340 L0,340 Z" fill="#171134"/>' +
        '<ellipse cx="195" cy="250" rx="86" ry="98" fill="url(#agHalo)"/>' +
        '<g fill="#05030f" transform="translate(195,300) scale(1.75)">' +
          '<ellipse cx="0" cy="-58" rx="6.4" ry="7"/>' +
          '<path d="M-10,-50 Q0,-56 10,-50 L8,-2 Q0,2 -8,-2 Z"/>' +
          '<path d="M-9,-48 Q-25,-53 -31,-76 Q-29,-81 -24,-78 Q-16,-58 -6,-52 Z"/>' +
          '<path d="M9,-48 Q25,-53 31,-76 Q29,-81 24,-78 Q16,-58 6,-52 Z"/>' +
          '<circle cx="0" cy="-85" r="8"/><circle cx="0" cy="-94" r="4.6"/>' +
          '<path d="M-7,-87 Q-13,-85 -15,-79 Q-12,-78 -9,-81 Z"/>' +
          '<path d="M7,-87 Q13,-85 15,-79 Q12,-78 9,-81 Z"/>' +
        '</g>' +
        '<path d="M0,250 L90,212 L170,248 L250,210 L330,250 L390,226 L390,340 L0,340 Z" fill="#0a0720"/>' +
      '</svg>' +
      '<div class="ag-scrim"></div>' +
    '</div>' +

    '<section class="ag-step" data-step="email">' +
      '<div class="ag-brand">' + EMBLEM +
        '<span class="ag-wordmark"><b>CHILD</b><span>ASTROLOGY</span></span>' +
      '</div>' +
      '<h1 class="ag-h1" data-i18n="h1"></h1>' +
      '<p class="ag-sub" data-i18n="sub"></p>' +
      '<div class="ag-input"><input id="agEmail" type="email" inputmode="email" autocomplete="email" spellcheck="false"></div>' +
      '<p class="ag-err" id="agEmailErr" role="alert"></p>' +
      '<button class="ag-cta" id="agContinue" type="button" data-i18n="continue"></button>' +
    '</section>' +

    '<section class="ag-step" data-step="code" hidden>' +
      '<button class="ag-back" id="agBack" type="button" aria-label="Back">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e6c9a0" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>' +
      '</button>' +
      '<div class="ag-mid">' +
        '<span class="ag-emblem"><svg width="76" height="76" viewBox="0 0 76 76" fill="none">' +
          '<circle cx="38" cy="38" r="35" stroke="#e6c9a0" stroke-opacity=".32" stroke-width="1"/>' +
          '<g stroke="#e6c9a0" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><rect x="20" y="25" width="36" height="26" rx="4"/><path d="M20 29l18 13 18-13"/></g>' +
          '<path d="M38 11l2.3 4.8 5.2.7-3.8 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.8-3.6 5.2-.7z" fill="#e6c9a0"/>' +
        '</svg></span>' +
        '<h1 class="ag-h1" data-i18n="codeH1"></h1>' +
        '<p class="ag-body"><span data-i18n="sentTo"></span><br><span class="ag-mail" id="agMailEcho"></span></p>' +
        '<div class="ag-otp" id="agOtp">' +
          '<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" placeholder="0">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder="0">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder="0">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder="0">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder="0">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder="0">' +
        '</div>' +
        '<p class="ag-err" id="agCodeErr" role="alert"></p>' +
        '<div class="ag-resend"><span data-i18n="noMail"></span><button id="agResend" type="button" data-i18n="resend"></button></div>' +
      '</div>' +
      '<button class="ag-cta" id="agVerify" type="button" data-i18n="verify"></button>' +
    '</section>';

  var CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
  var sb = null;
  function client() {
    if (sb) return sb;
    if (CONFIGURED && window.supabase && window.supabase.createClient) {
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit' }
      });
    }
    return sb;
  }

  var gate, stepEmail, stepCode, emailInput, otpInputs, resendBtn, verifyBtn, continueBtn, mailEcho;
  var currentEmail = '';
  var lang = DEFAULT_LANG;

  function q(sel, root) { return (root || gate).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || gate).querySelectorAll(sel)); }
  function tr(k) { return (I18N[lang] && I18N[lang][k]) || I18N[DEFAULT_LANG][k] || k; }

  function detectLang() {
    var l = (window.currentLanguage || safeGet(LANG_KEY) || document.documentElement.lang || DEFAULT_LANG);
    l = String(l).slice(0, 2).toLowerCase();
    if (l === 'uk') l = 'ua';
    return LANGS.indexOf(l) >= 0 ? l : DEFAULT_LANG;
  }
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function safeDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function applyI18n() {
    lang = detectLang();
    qa('[data-i18n]').forEach(function (el) { el.textContent = tr(el.getAttribute('data-i18n')); });
    if (emailInput) emailInput.setAttribute('placeholder', tr('emailPh'));
  }

  function showStep(step) {
    stepEmail.hidden = step !== 'email';
    stepCode.hidden = step !== 'code';
    if (step === 'code') setTimeout(function () { try { otpInputs[0].focus(); } catch (e) {} }, 50);
  }

  function openGate() {
    if (!gate.hidden) return;
    gate.hidden = false;
    document.body.classList.add('ca-auth-open');
    showStep('email');
    setTimeout(function () { try { emailInput.focus(); } catch (e) {} }, 50);
  }
  function finishAuth() {
    gate.hidden = true;
    document.body.classList.remove('ca-auth-open');
    safeSet(AUTHED_KEY, '1');
    try { window.dispatchEvent(new CustomEvent('ca:authed', { detail: { email: currentEmail } })); } catch (e) {}
    if (window.CAApp && typeof window.CAApp.onAuthed === 'function') { try { window.CAApp.onAuthed(currentEmail); } catch (e) {} }
    if (typeof window.showSection === 'function') { try { window.showSection('home'); } catch (e) {} }
  }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  function sendCode() {
    var email = emailInput.value.trim().toLowerCase();
    var err = q('#agEmailErr');
    err.textContent = '';
    if (!validEmail(email)) { err.textContent = tr('errEmail'); emailInput.focus(); return; }
    currentEmail = email;
    mailEcho.textContent = email;

    var proceed = function () {
      clearOtp(); showStep('code');
      continueBtn.disabled = false; continueBtn.textContent = tr('continue');
    };
    var fail = function (e) {
      continueBtn.disabled = false; continueBtn.textContent = tr('continue');
      err.textContent = tr('errSend'); if (e) console.error('[auth-gate]', e);
    };

    continueBtn.disabled = true; continueBtn.textContent = tr('sending');
    var c = client();
    if (!c) { console.warn('[auth-gate] Supabase not configured — demo mode, no e-mail sent.'); proceed(); return; }
    c.auth.signInWithOtp({ email: email, options: { shouldCreateUser: true, emailRedirectTo: location.origin } })
      .then(function (r) { r && r.error ? fail(r.error) : proceed(); })
      .catch(fail);
  }

  function codeValue() { return otpInputs.map(function (i) { return i.value; }).join(''); }
  function firstEmpty() { for (var i = 0; i < otpInputs.length; i++) { if (!otpInputs[i].value) return otpInputs[i]; } return otpInputs[5]; }
  function clearOtp() {
    otpInputs.forEach(function (i) { i.value = ''; });
    q('#agOtp').classList.remove('err', 'ok');
    q('#agCodeErr').textContent = '';
  }

  function verifyCode() {
    var code = codeValue();
    var err = q('#agCodeErr');
    if (code.length < 6) { try { firstEmpty().focus(); } catch (e) {} return; }
    err.textContent = '';
    verifyBtn.disabled = true; verifyBtn.textContent = tr('checking');

    var ok = function () {
      verifyBtn.textContent = tr('verify');
      q('#agOtp').classList.add('ok');
      setTimeout(finishAuth, 450);
    };
    var bad = function (e) {
      verifyBtn.disabled = false; verifyBtn.textContent = tr('verify');
      var box = q('#agOtp'); box.classList.add('err');
      err.textContent = tr('errCode');
      if (e) console.error('[auth-gate]', e);
      setTimeout(function () { box.classList.remove('err'); clearOtp(); try { otpInputs[0].focus(); } catch (x) {} }, 500);
    };

    var c = client();
    if (!c) { /^\d{6}$/.test(code) ? ok() : bad(); return; }
    c.auth.verifyOtp({ email: currentEmail, token: code, type: 'email' })
      .then(function (r) { r && r.error ? bad(r.error) : ok(); })
      .catch(bad);
  }

  function wireOtp() {
    otpInputs.forEach(function (input, idx) {
      input.addEventListener('input', function () {
        input.value = input.value.replace(/\D/g, '').slice(0, 1);
        if (input.value && idx < 5) otpInputs[idx + 1].focus();
        if (codeValue().length === 6) verifyCode();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !input.value && idx > 0) { otpInputs[idx - 1].focus(); otpInputs[idx - 1].value = ''; e.preventDefault(); }
        else if (e.key === 'ArrowLeft' && idx > 0) otpInputs[idx - 1].focus();
        else if (e.key === 'ArrowRight' && idx < 5) otpInputs[idx + 1].focus();
      });
      input.addEventListener('paste', function (e) {
        e.preventDefault();
        var raw = (e.clipboardData || window.clipboardData).getData('text') || '';
        var digits = raw.replace(/\D/g, '').slice(0, 6).split('');
        digits.forEach(function (d, i) { if (otpInputs[i]) otpInputs[i].value = d; });
        try { (otpInputs[digits.length] || otpInputs[5]).focus(); } catch (x) {}
        if (codeValue().length === 6) verifyCode();
      });
    });
  }

  function build() {
    if (document.getElementById('auth-gate')) return;
    gate = document.createElement('div');
    gate.id = 'auth-gate';
    gate.hidden = true;
    gate.innerHTML = MARKUP;
    document.body.appendChild(gate);

    stepEmail = q('.ag-step[data-step="email"]');
    stepCode = q('.ag-step[data-step="code"]');
    emailInput = q('#agEmail');
    otpInputs = qa('#agOtp input');
    resendBtn = q('#agResend');
    verifyBtn = q('#agVerify');
    continueBtn = q('#agContinue');
    mailEcho = q('#agMailEcho');

    applyI18n();
    wireOtp();

    continueBtn.addEventListener('click', sendCode);
    emailInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); sendCode(); } });
    verifyBtn.addEventListener('click', verifyCode);
    q('#agBack').addEventListener('click', function () { showStep('email'); try { emailInput.focus(); } catch (e) {} });
    resendBtn.addEventListener('click', function () {
      resendBtn.disabled = true;
      setTimeout(function () { resendBtn.disabled = false; }, 20000);
      sendCode();
    });

    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-language],[data-gate-lang]') : null;
      if (t) setTimeout(applyI18n, 0);
    }, true);
    window.addEventListener('storage', function (e) { if (e.key === LANG_KEY) applyI18n(); });

    var origChangeLanguage = window.changeLanguage;
    if (typeof origChangeLanguage === 'function' && !origChangeLanguage.__caAuthWrapped) {
      var wrapped = function () { var r = origChangeLanguage.apply(this, arguments); setTimeout(applyI18n, 0); return r; };
      wrapped.__caAuthWrapped = true;
      window.changeLanguage = wrapped;
    }
  }

  function complianceAccepted() {
    try { var v = JSON.parse(safeGet(PARENT_KEY) || 'null'); return !!(v && v.launchGate === true); }
    catch (e) { return false; }
  }
  function complianceGateVisible() { return !!document.querySelector('.launch-gate'); }

  function maybeShow() {
    if (safeGet(AUTHED_KEY) === '1') return true;
    if (complianceAccepted() && !complianceGateVisible()) { openGate(); return true; }
    return false;
  }

  /* magic-link return: supabase-js reads the token from the URL and fires
     SIGNED_IN; also covers a still-valid session from a previous visit. */
  function initSession() {
    var c = client();
    if (!c) return;
    c.auth.getSession().then(function (r) {
      var s = r && r.data && r.data.session;
      if (s && s.user) { currentEmail = s.user.email || currentEmail; finishAuth(); }
    }).catch(function () {});
    c.auth.onAuthStateChange(function (event, session) {
      if (session && session.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
        currentEmail = session.user.email || currentEmail;
        if (safeGet(AUTHED_KEY) !== '1' || !gate.hidden) finishAuth();
      }
    });
  }

  function init() {
    build();
    initSession();
    if (maybeShow()) return;
    var tries = 0;
    var poll = setInterval(function () {
      tries++;
      if (maybeShow() || tries > 900) clearInterval(poll); // ~6 min safety cap
    }, 400);
  }

  window.CAAuth = {
    open: function () { openGate(); },
    isAuthed: function () { return safeGet(AUTHED_KEY) === '1'; },
    setLang: function (code) { if (I18N[code]) { lang = code; applyI18n(); } },
    signOut: function () {
      safeDel(AUTHED_KEY);
      var c = client();
      if (c) c.auth.signOut().finally(function () { location.reload(); });
      else location.reload();
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
