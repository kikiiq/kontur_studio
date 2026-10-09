// Wszystkie realizacje w jednym miejscu. Dopisz obiekt do PROJECTS, a pojawi się na całej stronie.

// Kształty zamiast zdjęć: ścieżki SVG w układzie 100 x 100
const SHAPES = {
  arch:    'M20 90V50A30 30 0 0 1 80 50V90Z',
  stairs:  'M10 90V70H30V50H50V30H70V10H90V90Z',
  quarter: 'M10 90V10A80 80 0 0 1 90 90Z',
  roof:    'M50 12L90 50V90H10V50Z',
  half:    'M50 14A36 36 0 0 1 50 86Z'
};

const TYPES = { dom: 'Dom', mieszkanie: 'Mieszkanie', biuro: 'Biuro' };

// tone: a = beton, b = pomarańcz, c = czerń z betonem, d = czerń z pomarańczem
const PROJECTS = [
  { id: 'dom-na-skarpie',   name: 'Dom na skarpie',      type: 'dom',        place: 'Osielsko',        year: 2024, area: 182, shape: 'stairs',  tone: 'd', featured: true },
  { id: 'loft-przy-mlynach', name: 'Loft przy Młynach',   type: 'mieszkanie', place: 'Bydgoszcz',       year: 2024, area: 94,  shape: 'arch',    tone: 'b', featured: true },
  { id: 'biuro-cegielnia',  name: 'Biuro Cegielnia',     type: 'biuro',      place: 'Bydgoszcz',       year: 2023, area: 420, shape: 'roof',    tone: 'c', featured: true },
  { id: 'dom-z-patio',      name: 'Dom z patio',         type: 'dom',        place: 'Solec Kujawski',  year: 2023, area: 140, shape: 'quarter', tone: 'a' },
  { id: 'kawalerka-28',     name: 'Kawalerka 28',        type: 'mieszkanie', place: 'Bydgoszcz',       year: 2022, area: 28,  shape: 'half',    tone: 'd' },
  { id: 'coworking-naklo',  name: 'Coworking nad Notecią', type: 'biuro',    place: 'Nakło nad Notecią', year: 2022, area: 310, shape: 'stairs', tone: 'a' },
  { id: 'dom-pod-lasem',    name: 'Dom pod lasem',       type: 'dom',        place: 'Koronowo',        year: 2021, area: 165, shape: 'roof',    tone: 'b' },
  { id: 'apartament-nad-brda', name: 'Apartament nad Brdą', type: 'mieszkanie', place: 'Bydgoszcz',    year: 2021, area: 120, shape: 'arch',    tone: 'c' }
];

// Opisy osobno, żeby lista projektów została czytelna
const DESCRIPTIONS = {
  'dom-na-skarpie': 'Dom na stromej działce, który schodzi w dół razem ze zboczem. Każdy poziom ma własny taras, a z salonu widać dolinę.',
  'loft-przy-mlynach': 'Mieszkanie w dawnym budynku przemysłowym. Zostawiliśmy ceglane ściany i łuki, a nowe funkcje zebraliśmy w jednej czarnej zabudowie.',
  'biuro-cegielnia': 'Siedziba firmy IT na 420 metrach. Otwarta przestrzeń pracy i kilka szczelnych pokoi do rozmów, bez ani jednej ścianki z płyty.',
  'dom-z-patio': 'Dom zbudowany wokół wewnętrznego dziedzińca. Każdy pokój ma światło z dwóch stron, a patio latem działa jak dodatkowy pokój.',
  'kawalerka-28': 'Dwadzieścia osiem metrów, na których mieści się salon, sypialnia i pracownia. Pomagają w tym zabudowa na wymiar i przesuwane ściany.',
  'coworking-naklo': 'Dawny magazyn zamieniony w przestrzeń pracy dla trzydziestu osób. Schodkowy układ antresoli oddziela strefy ciszy od strefy rozmów.',
  'dom-pod-lasem': 'Prosty dom z dwuspadowym dachem, ustawiony tak, by drzewa dawały cień latem, a zimą nie zasłaniały słońca.',
  'apartament-nad-brda': 'Apartament z widokiem na rzekę. Łuki w oknach i drzwiach powtarzają kształt mostów widocznych z balkonu.'
};
