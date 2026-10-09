// Menu na telefonie: przycisk otwiera i zamyka listę linków
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#nav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');          // dodaje lub zdejmuje klasę "open"
  menuBtn.setAttribute('aria-expanded', String(isOpen)); // informuje czytniki ekranu o stanie menu
});

// Rok w stopce uzupełnia się sam
document.querySelector('#year').textContent = new Date().getFullYear();

// ===== Karty realizacji (dane pochodzą z projects.js) =====
function cardHTML(p) {
  return `<a class="card" href="projekt.html?id=${p.id}" data-type="${p.type}">
    <div class="thumb tone-${p.tone}"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="${SHAPES[p.shape]}"/></svg></div>
    <h3>${p.name}</h3>
    <p>${TYPES[p.type]}, ${p.place}, ${p.year}</p>
  </a>`;
}

// Strona główna: tylko projekty oznaczone jako "featured"
const featured = document.querySelector('#featured');
if (featured) featured.innerHTML = PROJECTS.filter(p => p.featured).map(cardHTML).join('');

// Podstrona Realizacje: wszystkie projekty + filtr
const grid = document.querySelector('#projects');
if (grid) {
  grid.innerHTML = PROJECTS.map(cardHTML).join('');
  const buttons = document.querySelectorAll('.filters button');
  const count = document.querySelector('#count');

  // polska odmiana: 1 projekt, 2-4 projekty, 5+ projektów
  function plural(n) {
    if (n === 1) return 'projekt';
    const last = n % 10, tens = n % 100;
    return (last >= 2 && last <= 4 && (tens < 12 || tens > 14)) ? 'projekty' : 'projektów';
  }

  function applyFilter(f) {
    let shown = 0;
    grid.querySelectorAll('.card').forEach(card => {
      const show = f === 'all' || card.dataset.type === f;
      if (show) {
        shown++;
        card.hidden = false;
        // dwa kadry, żeby przeglądarka zdążyła zauważyć zmianę i zanimować wejście
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove('is-out')));
      } else {
        card.classList.add('is-out');
        setTimeout(() => { if (card.classList.contains('is-out')) card.hidden = true; }, 250);
      }
    });
    count.textContent = `Pokazano ${shown} ${plural(shown)}`;
  }

  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    applyFilter(btn.dataset.filter);
  }));
  applyFilter('all');
}

// ===== Podstrona pojedynczej realizacji (?id=...) =====
const projectBox = document.querySelector('#project');
if (projectBox) {
  const id = new URLSearchParams(location.search).get('id');
  const i = PROJECTS.findIndex(p => p.id === id);
  if (i === -1) {
    projectBox.innerHTML = `<div class="page-head"><h1>Nie ma takiego projektu</h1>
      <p>Adres jest nieprawidłowy albo projekt został usunięty. <a href="realizacje.html">Wróć do listy realizacji.</a></p></div>`;
  } else {
    const p = PROJECTS[i];
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];  // po ostatnim wracamy do pierwszego
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    document.title = `${p.name} | Kontur Studio`;
    projectBox.innerHTML = `
      <div class="page-head"><a href="realizacje.html">Wszystkie realizacje</a><h1>${p.name}</h1></div>
      <section class="section project">
        <div class="thumb tone-${p.tone}"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="${SHAPES[p.shape]}"/></svg></div>
        <div>
          <p class="project-desc">${DESCRIPTIONS[p.id]}</p>
          <dl class="facts">
            <div><dt>Rodzaj</dt><dd>${TYPES[p.type]}</dd></div>
            <div><dt>Miejsce</dt><dd>${p.place}</dd></div>
            <div><dt>Rok</dt><dd>${p.year}</dd></div>
            <div><dt>Powierzchnia</dt><dd>${p.area} m&sup2;</dd></div>
          </dl>
        </div>
      </section>
      <nav class="pager" aria-label="Inne realizacje">
        <a href="projekt.html?id=${prev.id}">Poprzednia: ${prev.name}</a>
        <a href="projekt.html?id=${next.id}">Następna: ${next.name}</a>
      </nav>`;
  }
}

// ===== O studiu: numer kroku zapala się, gdy wchodzi w ekran =====
const steps = document.querySelectorAll('.process li');
if (steps.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.6 });
  steps.forEach(s => io.observe(s));
}

// ===== Kontakt: walidacja formularza =====
const form = document.querySelector('#contact-form');
if (form) {
  // każda reguła zwraca true albo tekst błędu
  const rules = {
    name: v => v.trim().length >= 2 || 'Wpisz imię (co najmniej 2 znaki).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Wpisz poprawny adres e-mail, na przykład anna@firma.pl.',
    message: v => v.trim().length >= 20 || 'Opisz projekt w co najmniej 20 znakach.'
  };

  function check(field) {
    const rule = rules[field.name];
    if (!rule) return true;                       // pola bez reguły (np. lista wyboru) pomijamy
    const result = rule(field.value);
    form.querySelector(`#${field.id}-error`).textContent = result === true ? '' : result;
    field.setAttribute('aria-invalid', String(result !== true));
    return result === true;
  }

  form.addEventListener('focusout', e => check(e.target));   // sprawdzamy pole, gdy z niego wychodzisz

  form.addEventListener('submit', e => {
    e.preventDefault();                                       // blokujemy domyślne wysłanie formularza
    const fields = [...form.elements].filter(f => f.name in rules);
    const allOk = fields.map(check).every(Boolean);           // map sprawdza WSZYSTKIE pola, więc pokażą się wszystkie błędy naraz
    if (!allOk) { fields.find(f => f.getAttribute('aria-invalid') === 'true').focus(); return; }
    form.hidden = true;
    const thanks = document.querySelector('#thanks');
    thanks.hidden = false;
    thanks.focus();
  });
}
