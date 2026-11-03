// ============================================================================
// NP-MÄSTAREN ÅK 9 - LÄTTLÄST UPPGIFTSBANK, FAKTA-KORT & DYNAMISK GENERATOR
// ============================================================================

const CATEGORIES = [
  {
    id: 'tal',
    name: 'Tal & Procent',
    icon: '🔢',
    color: '#6366f1',
    desc: 'Bråk, procent, potenser & huvudräkning'
  },
  {
    id: 'algebra',
    name: 'Algebra & x',
    icon: '✖️',
    color: '#ec4899',
    desc: 'Ekvationer, förenkla uttryck & mönster'
  },
  {
    id: 'funktioner',
    name: 'Grafer & y = kx+m',
    icon: '📈',
    color: '#10b981',
    desc: 'Räta linjen, koordinatsystem & hastighet'
  },
  {
    id: 'geometri',
    name: 'Geometri',
    icon: '📐',
    color: '#f59e0b',
    desc: 'Pythagoras sats, area, volym & vinklar'
  },
  {
    id: 'statistik',
    name: 'Slump & Statistik',
    icon: '🎲',
    color: '#8b5cf6',
    desc: 'Medelvärde, median & sannolikhet'
  },
  {
    id: 'problemlosning',
    name: 'NP-Kluringar (C/A)',
    icon: '🧠',
    color: '#ef4444',
    desc: 'Flerstegsuppgifter inför Delprov C & D'
  }
];

// ============================================================================
// SVG-FIGURER FÖR GEOMETRI, GRAFER & MÖNSTER
// ============================================================================
const SVG_FIGURES = {
  rightTriangle: (a, b, cLabel = 'x') => `
    <svg viewBox="0 0 260 155" class="question-svg" aria-label="Rätvinklig triangel">
      <polygon points="45,125 205,125 45,25" fill="rgba(99, 102, 241, 0.16)" stroke="#6366f1" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="45" y="109" width="16" height="16" fill="none" stroke="#6366f1" stroke-width="2.2"/>
      <circle cx="53" cy="117" r="2.2" fill="#6366f1"/>
      <text x="125" y="146" text-anchor="middle" fill="currentColor" font-weight="800" font-size="15">${b} cm</text>
      <text x="35" y="80" text-anchor="end" fill="currentColor" font-weight="800" font-size="15">${a}</text>
      <text x="135" y="68" text-anchor="start" fill="#ec4899" font-weight="800" font-size="16">${cLabel}</text>
    </svg>
  `,
  cylinder: (r, h) => `
    <svg viewBox="0 0 240 165" class="question-svg" aria-label="Cylinder">
      <ellipse cx="115" cy="130" rx="58" ry="17" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="2.5" stroke-dasharray="5,4"/>
      <path d="M57,38 L57,130 A58,17 0 0,0 173,130 L173,38" fill="rgba(16, 185, 129, 0.14)" stroke="#10b981" stroke-width="3"/>
      <ellipse cx="115" cy="38" rx="58" ry="17" fill="rgba(16, 185, 129, 0.24)" stroke="#10b981" stroke-width="3"/>
      <line x1="115" y1="38" x2="173" y2="38" stroke="#ec4899" stroke-width="3"/>
      <circle cx="115" cy="38" r="3.5" fill="#ec4899"/>
      <text x="144" y="31" text-anchor="middle" fill="#ec4899" font-weight="800" font-size="14">r = ${r} cm</text>
      <text x="184" y="88" text-anchor="start" fill="currentColor" font-weight="800" font-size="15">h = ${h} cm</text>
    </svg>
  `,
  linearGraph: (k, m) => {
    const y0 = 140 - m * 7;
    const xEnd = 5;
    const yEndVal = k * xEnd + m;
    const yEnd = 140 - yEndVal * 7;
    return `
      <svg viewBox="0 0 260 165" class="question-svg" aria-label="Koordinatsystem med rät linje">
        <defs>
          <pattern id="smallGrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(148,163,184,0.25)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect x="40" y="14" width="180" height="126" fill="url(#smallGrid)" />
        <line x1="40" y1="140" x2="230" y2="140" stroke="currentColor" stroke-width="2.2"/>
        <line x1="40" y1="145" x2="40" y2="10" stroke="currentColor" stroke-width="2.2"/>
        <circle cx="40" cy="${y0}" r="5" fill="#ec4899"/>
        <text x="32" y="${y0 + 4}" text-anchor="end" fill="#ec4899" font-size="13" font-weight="800">${m}</text>
        <circle cx="${40 + xEnd * 28}" cy="${yEnd}" r="5" fill="#6366f1"/>
        <text x="${40 + xEnd * 28}" y="156" text-anchor="middle" fill="currentColor" font-size="13" font-weight="800">${xEnd}</text>
        <text x="32" y="${yEnd + 4}" text-anchor="end" fill="#6366f1" font-size="13" font-weight="800">${yEndVal}</text>
        <line x1="40" y1="${yEnd}" x2="${40 + xEnd * 28}" y2="${yEnd}" stroke="#6366f1" stroke-dasharray="4,3" stroke-width="1.5"/>
        <line x1="${40 + xEnd * 28}" y1="140" x2="${40 + xEnd * 28}" y2="${yEnd}" stroke="#6366f1" stroke-dasharray="4,3" stroke-width="1.5"/>
        <line x1="40" y1="${y0}" x2="${40 + xEnd * 28}" y2="${yEnd}" stroke="#10b981" stroke-width="3.8" stroke-linecap="round"/>
        <text x="234" y="144" fill="currentColor" font-size="13" font-weight="800">x</text>
        <text x="28" y="18" fill="currentColor" font-size="13" font-weight="800">y</text>
      </svg>
    `;
  },
  anglesTriangle: (v1, v2) => `
    <svg viewBox="0 0 260 145" class="question-svg" aria-label="Triangel med vinklar">
      <polygon points="35,122 225,122 140,22" fill="rgba(245, 158, 11, 0.16)" stroke="#f59e0b" stroke-width="3.5" stroke-linejoin="round"/>
      <text x="70" y="114" fill="currentColor" font-size="14" font-weight="800">${v1}°</text>
      <text x="176" y="114" fill="currentColor" font-size="14" font-weight="800">${v2}°</text>
      <text x="135" y="54" text-anchor="middle" fill="#ec4899" font-size="16" font-weight="800">x°</text>
    </svg>
  `,
  patternDots: () => `
    <svg viewBox="0 0 290 105" class="question-svg" aria-label="Mönster med figurer">
      <g transform="translate(20, 15)">
        <circle cx="20" cy="15" r="6" fill="#6366f1"/>
        <circle cx="20" cy="35" r="6" fill="#6366f1"/>
        <circle cx="5" cy="35" r="6" fill="#ec4899"/>
        <circle cx="35" cy="35" r="6" fill="#ec4899"/>
        <text x="20" y="66" text-anchor="middle" fill="currentColor" font-size="12" font-weight="800">Fig 1 (4 st)</text>
      </g>
      <g transform="translate(105, 15)">
        <circle cx="30" cy="5" r="5.5" fill="#6366f1"/>
        <circle cx="30" cy="20" r="5.5" fill="#6366f1"/>
        <circle cx="30" cy="35" r="5.5" fill="#6366f1"/>
        <circle cx="5" cy="35" r="5.5" fill="#ec4899"/>
        <circle cx="17" cy="35" r="5.5" fill="#ec4899"/>
        <circle cx="43" cy="35" r="5.5" fill="#ec4899"/>
        <circle cx="55" cy="35" r="5.5" fill="#ec4899"/>
        <text x="30" y="66" text-anchor="middle" fill="currentColor" font-size="12" font-weight="800">Fig 2 (7 st)</text>
      </g>
      <g transform="translate(200, 15)">
        <circle cx="35" cy="2" r="5" fill="#6366f1"/>
        <circle cx="35" cy="13" r="5" fill="#6366f1"/>
        <circle cx="35" cy="24" r="5" fill="#6366f1"/>
        <circle cx="35" cy="35" r="5" fill="#6366f1"/>
        <circle cx="2" cy="35" r="5" fill="#ec4899"/>
        <circle cx="13" cy="35" r="5" fill="#ec4899"/>
        <circle cx="24" cy="35" r="5" fill="#ec4899"/>
        <circle cx="46" cy="35" r="5" fill="#ec4899"/>
        <circle cx="57" cy="35" r="5" fill="#ec4899"/>
        <circle cx="68" cy="35" r="5" fill="#ec4899"/>
        <text x="35" y="66" text-anchor="middle" fill="currentColor" font-size="12" font-weight="800">Fig 3 (10 st)</text>
      </g>
    </svg>
  `
};

