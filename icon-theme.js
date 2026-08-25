(() => {
  const version = '20260825n';
  const icons = {
    children: 'children',
    notes: 'consultations',
    tarot: 'tarot',
    method: 'method',
    sports: 'method',
    learning: 'consultations',
    tips: 'home',
    consultation: 'consultations',
    settings: 'settings'
  };

  const icon = (name, className = 'section-icon') => {
    const image = document.createElement('img');
    image.className = className;
    image.src = `assets/nav-icons/${name}.png?v=${version}`;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    return image;
  };

  Object.entries(icons).forEach(([section, name]) => {
    const title = document.querySelector(`#${section} .card-title`);
    if (!title || title.querySelector('.section-icon')) return;

    Array.from(title.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = node.textContent.replace(/[👶🎴✨📚💡⚙️🏃📝📱]/gu, '').trimStart();
      }
    });
    title.prepend(icon(name));
  });

  const consultationHero = document.querySelector('#consultation .consultation-card > div:first-child');
  if (consultationHero) {
    consultationHero.removeAttribute('style');
    consultationHero.replaceChildren(icon('consultations', 'consultation-hero-icon'));
  }
})();
