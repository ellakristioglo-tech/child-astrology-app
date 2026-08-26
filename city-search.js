(function setupLocalCitySearch() {
  'use strict';

  const DATA_URL = 'assets/cities-15000.min.json?v=20260826g';
  let recordsPromise;

  function fold(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase();
  }

  function countryName(code, language) {
    try {
      const locale = language === 'ua' ? 'uk' : language;
      return new Intl.DisplayNames([locale || 'en'], { type: 'region' }).of(code) || code;
    } catch (_) {
      return code;
    }
  }

  async function records() {
    if (!recordsPromise) {
      recordsPromise = fetch(DATA_URL, { credentials: 'same-origin', cache: 'force-cache' }).then((response) => {
        if (!response.ok) throw new Error(`City data HTTP ${response.status}`);
        return response.json();
      });
    }
    return recordsPromise;
  }

  async function search(query, language, limit) {
    const needle = fold(query).trim();
    if (needle.length < 3) return [];
    const source = await records();
    return source
      .map((row) => {
        const names = [row[1], row[2], ...(row[3] || [])];
        const folded = names.map(fold);
        const prefix = folded.some((name) => name.startsWith(needle));
        const contains = prefix ? false : folded.some((name) => name.includes(needle));
        return { row, rank: prefix ? 0 : (contains ? 1 : 2) };
      })
      .filter((item) => item.rank < 2)
      .sort((a, b) => a.rank - b.rank || b.row[8] - a.row[8] || a.row[1].localeCompare(b.row[1]))
      .slice(0, limit || 10)
      .map(({ row }) => {
        const country = countryName(row[4], language);
        return {
          id: row[0], city: row[1], region: '', country, countryCode: row[4],
          latitude: row[5], longitude: row[6], timezone: row[7], population: row[8],
          label: [row[1], country].filter(Boolean).join(' — ')
        };
      });
  }

  window.LocalCitySearch = { search };
})();
