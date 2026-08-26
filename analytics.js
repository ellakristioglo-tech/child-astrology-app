(function () {
  'use strict';

  const CONFIG = window.CHILD_ASTROLOGY_ANALYTICS || {};
  const CONSENT_KEY = 'child_astrology_analytics_consent_v2';
  const LEGACY_CONSENT_KEY = 'child_astrology_analytics_consent';
  const LOCAL_KEY = 'child_astrology_local_analytics_v1';
  const OWNER_KEY = 'child_astrology_owner_analytics';
  const COOKIE_LIFETIME_SECONDS = 60 * 60 * 24 * 180;
  const SAFE_TOPICS = new Set(['learning', 'communication', 'sport', 'other']);
  const ALLOWED_EVENTS = new Set([
    'app_open', 'section_view', 'child_profile_created', 'child_analysis_generated',
    'consultation_question', 'tarot_day_card', 'tarot_five_card',
    'scent_generated', 'scent_order_started'
  ]);
  const SAFE_PARAMS = new Set(['section', 'topic', 'language', 'mode', 'source']);

  const COPY = {
    ru: {
      title: 'Настройки конфиденциальности',
      prompt: 'Мы используем необязательную Google Analytics, чтобы считать посещения, просмотры разделов и общие категории вопросов. Имена, даты и места рождения, координаты и текст вопросов не отправляются. Аналитика включится только с вашего разрешения.',
      allow: 'Разрешить необязательные', reject: 'Отклонить необязательные', customize: 'Настроить',
      preferences: 'Настроить cookies', close: 'Закрыть', save: 'Сохранить выбор',
      requiredTitle: 'Необходимое хранилище', requiredText: 'Всегда активно. Сохраняет язык, профили, результаты и ваш выбор конфиденциальности только на этом устройстве.',
      optionalTitle: 'Google Analytics', optionalText: 'Необязательно. Помогает понять количество пользователей и востребованные разделы. Без рекламы, Google Signals и улучшенной статистики.',
      provider: 'Поставщик: Google Ireland Limited. Cookies: _ga и _ga_*. Максимальный срок cookies — 6 месяцев. Категории, связанные со здоровьем, в Google не передаются.',
      connected: 'Google Analytics подключена и ждёт вашего выбора.', enabled: 'Необязательная аналитика разрешена.', disabled: 'Необязательная аналитика отключена.',
      manage: 'Изменить настройки cookies', privacy: 'Профили и данные рождения остаются на этом устройстве. В Google уходят только разрешённые обезличенные события использования.',
      googlePrivacy: 'Конфиденциальность Google', open: 'Открыть общую аналитику', device: 'На этом устройстве', opens: 'Открытий', questions: 'Вопросов', topics: 'Темы вопросов', empty: 'Данных пока нет.'
    },
    ua: {
      title: 'Налаштування конфіденційності',
      prompt: 'Ми використовуємо необов’язкову Google Analytics, щоб рахувати відвідування, перегляди розділів і загальні категорії запитань. Імена, дати й місця народження, координати та тексти запитань не надсилаються. Аналітика ввімкнеться лише з вашого дозволу.',
      allow: 'Дозволити необов’язкові', reject: 'Відхилити необов’язкові', customize: 'Налаштувати',
      preferences: 'Налаштувати cookies', close: 'Закрити', save: 'Зберегти вибір',
      requiredTitle: 'Необхідне сховище', requiredText: 'Завжди активне. Зберігає мову, профілі, результати й ваш вибір конфіденційності лише на цьому пристрої.',
      optionalTitle: 'Google Analytics', optionalText: 'Необов’язково. Допомагає зрозуміти кількість користувачів і популярні розділи. Без реклами, Google Signals та розширеної статистики.',
      provider: 'Постачальник: Google Ireland Limited. Cookies: _ga та _ga_*. Максимальний строк cookies — 6 місяців. Категорії, пов’язані зі здоров’ям, у Google не надсилаються.',
      connected: 'Google Analytics підключено й очікує на ваш вибір.', enabled: 'Необов’язкову аналітику дозволено.', disabled: 'Необов’язкову аналітику вимкнено.',
      manage: 'Змінити налаштування cookies', privacy: 'Профілі та дані народження залишаються на цьому пристрої. У Google надходять лише дозволені знеособлені події використання.',
      googlePrivacy: 'Конфіденційність Google', open: 'Відкрити загальну аналітику', device: 'На цьому пристрої', opens: 'Відкриттів', questions: 'Запитань', topics: 'Теми запитань', empty: 'Даних поки немає.'
    },
    en: {
      title: 'Privacy settings',
      prompt: 'We use optional Google Analytics to count visits, section views and broad question categories. Names, birth dates and places, coordinates and question text are never sent. Analytics starts only with your permission.',
      allow: 'Accept optional', reject: 'Reject optional', customize: 'Settings',
      preferences: 'Cookie settings', close: 'Close', save: 'Save choices',
      requiredTitle: 'Necessary storage', requiredText: 'Always active. It keeps language, profiles, results and your privacy choice on this device only.',
      optionalTitle: 'Google Analytics', optionalText: 'Optional. It helps us understand user totals and useful sections. Advertising, Google Signals and enhanced measurement are disabled.',
      provider: 'Provider: Google Ireland Limited. Cookies: _ga and _ga_*. Maximum cookie lifetime: 6 months. Health-related categories are not sent to Google.',
      connected: 'Google Analytics is connected and waiting for your choice.', enabled: 'Optional analytics is allowed.', disabled: 'Optional analytics is off.',
      manage: 'Change cookie settings', privacy: 'Profiles and birth details stay on this device. Only permitted, de-identified usage events are sent to Google.',
      googlePrivacy: 'Google privacy', open: 'Open overall analytics', device: 'On this device', opens: 'Opens', questions: 'Questions', topics: 'Question topics', empty: 'No data yet.'
    },
    nl: {
      title: 'Privacy-instellingen',
      prompt: 'We gebruiken optionele Google Analytics om bezoeken, bekeken onderdelen en algemene vraagcategorieën te tellen. Namen, geboortedata en -plaatsen, coördinaten en vraagteksten worden nooit verzonden. Analytics start alleen met uw toestemming.',
      allow: 'Optionele toestaan', reject: 'Optionele weigeren', customize: 'Instellen',
      preferences: 'Cookie-instellingen', close: 'Sluiten', save: 'Keuze opslaan',
      requiredTitle: 'Noodzakelijke opslag', requiredText: 'Altijd actief. Taal, profielen, resultaten en uw privacykeuze blijven alleen op dit apparaat.',
      optionalTitle: 'Google Analytics', optionalText: 'Optioneel. Hiermee zien we gebruikersaantallen en welke onderdelen nuttig zijn. Advertenties, Google Signals en verbeterde meting staan uit.',
      provider: 'Aanbieder: Google Ireland Limited. Cookies: _ga en _ga_*. Maximale cookieduur: 6 maanden. Gezondheidsgerelateerde categorieën worden niet naar Google verzonden.',
      connected: 'Google Analytics is gekoppeld en wacht op uw keuze.', enabled: 'Optionele analyse is toegestaan.', disabled: 'Optionele analyse staat uit.',
      manage: 'Cookie-instellingen wijzigen', privacy: 'Profielen en geboortegegevens blijven op dit apparaat. Alleen toegestane, niet-identificerende gebruiksgebeurtenissen gaan naar Google.',
      googlePrivacy: 'Privacy bij Google', open: 'Totale analyse openen', device: 'Op dit apparaat', opens: 'Openingen', questions: 'Vragen', topics: 'Vraagthema’s', empty: 'Nog geen gegevens.'
    }
  };

  const TOPIC_LABELS = {
    ru: {learning:'Обучение',communication:'Общение',sport:'Спорт',other:'Другое'},
    ua: {learning:'Навчання',communication:'Спілкування',sport:'Спорт',other:'Інше'},
    en: {learning:'Learning',communication:'Communication',sport:'Sport',other:'Other'},
    nl: {learning:'Leren',communication:'Communicatie',sport:'Sport',other:'Overig'}
  };

  function language() {
    const value = localStorage.getItem('language') || window.currentLanguage || 'nl';
    return COPY[value] ? value : 'nl';
  }
  function text() { return COPY[language()]; }
  function escapeHtml(value) { return String(value ?? '').replace(/[&<>'\"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[char])); }
  function validMeasurementId() { return /^G-[A-Z0-9]{6,}$/i.test(String(CONFIG.measurementId || '').trim()); }
  function consentState() { return localStorage.getItem(CONSENT_KEY); }
  function consentGranted() { return consentState() === 'granted'; }
  function publicTopic(topic) { return SAFE_TOPICS.has(topic) ? topic : 'other'; }
  function readLocal() {
    try {
      const data = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{"events":{},"topics":{}}');
      const topics = {};
      Object.entries(data.topics || {}).forEach(([key, value]) => {
        const safe = publicTopic(key);
        topics[safe] = (topics[safe] || 0) + (Number(value) || 0);
      });
      return {events:data.events || {},topics};
    } catch (_) { return {events:{},topics:{}}; }
  }
  function writeLocal(data) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)); } catch (_) {} }
  function remember(eventName, params) {
    const data = readLocal();
    data.events[eventName] = (data.events[eventName] || 0) + 1;
    if (eventName === 'consultation_question' && params.topic) {
      const topic = publicTopic(params.topic);
      data.topics[topic] = (data.topics[topic] || 0) + 1;
    }
    writeLocal(data);
  }
  function safeParams(params) {
    const output = {};
    Object.entries(params || {}).forEach(([key, value]) => {
      if (SAFE_PARAMS.has(key) && ['string','number','boolean'].includes(typeof value)) output[key] = String(value).slice(0, 40);
    });
    output.language = language();
    return output;
  }
  function remoteParams(eventName, params) {
    const output = safeParams(params);
    if (eventName === 'consultation_question') output.topic = publicTopic(output.topic || 'other');
    return output;
  }
  function cleanGoogleCookies() {
    document.cookie.split(';').map((part) => part.trim().split('=')[0]).filter((name) => name === '_ga' || name.startsWith('_ga_')).forEach((name) => {
      const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = `${name}=; expires=${expires}; path=/; SameSite=Lax`;
      document.cookie = `${name}=; expires=${expires}; path=/child-astrology-app/; SameSite=Lax`;
      document.cookie = `${name}=; expires=${expires}; path=/; domain=.ellakristioglo-tech.github.io; SameSite=Lax`;
    });
  }
  function loadGoogleTag() {
    if (!validMeasurementId() || !consentGranted() || window.__childAstrologyGtagLoaded) return;
    window.__childAstrologyGtagLoaded = true;
    window[`ga-disable-${CONFIG.measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      anonymize_ip: true,
      cookie_expires: COOKIE_LIFETIME_SECONDS,
      cookie_update: false,
      cookie_flags: 'SameSite=None;Secure'
    });
    window.gtag('event', 'page_view', {
      page_location: `${location.origin}${location.pathname}`,
      page_path: location.pathname,
      page_title: document.title
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(CONFIG.measurementId)}`;
    document.head.appendChild(script);
  }
  function track(eventName, params) {
    if (!ALLOWED_EVENTS.has(eventName)) return;
    const localParams = safeParams(params);
    remember(eventName, localParams);
    if (validMeasurementId() && consentGranted()) {
      loadGoogleTag();
      window.gtag?.('event', eventName, remoteParams(eventName, params));
    }
    renderPanel();
  }
  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value ? 'granted' : 'denied');
    localStorage.removeItem(LEGACY_CONSENT_KEY);
    document.getElementById('analyticsConsentPrompt')?.remove();
    if (value) {
      window[`ga-disable-${CONFIG.measurementId}`] = false;
      window.gtag?.('consent', 'update', {analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      loadGoogleTag();
    } else {
      window[`ga-disable-${CONFIG.measurementId}`] = true;
      window.gtag?.('consent', 'update', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      cleanGoogleCookies();
    }
    closePreferences();
    renderPanel();
  }
  function ownerMode() {
    const query = new URLSearchParams(location.search);
    if (query.get('owner') === 'ella') localStorage.setItem(OWNER_KEY, '1');
    return localStorage.getItem(OWNER_KEY) === '1';
  }
  function closePreferences() { document.getElementById('analyticsPreferences')?.remove(); }
  function openPreferences() {
    closePreferences();
    const ui = text();
    const backdrop = document.createElement('div');
    backdrop.id = 'analyticsPreferences';
    backdrop.className = 'analytics-preferences-backdrop';
    backdrop.innerHTML = `<div class="analytics-preferences" role="dialog" aria-modal="true" aria-labelledby="analyticsPreferencesTitle"><button class="analytics-preferences-close" type="button" aria-label="${escapeHtml(ui.close)}">×</button><h2 id="analyticsPreferencesTitle">${escapeHtml(ui.preferences)}</h2><div class="analytics-preference-row required"><div><strong>${escapeHtml(ui.requiredTitle)}</strong><p>${escapeHtml(ui.requiredText)}</p></div><span class="analytics-always-on" aria-label="On">✓</span></div><label class="analytics-preference-row"><div><strong>${escapeHtml(ui.optionalTitle)}</strong><p>${escapeHtml(ui.optionalText)}</p><small>${escapeHtml(ui.provider)}</small></div><input id="analyticsPreferenceToggle" type="checkbox" ${consentGranted() ? 'checked' : ''}></label><a class="analytics-policy-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">${escapeHtml(ui.googlePrivacy)}</a><div class="analytics-preferences-actions"><button type="button" data-preferences-close>${escapeHtml(ui.close)}</button><button class="primary" type="button" data-preferences-save>${escapeHtml(ui.save)}</button></div></div>`;
    backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closePreferences(); });
    backdrop.querySelector('.analytics-preferences-close').addEventListener('click', closePreferences);
    backdrop.querySelector('[data-preferences-close]').addEventListener('click', closePreferences);
    backdrop.querySelector('[data-preferences-save]').addEventListener('click', () => setConsent(backdrop.querySelector('#analyticsPreferenceToggle').checked));
    document.body.appendChild(backdrop);
    backdrop.querySelector('#analyticsPreferenceToggle').focus();
  }
  function renderConsent() {
    document.getElementById('analyticsConsentPrompt')?.remove();
    if (!validMeasurementId() || consentState()) return;
    const ui = text();
    const box = document.createElement('div');
    box.id = 'analyticsConsentPrompt';
    box.className = 'analytics-consent-prompt';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', ui.title);
    box.innerHTML = `<strong>${escapeHtml(ui.title)}</strong><p>${escapeHtml(ui.prompt)}</p><div class="analytics-consent-actions"><button type="button" data-consent="no">${escapeHtml(ui.reject)}</button><button type="button" data-consent="settings">${escapeHtml(ui.customize)}</button><button class="primary" type="button" data-consent="yes">${escapeHtml(ui.allow)}</button></div>`;
    box.querySelector('[data-consent="no"]').addEventListener('click', () => setConsent(false));
    box.querySelector('[data-consent="settings"]').addEventListener('click', openPreferences);
    box.querySelector('[data-consent="yes"]').addEventListener('click', () => setConsent(true));
    document.body.appendChild(box);
  }
  function renderPanel() {
    const root = document.getElementById('analyticsPanel');
    if (!root) return;
    root.hidden = false;
    const ui = text();
    const state = consentState();
    const status = state === 'granted' ? ui.enabled : state === 'denied' ? ui.disabled : ui.connected;
    const data = readLocal();
    const topics = Object.entries(data.topics || {}).sort((a,b) => b[1] - a[1]);
    const owner = ownerMode();
    root.innerHTML = `<div class="analytics-card"><div class="analytics-heading"><span class="analytics-symbol" aria-hidden="true">↗</span><div><h3>${escapeHtml(ui.title)}</h3><p>${escapeHtml(status)}</p></div></div><p class="analytics-privacy">${escapeHtml(ui.privacy)}</p><button class="btn analytics-manage" type="button">${escapeHtml(ui.manage)}</button>${owner ? `<div class="analytics-local"><strong>${escapeHtml(ui.device)}</strong><div class="analytics-kpis"><span><b>${Number(data.events?.app_open || 0)}</b>${escapeHtml(ui.opens)}</span><span><b>${Number(data.events?.consultation_question || 0)}</b>${escapeHtml(ui.questions)}</span></div><h4>${escapeHtml(ui.topics)}</h4>${topics.length ? `<ol>${topics.map(([key,count]) => `<li><span>${escapeHtml(TOPIC_LABELS[language()][key] || key)}</span><b>${Number(count)}</b></li>`).join('')}</ol>` : `<p>${escapeHtml(ui.empty)}</p>`}</div><a class="btn analytics-open" href="${escapeHtml(CONFIG.dashboardUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(ui.open)}</a>` : ''}</div>`;
    root.querySelector('.analytics-manage').addEventListener('click', openPreferences);
  }
  function bindNavigation() {
    const original = window.showSection;
    if (typeof original === 'function' && !original.__analyticsWrapped) {
      const wrapped = function (sectionId, event) { const result = original(sectionId, event); track('section_view', {section:sectionId}); return result; };
      wrapped.__analyticsWrapped = true;
      window.showSection = wrapped;
    }
    const change = window.changeLanguage;
    if (typeof change === 'function' && !change.__analyticsWrapped) {
      const wrapped = function (nextLanguage, event) { const result = change(nextLanguage, event); renderPanel(); renderConsent(); return result; };
      wrapped.__analyticsWrapped = true;
      window.changeLanguage = wrapped;
    }
  }

  window.AppAnalytics = {track, render:renderPanel, setConsent, openPreferences, getConsent:()=>consentState() || 'unset', resetConsent:()=>{localStorage.removeItem(CONSENT_KEY);renderPanel();renderConsent();}, isConnected:validMeasurementId};
  document.addEventListener('app:consultation-question', (event) => track('consultation_question', {topic:publicTopic(event.detail?.topic || 'other')}));
  document.addEventListener('app:child-created', () => track('child_profile_created'));
  document.addEventListener('app:child-analysis', () => track('child_analysis_generated'));
  document.addEventListener('app:tarot-day-card', () => track('tarot_day_card'));
  document.addEventListener('app:tarot-five-card', () => track('tarot_five_card'));
  document.addEventListener('app:scent-generated', (event) => track('scent_generated', {mode:event.detail?.mode || 'family'}));
  document.addEventListener('app:scent-order', (event) => track('scent_order_started', {mode:event.detail?.mode || 'family'}));
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem(LEGACY_CONSENT_KEY) === 'denied' && !consentState()) localStorage.setItem(CONSENT_KEY, 'denied');
    loadGoogleTag();
    bindNavigation();
    track('app_open', {source:window.matchMedia?.('(display-mode: standalone)').matches ? 'installed' : 'browser'});
    renderPanel();
    renderConsent();
  });
})();