// ============================================================================
// LÄTTLÄSTA UPPGIFTER FÖR ÅK 9 (KORT TEXT + FAKTA-BRICKOR + STORA FORMLER)
// ============================================================================
const STATIC_QUESTIONS = [
  // --- TALUPPFATTNING & PROCENT ---
  {
    id: 'tal-1',
    category: 'tal',
    part: 'B',
    level: 'E',
    title: 'Dividera med decimaltal',
    facts: ['🚫 Utan räknare', '💡 Tips: 0,5 är en halv'],
    mathDisplay: '24 / 0,5 = ?',
    question: 'Räkna ut värdet.',
    unit: '',
    acceptedAnswers: ['48'],
    solutionSteps: [
      'Steg 1: Förläng med 2 så du slipper decimaltalet ⇒ (24 · 2) / (0,5 · 2)',
      'Steg 2: Förenkla ⇒ 48 / 1 = 48',
      'Svar: 48'
    ]
  },
  {
    id: 'tal-2',
    category: 'tal',
    part: 'B',
    level: 'E',
    title: 'Rea & Procent',
    facts: ['🧥 Ordinarie pris: 800 kr', '🏷️ Rabatt: 25 %'],
    mathDisplay: 'Nytt pris = ?',
    question: 'Vad kostar jackan på rean?',
    unit: 'kr',
    acceptedAnswers: ['600', '600 kr'],
    solutionSteps: [
      'Steg 1: 25 % är 1/4. Räkna ut rabatten ⇒ 800 / 4 = 200 kr',
      'Steg 2: Dra bort rabatten från priset ⇒ 800 − 200 = 600 kr',
      'Svar: 600 kr'
    ]
  },
  {
    id: 'tal-3',
    category: 'tal',
    part: 'B',
    level: 'C',
    title: 'Total förändringsfaktor',
    facts: ['📈 Först: +20 % (ff = 1,20)', '📉 Sedan: −10 % (ff = 0,90)'],
    mathDisplay: '1,20 · 0,90 = ?',
    question: 'Vilken total förändringsfaktor blir det?',
    unit: '',
    acceptedAnswers: ['1,08', '1.08'],
    solutionSteps: [
      'Steg 1: Ökning 20 % ⇒ 1,20. Minskning 10 % ⇒ 0,90',
      'Steg 2: Multiplicera faktorerna ⇒ 1,20 · 0,90 = 1,08',
      'Svar: 1,08'
    ]
  },
  {
    id: 'tal-4',
    category: 'tal',
    part: 'B',
    level: 'C',
    title: 'Grundpotensform',
    facts: ['🔢 Talet framför 10ⁿ ska vara mellan 1 och 10'],
    mathDisplay: '(3 · 10⁴) · (4 · 10³)',
    question: 'Skriv svaret i grundpotensform (t.ex. 1,2*10^8).',
    unit: '',
    acceptedAnswers: ['1,2*10^8', '1.2*10^8', '1,2·10^8', '1,2*10⁸', '1,2·10⁸', '1.2·10^8', '1,2x10^8'],
    solutionSteps: [
      'Steg 1: Multiplicera siffrorna och tiopotenserna ⇒ 3 · 4 = 12 och 10⁴ · 10³ = 10⁷',
      'Steg 2: Byt 12 · 10⁷ så talet ligger mellan 1 och 10 ⇒ 1,2 · 10⁸',
      'Svar: 1,2*10^8'
    ]
  },
  {
    id: 'tal-5',
    category: 'tal',
    part: 'B',
    level: 'C',
    title: 'Bråkräkning',
    facts: ['⚠️ Multiplikation går före addition!'],
    mathDisplay: '2/3 + (1/3) · (3/4)',
    question: 'Räkna ut och svara i enklaste bråkform (a/b).',
    unit: '',
    acceptedAnswers: ['11/12'],
    solutionSteps: [
      'Steg 1: Multiplicera först ⇒ (1/3) · (3/4) = 1/4',
      'Steg 2: Gör samma nämnare (12) ⇒ 2/3 + 1/4 = 8/12 + 3/12 = 11/12',
      'Svar: 11/12'
    ]
  },
  {
    id: 'tal-6',
    category: 'tal',
    part: 'D',
    level: 'A',
    title: 'Hitta ursprungspriset',
    facts: ['🏷️ Sänkning 1: −15 % (0,85)', '🏷️ Sänkning 2: −20 % (0,80)', '💰 Pris nu: 3 400 kr'],
    mathDisplay: 'x · 0,85 · 0,80 = 3 400',
    question: 'Vad kostade elsparkcykeln från början (x)?',
    unit: 'kr',
    acceptedAnswers: ['5000', '5 000', '5000 kr'],
    solutionSteps: [
      'Steg 1: Total förändringsfaktor ⇒ 0,85 · 0,80 = 0,68',
      'Steg 2: Dividera priset nu med 0,68 ⇒ 3 400 / 0,68 = 5 000 kr',
      'Svar: 5000 kr'
    ]
  },

  // --- ALGEBRA & EKVATIONER ---
  {
    id: 'alg-1',
    category: 'algebra',
    part: 'B',
    level: 'E',
    title: 'Lös ekvationen',
    facts: ['🎯 Mål: Få x ensamt'],
    mathDisplay: '4x − 7 = 21',
    question: 'Vilket värde har x?',
    unit: '',
    acceptedAnswers: ['7', 'x=7', 'x = 7'],
    solutionSteps: [
      'Steg 1: Plussa 7 på båda sidor ⇒ 4x = 28',
      'Steg 2: Dela med 4 på båda sidor ⇒ x = 28 / 4 = 7',
      'Svar: 7'
    ]
  },
  {
    id: 'alg-2',
    category: 'algebra',
    part: 'B',
    level: 'C',
    title: 'Förenkla uttrycket',
    facts: ['⚠️ Minus framför parentes byter tecken inuti!'],
    mathDisplay: '3(2x − 4) − (x − 5)',
    question: 'Förenkla så långt som möjligt.',
    unit: '',
    acceptedAnswers: ['5x-7', '5x - 7', '-7+5x'],
    solutionSteps: [
      'Steg 1: Multiplicera in 3 och ta bort parenteser ⇒ 6x − 12 − x + 5',
      'Steg 2: Lägg ihop x för sig och siffror för sig ⇒ 5x − 7',
      'Svar: 5x-7'
    ]
  },
  {
    id: 'alg-3',
    category: 'algebra',
    part: 'B',
    level: 'C',
    title: 'Mönster & Formel',
    facts: ['🔵 Fig 1 = 4 st', '🔵 Fig 2 = 7 st (+3)', '🔵 Fig 3 = 10 st (+3)'],
    mathDisplay: 'Antal i Figur 50 = ?',
    question: 'Hur många prickar finns i Figur 50?',
    svg: SVG_FIGURES.patternDots(),
    unit: 'st',
    acceptedAnswers: ['151', '151 st'],
    solutionSteps: [
      'Steg 1: Det ökar med 3 varje gång ⇒ Formel: 3n + 1',
      'Steg 2: Sätt in n = 50 ⇒ 3 · 50 + 1 = 151',
      'Svar: 151'
    ]
  },
  {
    id: 'alg-4',
    category: 'algebra',
    part: 'C',
    level: 'C',
    title: 'Ekvation med nämnare',
    facts: ['💡 Multiplicera båda sidor med 3 först'],
    mathDisplay: '(2x + 6) / 3 = x − 2',
    question: 'Lös ekvationen (hitta x).',
    unit: '',
    acceptedAnswers: ['12', 'x=12', 'x = 12'],
    solutionSteps: [
      'Steg 1: Multiplicera båda sidor med 3 ⇒ 2x + 6 = 3(x − 2) ⇒ 2x + 6 = 3x − 6',
      'Steg 2: Ta −2x och +6 på båda sidor ⇒ x = 12',
      'Svar: 12'
    ]
  },
  {
    id: 'alg-5',
    category: 'algebra',
    part: 'C',
    level: 'A',
    title: 'Förenkla algebraiskt bråk',
    facts: ['💡 Dela båda termerna i täljaren med 3x'],
    mathDisplay: '(6x² + 12x) / 3x',
    question: 'Förenkla uttrycket.',
    unit: '',
    acceptedAnswers: ['2x+4', '2x + 4', '4+2x', '2(x+2)'],
    solutionSteps: [
      'Steg 1: Bryt ut 3x i täljaren ⇒ 3x(2x + 4) / 3x',
      'Steg 2: Förkorta bort 3x ⇒ 2x + 4',
      'Svar: 2x+4'
    ]
  },

  // --- FUNKTIONER & SAMBAND ---
  {
    id: 'funk-1',
    category: 'funktioner',
    part: 'B',
    level: 'E',
    title: 'Hitta linjens ekvation',
    facts: ['📍 Skär y-axeln vid m = 3', '📈 Går genom (5, 13)'],
    mathDisplay: 'y = kx + m',
    question: 'Skriv linjens ekvation (t.ex. y = 2x + 3).',
    svg: SVG_FIGURES.linearGraph(2, 3),
    unit: '',
    acceptedAnswers: ['y=2x+3', 'y = 2x + 3', '2x+3', '2x + 3'],
    solutionSteps: [
      'Steg 1: Linjen skär y-axeln vid 3 ⇒ m = 3',
      'Steg 2: Lutningen k = (13 − 3) / 5 = 2 ⇒ y = 2x + 3',
      'Svar: y=2x+3'
    ]
  },
  {
    id: 'funk-2',
    category: 'funktioner',
    part: 'D',
    level: 'C',
    title: 'Jämför två elavtal',
    facts: ['⚡ Bolag A: 200 kr + 1,50 kr/kWh', '⚡ Bolag B: 0 kr + 2,50 kr/kWh'],
    mathDisplay: '1,5x + 200 = 2,5x',
    question: 'Vid hur många kWh (x) kostar de lika mycket?',
    unit: 'kWh',
    acceptedAnswers: ['200', '200 kwh'],
    solutionSteps: [
      'Steg 1: Dra bort 1,5x från båda sidor ⇒ 200 = 1,0x',
      'Steg 2: x = 200 kWh',
      'Svar: 200'
    ]
  },
  {
    id: 'funk-3',
    category: 'funktioner',
    part: 'B',
    level: 'C',
    title: 'Medelhastighet',
    facts: ['🚆 Sträcka (s): 180 km', '⏱️ Tid (t): 1 h 30 min = 1,5 h'],
    mathDisplay: 'v = s / t = 180 / 1,5',
    question: 'Vilken är tågets medelhastighet i km/h?',
    unit: 'km/h',
    acceptedAnswers: ['120', '120 km/h'],
    solutionSteps: [
      'Steg 1: 1 h 30 min = 1,5 timmar',
      'Steg 2: Hastighet v = 180 / 1,5 = 120 km/h',
      'Svar: 120'
    ]
  },
  {
    id: 'funk-4',
    category: 'funktioner',
    part: 'C',
    level: 'A',
    title: 'Rät linje genom två punkter',
    facts: ['📍 Punkt 1: (2, 11)', '📍 Punkt 2: (6, 23)'],
    mathDisplay: 'y = kx + m  →  m = ?',
    question: 'Vilket är linjens m-värde?',
    unit: '',
    acceptedAnswers: ['5', 'm=5', 'm = 5'],
    solutionSteps: [
      'Steg 1: Räkna ut lutningen k = (23 − 11) / (6 − 2) = 12 / 4 = 3',
      'Steg 2: Sätt in (2, 11) i y = 3x + m ⇒ 11 = 3·2 + m ⇒ m = 5',
      'Svar: 5'
    ]
  },

  // --- GEOMETRI ---
  {
    id: 'geo-1',
    category: 'geometri',
    part: 'D',
    level: 'E',
    title: 'Pythagoras sats',
    facts: ['📐 Kateter: 6 cm och 8 cm', '💡 Formel: a² + b² = c²'],
    mathDisplay: '6² + 8² = x²',
    question: 'Hur lång är hypotenusan x?',
    svg: SVG_FIGURES.rightTriangle('6 cm', 8, 'x'),
    unit: 'cm',
    acceptedAnswers: ['10', '10 cm'],
    solutionSteps: [
      'Steg 1: 6² + 8² = 36 + 64 = 100',
      'Steg 2: x = √100 = 10 cm',
      'Svar: 10'
    ]
  },
  {
    id: 'geo-2',
    category: 'geometri',
    part: 'D',
    level: 'C',
    title: 'Cylinderns volym',
    facts: ['⭕ Radie r = 5 cm', '📏 Höjd h = 10 cm', '🥧 π ≈ 3,14'],
    mathDisplay: 'V = π · r² · h',
    question: 'Räkna ut cylinderns volym.',
    svg: SVG_FIGURES.cylinder(5, 10),
    unit: 'cm³',
    acceptedAnswers: ['785', '785 cm³', '785 cm3', '785,4'],
    solutionSteps: [
      'Steg 1: Basarea = 3,14 · 5² = 3,14 · 25 = 78,5 cm²',
      'Steg 2: Volym = 78,5 · 10 = 785 cm³',
      'Svar: 785'
    ]
  },
  {
    id: 'geo-3',
    category: 'geometri',
    part: 'B',
    level: 'E',
    title: 'Vinkelsumma i triangel',
    facts: ['📐 Alla 3 vinklar = 180° tillsammans'],
    mathDisplay: 'x = 180° − (48° + 62°)',
    question: 'Hur stor är vinkeln x?',
    svg: SVG_FIGURES.anglesTriangle(48, 62),
    unit: '°',
    acceptedAnswers: ['70', '70°', '70 grader'],
    solutionSteps: [
      'Steg 1: Lägg ihop de kända vinklarna ⇒ 48° + 62° = 110°',
      'Steg 2: Dra bort från 180° ⇒ 180° − 110° = 70°',
      'Svar: 70'
    ]
  },
  {
    id: 'geo-4',
    category: 'geometri',
    part: 'D',
    level: 'C',
    title: 'Pythagoras sats (Hitta katet)',
    facts: ['🪜 Stege (hypotenusa): 5 m', '📏 Avstånd från vägg: 3 m'],
    mathDisplay: 'h² + 3² = 5²',
    question: 'Hur högt upp på väggen (h) når stegen?',
    unit: 'm',
    acceptedAnswers: ['4', '4 m', '4,0'],
    solutionSteps: [
      'Steg 1: h² + 9 = 25 ⇒ h² = 25 − 9 = 16',
      'Steg 2: h = √16 = 4 m',
      'Svar: 4'
    ]
  },
  {
    id: 'geo-5',
    category: 'geometri',
    part: 'D',
    level: 'A',
    title: 'Skala & Verklig area',
    facts: ['🗺️ Längdskala 1 : 500 (1 cm = 5 m)', '🟩 Area på kartan = 20 cm²'],
    mathDisplay: '1 cm² på kartan = 5 m · 5 m = 25 m²',
    question: 'Hur stor är den verkliga arean i m²?',
    unit: 'm²',
    acceptedAnswers: ['500', '500 m²', '500 m2'],
    solutionSteps: [
      'Steg 1: 1 cm på kartan = 500 cm = 5 m. Så 1 cm² = 5 · 5 = 25 m²',
      'Steg 2: Verklig area = 20 · 25 = 500 m²',
      'Svar: 500'
    ]
  },

  // --- SANNOLIKHET & STATISTIK ---
  {
    id: 'stat-1',
    category: 'statistik',
    part: 'B',
    level: 'E',
    title: 'Hitta medianen',
    facts: ['📊 Sortera talen från minst till störst först!'],
    mathDisplay: '14°C,  19°C,  12°C,  20°C,  15°C',
    question: 'Vilken temperatur är medianen (talet i mitten)?',
    unit: '°C',
    acceptedAnswers: ['15', '15°C', '15 grader'],
    solutionSteps: [
      'Steg 1: Sortera talen ⇒ 12,  14,  15,  19,  20',
      'Steg 2: Talet i mitten är 15',
      'Svar: 15'
    ]
  },
  {
    id: 'stat-2',
    category: 'statistik',
    part: 'D',
    level: 'C',
    title: 'Två kulor utan återläggning',
    facts: ['🔴 4 röda kulor', '🔵 6 blåa kulor (Totalt 10 st)', '✋ Du drar 2 kulor utan att lägga tillbaka'],
    mathDisplay: 'P(2 röda) = (4/10) · (3/9)',
    question: 'Sannolikhet att båda är röda? (Svara i enklaste bråkform)',
    unit: '',
    acceptedAnswers: ['2/15', '12/90', '13,3%', '13.3%'],
    solutionSteps: [
      'Steg 1: Multiplicera täljare och nämnare ⇒ (4 · 3) / (10 · 9) = 12/90',
      'Steg 2: Förkorta bråket med 6 ⇒ 2/15',
      'Svar: 2/15'
    ]
  },
  {
    id: 'stat-3',
    category: 'statistik',
    part: 'C',
    level: 'C',
    title: 'Medelvärde baklänges',
    facts: ['🔢 4 st tal har medelvärdet 15', '📌 Tre av talen är: 11, 14 och 17'],
    mathDisplay: '(11 + 14 + 17 + x) / 4 = 15',
    question: 'Vilket är det fjärde talet (x)?',
    unit: '',
    acceptedAnswers: ['18'],
    solutionSteps: [
      'Steg 1: Total summa av alla 4 tal = 4 · 15 = 60',
      'Steg 2: Dra bort de tre kända talen ⇒ 60 − (11 + 14 + 17) = 60 − 42 = 18',
      'Svar: 18'
    ]
  },

  // --- PROBLEMLÖSNING (DELPROV C & D) ---
  {
    id: 'prob-1',
    category: 'problemlosning',
    part: 'C',
    level: 'C',
    title: 'Biobiljetterna',
    facts: ['👨‍👩‍👧‍👦 2 vuxna + 3 barn', '➕ Vuxen = Barn (x) + 40 kr', '💰 Totalt = 680 kr'],
    mathDisplay: '3x + 2(x + 40) = 680',
    question: 'Vad kostar 1 barnbiljett (x)?',
    unit: 'kr',
    acceptedAnswers: ['120', '120 kr'],
    solutionSteps: [
      'Steg 1: Förenkla ekvationen ⇒ 3x + 2x + 80 = 680 ⇒ 5x + 80 = 680',
      'Steg 2: Ta −80 på båda sidor ⇒ 5x = 600 ⇒ x = 600 / 5 = 120 kr',
      'Svar: 120'
    ]
  },
  {
    id: 'prob-2',
    category: 'problemlosning',
    part: 'D',
    level: 'A',
    title: 'Rektangelns area',
    facts: ['📏 Omkrets = 56 cm', '📐 Basen (3x) är 3 ggr så lång som höjden (x)'],
    mathDisplay: 'Omkrets: 2(x + 3x) = 56  →  Area = ?',
    question: 'Räkna ut rektangelns area.',
    unit: 'cm²',
    acceptedAnswers: ['147', '147 cm²', '147 cm2'],
    solutionSteps: [
      'Steg 1: 8x = 56 ⇒ Höjden x = 56 / 8 = 7 cm',
      'Steg 2: Basen = 3 · 7 = 21 cm ⇒ Area = 21 · 7 = 147 cm²',
      'Svar: 147'
    ]
  },
  {
    id: 'prob-3',
    category: 'problemlosning',
    part: 'C',
    level: 'A',
    title: 'Bärkorgen',
    facts: ['🍓 3/5 är jordgubbar, 2/5 är hallon', '➕ Lägger man i 20 hallon blir det lika många'],
    mathDisplay: '3/5 − 2/5 = 1/5 (motsvarar 20 bär)',
    question: 'Hur många bär fanns det totalt från början?',
    unit: 'st',
    acceptedAnswers: ['100', '100 st', '100 bär'],
    solutionSteps: [
      'Steg 1: Skillnaden mellan 3/5 och 2/5 är 1/5, vilket är 20 bär',
      'Steg 2: Hela korgen (5/5) = 5 · 20 = 100 bär',
      'Svar: 100'
    ]
  }
];

