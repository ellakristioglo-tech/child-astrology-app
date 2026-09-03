/* ================================================================
   Child Astrology — e-mail + 6-digit OTP sign-in gate
   Shows AFTER the compliance launch gate, BEFORE the app.
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
  var LANG_KEY    = 'language';                              // same key the app uses
  var PARENT_KEY  = 'child_astrology_parent_confirmed_v1';   // set by the compliance gate
  var DEFAULT_LANG = 'nl';
  var LANGS = ['nl', 'ru', 'ua', 'en'];
  var RESEND_SECONDS = 60;

  var I18N = {
    nl: {
      h1:'Maak kennis met de wereld van je kind',
      f1:'Geboortehoroscoop van je kind', f2:'Karakter, emoties en behoeften', f3:'Sterke kanten en talenten',
      emailLabel:'Je e-mailadres', emailPh:'naam@voorbeeld.nl',
      hint:'We sturen je een korte code — geen wachtwoord nodig',
      continue:'Doorgaan', or:'of', apple:'Doorgaan met Apple', google:'Doorgaan met Google',
      privacy:'We plaatsen niets en sturen geen spam',
      codeH1:'Controleer je e-mail', sentTo:'We hebben een 6-cijferige code gestuurd naar', change:'Wijzigen',
      noMail:'Geen e-mail ontvangen?', resendIn:'Code opnieuw versturen over', resend:'Code opnieuw versturen',
      spamNote:"Soms komt de e-mail in 'Reclame' of 'Spam' terecht",
      verify:'Bevestigen', openMail:'E-mail openen',
      errEmail:'Vul een geldig e-mailadres in', errCode:'Code onjuist — probeer het opnieuw',
      errSend:'Versturen mislukt — probeer het later opnieuw', sending:'Versturen…', checking:'Controleren…'
    },
    ru: {
      h1:'Познакомьтесь с миром вашего ребёнка',
      f1:'Натальная карта ребёнка', f2:'Характер, эмоции и потребности', f3:'Сильные стороны и таланты',
      emailLabel:'Ваш e-mail', emailPh:'name@example.com',
      hint:'Пришлём короткий код — пароль не нужен',
      continue:'Продолжить', or:'или', apple:'Продолжить с Apple', google:'Продолжить с Google',
      privacy:'Мы ничего не публикуем и не шлём спам',
      codeH1:'Проверьте почту', sentTo:'Мы отправили 6-значный код на', change:'Изменить',
      noMail:'Не получили письмо?', resendIn:'Отправить код ещё раз через', resend:'Отправить код ещё раз',
      spamNote:'Иногда письмо попадает в «Промоакции» или «Спам»',
      verify:'Подтвердить', openMail:'Открыть почту',
      errEmail:'Введите корректный e-mail', errCode:'Код неверный — попробуйте ещё раз',
      errSend:'Не удалось отправить — попробуйте позже', sending:'Отправляем…', checking:'Проверяем…'
    },
    ua: {
      h1:'Пізнайте світ вашої дитини',
      f1:'Натальна карта дитини', f2:'Характер, емоції та потреби', f3:'Сильні сторони й таланти',
      emailLabel:'Ваш e-mail', emailPh:'name@example.com',
      hint:'Надішлемо короткий код — пароль не потрібен',
      continue:'Продовжити', or:'або', apple:'Продовжити з Apple', google:'Продовжити з Google',
      privacy:'Ми нічого не публікуємо й не надсилаємо спам',
      codeH1:'Перевірте пошту', sentTo:'Ми надіслали 6-значний код на', change:'Змінити',
      noMail:'Не отримали лист?', resendIn:'Надіслати код ще раз через', resend:'Надіслати код ще раз',
      spamNote:'Іноді лист потрапляє в «Промоакції» або «Спам»',
      verify:'Підтвердити', openMail:'Відкрити пошту',
      errEmail:'Введіть коректний e-mail', errCode:'Код невірний — спробуйте ще раз',
      errSend:'Не вдалося надіслати — спробуйте пізніше', sending:'Надсилаємо…', checking:'Перевіряємо…'
    },
    en: {
      h1:'Meet the world of your child',
      f1:'Your child’s birth chart', f2:'Character, emotions and needs', f3:'Strengths and talents',
      emailLabel:'Your e-mail', emailPh:'name@example.com',
      hint:'We’ll send a short code — no password needed',
      continue:'Continue', or:'or', apple:'Continue with Apple', google:'Continue with Google',
      privacy:'We never post anything and don’t send spam',
      codeH1:'Check your e-mail', sentTo:'We’ve sent a 6-digit code to', change:'Change',
      noMail:'Didn’t get the e-mail?', resendIn:'Resend code in', resend:'Resend code',
      spamNote:'Sometimes the e-mail lands in “Promotions” or “Spam”',
      verify:'Confirm', openMail:'Open mail',
      errEmail:'Enter a valid e-mail', errCode:'Wrong code — try again',
      errSend:'Could not send — try again later', sending:'Sending…', checking:'Checking…'
    }
  };

  var MARKUP =
    '<div class="ag-sky" aria-hidden="true">' +
      '<svg class="ag-stars" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">' +
        '<g stroke="#e6c9a0" stroke-width="0.6" stroke-opacity="0.22" fill="none" stroke-linejoin="round">' +
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
          '<circle cx="200" cy="540" r=".8" opacity=".4"/><circle cx="280" cy="560" r=".9" opacity=".45"/>' +
          '<circle cx="150" cy="590" r=".85" opacity=".4"/><circle cx="70" cy="560" r=".8" opacity=".4"/>' +
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
          '<circle cx="322" cy="358" r="1" opacity=".6"/>' +
        '</g>' +
        '<g><circle cx="326" cy="74" r="13" fill="#f0dcc0" fill-opacity=".92"/><circle cx="320" cy="69" r="12" fill="#0c0d2c"/></g>' +
      '</svg>' +
      '<svg class="ag-horizon" viewBox="0 0 390 300" preserveAspectRatio="xMidYMax slice">' +
        '<defs><radialGradient id="agGlow" cx="50%" cy="98%" r="62%">' +
          '<stop offset="0%" stop-color="#f4a98c" stop-opacity=".5"/>' +
          '<stop offset="42%" stop-color="#d1789a" stop-opacity=".2"/>' +
          '<stop offset="100%" stop-color="#d1789a" stop-opacity="0"/>' +
        '</radialGradient></defs>' +
        '<rect x="0" y="0" width="390" height="300" fill="url(#agGlow)"/>' +
        '<path d="M0,208 L54,150 L104,192 L156,120 L212,182 L280,132 L338,168 L390,140 L390,300 L0,300 Z" fill="#181430" fill-opacity=".82"/>' +
        '<g fill="#070518">' +
          '<circle cx="188" cy="206" r="4.6"/><circle cx="188" cy="216" r="4.6"/>' +
          '<path d="M184,220 c-4,1 -7,4 -8,9 l-1,18 c0,2 2,3 4,3 l18,0 c2,0 4,-1 4,-3 l-1,-18 c-1,-5 -4,-8 -8,-9 z"/>' +
          '<path d="M178,228 c-6,-2 -10,-7 -11,-14 c-.3,-2 1,-4 3,-4 c2,0 3,1 4,3 c1,4 4,7 8,8 z"/>' +
          '<path d="M198,228 c6,-2 10,-7 11,-14 c.3,-2 -1,-4 -3,-4 c-2,0 -3,1 -4,3 c-1,4 -4,7 -8,8 z"/>' +
        '</g>' +
        '<path d="M0,246 L72,206 L140,242 L206,204 L276,246 L338,212 L390,236 L390,300 L0,300 Z" fill="#0b0920"/>' +
      '</svg>' +
      '<div class="ag-scrim"></div>' +
    '</div>' +

    '<section class="ag-step" data-step="email">' +
      '<div class="ag-dots"><span class="ag-dot on"></span><span class="ag-dot"></span><span class="ag-dot"></span><span class="ag-dot"></span></div>' +
      '<div class="ag-brand">' +
        '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#e6c9a0" stroke-width="1.3">' +
          '<circle cx="20" cy="20" r="17"/>' +
          '<path d="M25 10a10 10 0 1 0 0 20 8 8 0 0 1 0-20Z" stroke-linejoin="round"/>' +
          '<circle cx="15" cy="16" r="1" fill="#e6c9a0" stroke="none"/><circle cx="17" cy="24" r=".8" fill="#e6c9a0" stroke="none"/>' +
        '</svg>' +
        '<span class="ag-wordmark"><b>CHILD</b><span>ASTROLOGY</span></span>' +
      '</div>' +
      '<h1 class="ag-h1" data-i18n="h1"></h1>' +
      '<div class="ag-feats">' +
        '<span class="ag-feat"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#e6c9a0" stroke-width="1.2"><circle cx="9" cy="9" r="7"/><circle cx="9" cy="9" r="3"/><path d="M9 2v3M9 13v3M2 9h3M13 9h3"/></svg><span data-i18n="f1"></span></span>' +
        '<span class="ag-feat"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#e6c9a0" stroke-width="1.2"><path d="M14 9.5A5.5 5.5 0 1 1 7.5 4 4.3 4.3 0 0 0 14 9.5Z" stroke-linejoin="round"/></svg><span data-i18n="f2"></span></span>' +
        '<span class="ag-feat"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#e6c9a0" stroke-width="1.2"><path d="M9 2l1.7 4.6L15 8l-4.3 1.4L9 14l-1.7-4.6L3 8l4.3-1.4z" stroke-linejoin="round"/></svg><span data-i18n="f3"></span></span>' +
      '</div>' +
      '<div class="ag-panel">' +
        '<label class="ag-field">' +
          '<span class="ag-lbl" data-i18n="emailLabel"></span>' +
          '<span class="ag-inputwrap">' +
            '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#8b85a6" stroke-width="1.3"><rect x="2" y="4" width="14" height="10" rx="2"/><path d="M3 5l6 5 6-5"/></svg>' +
            '<input id="agEmail" type="email" inputmode="email" autocomplete="email" spellcheck="false">' +
          '</span>' +
        '</label>' +
        '<p class="ag-hint" data-i18n="hint"></p>' +
        '<p class="ag-err" id="agEmailErr" role="alert"></p>' +
        '<button class="ag-cta" id="agContinue" type="button" data-i18n="continue"></button>' +
        '<div class="ag-or"><span data-i18n="or"></span></div>' +
        '<button class="ag-social" type="button" data-provider="apple">' +
          '<svg width="15" height="16" viewBox="0 0 16 17" fill="#e9e6f2"><path d="M10.8 9c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.4-2.5-1.4-1.1-.1-2.1.6-2.6.6-.5 0-1.4-.6-2.3-.6-1.2 0-2.3.7-2.9 1.8-1.2 2.1-.3 5.3.9 7 .6.8 1.3 1.8 2.2 1.7.9 0 1.2-.6 2.3-.6s1.3.6 2.3.6c.9 0 1.5-.8 2.1-1.7.7-1 .9-1.9.9-2-.1 0-1.8-.7-1.8-2.6z"/><path d="M9.3 3.7c.5-.6.8-1.4.7-2.3-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-.9z"/></svg>' +
          '<span data-i18n="apple"></span>' +
        '</button>' +
        '<button class="ag-social" type="button" data-provider="google">' +
          '<svg width="15" height="15" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.5h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.6z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z"/></svg>' +
          '<span data-i18n="google"></span>' +
        '</button>' +
        '<p class="ag-privacy"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#8b85a6" stroke-width="1.2"><rect x="3" y="6" width="8" height="6" rx="1.2"/><path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"/></svg><span data-i18n="privacy"></span></p>' +
      '</div>' +
    '</section>' +

    '<section class="ag-step" data-step="code" hidden>' +
      '<div class="ag-topbar">' +
        '<button class="ag-back" id="agBack" type="button" aria-label="Back"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e6c9a0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>' +
        '<div class="ag-dots"><span class="ag-dot"></span><span class="ag-dot on"></span><span class="ag-dot"></span><span class="ag-dot"></span></div>' +
      '</div>' +
      '<div class="ag-mid">' +
        '<span class="ag-emblem"><svg width="76" height="76" viewBox="0 0 76 76" fill="none">' +
          '<circle cx="38" cy="38" r="35" stroke="#e6c9a0" stroke-opacity=".32" stroke-width="1"/>' +
          '<g stroke="#e6c9a0" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><rect x="20" y="25" width="36" height="26" rx="4"/><path d="M20 29l18 13 18-13"/></g>' +
          '<path d="M38 11l2.3 4.8 5.2.7-3.8 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.8-3.6 5.2-.7z" fill="#e6c9a0"/>' +
        '</svg></span>' +
        '<h1 class="ag-h1" data-i18n="codeH1"></h1>' +
        '<p class="ag-body"><span data-i18n="sentTo"></span><br><span class="ag-mail" id="agMailEcho"></span><button class="ag-edit" id="agChange" type="button" data-i18n="change"></button></p>' +
        '<div class="ag-otp" id="agOtp">' +
          '<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1" placeholder=" ">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder=" ">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder=" ">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder=" ">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder=" ">' +
          '<input type="text" inputmode="numeric" maxlength="1" placeholder=" ">' +
        '</div>' +
        '<p class="ag-err" id="agCodeErr" role="alert" style="text-align:center"></p>' +
        '<div class="ag-resend"><span data-i18n="noMail"></span><span class="ag-timer" id="agTimer"></span><button id="agResend" type="button" disabled data-i18n="resend"></button></div>' +
        '<p class="ag-note" data-i18n="spamNote"></p>' +
      '</div>' +
      '<div class="ag-foot">' +
        '<button class="ag-cta" id="agVerify" type="button" disabled data-i18n="verify"></button>' +
        '<button class="ag-ghost" id="agOpenMail" type="button" data-i18n="openMail"></button>' +
      '</div>' +
    '</section>';

  var CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
  var sb = null;
  function client() {
    if (sb) return sb;
    if (CONFIGURED && window.supabase && window.supabase.createClient) {
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return sb;
  }

  var gate, stepEmail, stepCode, emailInput, otpInputs, timerEl, resendBtn, verifyBtn, continueBtn, mailEcho;
  var currentEmail = '';
  var countdown = null;
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
    if (timerEl && timerEl.dataset.seconds) renderTimer(+timerEl.dataset.seconds);
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
    clearInterval(countdown);
    gate.hidden = true;
    document.body.classList.remove('ca-auth-open');
    safeSet(AUTHED_KEY, '1');
    try { window.dispatchEvent(new CustomEvent('ca:authed', { detail: { email: currentEmail } })); } catch (e) {}
    if (window.CAApp && typeof window.CAApp.onAuthed === 'function') { try { window.CAApp.onAuthed(currentEmail); } catch (e) {} }
    if (typeof window.showSection === 'function') { try { window.showSection('home'); } catch (e) {} }
  }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function busy(btn, on, key) {
    btn.disabled = on;
    btn.dataset.i18n = on ? (key || 'sending') : btn.dataset.baseKey;
    btn.textContent = tr(btn.dataset.i18n);
  }

  function renderTimer(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    timerEl.dataset.seconds = sec;
    timerEl.hidden = false;
    timerEl.textContent = tr('resendIn') + ' ' + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function startCountdown() {
    var left = RESEND_SECONDS;
    clearInterval(countdown);
    resendBtn.disabled = true;
    renderTimer(left);
    countdown = setInterval(function () {
      left--;
      if (left <= 0) { clearInterval(countdown); timerEl.hidden = true; timerEl.removeAttribute('data-seconds'); resendBtn.disabled = false; }
      else renderTimer(left);
    }, 1000);
  }

  function sendCode() {
    var email = emailInput.value.trim().toLowerCase();
    var err = q('#agEmailErr');
    err.textContent = '';
    if (!validEmail(email)) { err.textContent = tr('errEmail'); emailInput.focus(); return; }
    currentEmail = email;
    mailEcho.textContent = email;

    var proceed = function () {
      clearOtp(); showStep('code'); startCountdown();
      continueBtn.disabled = false; continueBtn.textContent = tr('continue');
    };
    var fail = function (e) {
      continueBtn.disabled = false; continueBtn.textContent = tr('continue');
      err.textContent = tr('errSend'); if (e) console.error('[auth-gate]', e);
    };

    continueBtn.disabled = true; continueBtn.textContent = tr('sending');
    var c = client();
    if (!c) { console.warn('[auth-gate] Supabase not configured — demo mode, no e-mail sent.'); proceed(); return; }
    c.auth.signInWithOtp({ email: email, options: { shouldCreateUser: true } })
      .then(function (r) { r && r.error ? fail(r.error) : proceed(); })
      .catch(fail);
  }

  function codeValue() { return otpInputs.map(function (i) { return i.value; }).join(''); }
  function clearOtp() {
    otpInputs.forEach(function (i) { i.value = ''; });
    q('#agOtp').classList.remove('err', 'ok');
    verifyBtn.disabled = true;
    q('#agCodeErr').textContent = '';
  }

  function verifyCode() {
    var code = codeValue();
    if (code.length < 6) return;
    var err = q('#agCodeErr');
    err.textContent = '';
    verifyBtn.disabled = true; verifyBtn.textContent = tr('checking');

    var ok = function () {
      verifyBtn.textContent = tr('verify');
      q('#agOtp').classList.add('ok');
      setTimeout(finishAuth, 500);
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
        verifyBtn.disabled = codeValue().length < 6;
        if (codeValue().length === 6) verifyCode();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !input.value && idx > 0) { otpInputs[idx - 1].focus(); otpInputs[idx - 1].value = ''; verifyBtn.disabled = true; e.preventDefault(); }
        else if (e.key === 'ArrowLeft' && idx > 0) otpInputs[idx - 1].focus();
        else if (e.key === 'ArrowRight' && idx < 5) otpInputs[idx + 1].focus();
      });
      input.addEventListener('paste', function (e) {
        e.preventDefault();
        var raw = (e.clipboardData || window.clipboardData).getData('text') || '';
        var digits = raw.replace(/\D/g, '').slice(0, 6).split('');
        digits.forEach(function (d, i) { if (otpInputs[i]) otpInputs[i].value = d; });
        try { (otpInputs[digits.length] || otpInputs[5]).focus(); } catch (x) {}
        verifyBtn.disabled = codeValue().length < 6;
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
    timerEl = q('#agTimer');
    resendBtn = q('#agResend');
    verifyBtn = q('#agVerify');
    continueBtn = q('#agContinue');
    mailEcho = q('#agMailEcho');
    continueBtn.dataset.baseKey = 'continue';
    verifyBtn.dataset.baseKey = 'verify';

    applyI18n();
    wireOtp();

    continueBtn.addEventListener('click', sendCode);
    emailInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); sendCode(); } });
    q('#agChange').addEventListener('click', function () { showStep('email'); try { emailInput.focus(); } catch (e) {} });
    q('#agBack').addEventListener('click', function () { showStep('email'); });
    resendBtn.addEventListener('click', function () { if (!resendBtn.disabled) sendCode(); });
    q('#agOpenMail').addEventListener('click', function () {
      var d = (currentEmail.split('@')[1] || '').toLowerCase();
      var map = {
        'gmail.com': 'https://mail.google.com', 'googlemail.com': 'https://mail.google.com',
        'live.nl': 'https://outlook.live.com', 'outlook.com': 'https://outlook.live.com',
        'hotmail.com': 'https://outlook.live.com', 'hotmail.nl': 'https://outlook.live.com',
        'icloud.com': 'https://www.icloud.com/mail', 'me.com': 'https://www.icloud.com/mail',
        'yahoo.com': 'https://mail.yahoo.com', 'ya.ru': 'https://mail.yandex.ru', 'yandex.ru': 'https://mail.yandex.ru'
      };
      window.open(map[d] || 'mailto:', '_blank', 'noopener');
    });
    qa('.ag-social').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = client();
        if (!c) { console.warn('[auth-gate] social sign-in needs Supabase + an OAuth provider configured.'); return; }
        c.auth.signInWithOAuth({ provider: b.getAttribute('data-provider'), options: { redirectTo: location.origin } });
      });
    });

    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-language],[data-gate-lang]') : null;
      if (t) setTimeout(applyI18n, 0);
    }, true);
    window.addEventListener('storage', function (e) { if (e.key === LANG_KEY) applyI18n(); });

    var origChangeLanguage = window.changeLanguage;
    if (typeof origChangeLanguage === 'function' && !origChangeLanguage.__caAuthWrapped) {
      var wrappedChangeLanguage = function () {
        var result = origChangeLanguage.apply(this, arguments);
        setTimeout(applyI18n, 0);
        return result;
      };
      wrappedChangeLanguage.__caAuthWrapped = true;
      window.changeLanguage = wrappedChangeLanguage;
    }
  }

  /* show only after the compliance launch gate is accepted */
  function complianceAccepted() {
    try {
      var v = JSON.parse(safeGet(PARENT_KEY) || 'null');
      return !!(v && v.launchGate === true);
    } catch (e) { return false; }
  }
  function complianceGateVisible() { return !!document.querySelector('.launch-gate'); }

  function maybeShow() {
    if (safeGet(AUTHED_KEY) === '1') return true;
    if (complianceAccepted() && !complianceGateVisible()) { openGate(); return true; }
    return false;
  }

  function init() {
    build();
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
