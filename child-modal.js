(function () {
  const COPY = {
    ru: {
      title: 'Добавить ребёнка', steps: ['Имя', 'Дата', 'Время', 'Город', 'Проверка'], progress: 'Шаг {current} из {total}', close: 'Закрыть', back: 'Назад', next: 'Далее', save: 'Сохранить профиль',
      nameTitle: 'Как зовут ребёнка?', nameLabel: 'Имя или псевдоним', namePlaceholder: 'Например, София', nameHelp: 'Это имя будет показано в профиле ребёнка.', nameError: 'Введите имя или псевдоним.',
      dateTitle: 'Когда родился ребёнок?', dateLabel: 'Полная дата рождения', dateHelp: 'Нажмите на поле — откроется календарь.', dateError: 'Выберите дату рождения.', futureDateError: 'Дата рождения не может быть в будущем.',
      timeTitle: 'Во сколько родился ребёнок?', timeLabel: 'Точное время рождения', timeHelp: 'Укажите часы и минуты или отметьте, что время неизвестно.', unknownTime: 'Время рождения неизвестно', timeError: 'Выберите время или отметьте «Время рождения неизвестно».',
      placeTitle: 'Где родился ребёнок?', placeLabel: 'Место рождения', placePlaceholder: 'Начните вводить город', placeHelp: 'Введите минимум 3 буквы. Выберите город из списка, чтобы страна и регион сохранились правильно.', typeMore: 'Введите минимум 3 буквы.', loading: 'Ищем города…', notFound: 'Город не найден. Проверьте написание.', searchError: 'Поиск города временно недоступен. Проверьте интернет и попробуйте снова.', placeError: 'Выберите подходящий город из списка.', selected: 'Выбрано', attribution: 'Данные о городах: GeoNames через Open-Meteo',
      reviewTitle: 'Проверьте данные', reviewHelp: 'После сохранения эти данные появятся в профиле ребёнка.', name: 'Имя', date: 'Дата рождения', time: 'Время рождения', place: 'Место рождения', unknown: 'Неизвестно', done: 'Профиль ребёнка сохранён! ✨'
    },
    ua: {
      title: 'Додати дитину', steps: ["Ім’я", 'Дата', 'Час', 'Місто', 'Перевірка'], progress: 'Крок {current} із {total}', close: 'Закрити', back: 'Назад', next: 'Далі', save: 'Зберегти профіль',
      nameTitle: 'Як звати дитину?', nameLabel: "Ім’я або псевдонім", namePlaceholder: 'Наприклад, Софія', nameHelp: "Це ім’я буде показано в профілі дитини.", nameError: "Введіть ім’я або псевдонім.",
      dateTitle: 'Коли народилася дитина?', dateLabel: 'Повна дата народження', dateHelp: 'Натисніть на поле — відкриється календар.', dateError: 'Виберіть дату народження.', futureDateError: 'Дата народження не може бути в майбутньому.',
      timeTitle: 'О котрій годині народилася дитина?', timeLabel: 'Точний час народження', timeHelp: 'Вкажіть години й хвилини або позначте, що час невідомий.', unknownTime: 'Час народження невідомий', timeError: 'Виберіть час або позначте «Час народження невідомий».',
      placeTitle: 'Де народилася дитина?', placeLabel: 'Місце народження', placePlaceholder: 'Почніть вводити місто', placeHelp: 'Введіть щонайменше 3 літери. Виберіть місто зі списку, щоб країна та регіон збереглися правильно.', typeMore: 'Введіть щонайменше 3 літери.', loading: 'Шукаємо міста…', notFound: 'Місто не знайдено. Перевірте написання.', searchError: 'Пошук міста тимчасово недоступний. Перевірте інтернет і спробуйте ще раз.', placeError: 'Виберіть потрібне місто зі списку.', selected: 'Вибрано', attribution: 'Дані про міста: GeoNames через Open-Meteo',
      reviewTitle: 'Перевірте дані', reviewHelp: 'Після збереження ці дані з’являться у профілі дитини.', name: "Ім’я", date: 'Дата народження', time: 'Час народження', place: 'Місце народження', unknown: 'Невідомо', done: 'Профіль дитини збережено! ✨'
    },
    en: {
      title: 'Add child', steps: ['Name', 'Date', 'Time', 'City', 'Review'], progress: 'Step {current} of {total}', close: 'Close', back: 'Back', next: 'Next', save: 'Save profile',
      nameTitle: "What is the child's name?", nameLabel: 'Name or nickname', namePlaceholder: 'For example, Sofia', nameHelp: "This name will be shown in the child's profile.", nameError: 'Enter a name or nickname.',
      dateTitle: 'When was the child born?', dateLabel: 'Full birth date', dateHelp: 'Tap the field to open the calendar.', dateError: 'Select the birth date.', futureDateError: 'The birth date cannot be in the future.',
      timeTitle: 'What time was the child born?', timeLabel: 'Exact birth time', timeHelp: 'Enter hours and minutes, or mark the birth time as unknown.', unknownTime: 'Birth time is unknown', timeError: 'Select a time or mark the birth time as unknown.',
      placeTitle: 'Where was the child born?', placeLabel: 'Birth place', placePlaceholder: 'Start typing a city', placeHelp: 'Enter at least 3 letters. Select a city from the list so its country and region are saved correctly.', typeMore: 'Enter at least 3 letters.', loading: 'Searching for cities…', notFound: 'City not found. Check the spelling.', searchError: 'City search is temporarily unavailable. Check your connection and try again.', placeError: 'Select the correct city from the list.', selected: 'Selected', attribution: 'Location data: GeoNames via Open-Meteo',
      reviewTitle: 'Review the details', reviewHelp: "After saving, these details will appear in the child's profile.", name: 'Name', date: 'Birth date', time: 'Birth time', place: 'Birth place', unknown: 'Unknown', done: 'Child profile saved! ✨'
    },
    nl: {
      title: 'Kind toevoegen', steps: ['Naam', 'Datum', 'Tijd', 'Plaats', 'Controle'], progress: 'Stap {current} van {total}', close: 'Sluiten', back: 'Terug', next: 'Volgende', save: 'Profiel opslaan',
      nameTitle: 'Hoe heet het kind?', nameLabel: 'Naam of roepnaam', namePlaceholder: 'Bijvoorbeeld Sofia', nameHelp: 'Deze naam wordt in het profiel van het kind getoond.', nameError: 'Vul een naam of roepnaam in.',
      dateTitle: 'Wanneer is het kind geboren?', dateLabel: 'Volledige geboortedatum', dateHelp: 'Tik op het veld om de kalender te openen.', dateError: 'Kies de geboortedatum.', futureDateError: 'De geboortedatum kan niet in de toekomst liggen.',
      timeTitle: 'Hoe laat is het kind geboren?', timeLabel: 'Exacte geboortetijd', timeHelp: 'Vul uren en minuten in of geef aan dat de tijd onbekend is.', unknownTime: 'Geboortetijd is onbekend', timeError: 'Kies een tijd of geef aan dat de geboortetijd onbekend is.',
      placeTitle: 'Waar is het kind geboren?', placeLabel: 'Geboorteplaats', placePlaceholder: 'Begin een plaatsnaam te typen', placeHelp: 'Vul minimaal 3 letters in. Kies een plaats uit de lijst zodat land en regio correct worden opgeslagen.', typeMore: 'Vul minimaal 3 letters in.', loading: 'Plaatsen zoeken…', notFound: 'Plaats niet gevonden. Controleer de spelling.', searchError: 'Plaats zoeken is tijdelijk niet beschikbaar. Controleer je internetverbinding en probeer opnieuw.', placeError: 'Kies de juiste plaats uit de lijst.', selected: 'Geselecteerd', attribution: 'Locatiegegevens: GeoNames via Open-Meteo',
      reviewTitle: 'Controleer de gegevens', reviewHelp: 'Na het opslaan verschijnen deze gegevens in het profiel van het kind.', name: 'Naam', date: 'Geboortedatum', time: 'Geboortetijd', place: 'Geboorteplaats', unknown: 'Onbekend', done: 'Profiel van het kind opgeslagen! ✨'
    }
  };

  const API_LANGUAGE = { ru: 'ru', ua: 'uk', en: 'en', nl: 'nl' };
  const FEATURED_CITIES = [
    { id: 2759794, name: 'Amsterdam', latitude: 52.37403, longitude: 4.88969, country_code: 'NL', timezone: 'Europe/Amsterdam', country: 'The Netherlands', admin1: 'North Holland', population: 741636, feature_code: 'PPLC' },
    { id: 2759798, name: 'Amstelveen', latitude: 52.30083, longitude: 4.86389, country_code: 'NL', timezone: 'Europe/Amsterdam', country: 'The Netherlands', admin1: 'North Holland', population: 92108, feature_code: 'PPL' },
    { id: 618405, name: 'Comrat', latitude: 46.29488, longitude: 28.65713, country_code: 'MD', timezone: 'Europe/Chisinau', country: 'Moldova', admin1: 'Gagauzia', population: 22911, feature_code: 'PPLA' },
    { id: 3178229, name: 'Como', latitude: 45.80819, longitude: 9.0832, country_code: 'IT', timezone: 'Europe/Rome', country: 'Italy', admin1: 'Lombardy', population: 84808, feature_code: 'PPLA2' }
  ];
  const TOTAL_STEPS = 5;
  const cityCache = new Map();
  let wizard = null;
  let searchTimer = null;
  let searchController = null;

  const copy = () => COPY[currentLanguage] || COPY.nl;
  const escapeHtml = (value) => String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const localToday = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  };
  const progressText = (text, current, total) => text.replace('{current}', current).replace('{total}', total);

  function uniqueParts(parts) {
    const used = new Set();
    return parts.filter(Boolean).filter((part) => {
      const key = String(part).trim().toLocaleLowerCase();
      if (!key || used.has(key)) return false;
      used.add(key);
      return true;
    });
  }

  function normaliseCity(result) {
    const parts = uniqueParts([result.name, result.admin1, result.country]);
    return {
      id: result.id,
      city: result.name || '',
      region: result.admin1 || result.admin2 || '',
      country: result.country || '',
      countryCode: result.country_code || '',
      latitude: Number(result.latitude),
      longitude: Number(result.longitude),
      timezone: result.timezone || '',
      population: Number(result.population) || 0,
      featureCode: result.feature_code || '',
      label: parts.join(' — ')
    };
  }

  function stepMarkup(step, text) {
    if (step === 0) return `<div class="child-wizard-panel"><div class="child-wizard-symbol" aria-hidden="true">👶</div><h3>${text.nameTitle}</h3><label for="childWizardName">${text.nameLabel}</label><input class="child-wizard-input" id="childWizardName" type="text" maxlength="60" autocomplete="name" placeholder="${text.namePlaceholder}" value="${escapeHtml(wizard.data.name)}"><p class="child-wizard-help">${text.nameHelp}</p></div>`;
    if (step === 1) return `<div class="child-wizard-panel"><div class="child-wizard-symbol" aria-hidden="true">📅</div><h3>${text.dateTitle}</h3><label for="childWizardDate">${text.dateLabel}</label><input class="child-wizard-input child-wizard-picker" id="childWizardDate" type="date" max="${localToday()}" value="${escapeHtml(wizard.data.birthDate)}"><p class="child-wizard-help">${text.dateHelp}</p></div>`;
    if (step === 2) return `<div class="child-wizard-panel"><div class="child-wizard-symbol" aria-hidden="true">⏰</div><h3>${text.timeTitle}</h3><label for="childWizardTime">${text.timeLabel}</label><input class="child-wizard-input child-wizard-picker" id="childWizardTime" type="time" step="60" value="${escapeHtml(wizard.data.birthTime)}" ${wizard.data.birthTimeUnknown ? 'disabled' : ''}><label class="child-wizard-check"><input id="childWizardTimeUnknown" type="checkbox" ${wizard.data.birthTimeUnknown ? 'checked' : ''}><span>${text.unknownTime}</span></label><p class="child-wizard-help">${text.timeHelp}</p></div>`;
    if (step === 3) {
      const selected = wizard.data.place ? `<div class="child-wizard-selected"><span>✓ ${text.selected}</span><strong>${escapeHtml(wizard.data.place.label)}</strong></div>` : '';
      return `<div class="child-wizard-panel child-wizard-place-panel"><div class="child-wizard-symbol" aria-hidden="true">📍</div><h3>${text.placeTitle}</h3><label for="childWizardPlace">${text.placeLabel}</label><input class="child-wizard-input" id="childWizardPlace" type="search" autocomplete="off" spellcheck="false" placeholder="${text.placePlaceholder}" value="${escapeHtml(wizard.data.placeQuery)}"><p class="child-wizard-help">${text.placeHelp}</p>${selected}<div class="child-city-status" id="childCityStatus" role="status" aria-live="polite">${wizard.data.place ? '' : text.typeMore}</div><div class="child-city-results" id="childCityResults" role="listbox"></div><small class="child-city-attribution">${text.attribution}</small></div>`;
    }
    return `<div class="child-wizard-panel child-wizard-review"><div class="child-wizard-symbol" aria-hidden="true">✨</div><h3>${text.reviewTitle}</h3><p class="child-wizard-help">${text.reviewHelp}</p><dl><div><dt>${text.name}</dt><dd>${escapeHtml(wizard.data.name)}</dd></div><div><dt>${text.date}</dt><dd>${escapeHtml(wizard.data.birthDate)}</dd></div><div><dt>${text.time}</dt><dd>${wizard.data.birthTimeUnknown ? text.unknown : escapeHtml(wizard.data.birthTime)}</dd></div><div><dt>${text.place}</dt><dd>${escapeHtml(wizard.data.place ? wizard.data.place.label : '')}</dd></div></dl></div>`;
  }

  function renderWizard() {
    if (!wizard) return;
    const text = copy();
    const current = wizard.step + 1;
    const dialog = wizard.modal.querySelector('.add-child-dialog');
    dialog.innerHTML = `<div class="child-wizard-head"><div><span class="child-wizard-progress-text">${progressText(text.progress, current, TOTAL_STEPS)}</span><h2>${text.title}</h2></div><button class="child-wizard-close" type="button" aria-label="${text.close}">×</button></div><div class="child-wizard-progress" aria-hidden="true"><span style="width:${(current / TOTAL_STEPS) * 100}%"></span></div><div class="child-wizard-step-labels" aria-hidden="true">${text.steps.map((label, index) => `<span class="${index === wizard.step ? 'active' : ''}">${label}</span>`).join('')}</div><div class="child-wizard-error" id="childWizardError" role="alert"></div>${stepMarkup(wizard.step, text)}<div class="add-child-actions">${wizard.step > 0 ? `<button class="btn btn-secondary child-wizard-back" type="button">‹ ${text.back}</button>` : '<span></span>'}<button class="btn btn-primary child-wizard-next" type="button">${wizard.step === TOTAL_STEPS - 1 ? `💾 ${text.save}` : `${text.next} ›`}</button></div>`;
    dialog.querySelector('.child-wizard-close').addEventListener('click', closeAddChildModal);
    dialog.querySelector('.child-wizard-back')?.addEventListener('click', previousStep);
    dialog.querySelector('.child-wizard-next').addEventListener('click', wizard.step === TOTAL_STEPS - 1 ? saveChildProfile : nextStep);
    bindStepEvents();
  }

  function showError(message) {
    const error = document.getElementById('childWizardError');
    if (!error) return;
    error.textContent = message;
    error.classList.toggle('visible', Boolean(message));
  }

  function readCurrentStep() {
    if (!wizard) return;
    if (wizard.step === 0) wizard.data.name = document.getElementById('childWizardName')?.value.trim() || '';
    if (wizard.step === 1) wizard.data.birthDate = document.getElementById('childWizardDate')?.value || '';
    if (wizard.step === 2) {
      wizard.data.birthTimeUnknown = Boolean(document.getElementById('childWizardTimeUnknown')?.checked);
      wizard.data.birthTime = wizard.data.birthTimeUnknown ? '' : (document.getElementById('childWizardTime')?.value || '');
    }
    if (wizard.step === 3) wizard.data.placeQuery = document.getElementById('childWizardPlace')?.value.trim() || '';
  }

  function validateCurrentStep() {
    const text = copy();
    readCurrentStep();
    if (wizard.step === 0 && !wizard.data.name) return text.nameError;
    if (wizard.step === 1 && !wizard.data.birthDate) return text.dateError;
    if (wizard.step === 1 && wizard.data.birthDate > localToday()) return text.futureDateError;
    if (wizard.step === 2 && !wizard.data.birthTimeUnknown && !wizard.data.birthTime) return text.timeError;
    if (wizard.step === 3 && !wizard.data.place) return text.placeError;
    return '';
  }

  function nextStep() {
    if (!wizard) return;
    const error = validateCurrentStep();
    if (error) return showError(error);
    if (wizard.step < TOTAL_STEPS - 1) {
      wizard.step += 1;
      renderWizard();
    }
  }

  function previousStep() {
    if (!wizard || wizard.step === 0) return;
    readCurrentStep();
    wizard.step -= 1;
    renderWizard();
  }

  function tryOpenPicker(input) {
    input?.focus({ preventScroll: true });
    try { input?.showPicker?.(); } catch (_) { /* Mobile Safari opens it after a tap. */ }
  }

  function bindStepEvents() {
    if (wizard.step === 0) {
      const input = document.getElementById('childWizardName');
      input?.focus({ preventScroll: true });
      input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); nextStep(); } });
    }
    if (wizard.step === 1) {
      const input = document.getElementById('childWizardDate');
      tryOpenPicker(input);
      input?.addEventListener('click', () => tryOpenPicker(input));
      input?.addEventListener('change', () => window.setTimeout(nextStep, 120));
    }
    if (wizard.step === 2) {
      const input = document.getElementById('childWizardTime');
      const unknown = document.getElementById('childWizardTimeUnknown');
      if (!wizard.data.birthTimeUnknown) tryOpenPicker(input);
      input?.addEventListener('click', () => tryOpenPicker(input));
      input?.addEventListener('change', () => window.setTimeout(nextStep, 120));
      unknown?.addEventListener('change', () => {
        input.disabled = unknown.checked;
        if (unknown.checked) window.setTimeout(nextStep, 120);
        else tryOpenPicker(input);
      });
    }
    if (wizard.step === 3) {
      const input = document.getElementById('childWizardPlace');
      input?.focus({ preventScroll: true });
      input?.addEventListener('input', () => {
        const value = input.value.trim();
        wizard.data.placeQuery = value;
        if (wizard.data.place && value !== wizard.data.place.label) wizard.data.place = null;
        scheduleCitySearch(value);
      });
      if (wizard.data.placeQuery.length >= 3 && !wizard.data.place) scheduleCitySearch(wizard.data.placeQuery);
    }
  }

  function scheduleCitySearch(query) {
    window.clearTimeout(searchTimer);
    const text = copy();
    const status = document.getElementById('childCityStatus');
    const results = document.getElementById('childCityResults');
    if (!status || !results) return;
    results.innerHTML = '';
    if (query.length < 3) { status.textContent = text.typeMore; return; }
    status.innerHTML = `<span class="child-city-spinner" aria-hidden="true"></span>${text.loading}`;
    searchTimer = window.setTimeout(() => searchCities(query), 400);
  }

  async function searchCities(query) {
    if (!wizard || wizard.step !== 3) return;
    const text = copy();
    const cacheKey = `${currentLanguage}:${query.toLocaleLowerCase()}`;
    if (cityCache.has(cacheKey)) return showCityResults(cityCache.get(cacheKey));
    searchController?.abort();
    searchController = new AbortController();
    try {
      const params = new URLSearchParams({ name: query, count: '25', language: API_LANGUAGE[currentLanguage] || 'en', format: 'json' });
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, { signal: searchController.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const queryKey = query.toLocaleLowerCase();
      const featured = FEATURED_CITIES.filter((city) => city.name.toLocaleLowerCase().startsWith(queryKey)).map(normaliseCity);
      const fetched = (payload.results || [])
        .filter((city) => String(city.feature_code || '').startsWith('PPL'))
        .map(normaliseCity)
        .filter((city) => city.city && city.country && city.label)
        .sort((a, b) => b.population - a.population);
      const seen = new Set();
      const cities = [...featured, ...fetched].filter((city) => {
        const key = `${city.city}|${city.region}|${city.country}`.toLocaleLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 10);
      cityCache.set(cacheKey, cities);
      showCityResults(cities);
    } catch (error) {
      if (error.name === 'AbortError') return;
      const status = document.getElementById('childCityStatus');
      const results = document.getElementById('childCityResults');
      if (status) status.textContent = text.searchError;
      if (results) results.innerHTML = '';
    }
  }

  function showCityResults(cities) {
    if (!wizard || wizard.step !== 3) return;
    const text = copy();
    const status = document.getElementById('childCityStatus');
    const results = document.getElementById('childCityResults');
    if (!status || !results) return;
    if (!cities.length) { status.textContent = text.notFound; results.innerHTML = ''; return; }
    status.textContent = '';
    results.innerHTML = cities.map((city, index) => `<button type="button" class="child-city-option" role="option" data-city-index="${index}"><span>${escapeHtml(city.city)}</span><small>${escapeHtml(uniqueParts([city.region, city.country]).join(' — '))}</small></button>`).join('');
    results.querySelectorAll('.child-city-option').forEach((button) => button.addEventListener('click', () => selectCity(cities[Number(button.dataset.cityIndex)])));
  }

  function selectCity(city) {
    if (!wizard || !city) return;
    wizard.data.place = city;
    wizard.data.placeQuery = city.label;
    const input = document.getElementById('childWizardPlace');
    if (input) input.value = city.label;
    const status = document.getElementById('childCityStatus');
    const results = document.getElementById('childCityResults');
    if (status) status.textContent = `${copy().selected}: ${city.label}`;
    if (results) results.innerHTML = '';
    window.setTimeout(nextStep, 180);
  }

  function saveChildProfile() {
    if (!wizard) return;
    const place = wizard.data.place;
    children.push({ id: Date.now(), name: wizard.data.name, birthDate: wizard.data.birthDate, birthTime: wizard.data.birthTime, birthTimeUnknown: wizard.data.birthTimeUnknown, birthPlace: place.label, birthCity: place.city, birthRegion: place.region, birthCountry: place.country, birthCountryCode: place.countryCode, latitude: place.latitude, longitude: place.longitude, timezone: place.timezone, sunSign: '', moonSign: '', mercurySign: '', marsSign: '' });
    localStorage.setItem('children', JSON.stringify(children));
    const done = copy().done;
    closeAddChildModal();
    loadChildren();
    updateChildSelect();
    showSavedToast(done);
  }

  function showSavedToast(message) {
    document.querySelector('.child-saved-toast')?.remove();
    const toast = document.createElement('div');
    toast.className = 'child-saved-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.classList.add('visible'), 20);
    window.setTimeout(() => { toast.classList.remove('visible'); window.setTimeout(() => toast.remove(), 250); }, 2600);
  }

  window.addChild = function addChildWizard() {
    if (document.querySelector('.add-child-modal')) return;
    wizard = { step: 0, data: { name: '', birthDate: '', birthTime: '', birthTimeUnknown: false, placeQuery: '', place: null }, modal: document.createElement('div') };
    wizard.modal.className = 'add-child-modal';
    wizard.modal.innerHTML = '<div class="add-child-overlay"><div class="add-child-dialog" role="dialog" aria-modal="true"></div></div>';
    wizard.modal.querySelector('.add-child-overlay').addEventListener('click', (event) => { if (event.target.classList.contains('add-child-overlay')) closeAddChildModal(); });
    wizard.modal.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeAddChildModal(); });
    document.body.appendChild(wizard.modal);
    document.body.classList.add('child-modal-open');
    renderWizard();
  };

  window.closeAddChildModal = function closeAddChildModal() {
    window.clearTimeout(searchTimer);
    searchController?.abort();
    document.querySelector('.add-child-modal')?.remove();
    document.body.classList.remove('child-modal-open');
    wizard = null;
  };
})();