// ============================================================================
// SEEDED SLUMPGENERATOR (För Kompisduellen)
// ============================================================================
function createSeededRandom(seedStr) {
  let h = 2166136261 >>> 0;
  const str = String(seedStr || Date.now());
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function pickRandom(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

// ============================================================================
// DYNAMISK UPPGIFTSGENERATOR (KORT & LÄTTLÄST FORMAT)
// ============================================================================
function generateDynamicQuestion(category, preferredLevel = null, rng = Math.random) {
  const cat = category === 'all' ? pickRandom(rng, CATEGORIES).id : category;
  const idSuffix = Math.floor(rng() * 900000 + 100000);

  if (cat === 'tal') {
    const variant = randInt(rng, 1, 4);
    if (variant === 1) {
      const price = randInt(rng, 3, 12) * 100;
      const pct = pickRandom(rng, [10, 20, 25, 30, 40]);
      const discount = price * (pct / 100);
      const ans = price - discount;
      return {
        id: `dyn-tal-${idSuffix}`,
        category: 'tal',
        part: 'B',
        level: preferredLevel || 'E',
        title: 'Procent & Rabatt',
        facts: [`🎧 Pris: ${price} kr`, `🏷️ Rabatt: ${pct} %`],
        mathDisplay: `${price} kr − ${pct} % = ?`,
        question: 'Vad blir det nya priset?',
        unit: 'kr',
        acceptedAnswers: [String(ans), `${ans} kr`],
        solutionSteps: [
          `Steg 1: Räkna ut rabatten (${pct} % av ${price}) ⇒ ${discount} kr`,
          `Steg 2: Dra bort rabatten ⇒ ${price} − ${discount} = ${ans} kr`,
          `Svar: ${ans}`
        ]
      };
    } else if (variant === 2) {
      const num = randInt(rng, 12, 45);
      const dec = pickRandom(rng, [
        { d: '0,5', f: 2 },
        { d: '0,25', f: 4 },
        { d: '0,2', f: 5 }
      ]);
      const ans = num * dec.f;
      return {
        id: `dyn-tal-${idSuffix}`,
        category: 'tal',
        part: 'B',
        level: 'E',
        title: 'Dividera med decimaltal',
        facts: ['🚫 Utan räknare', `💡 Förläng bråket med ${dec.f}`],
        mathDisplay: `${num} / ${dec.d} = ?`,
        question: 'Räkna ut kvoten.',
        unit: '',
        acceptedAnswers: [String(ans)],
        solutionSteps: [
          `Steg 1: Multiplicera både ${num} och ${dec.d} med ${dec.f}`,
          `Steg 2: ${num} · ${dec.f} = ${ans}`,
          `Svar: ${ans}`
        ]
      };
    } else if (variant === 3) {
      const a = randInt(rng, 2, 9);
      const exp1 = randInt(rng, 3, 7);
      const exp2 = randInt(rng, 2, 5);
      const sumExp = exp1 + exp2;
      const ans = sumExp - 2;
      return {
        id: `dyn-tal-${idSuffix}`,
        category: 'tal',
        part: 'B',
        level: 'C',
        title: 'Potenslagarna',
        facts: ['➕ Gånger = plussa exponenter', '➖ Delat = minus exponenter'],
        mathDisplay: `(${a}^${exp1} · ${a}^${exp2}) / ${a}² = ${a}^x`,
        question: 'Vilket värde har exponenten x?',
        unit: '',
        acceptedAnswers: [String(ans), `x=${ans}`],
        solutionSteps: [
          `Steg 1: Täljaren ⇒ ${exp1} + ${exp2} = ${sumExp}`,
          `Steg 2: Dividera med ${a}² ⇒ ${sumExp} − 2 = ${ans}`,
          `Svar: ${ans}`
        ]
      };
    } else {
      const orig = randInt(rng, 4, 15) * 100;
      const pct = pickRandom(rng, [20, 25, 30]);
      const ff = 1 - pct / 100;
      const now = Math.round(orig * ff);
      const ffStr = String(ff).replace('.', ',');
      return {
        id: `dyn-tal-${idSuffix}`,
        category: 'tal',
        part: 'D',
        level: 'C',
        title: 'Baklängesprocent',
        facts: [`🏷️ Rea: −${pct} % (ff = ${ffStr})`, `💰 Pris nu: ${now} kr`],
        mathDisplay: `x · ${ffStr} = ${now}`,
        question: 'Vad kostade tröjan från början (x)?',
        unit: 'kr',
        acceptedAnswers: [String(orig), `${orig} kr`],
        solutionSteps: [
          `Steg 1: Dela priset nu med förändringsfaktorn ${ffStr}`,
          `Steg 2: x = ${now} / ${ffStr} = ${orig} kr`,
          `Svar: ${orig}`
        ]
      };
    }
  }

  if (cat === 'algebra') {
    const variant = randInt(rng, 1, 3);
    if (variant === 1) {
      const xVal = randInt(rng, 3, 14);
      const a = randInt(rng, 3, 8);
      const b = randInt(rng, 4, 19);
      const rhs = a * xVal - b;
      return {
        id: `dyn-alg-${idSuffix}`,
        category: 'algebra',
        part: 'B',
        level: 'E',
        title: 'Lös ekvationen',
        facts: [`💡 Börja med +${b} på båda sidor`],
        mathDisplay: `${a}x − ${b} = ${rhs}`,
        question: 'Vad är x?',
        unit: '',
        acceptedAnswers: [String(xVal), `x=${xVal}`, `x = ${xVal}`],
        solutionSteps: [
          `Steg 1: Plussa ${b} på båda sidor ⇒ ${a}x = ${rhs + b}`,
          `Steg 2: Dela med ${a} ⇒ x = ${rhs + b} / ${a} = ${xVal}`,
          `Svar: ${xVal}`
        ]
      };
    } else if (variant === 2) {
      const xVal = randInt(rng, 2, 11);
      const k1 = randInt(rng, 5, 9);
      const k2 = randInt(rng, 2, 4);
      const m1 = randInt(rng, 3, 15);
      const m2 = (k1 - k2) * xVal + m1;
      return {
        id: `dyn-alg-${idSuffix}`,
        category: 'algebra',
        part: 'C',
        level: 'C',
        title: 'Ekvation med x på båda sidor',
        facts: [`💡 Samla alla x på vänster sida (−${k2}x)`],
        mathDisplay: `${k1}x + ${m1} = ${k2}x + ${m2}`,
        question: 'Lös ekvationen (hitta x).',
        unit: '',
        acceptedAnswers: [String(xVal), `x=${xVal}`, `x = ${xVal}`],
        solutionSteps: [
          `Steg 1: Ta −${k2}x och −${m1} på båda sidor ⇒ ${k1 - k2}x = ${m2 - m1}`,
          `Steg 2: Dela med ${k1 - k2} ⇒ x = ${m2 - m1} / ${k1 - k2} = ${xVal}`,
          `Svar: ${xVal}`
        ]
      };
    } else {
      const step = randInt(rng, 3, 6);
      const start = randInt(rng, 1, 5);
      const nTarget = pickRandom(rng, [20, 30, 40, 50]);
      const ans = step * nTarget + start;
      return {
        id: `dyn-alg-${idSuffix}`,
        category: 'algebra',
        part: 'C',
        level: 'C',
        title: 'Mönster & Talföljd',
        facts: [`📈 Ökar med +${step} varje steg`, `🧮 Formel: ${step}n + ${start}`],
        mathDisplay: `Tal 1: ${step + start}  |  Tal 2: ${2 * step + start}  |  Tal 3: ${3 * step + start}`,
        question: `Vilket är tal nummer ${nTarget}?`,
        unit: '',
        acceptedAnswers: [String(ans)],
        solutionSteps: [
          `Steg 1: Formel för tal n är ${step}n + ${start}`,
          `Steg 2: Sätt in n = ${nTarget} ⇒ ${step} · ${nTarget} + ${start} = ${ans}`,
          `Svar: ${ans}`
        ]
      };
    }
  }

  if (cat === 'funktioner') {
    const k = randInt(rng, 1, 3);
    const m = randInt(rng, 1, 4);
    return {
      id: `dyn-funk-${idSuffix}`,
      category: 'funktioner',
      part: 'B',
      level: 'C',
      title: 'Räta linjens ekvation',
      facts: [`📍 Skär y-axeln vid m = ${m}`, `📈 Går genom (5, ${k * 5 + m})`],
      mathDisplay: 'y = kx + m',
      question: 'Skriv ekvationen för linjen i grafen.',
      svg: SVG_FIGURES.linearGraph(k, m),
      unit: '',
      acceptedAnswers: [
        k === 1 ? `y=x+${m}` : `y=${k}x+${m}`,
        `y=${k}x+${m}`,
        `y = ${k}x + ${m}`,
        `${k}x+${m}`
      ],
      solutionSteps: [
        `Steg 1: m-värdet (vid y-axeln) ⇒ m = ${m}`,
        `Steg 2: Lutningen k = (${k * 5 + m} − ${m}) / 5 = ${k} ⇒ y = ${k}x + ${m}`,
        `Svar: y=${k}x+${m}`
      ]
    };
  }

  if (cat === 'geometri') {
    const triples = [
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
      [8, 15, 17],
      [9, 12, 15]
    ];
    const [a, b, c] = pickRandom(rng, triples);
    const findHyp = rng() > 0.4;
    if (findHyp) {
      return {
        id: `dyn-geo-${idSuffix}`,
        category: 'geometri',
        part: 'D',
        level: 'E',
        title: 'Pythagoras sats',
        facts: [`📐 Kateter: ${a} cm och ${b} cm`],
        mathDisplay: `${a}² + ${b}² = x²`,
        question: 'Hur lång är hypotenusan x?',
        svg: SVG_FIGURES.rightTriangle(`${a} cm`, b, 'x'),
        unit: 'cm',
        acceptedAnswers: [String(c), `${c} cm`],
        solutionSteps: [
          `Steg 1: ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}`,
          `Steg 2: x = √${c * c} = ${c} cm`,
          `Svar: ${c}`
        ]
      };
    } else {
      return {
        id: `dyn-geo-${idSuffix}`,
        category: 'geometri',
        part: 'D',
        level: 'C',
        title: 'Pythagoras sats (Katet)',
        facts: [`📐 Hypotenusa: ${c} cm`, `📏 Katet: ${b} cm`],
        mathDisplay: `x² + ${b}² = ${c}²`,
        question: 'Räkna ut kateten x.',
        svg: SVG_FIGURES.rightTriangle('x', b, `${c} cm`),
        unit: 'cm',
        acceptedAnswers: [String(a), `${a} cm`],
        solutionSteps: [
          `Steg 1: x² = ${c}² − ${b}² = ${c * c} − ${b * b} = ${a * a}`,
          `Steg 2: x = √${a * a} = ${a} cm`,
          `Svar: ${a}`
        ]
      };
    }
  }

  if (cat === 'statistik') {
    const count = 4;
    const mean = randInt(rng, 12, 25);
    const total = count * mean;
    const n1 = mean - randInt(rng, 2, 5);
    const n2 = mean + randInt(rng, 1, 4);
    const n3 = mean - randInt(rng, 1, 3);
    const n4 = total - (n1 + n2 + n3);
    return {
      id: `dyn-stat-${idSuffix}`,
      category: 'statistik',
      part: 'C',
      level: 'C',
      title: 'Medelvärde baklänges',
      facts: [`📊 4 tal har medelvärdet ${mean}`, `📌 Tre av talen: ${n1}, ${n2}, ${n3}`],
      mathDisplay: `(${n1} + ${n2} + ${n3} + x) / 4 = ${mean}`,
      question: 'Vilket är det fjärde talet (x)?',
      unit: '',
      acceptedAnswers: [String(n4)],
      solutionSteps: [
        `Steg 1: Alla 4 tal tillsammans = 4 · ${mean} = ${total}`,
        `Steg 2: x = ${total} − (${n1} + ${n2} + ${n3}) = ${total} − ${n1 + n2 + n3} = ${n4}`,
        `Svar: ${n4}`
      ]
    };
  }

  const h = randInt(rng, 4, 9);
  const mult = randInt(rng, 2, 4);
  const b = h * mult;
  const perim = 2 * (h + b);
  const area = h * b;
  return {
    id: `dyn-prob-${idSuffix}`,
    category: 'problemlosning',
    part: 'D',
    level: 'A',
    title: 'Rektangelns area',
    facts: [`📏 Omkrets = ${perim} cm`, `📐 Basen (${mult}x) är ${mult} ggr höjden (x)`],
    mathDisplay: `2(x + ${mult}x) = ${perim}  →  Area = ?`,
    question: 'Beräkna rektangelns area.',
    unit: 'cm²',
    acceptedAnswers: [String(area), `${area} cm²`, `${area} cm2`],
    solutionSteps: [
      `Steg 1: ${2 * (1 + mult)}x = ${perim} ⇒ Höjden x = ${h} cm`,
      `Steg 2: Basen = ${mult} · ${h} = ${b} cm ⇒ Area = ${b} · ${h} = ${area} cm²`,
      `Svar: ${area}`
    ]
  };
}

// ============================================================================
// SMART SVARSKONTROLL
// ============================================================================
function normalizeAnswerString(str) {
  return String(str || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/,/g, '.')
    .replace(/·/g, '*')
    .replace(/−/g, '-')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3');
}

function checkUserAnswer(userRaw, questionObj) {
  if (!userRaw || !String(userRaw).trim()) return false;
  const userNorm = normalizeAnswerString(userRaw);

  const strippedVar = userNorm.replace(/^(x|y|m|svar)=/, '');
  const unitNorm = normalizeAnswerString(questionObj.unit || '');
  const strippedUnit = unitNorm && strippedVar.endsWith(unitNorm)
    ? strippedVar.slice(0, -unitNorm.length)
    : strippedVar;

  for (const acc of questionObj.acceptedAnswers) {
    const accNorm = normalizeAnswerString(acc);
    const accStripped = accNorm.replace(/^(x|y|m)=/, '');
    if (
      userNorm === accNorm ||
      strippedVar === accNorm ||
      strippedUnit === accNorm ||
      strippedUnit === accStripped
    ) {
      return true;
    }
    const numUser = Number(strippedUnit);
    const numAcc = Number(accStripped);
    if (!Number.isNaN(numUser) && !Number.isNaN(numAcc) && strippedUnit !== '' && accStripped !== '') {
      if (Math.abs(numUser - numAcc) < 0.001) {
        return true;
      }
    }
  }
  return false;
}
