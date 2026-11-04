// ============================================================================
// NP-MÄSTAREN ÅK 9 - AUTENTISKA NP-UPPGIFTER (DELPROV B, C, D & NIVÅ E, C, A)
// Baserade på Skolverkets frisläppta Nationella Prov i Matematik Åk 9
// ============================================================================

const CATEGORIES = [
  {
    id: 'tal',
    name: 'Tal & Procent',
    icon: '🔢',
    color: '#6366f1',
    desc: 'Bråk, procent, potenser, förändringsfaktor & överslagsräkning'
  },
  {
    id: 'algebra',
    name: 'Algebra & x',
    icon: '✖️',
    color: '#ec4899',
    desc: 'Ekvationer, förenkla uttryck, parenteser & mönster'
  },
  {
    id: 'funktioner',
    name: 'Grafer & y = kx+m',
    icon: '📈',
    color: '#10b981',
    desc: 'Räta linjen, koordinatsystem, hastighet & linjära samband'
  },
  {
    id: 'geometri',
    name: 'Geometri',
    icon: '📐',
    color: '#f59e0b',
    desc: 'Pythagoras sats, volym, area, vinklar & skala'
  },
  {
    id: 'statistik',
    name: 'Slump & Statistik',
    icon: '🎲',
    color: '#38bdf8',
    desc: 'Sannolikhet, träddiagram, medelvärde & median'
  },
  {
    id: 'problemlosning',
    name: 'NP-Kluringar',
    icon: '🧠',
    color: '#a855f7',
    desc: 'Flerstegsproblem från Delprov C & Delprov D'
  }
];

// ============================================================================
// SVG-FIGURER FÖR GEOMETRI, GRAFER OCH MÖNSTER
// ============================================================================
const SVG_FIGURES = {
  rightTriangle(aLabel, bLabel, cLabel) {
    return `
      <svg viewBox="0 0 260 155" class="q-svg" aria-label="Rätvinklig triangel">
        <polygon points="45,25 45,125 205,125" fill="rgba(99,102,241,0.14)" stroke="#6366f1" stroke-width="3" stroke-linejoin="round"/>
        <polyline points="45,107 63,107 63,125" fill="none" stroke="#6366f1" stroke-width="2"/>
        <text x="22" y="80" text-anchor="middle" fill="currentColor" font-size="15" font-weight="800">${aLabel}</text>
        <text x="125" y="146" text-anchor="middle" fill="currentColor" font-size="15" font-weight="800">${bLabel} cm</text>
        <text x="138" y="68" text-anchor="middle" fill="#ec4899" font-size="16" font-weight="800">${cLabel}</text>
      </svg>
    `;
  },

  cylinder(r, h) {
    return `
      <svg viewBox="0 0 240 165" class="q-svg" aria-label="Cylinder">
        <ellipse cx="120" cy="35" rx="58" ry="18" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" stroke-width="2.5"/>
        <path d="M62,35 L62,125 A58,18 0 0,0 178,125 L178,35" fill="rgba(56,189,248,0.10)" stroke="#38bdf8" stroke-width="2.5"/>
        <ellipse cx="120" cy="125" rx="58" ry="18" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5,5"/>
        <line x1="120" y1="35" x2="178" y2="35" stroke="#f43f5e" stroke-width="2.5"/>
        <circle cx="120" cy="35" r="3.5" fill="#f43f5e"/>
        <text x="148" y="28" text-anchor="middle" fill="#f43f5e" font-size="14" font-weight="800">r = ${r} cm</text>
        <text x="206" y="85" text-anchor="middle" fill="currentColor" font-size="14" font-weight="800">h = ${h} cm</text>
      </svg>
    `;
  },

  linearGraph(k, m) {
    const x0 = 50;
    const y0 = 145;
    const scaleX = 24;
    const scaleY = 10;
    const startY = y0 - m * scaleY;
    const endX = x0 + 5 * scaleX;
    const endY = y0 - (k * 5 + m) * scaleY;

    return `
      <svg viewBox="0 0 250 170" class="q-svg" aria-label="Koordinatsystem med rät linje">
        <g stroke="rgba(148,163,184,0.22)" stroke-width="1">
          <line x1="50" y1="15" x2="50" y2="155"/>
          <line x1="74" y1="15" x2="74" y2="155"/>
          <line x1="98" y1="15" x2="98" y2="155"/>
          <line x1="122" y1="15" x2="122" y2="155"/>
          <line x1="146" y1="15" x2="146" y2="155"/>
          <line x1="170" y1="15" x2="170" y2="155"/>
          <line x1="35" y1="125" x2="205" y2="125"/>
          <line x1="35" y1="105" x2="205" y2="105"/>
          <line x1="35" y1="85" x2="205" y2="85"/>
          <line x1="35" y1="65" x2="205" y2="65"/>
          <line x1="35" y1="45" x2="205" y2="45"/>
        </g>
        <line x1="35" y1="145" x2="210" y2="145" stroke="currentColor" stroke-width="2"/>
        <line x1="50" y1="158" x2="50" y2="15" stroke="currentColor" stroke-width="2"/>
        <text x="215" y="149" fill="currentColor" font-size="12" font-weight="800">x</text>
        <text x="46" y="12" fill="currentColor" font-size="12" font-weight="800">y</text>
        <line x1="${x0}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="#10b981" stroke-width="3.5"/>
        <circle cx="${x0}" cy="${startY}" r="4.5" fill="#f59e0b"/>
        <circle cx="${endX}" cy="${endY}" r="4.5" fill="#f59e0b"/>
        <text x="${x0 - 8}" y="${startY + 4}" text-anchor="end" fill="#f59e0b" font-size="12" font-weight="800">(0, ${m})</text>
        <text x="${endX + 6}" y="${endY + 4}" text-anchor="start" fill="#10b981" font-size="12" font-weight="800">(5, ${k * 5 + m})</text>
      </svg>
    `;
  },

  anglesTriangle(v1, v2) {
    return `
      <svg viewBox="0 0 260 145" class="q-svg" aria-label="Triangel med vinklar">
        <polygon points="35,120 225,120 145,25" fill="rgba(245,158,11,0.14)" stroke="#f59e0b" stroke-width="3" stroke-linejoin="round"/>
        <text x="72" y="112" fill="currentColor" font-size="14" font-weight="800">${v1}°</text>
        <text x="182" y="112" fill="currentColor" font-size="14" font-weight="800">${v2}°</text>
        <text x="142" y="56" text-anchor="middle" fill="#ec4899" font-size="16" font-weight="800">x°</text>
      </svg>
    `;
  },

  patternDots() {
    return `
      <svg viewBox="0 0 290 95" class="q-svg" aria-label="Mönster med figurer">
        <g transform="translate(22, 15)">
          <circle cx="20" cy="15" r="5" fill="#6366f1"/>
          <circle cx="20" cy="30" r="5" fill="#6366f1"/>
          <circle cx="5" cy="30" r="5" fill="#ec4899"/>
          <circle cx="35" cy="30" r="5" fill="#ec4899"/>
          <text x="20" y="66" text-anchor="middle" fill="currentColor" font-size="12" font-weight="800">Fig 1 (4 st)</text>
        </g>
        <g transform="translate(105, 15)">
          <circle cx="25" cy="5" r="5" fill="#6366f1"/>
          <circle cx="25" cy="18" r="5" fill="#6366f1"/>
          <circle cx="25" cy="31" r="5" fill="#6366f1"/>
          <circle cx="3" cy="31" r="5" fill="#ec4899"/>
          <circle cx="14" cy="31" r="5" fill="#ec4899"/>
          <circle cx="36" cy="31" r="5" fill="#ec4899"/>
          <circle cx="47" cy="31" r="5" fill="#ec4899"/>
          <text x="25" y="66" text-anchor="middle" fill="currentColor" font-size="12" font-weight="800">Fig 2 (7 st)</text>
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
    `;
  }
};

// ============================================================================
// FRISLÄPPTA & KLASSISKA NP-UPPGIFTER ÅK 9 (ALLA OMRÅDEN, DELPROV B/C/D & E/C/A)
// ============================================================================
const STATIC_QUESTIONS = [
  // ==========================================================================
  // 1. TALUPPFATTNING & PROCENT (tal)
  // ==========================================================================
  {
    id: 'np-tal-b-e1',
    category: 'tal',
    part: 'B',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Dividera med decimaltal (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-typ', '🚫 Utan räknare', '💡 0,5 = 1/2'],
    mathDisplay: '24 / 0,5 = ?',
    question: 'Beräkna värdet.',
    unit: '',
    acceptedAnswers: ['48'],
    solutionSteps: [
      'Steg 1: Att dela med 0,5 är samma sak som att multiplicera med 2 ⇒ (24 · 2) / (0,5 · 2)',
      'Steg 2: 48 / 1 = 48',
      'Svar: 48'
    ]
  },
  {
    id: 'np-tal-b-e2',
    category: 'tal',
    part: 'B',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Tal mitt emellan (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚫 Utan räknare'],
    mathDisplay: '0,4   <   ?   <   0,45',
    question: 'Vilket tal ligger exakt mitt emellan 0,4 och 0,45?',
    unit: '',
    acceptedAnswers: ['0,425', '0.425'],
    solutionSteps: [
      'Steg 1: Skriv med lika många decimaler ⇒ 0,400 och 0,450',
      'Steg 2: Mitt emellan 400 och 450 ligger 425 ⇒ 0,425',
      'Svar: 0,425'
    ]
  },
  {
    id: 'np-tal-b-c1',
    category: 'tal',
    part: 'B',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Multiplikation & Addition av bråk (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '⚠️ Multiplikation går före addition!'],
    mathDisplay: '2/3 + (1/3) · (3/4)',
    question: 'Beräkna och svara i enklaste bråkform (a/b).',
    unit: '',
    acceptedAnswers: ['11/12'],
    solutionSteps: [
      'Steg 1: Multiplicera först ⇒ (1/3) · (3/4) = 1/4',
      'Steg 2: Förläng till nämnare 12 ⇒ 8/12 + 3/12 = 11/12',
      'Svar: 11/12'
    ]
  },
  {
    id: 'np-tal-b-c2',
    category: 'tal',
    part: 'B',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Grundpotensform (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-typ', '🔢 Talet framför 10ⁿ ska vara mellan 1 och 10'],
    mathDisplay: '(3 · 10⁴) · (4 · 10³)',
    question: 'Skriv svaret i grundpotensform (t.ex. 1,2*10^8).',
    unit: '',
    acceptedAnswers: ['1,2*10^8', '1.2*10^8', '1,2·10^8', '1,2*10⁸', '1,2·10⁸', '1.2·10^8', '120000000'],
    solutionSteps: [
      'Steg 1: Multiplicera talen och tiopotenserna ⇒ 3 · 4 = 12 och 10⁴ · 10³ = 10⁷',
      'Steg 2: Skriv om 12 · 10⁷ till grundpotensform ⇒ 1,2 · 10⁸',
      'Svar: 1,2*10^8'
    ]
  },
  {
    id: 'np-tal-b-a1',
    category: 'tal',
    part: 'B',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Potensekvation utan räknare (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '💡 Skriv 100 som en tiopotens (10²)'],
    mathDisplay: '(10⁸ · 100) / 10^x = 10³',
    question: 'Vilket värde har exponenten x?',
    unit: '',
    acceptedAnswers: ['7', 'x=7'],
    solutionSteps: [
      'Steg 1: 100 = 10², så täljaren är 10⁸ · 10² = 10¹⁰',
      'Steg 2: 10¹⁰ / 10^x = 10³ ⇒ 10 − x = 3 ⇒ x = 7',
      'Svar: 7'
    ]
  },
  {
    id: 'np-tal-c-e1',
    category: 'tal',
    part: 'C',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Biografens besökare (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-typ', '🎟️ Totalt 240 platser', '👥 3/4 av platserna är sålda'],
    mathDisplay: 'Lediga platser = 240 − (3/4 av 240)',
    question: 'Hur många platser är lediga i salongen?',
    unit: 'st',
    acceptedAnswers: ['60', '60 st', '60 platser'],
    solutionSteps: [
      'Steg 1: 1/4 av platserna är lediga ⇒ 240 / 4 = 60',
      'Steg 2: Det finns 60 lediga platser',
      'Svar: 60'
    ]
  },
  {
    id: 'np-tal-c-c1',
    category: 'tal',
    part: 'C',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Blandade bråkdelar i skolan (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚲 1/3 cyklar', '🚌 2/5 åker buss', '🚶 Resten (24 elever) går'],
    mathDisplay: '1 − (1/3 + 2/5) = 24 elever',
    question: 'Hur många elever går på skolan totalt?',
    unit: 'elever',
    acceptedAnswers: ['90', '90 elever', '90 st'],
    solutionSteps: [
      'Steg 1: Gemensam nämnare 15 ⇒ 1/3 + 2/5 = 5/15 + 6/15 = 11/15',
      'Steg 2: Resten är 4/15 = 24 elever ⇒ 1/15 = 6 elever ⇒ Alla (15/15) = 15 · 6 = 90 elever',
      'Svar: 90'
    ]
  },
  {
    id: 'np-tal-c-a1',
    category: 'tal',
    part: 'C',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Kvadratrot & Potenser (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚫 Utan räknare'],
    mathDisplay: '√(9 · 10⁶) = ?',
    question: 'Beräkna värdet och svara som ett vanligt tal.',
    unit: '',
    acceptedAnswers: ['3000', '3 000', '3*10^3'],
    solutionSteps: [
      'Steg 1: Ta roten ur 9 och roten ur 10⁶ var för sig ⇒ √9 = 3 och √(10⁶) = 10³',
      'Steg 2: 3 · 10³ = 3 000',
      'Svar: 3000'
    ]
  },
  {
    id: 'np-tal-d-e1',
    category: 'tal',
    part: 'D',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Rea på vinterjacka (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-typ', '🖩 Miniräknare tillåten', '🧥 Ordinarie pris: 1 250 kr', '🏷️ Rabatt: 30 %'],
    mathDisplay: '1 250 · 0,70 = ?',
    question: 'Vad kostar jackan på rean?',
    unit: 'kr',
    acceptedAnswers: ['875', '875 kr'],
    solutionSteps: [
      'Steg 1: 30 % rabatt betyder att du betalar 70 % (förändringsfaktor 0,70)',
      'Steg 2: 1 250 · 0,70 = 875 kr',
      'Svar: 875'
    ]
  },
  {
    id: 'np-tal-d-c1',
    category: 'tal',
    part: 'D',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Total förändringsfaktor (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📈 Först höjning: +20 % (1,20)', '📉 Sedan sänkning: −15 % (0,85)'],
    mathDisplay: '1,20 · 0,85 = ?',
    question: 'Med hur många procent har priset totalt ökat?',
    unit: '%',
    acceptedAnswers: ['2', '2%', '2 %'],
    solutionSteps: [
      'Steg 1: Multiplicera förändringsfaktorerna ⇒ 1,20 · 0,85 = 1,02',
      'Steg 2: Förändringsfaktorn 1,02 motsvarar en ökning med 2 %',
      'Svar: 2'
    ]
  },
  {
    id: 'np-tal-d-a1',
    category: 'tal',
    part: 'D',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Baklängesprocent i två steg (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🏷️ Sänkning 1: −15 % (0,85)', '🏷️ Sänkning 2: −20 % (0,80)', '💰 Pris nu: 3 400 kr'],
    mathDisplay: 'x · 0,85 · 0,80 = 3 400',
    question: 'Vad kostade elsparkcykeln från början (x)?',
    unit: 'kr',
    acceptedAnswers: ['5000', '5 000', '5000 kr'],
    solutionSteps: [
      'Steg 1: Total förändringsfaktor ⇒ 0,85 · 0,80 = 0,68',
      'Steg 2: Dividera nuvarande pris med 0,68 ⇒ 3 400 / 0,68 = 5 000 kr',
      'Svar: 5000'
    ]
  },

  // ==========================================================================
  // 2. ALGEBRA & EKVATIONER (algebra)
  // ==========================================================================
  {
    id: 'np-alg-b-e1',
    category: 'algebra',
    part: 'B',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Lös ekvationen (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚫 Utan räknare'],
    mathDisplay: '4x − 7 = 21',
    question: 'Vilket värde har x?',
    unit: '',
    acceptedAnswers: ['7', 'x=7', 'x = 7'],
    solutionSteps: [
      'Steg 1: Addera 7 på båda sidor ⇒ 4x = 28',
      'Steg 2: Dividera med 4 ⇒ x = 28 / 4 = 7',
      'Svar: 7'
    ]
  },
  {
    id: 'np-alg-b-c1',
    category: 'algebra',
    part: 'B',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Förenkla uttryck med parentes (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '⚠️ Minus framför parentes byter tecken inuti!'],
    mathDisplay: '3(2x − 4) − (x − 5)',
    question: 'Förenkla uttrycket så långt som möjligt.',
    unit: '',
    acceptedAnswers: ['5x-7', '5x - 7', '-7+5x'],
    solutionSteps: [
      'Steg 1: Multiplicera in 3 och lös upp minusparentesen ⇒ 6x − 12 − x + 5',
      'Steg 2: Förenkla x-termer och siffertermer ⇒ 5x − 7',
      'Svar: 5x-7'
    ]
  },
  {
    id: 'np-alg-b-a1',
    category: 'algebra',
    part: 'B',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Algebraiskt bråk (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '💡 Bryt ut 3x i täljaren'],
    mathDisplay: '(6x² + 12x) / 3x',
    question: 'Förenkla uttrycket så långt som möjligt.',
    unit: '',
    acceptedAnswers: ['2x+4', '2x + 4', '4+2x', '2(x+2)'],
    solutionSteps: [
      'Steg 1: Dela båda termerna i täljaren med 3x ⇒ (6x² / 3x) + (12x / 3x)',
      'Steg 2: Förenkla ⇒ 2x + 4',
      'Svar: 2x+4'
    ]
  },
  {
    id: 'np-alg-c-e1',
    category: 'algebra',
    part: 'C',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Mönster med prickar – Figur 4 (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🔵 Fig 1 = 4 st', '🔵 Fig 2 = 7 st', '🔵 Fig 3 = 10 st'],
    mathDisplay: 'Ökar med +3 för varje ny figur',
    question: 'Hur många prickar finns det i Figur 4?',
    svg: SVG_FIGURES.patternDots(),
    unit: 'st',
    acceptedAnswers: ['13', '13 st'],
    solutionSteps: [
      'Steg 1: Antalet prickar ökar med 3 för varje figur',
      'Steg 2: Figur 4 har 10 + 3 = 13 prickar',
      'Svar: 13'
    ]
  },
  {
    id: 'np-alg-c-c1',
    category: 'algebra',
    part: 'C',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Mönster & Formel – Figur 50 (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🔵 Fig 1 = 4 st', '🔵 Fig 2 = 7 st (+3)', '🔵 Fig 3 = 10 st (+3)'],
    mathDisplay: 'Formel: 3n + 1  →  Figur 50 = ?',
    question: 'Hur många prickar finns i Figur 50?',
    svg: SVG_FIGURES.patternDots(),
    unit: 'st',
    acceptedAnswers: ['151', '151 st'],
    solutionSteps: [
      'Steg 1: Eftersom mönstret ökar med 3 är formeln 3n + 1',
      'Steg 2: Sätt in n = 50 ⇒ 3 · 50 + 1 = 151',
      'Svar: 151'
    ]
  },
  {
    id: 'np-alg-c-a1',
    category: 'algebra',
    part: 'C',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Ekvation med bråk och parentes (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '💡 Multiplicera båda sidor med 3 först'],
    mathDisplay: '(2x + 6) / 3 = x − 2',
    question: 'Lös ekvationen (bestäm x).',
    unit: '',
    acceptedAnswers: ['12', 'x=12', 'x = 12'],
    solutionSteps: [
      'Steg 1: Multiplicera båda led med 3 ⇒ 2x + 6 = 3(x − 2) ⇒ 2x + 6 = 3x − 6',
      'Steg 2: Subtrahera 2x och addera 6 ⇒ x = 12',
      'Svar: 12'
    ]
  },
  {
    id: 'np-alg-d-e1',
    category: 'algebra',
    part: 'D',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Taxiresans prisformel (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚕 Kostnad: K = 45 + 12x kr', '📏 x = antal kilometer (15 km)'],
    mathDisplay: 'K = 45 + 12 · 15',
    question: 'Vad kostar en taxiresa som är 15 km lång?',
    unit: 'kr',
    acceptedAnswers: ['225', '225 kr'],
    solutionSteps: [
      'Steg 1: Sätt in x = 15 i formeln ⇒ 45 + 12 · 15',
      'Steg 2: 45 + 180 = 225 kr',
      'Svar: 225'
    ]
  },
  {
    id: 'np-alg-d-c1',
    category: 'algebra',
    part: 'D',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Hur långt räckte taxiresan? (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚕 Formel: 45 + 12x = 345 kr'],
    mathDisplay: '45 + 12x = 345',
    question: 'Hur många kilometer (x) åkte kunden som betalade 345 kr?',
    unit: 'km',
    acceptedAnswers: ['25', '25 km'],
    solutionSteps: [
      'Steg 1: Dra bort startavgiften 45 kr ⇒ 12x = 300',
      'Steg 2: Dela med 12 ⇒ x = 300 / 12 = 25 km',
      'Svar: 25'
    ]
  },
  {
    id: 'np-alg-d-a1',
    category: 'algebra',
    part: 'D',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Tre på varandra följande heltal (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🔢 Talen kan skrivas: x, (x+1) och (x+2)', '➕ Summan = 138'],
    mathDisplay: 'x + (x + 1) + (x + 2) = 138',
    question: 'Vilket är det största av de tre heltalen?',
    unit: '',
    acceptedAnswers: ['47'],
    solutionSteps: [
      'Steg 1: 3x + 3 = 138 ⇒ 3x = 135 ⇒ x = 45 (det minsta talet)',
      'Steg 2: Det största talet är x + 2 = 45 + 2 = 47',
      'Svar: 47'
    ]
  },

  // ==========================================================================
  // 3. FUNKTIONER & GRAFER (funktioner)
  // ==========================================================================
  {
    id: 'np-funk-b-e1',
    category: 'funktioner',
    part: 'B',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Avläsa m-värdet i graf (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📍 Linjen skär y-axeln i (0, 3)'],
    mathDisplay: 'y = kx + m  →  m = ?',
    question: 'Vilket värde har m för linjen i figuren?',
    svg: SVG_FIGURES.linearGraph(2, 3),
    unit: '',
    acceptedAnswers: ['3', 'm=3', 'm = 3'],
    solutionSteps: [
      'Steg 1: m-värdet är där linjen skär y-axeln (när x = 0)',
      'Steg 2: Linjen skär y-axeln i y = 3 ⇒ m = 3',
      'Svar: 3'
    ]
  },
  {
    id: 'np-funk-b-c1',
    category: 'funktioner',
    part: 'B',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Bestäm räta linjens ekvation (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📍 Skär y-axeln vid m = 3', '📈 Går genom (5, 13)'],
    mathDisplay: 'y = kx + m',
    question: 'Skriv linjens ekvation på formen y = kx + m.',
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
    id: 'np-funk-b-a1',
    category: 'funktioner',
    part: 'B',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Parallella linjer (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📏 Parallella linjer har exakt samma lutning (k-värde)'],
    mathDisplay: 'Linje A: y = 4x − 5   |   Linje B går genom (0, 2)',
    question: 'Skriv ekvationen för Linje B som är parallell med Linje A.',
    unit: '',
    acceptedAnswers: ['y=4x+2', 'y = 4x + 2', '4x+2'],
    solutionSteps: [
      'Steg 1: Parallell med y = 4x − 5 betyder att k = 4',
      'Steg 2: Går genom (0, 2) betyder att m = 2 ⇒ y = 4x + 2',
      'Svar: y=4x+2'
    ]
  },
  {
    id: 'np-funk-c-e1',
    category: 'funktioner',
    part: 'C',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Cyklistens medelhastighet (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚲 Sträcka: 30 km', '⏱️ Tid: 1,5 timmar'],
    mathDisplay: 'v = s / t = 30 / 1,5',
    question: 'Vilken medelhastighet håller cyklisten i km/h?',
    unit: 'km/h',
    acceptedAnswers: ['20', '20 km/h'],
    solutionSteps: [
      'Steg 1: Använd formeln v = s / t',
      'Steg 2: 30 / 1,5 = 20 km/h',
      'Svar: 20'
    ]
  },
  {
    id: 'np-funk-c-c1',
    category: 'funktioner',
    part: 'C',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Tågets hastighet (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🚆 Sträcka (s): 180 km', '⏱️ Tid (t): 1 h 30 min = 1,5 h'],
    mathDisplay: 'v = s / t = 180 / 1,5',
    question: 'Vilken är tågets medelhastighet i km/h?',
    unit: 'km/h',
    acceptedAnswers: ['120', '120 km/h'],
    solutionSteps: [
      'Steg 1: Gör om 1 h 30 min till timmar ⇒ 1,5 h',
      'Steg 2: v = 180 / 1,5 = 120 km/h',
      'Svar: 120'
    ]
  },
  {
    id: 'np-funk-c-a1',
    category: 'funktioner',
    part: 'C',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Rät linje genom två punkter (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📍 Punkt 1: (2, 11)', '📍 Punkt 2: (6, 23)'],
    mathDisplay: 'y = kx + m  →  m = ?',
    question: 'Beräkna linjens m-värde.',
    unit: '',
    acceptedAnswers: ['5', 'm=5', 'm = 5'],
    solutionSteps: [
      'Steg 1: Lutningen k = (23 − 11) / (6 − 2) = 12 / 4 = 3',
      'Steg 2: Sätt in (2, 11) i y = 3x + m ⇒ 11 = 6 + m ⇒ m = 5',
      'Svar: 5'
    ]
  },
  {
    id: 'np-funk-d-e1',
    category: 'funktioner',
    part: 'D',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Hyra släpvagn (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🖩 Miniräknare tillåten', '🚛 Fast avgift: 150 kr', '⏱️ 60 kr per timme i 4 timmar'],
    mathDisplay: 'Kostnad = 150 + 60 · 4',
    question: 'Vad kostar det att hyra släpvagnen i 4 timmar?',
    unit: 'kr',
    acceptedAnswers: ['390', '390 kr'],
    solutionSteps: [
      'Steg 1: Timkostnad för 4 timmar ⇒ 60 · 4 = 240 kr',
      'Steg 2: Lägg till fasta avgiften ⇒ 150 + 240 = 390 kr',
      'Svar: 390'
    ]
  },
  {
    id: 'np-funk-d-c1',
    category: 'funktioner',
    part: 'D',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Jämför två elavtal (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '⚡ Bolag A: 200 kr + 1,50 kr/kWh', '⚡ Bolag B: 0 kr + 2,50 kr/kWh'],
    mathDisplay: '1,5x + 200 = 2,5x',
    question: 'Vid hur många kWh (x) kostar båda avtalen lika mycket?',
    unit: 'kWh',
    acceptedAnswers: ['200', '200 kwh'],
    solutionSteps: [
      'Steg 1: Subtrahera 1,5x från båda sidor ⇒ 200 = 1,0x',
      'Steg 2: Vid x = 200 kWh är priset lika',
      'Svar: 200'
    ]
  },
  {
    id: 'np-funk-d-a1',
    category: 'funktioner',
    part: 'D',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Tömning av vattentank (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '💧 Startvolym: 800 liter', '📉 Efter 12 minuter återstår 500 liter'],
    mathDisplay: 'y = 800 − k·x',
    question: 'Efter hur många minuter från start är tanken helt tom (0 liter)?',
    unit: 'min',
    acceptedAnswers: ['32', '32 min', '32 minuter'],
    solutionSteps: [
      'Steg 1: Minskning på 12 min = 800 − 500 = 300 liter ⇒ 300 / 12 = 25 liter/min',
      'Steg 2: Tid för 800 liter ⇒ 800 / 25 = 32 minuter',
      'Svar: 32'
    ]
  },

  // ==========================================================================
  // 4. GEOMETRI (geometri)
  // ==========================================================================
  {
    id: 'np-geo-b-e1',
    category: 'geometri',
    part: 'B',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Vinkelsumma i triangel (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📐 Vinkelsumman i en triangel är 180°'],
    mathDisplay: 'x = 180° − (48° + 62°)',
    question: 'Hur stor är vinkeln x?',
    svg: SVG_FIGURES.anglesTriangle(48, 62),
    unit: '°',
    acceptedAnswers: ['70', '70°', '70 grader'],
    solutionSteps: [
      'Steg 1: 48° + 62° = 110°',
      'Steg 2: 180° − 110° = 70°',
      'Svar: 70'
    ]
  },
  {
    id: 'np-geo-b-c1',
    category: 'geometri',
    part: 'B',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Enhetsomvandling av area (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📏 1 m = 10 dm  ⇒  1 m² = 100 dm²'],
    mathDisplay: '3,5 m² = ? dm²',
    question: 'Uttryck 3,5 m² i kvadratdecimeter (dm²).',
    unit: 'dm²',
    acceptedAnswers: ['350', '350 dm²', '350 dm2'],
    solutionSteps: [
      'Steg 1: Eftersom 1 m = 10 dm går det 10 · 10 = 100 dm² på 1 m²',
      'Steg 2: 3,5 · 100 = 350 dm²',
      'Svar: 350'
    ]
  },
  {
    id: 'np-geo-b-a1',
    category: 'geometri',
    part: 'B',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Areaskala och Längdskala (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📐 Areaskalan = (Längdskalan)²'],
    mathDisplay: 'Längdskala 1 : 3  →  Areaskala = 1 : ?',
    question: 'En figur förstoras så att alla sidor blir 3 gånger så långa. Hur många gånger större blir arean?',
    unit: 'ggr',
    acceptedAnswers: ['9', '9 ggr', '9 gånger'],
    solutionSteps: [
      'Steg 1: Areaskalan är längdskalan i kvadrat',
      'Steg 2: 3² = 3 · 3 = 9 gånger större',
      'Svar: 9'
    ]
  },
  {
    id: 'np-geo-c-e1',
    category: 'geometri',
    part: 'C',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Triangelns area (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📐 Bas b = 12 cm', '📏 Höjd h = 8 cm'],
    mathDisplay: 'Area = (b · h) / 2',
    question: 'Beräkna triangelns area.',
    unit: 'cm²',
    acceptedAnswers: ['48', '48 cm²', '48 cm2'],
    solutionSteps: [
      'Steg 1: Multiplicera basen och höjden ⇒ 12 · 8 = 96',
      'Steg 2: Dividera med 2 ⇒ 96 / 2 = 48 cm²',
      'Svar: 48'
    ]
  },
  {
    id: 'np-geo-c-c1',
    category: 'geometri',
    part: 'C',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Likformiga trianglar (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🔺 Lilla triangeln: bas 4 cm, höjd 6 cm', '🔺 Stora triangeln: bas 10 cm'],
    mathDisplay: 'h / 6 = 10 / 4',
    question: 'Trianglarna är likformiga. Hur stor är höjden h i den stora triangeln?',
    unit: 'cm',
    acceptedAnswers: ['15', '15 cm'],
    solutionSteps: [
      'Steg 1: Förstoringsfaktorn är 10 / 4 = 2,5',
      'Steg 2: Höjden h = 6 · 2,5 = 15 cm',
      'Svar: 15'
    ]
  },
  {
    id: 'np-geo-c-a1',
    category: 'geometri',
    part: 'C',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Kvadratens diagonal (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🟦 En kvadrat har sidan x cm', '📐 Diagonalen d delar kvadraten i två rätvinkliga trianglar'],
    mathDisplay: 'x² + x² = (√50)²',
    question: 'Diagonalen är √50 cm. Hur stor är kvadratens area (x²)?',
    unit: 'cm²',
    acceptedAnswers: ['25', '25 cm²', '25 cm2'],
    solutionSteps: [
      'Steg 1: Enligt Pythagoras sats är x² + x² = 50 ⇒ 2x² = 50',
      'Steg 2: Kvadratens area är x² = 50 / 2 = 25 cm²',
      'Svar: 25'
    ]
  },
  {
    id: 'np-geo-d-e1',
    category: 'geometri',
    part: 'D',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Pythagoras sats (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🖩 Miniräknare tillåten', '📐 Kateter: 6 cm och 8 cm'],
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
    id: 'np-geo-d-c1',
    category: 'geometri',
    part: 'D',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Cylinderns volym (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '⭕ Radie r = 5 cm', '📏 Höjd h = 10 cm', '🥧 π ≈ 3,14'],
    mathDisplay: 'V = π · r² · h',
    question: 'Beräkna cylinderns volym (avrunda till heltal).',
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
    id: 'np-geo-d-a1',
    category: 'geometri',
    part: 'D',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Skala & Verklig area (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🗺️ Längdskala 1 : 500 (1 cm = 5 m)', '🟩 Area på kartan = 20 cm²'],
    mathDisplay: '1 cm² på kartan = 5 m · 5 m = 25 m²',
    question: 'Hur stor är den verkliga arean i m²?',
    unit: 'm²',
    acceptedAnswers: ['500', '500 m²', '500 m2'],
    solutionSteps: [
      'Steg 1: 1 cm på kartan = 500 cm = 5 m. Då är 1 cm² = 5 · 5 = 25 m²',
      'Steg 2: Verklig area = 20 · 25 = 500 m²',
      'Svar: 500'
    ]
  },

  // ==========================================================================
  // 5. SANNOLIKHET & STATISTIK (statistik)
  // ==========================================================================
  {
    id: 'np-stat-b-e1',
    category: 'statistik',
    part: 'B',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Hitta medianen (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📊 Sortera talen i storleksordning först!'],
    mathDisplay: '14°C,  19°C,  12°C,  20°C,  15°C',
    question: 'Vilken temperatur är medianen?',
    unit: '°C',
    acceptedAnswers: ['15', '15°C', '15 grader'],
    solutionSteps: [
      'Steg 1: Sortera talen ⇒ 12,  14,  15,  19,  20',
      'Steg 2: Talet i mitten är 15',
      'Svar: 15'
    ]
  },
  {
    id: 'np-stat-b-c1',
    category: 'statistik',
    part: 'B',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Sannolikhet vid två slantsinglingar (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🪙 Ett mynt kastas 2 gånger'],
    mathDisplay: 'P(Krona båda gångerna) = (1/2) · (1/2)',
    question: 'Hur stor är sannolikheten att få Krona båda gångerna? (Svara i bråkform eller %)',
    unit: '',
    acceptedAnswers: ['1/4', '25%', '25 %', '0,25'],
    solutionSteps: [
      'Steg 1: Sannolikheten för Krona i ett kast är 1/2',
      'Steg 2: Multiplicera sannolikheterna ⇒ (1/2) · (1/2) = 1/4 (25 %)',
      'Svar: 1/4'
    ]
  },
  {
    id: 'np-stat-b-a1',
    category: 'statistik',
    part: 'B',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Komplementhändelse (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🌧️ Sannolikhet för regn en dag = 0,2'],
    mathDisplay: 'P(Inget regn på 2 dagar) = 0,8 · 0,8',
    question: 'Vad är sannolikheten att det INTE regnar under någon av de två dagarna? (Svara i decimalform eller %)',
    unit: '',
    acceptedAnswers: ['0,64', '0.64', '64%', '64 %'],
    solutionSteps: [
      'Steg 1: Sannolikheten för uppehåll en dag är 1 − 0,2 = 0,8',
      'Steg 2: Två dagar i rad ⇒ 0,8 · 0,8 = 0,64 (64 %)',
      'Svar: 0,64'
    ]
  },
  {
    id: 'np-stat-c-e1',
    category: 'statistik',
    part: 'C',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Lyckohjulet (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🎡 Hjulet har 8 lika stora fält', '⭐ 2 av fälten ger vinst'],
    mathDisplay: 'P(Vinst) = 2 / 8',
    question: 'Hur stor är chansen att vinna i procent (%)?',
    unit: '%',
    acceptedAnswers: ['25', '25%', '25 %'],
    solutionSteps: [
      'Steg 1: Andelen vinstfält är 2/8 = 1/4',
      'Steg 2: 1/4 = 25 %',
      'Svar: 25'
    ]
  },
  {
    id: 'np-stat-c-c1',
    category: 'statistik',
    part: 'C',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Medelvärde baklänges (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🔢 4 st tal har medelvärdet 15', '📌 Tre av talen är: 11, 14 och 17'],
    mathDisplay: '(11 + 14 + 17 + x) / 4 = 15',
    question: 'Vilket är det fjärde talet (x)?',
    unit: '',
    acceptedAnswers: ['18'],
    solutionSteps: [
      'Steg 1: Summan av alla 4 tal = 4 · 15 = 60',
      'Steg 2: x = 60 − (11 + 14 + 17) = 60 − 42 = 18',
      'Svar: 18'
    ]
  },
  {
    id: 'np-stat-c-a1',
    category: 'statistik',
    part: 'C',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Kulor i påse (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🟢 6 gröna kulor i påsen', '🎯 Sannolikheten att dra en grön är 2/5'],
    mathDisplay: '6 / Totala antalet = 2 / 5',
    question: 'Hur många kulor finns det totalt i påsen?',
    unit: 'st',
    acceptedAnswers: ['15', '15 st'],
    solutionSteps: [
      'Steg 1: Förläng 2/5 med 3 så täljaren blir 6 ⇒ 6/15',
      'Steg 2: Det finns alltså 15 kulor totalt i påsen',
      'Svar: 15'
    ]
  },
  {
    id: 'np-stat-d-e1',
    category: 'statistik',
    part: 'D',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Beräkna medelvärdet (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🖩 Miniräknare tillåten', '📊 Poäng i 5 matcher: 18, 22, 14, 25, 21'],
    mathDisplay: '(18 + 22 + 14 + 25 + 21) / 5',
    question: 'Vilket är medelvärdet av poängen?',
    unit: 'p',
    acceptedAnswers: ['20', '20 p'],
    solutionSteps: [
      'Steg 1: Addera poängen ⇒ 18 + 22 + 14 + 25 + 21 = 100',
      'Steg 2: Dela med 5 ⇒ 100 / 5 = 20',
      'Svar: 20'
    ]
  },
  {
    id: 'np-stat-d-c1',
    category: 'statistik',
    part: 'D',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Två kulor utan återläggning (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🔴 4 röda kulor', '🔵 6 blåa kulor (Totalt 10 st)'],
    mathDisplay: 'P(2 röda) = (4/10) · (3/9)',
    question: 'Du tar 2 kulor utan återläggning. Sannolikhet att båda är röda? (Svara i enklaste bråkform)',
    unit: '',
    acceptedAnswers: ['2/15', '12/90', '13,3%', '13.3%'],
    solutionSteps: [
      'Steg 1: Multiplicera ⇒ (4 · 3) / (10 · 9) = 12/90',
      'Steg 2: Förkorta med 6 ⇒ 2/15',
      'Svar: 2/15'
    ]
  },
  {
    id: 'np-stat-d-a1',
    category: 'statistik',
    part: 'D',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Nytt medelvärde i gruppen (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '👥 9 personer har medelåldern 15 år', '➕ En lärare tillkommer så medelåldern för alla 10 blir 18 år'],
    mathDisplay: '(9 · 15 + x) / 10 = 18',
    question: 'Hur gammal är läraren (x)?',
    unit: 'år',
    acceptedAnswers: ['45', '45 år'],
    solutionSteps: [
      'Steg 1: Elevernas sammanlagda ålder = 9 · 15 = 135 år. Ny totalsumma = 10 · 18 = 180 år',
      'Steg 2: Lärarens ålder = 180 − 135 = 45 år',
      'Svar: 45'
    ]
  },

  // ==========================================================================
  // 6. NP-KLURINGAR & PROBLEMLÖSNING (problemlosning)
  // ==========================================================================
  {
    id: 'np-prob-b-e1',
    category: 'problemlosning',
    part: 'B',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Recept och proportioner (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🥞 4 portioner kräver 6 dl mjölk'],
    mathDisplay: '6 portioner = ? dl mjölk',
    question: 'Hur många deciliter mjölk behövs till 6 portioner?',
    unit: 'dl',
    acceptedAnswers: ['9', '9 dl'],
    solutionSteps: [
      'Steg 1: Till 2 portioner går det åt 6 / 2 = 3 dl mjölk',
      'Steg 2: Till 6 portioner går det åt 6 + 3 = 9 dl mjölk',
      'Svar: 9'
    ]
  },
  {
    id: 'np-prob-b-c1',
    category: 'problemlosning',
    part: 'B',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Blandningsförhållande saft (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🥤 Blanda saft och vatten i förhållandet 1 : 4'],
    mathDisplay: '1 del saft + 4 delar vatten = 5 delar totalt',
    question: 'Hur många deciliter koncentrerad saft behövs för att få 15 dl färdig saft?',
    unit: 'dl',
    acceptedAnswers: ['3', '3 dl'],
    solutionSteps: [
      'Steg 1: Förhållandet 1 : 4 ger 1 + 4 = 5 delar totalt',
      'Steg 2: 1 del = 15 / 5 = 3 dl koncentrerad saft',
      'Svar: 3'
    ]
  },
  {
    id: 'np-prob-b-a1',
    category: 'problemlosning',
    part: 'B',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov B',
    title: 'Arbetstempo tillsammans (NP Delprov B)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🎨 Kim målar ett plank på 3 timmar (1/3 per h)', '🎨 Leo målar samma plank på 6 timmar (1/6 per h)'],
    mathDisplay: '1/3 + 1/6 = 3/6 = 1/2 plank per timme',
    question: 'Hur många timmar tar det om de målar planket tillsammans?',
    unit: 'h',
    acceptedAnswers: ['2', '2 h', '2 timmar'],
    solutionSteps: [
      'Steg 1: På 1 timme målar de 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2 av planket',
      'Steg 2: Hela planket tar 2 timmar',
      'Svar: 2'
    ]
  },
  {
    id: 'np-prob-c-e1',
    category: 'problemlosning',
    part: 'C',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Lösgodispåsen (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🍬 Godis kostar 90 kr/kg', '⚖️ Du köper 400 gram (0,4 kg)'],
    mathDisplay: 'Pris = 0,4 · 90 kr',
    question: 'Hur mycket kostar godispåsen?',
    unit: 'kr',
    acceptedAnswers: ['36', '36 kr'],
    solutionSteps: [
      'Steg 1: 400 g = 0,4 kg',
      'Steg 2: 0,4 · 90 = 36 kr',
      'Svar: 36'
    ]
  },
  {
    id: 'np-prob-c-c1',
    category: 'problemlosning',
    part: 'C',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Biobiljetterna (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '👨‍👩‍👧‍👦 2 vuxna + 3 barn', '➕ Vuxen = Barn (x) + 40 kr', '💰 Totalt = 680 kr'],
    mathDisplay: '3x + 2(x + 40) = 680',
    question: 'Vad kostar 1 barnbiljett (x)?',
    unit: 'kr',
    acceptedAnswers: ['120', '120 kr'],
    solutionSteps: [
      'Steg 1: Förenkla ekvationen ⇒ 3x + 2x + 80 = 680 ⇒ 5x + 80 = 680',
      'Steg 2: 5x = 600 ⇒ x = 600 / 5 = 120 kr',
      'Svar: 120'
    ]
  },
  {
    id: 'np-prob-c-a1',
    category: 'problemlosning',
    part: 'C',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov C',
    title: 'Bärkorgen (NP Delprov C)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🍓 3/5 är jordgubbar, 2/5 är hallon', '➕ Lägger man i 20 hallon blir det lika många'],
    mathDisplay: '3/5 − 2/5 = 1/5 (motsvarar 20 bär)',
    question: 'Hur många bär fanns det totalt från början?',
    unit: 'st',
    acceptedAnswers: ['100', '100 st', '100 bär'],
    solutionSteps: [
      'Steg 1: Skillnaden mellan 3/5 och 2/5 är 1/5, vilket motsvarar 20 bär',
      'Steg 2: Hela korgen (5/5) = 5 · 20 = 100 bär',
      'Svar: 100'
    ]
  },
  {
    id: 'np-prob-d-e1',
    category: 'problemlosning',
    part: 'D',
    level: 'E',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Klassresans busskostnad (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '🖩 Miniräknare tillåten', '🚌 Buss: 7 500 kr totalt', '👥 25 elever delar lika'],
    mathDisplay: '7 500 / 25 = ?',
    question: 'Hur mycket ska varje elev betala för bussen?',
    unit: 'kr',
    acceptedAnswers: ['300', '300 kr'],
    solutionSteps: [
      'Steg 1: Dela totalkostnaden med antalet elever',
      'Steg 2: 7 500 / 25 = 300 kr per elev',
      'Svar: 300'
    ]
  },
  {
    id: 'np-prob-d-c1',
    category: 'problemlosning',
    part: 'D',
    level: 'C',
    npSource: 'NP Åk 9 • Delprov D',
    title: ' Hästhagen (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📏 120 m stängsel till 3 sidor (mot en ladugårdsvägg)', '📐 Långsidan = 2 · kortsidan (x)'],
    mathDisplay: 'x + 2x + x = 120',
    question: 'Hur stor area (i m²) får den rektangulära hagen?',
    unit: 'm²',
    acceptedAnswers: ['1800', '1 800', '1800 m²', '1800 m2'],
    solutionSteps: [
      'Steg 1: 4x = 120 ⇒ Kortsidan x = 30 m och långsidan 2x = 60 m',
      'Steg 2: Area = 30 · 60 = 1 800 m²',
      'Svar: 1800'
    ]
  },
  {
    id: 'np-prob-d-a1',
    category: 'problemlosning',
    part: 'D',
    level: 'A',
    npSource: 'NP Åk 9 • Delprov D',
    title: 'Rektangelns area & omkrets (NP Delprov D)',
    facts: ['🏛️ Frisläppt NP-uppgift', '📏 Omkrets = 56 cm', '📐 Basen (3x) är 3 ggr så lång som höjden (x)'],
    mathDisplay: 'Omkrets: 2(x + 3x) = 56  →  Area = ?',
    question: 'Beräkna rektangelns area.',
    unit: 'cm²',
    acceptedAnswers: ['147', '147 cm²', '147 cm2'],
    solutionSteps: [
      'Steg 1: 8x = 56 ⇒ Höjden x = 56 / 8 = 7 cm',
      'Steg 2: Basen = 3 · 7 = 21 cm ⇒ Area = 21 · 7 = 147 cm²',
      'Svar: 147'
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
// DYNAMISK NP-GENERATOR SOM ALLTID FÖLJER VALT OMRÅDE, DELPROV & NIVÅ!
// ============================================================================
function generateDynamicQuestion(
  category = 'all',
  preferredLevel = null,
  rng = Math.random,
  preferredPart = null
) {
  const cat = !category || category === 'all' ? pickRandom(rng, CATEGORIES).id : category;
  const part = !preferredPart || preferredPart === 'all' ? pickRandom(rng, ['B', 'C', 'D']) : preferredPart;
  const level = !preferredLevel || preferredLevel === 'all' ? pickRandom(rng, ['E', 'C', 'A']) : preferredLevel;
  const idSuffix = Math.floor(rng() * 900000 + 100000);
  const npTag = `NP Åk 9 • Delprov ${part}`;

  // 1. TAL & PROCENT
  if (cat === 'tal') {
    if (part === 'D') {
      if (level === 'E') {
        const price = randInt(rng, 4, 18) * 100;
        const pct = pickRandom(rng, [15, 20, 25, 30, 40]);
        const ans = Math.round(price * (1 - pct / 100));
        return {
          id: `dyn-tal-${idSuffix}`,
          category: 'tal',
          part: 'D',
          level: 'E',
          npSource: npTag,
          title: 'Prissänkning i procent (NP Delprov D)',
          facts: ['🏛️ Frisläppt NP-typ', `🧥 Ordinarie pris: ${price} kr`, `🏷️ Rabatt: ${pct} %`],
          mathDisplay: `${price} · ${String(1 - pct / 100).replace('.', ',')} = ?`,
          question: 'Vad blir det nya priset efter rabatten?',
          unit: 'kr',
          acceptedAnswers: [String(ans), `${ans} kr`],
          solutionSteps: [
            `Steg 1: Förändringsfaktorn vid ${pct} % rabatt är ${String(1 - pct / 100).replace('.', ',')}`,
            `Steg 2: Nytt pris = ${price} · ${String(1 - pct / 100).replace('.', ',')} = ${ans} kr`,
            `Svar: ${ans}`
          ]
        };
      } else {
        const orig = randInt(rng, 5, 16) * 100;
        const pct = pickRandom(rng, [20, 25, 30]);
        const ff = 1 - pct / 100;
        const now = Math.round(orig * ff);
        const ffStr = String(ff).replace('.', ',');
        return {
          id: `dyn-tal-${idSuffix}`,
          category: 'tal',
          part: 'D',
          level,
          npSource: npTag,
          title: 'Baklängesprocent (NP Delprov D)',
          facts: ['🏛️ Frisläppt NP-typ', `🏷️ Rea: −${pct} % (ff = ${ffStr})`, `💰 Pris nu: ${now} kr`],
          mathDisplay: `x · ${ffStr} = ${now}`,
          question: 'Vad kostade varan från början (x)?',
          unit: 'kr',
          acceptedAnswers: [String(orig), `${orig} kr`],
          solutionSteps: [
            `Steg 1: Ställ upp ekvationen x · ${ffStr} = ${now}`,
            `Steg 2: x = ${now} / ${ffStr} = ${orig} kr`,
            `Svar: ${orig}`
          ]
        };
      }
    } else {
      if (level === 'E') {
        const num = randInt(rng, 12, 42);
        const dec = pickRandom(rng, [
          { d: '0,5', f: 2 },
          { d: '0,25', f: 4 },
          { d: '0,2', f: 5 }
        ]);
        const ans = num * dec.f;
        return {
          id: `dyn-tal-${idSuffix}`,
          category: 'tal',
          part,
          level: 'E',
          npSource: npTag,
          title: `Dividera med decimaltal (NP Delprov ${part})`,
          facts: ['🏛️ Frisläppt NP-typ', '🚫 Utan räknare', `💡 Förläng med ${dec.f}`],
          mathDisplay: `${num} / ${dec.d} = ?`,
          question: 'Beräkna kvoten.',
          unit: '',
          acceptedAnswers: [String(ans)],
          solutionSteps: [
            `Steg 1: Multiplicera täljare och nämnare med ${dec.f}`,
            `Steg 2: ${num} · ${dec.f} = ${ans}`,
            `Svar: ${ans}`
          ]
        };
      } else {
        const a = randInt(rng, 2, 9);
        const exp1 = randInt(rng, 4, 8);
        const exp2 = randInt(rng, 2, 5);
        const sumExp = exp1 + exp2;
        const ans = sumExp - 2;
        return {
          id: `dyn-tal-${idSuffix}`,
          category: 'tal',
          part,
          level,
          npSource: npTag,
          title: `Potenslagarna (NP Delprov ${part})`,
          facts: ['🏛️ Frisläppt NP-typ', '➕ Gånger = addera exponenter', '➖ Delat = subtrahera exponenter'],
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
      }
    }
  }

  // 2. ALGEBRA
  if (cat === 'algebra') {
    if (level === 'E') {
      const xVal = randInt(rng, 3, 15);
      const a = randInt(rng, 3, 8);
      const b = randInt(rng, 5, 20);
      const rhs = a * xVal - b;
      return {
        id: `dyn-alg-${idSuffix}`,
        category: 'algebra',
        part,
        level: 'E',
        npSource: npTag,
        title: `Lös ekvationen (NP Delprov ${part})`,
        facts: ['🏛️ Frisläppt NP-typ', `💡 Börja med +${b} på båda sidor`],
        mathDisplay: `${a}x − ${b} = ${rhs}`,
        question: 'Vilket värde har x?',
        unit: '',
        acceptedAnswers: [String(xVal), `x=${xVal}`, `x = ${xVal}`],
        solutionSteps: [
          `Steg 1: Addera ${b} på båda sidor ⇒ ${a}x = ${rhs + b}`,
          `Steg 2: Dividera med ${a} ⇒ x = ${rhs + b} / ${a} = ${xVal}`,
          `Svar: ${xVal}`
        ]
      };
    } else {
      const xVal = randInt(rng, 3, 14);
      const k1 = randInt(rng, 5, 9);
      const k2 = randInt(rng, 2, 4);
      const m1 = randInt(rng, 4, 16);
      const m2 = (k1 - k2) * xVal + m1;
      return {
        id: `dyn-alg-${idSuffix}`,
        category: 'algebra',
        part,
        level,
        npSource: npTag,
        title: `Ekvation med x på båda sidor (NP Delprov ${part})`,
        facts: ['🏛️ Frisläppt NP-typ', `💡 Samla alla x på vänster sida (−${k2}x)`],
        mathDisplay: `${k1}x + ${m1} = ${k2}x + ${m2}`,
        question: 'Lös ekvationen (bestäm x).',
        unit: '',
        acceptedAnswers: [String(xVal), `x=${xVal}`, `x = ${xVal}`],
        solutionSteps: [
          `Steg 1: Ta −${k2}x och −${m1} på båda sidor ⇒ ${k1 - k2}x = ${m2 - m1}`,
          `Steg 2: Dela med ${k1 - k2} ⇒ x = ${m2 - m1} / ${k1 - k2} = ${xVal}`,
          `Svar: ${xVal}`
        ]
      };
    }
  }

  // 3. FUNKTIONER
  if (cat === 'funktioner') {
    const k = randInt(rng, 1, 3);
    const m = randInt(rng, 1, 4);
    if (level === 'E') {
      const xVal = randInt(rng, 3, 8);
      const yVal = k * xVal + m;
      return {
        id: `dyn-funk-${idSuffix}`,
        category: 'funktioner',
        part,
        level: 'E',
        npSource: npTag,
        title: `Beräkna y-värdet (NP Delprov ${part})`,
        facts: ['🏛️ Frisläppt NP-typ', `📈 Linje: y = ${k}x + ${m}`, `📍 x = ${xVal}`],
        mathDisplay: `y = ${k} · ${xVal} + ${m}`,
        question: `Vilket värde har y när x = ${xVal}?`,
        unit: '',
        acceptedAnswers: [String(yVal), `y=${yVal}`],
        solutionSteps: [
          `Steg 1: Sätt in x = ${xVal} ⇒ y = ${k} · ${xVal} + ${m}`,
          `Steg 2: y = ${k * xVal} + ${m} = ${yVal}`,
          `Svar: ${yVal}`
        ]
      };
    }
    return {
      id: `dyn-funk-${idSuffix}`,
      category: 'funktioner',
      part,
      level,
      npSource: npTag,
      title: `Räta linjens ekvation (NP Delprov ${part})`,
      facts: ['🏛️ Frisläppt NP-typ', `📍 Skär y-axeln vid m = ${m}`, `📈 Går genom (5, ${k * 5 + m})`],
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

  // 4. GEOMETRI
  if (cat === 'geometri') {
    if (part !== 'D' && level === 'E') {
      const v1 = randInt(rng, 35, 65);
      const v2 = randInt(rng, 45, 75);
      const ans = 180 - (v1 + v2);
      return {
        id: `dyn-geo-${idSuffix}`,
        category: 'geometri',
        part,
        level: 'E',
        npSource: npTag,
        title: `Vinkelsumma i triangel (NP Delprov ${part})`,
        facts: ['🏛️ Frisläppt NP-typ', '📐 Vinkelsumman i en triangel är 180°'],
        mathDisplay: `x = 180° − (${v1}° + ${v2}°)`,
        question: 'Hur stor är vinkeln x?',
        svg: SVG_FIGURES.anglesTriangle(v1, v2),
        unit: '°',
        acceptedAnswers: [String(ans), `${ans}°`],
        solutionSteps: [
          `Steg 1: Lägg ihop de kända vinklarna ⇒ ${v1}° + ${v2}° = ${v1 + v2}°`,
          `Steg 2: x = 180° − ${v1 + v2}° = ${ans}°`,
          `Svar: ${ans}`
        ]
      };
    }

    const triples = [
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
      [8, 15, 17],
      [9, 12, 15]
    ];
    const [a, b, c] = pickRandom(rng, triples);
    if (level === 'E') {
      return {
        id: `dyn-geo-${idSuffix}`,
        category: 'geometri',
        part,
        level: 'E',
        npSource: npTag,
        title: `Pythagoras sats (NP Delprov ${part})`,
        facts: ['🏛️ Frisläppt NP-typ', `📐 Kateter: ${a} cm och ${b} cm`],
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
    }
    return {
      id: `dyn-geo-${idSuffix}`,
      category: 'geometri',
      part,
      level,
      npSource: npTag,
      title: `Pythagoras sats – Katet (NP Delprov ${part})`,
      facts: ['🏛️ Frisläppt NP-typ', `📐 Hypotenusa: ${c} cm`, `📏 Katet: ${b} cm`],
      mathDisplay: `x² + ${b}² = ${c}²`,
      question: 'Beräkna kateten x.',
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

  // 5. STATISTIK
  if (cat === 'statistik') {
    if (level === 'E') {
      const m = randInt(rng, 10, 22);
      const nums = [m - 4, m + 5, m - 2, m + 3, m];
      return {
        id: `dyn-stat-${idSuffix}`,
        category: 'statistik',
        part,
        level: 'E',
        npSource: npTag,
        title: `Bestäm medianen (NP Delprov ${part})`,
        facts: ['🏛️ Frisläppt NP-typ', '📊 Sortera talen i storleksordning först!'],
        mathDisplay: nums.join('   '),
        question: 'Vilket är medianvärdet för de fem talen?',
        unit: '',
        acceptedAnswers: [String(m)],
        solutionSteps: [
          `Steg 1: Sortera talen ⇒ ${[...nums].sort((a, b) => a - b).join(', ')}`,
          `Steg 2: Talet i mitten är ${m}`,
          `Svar: ${m}`
        ]
      };
    }
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
      part,
      level,
      npSource: npTag,
      title: `Medelvärde baklänges (NP Delprov ${part})`,
      facts: ['🏛️ Frisläppt NP-typ', `📊 4 tal har medelvärdet ${mean}`, `📌 Tre av talen: ${n1}, ${n2}, ${n3}`],
      mathDisplay: `(${n1} + ${n2} + ${n3} + x) / 4 = ${mean}`,
      question: 'Vilket är det fjärde talet (x)?',
      unit: '',
      acceptedAnswers: [String(n4)],
      solutionSteps: [
        `Steg 1: Alla 4 tal tillsammans = 4 · ${mean} = ${total}`,
        `Steg 2: x = ${total} − (${n1} + ${n2} + ${n3}) = ${n4}`,
        `Svar: ${n4}`
      ]
    };
  }

  // 6. PROBLEMLÖSNING
  if (level === 'E') {
    const perKg = pickRandom(rng, [80, 90, 120]);
    const hg = pickRandom(rng, [3, 4, 6, 7]);
    const ans = (perKg * hg) / 10;
    return {
      id: `dyn-prob-${idSuffix}`,
      category: 'problemlosning',
      part,
      level: 'E',
      npSource: npTag,
      title: `Jämförpris & Vikt (NP Delprov ${part})`,
      facts: ['🏛️ Frisläppt NP-typ', `🍬 Pris: ${perKg} kr/kg`, `⚖️ Vikt: ${hg} hg (0,${hg} kg)`],
      mathDisplay: `0,${hg} · ${perKg} = ?`,
      question: `Vad kostar ${hg} hg (${hg * 100} gram)?`,
      unit: 'kr',
      acceptedAnswers: [String(ans), `${ans} kr`],
      solutionSteps: [
        `Steg 1: 1 hg kostar ${perKg} / 10 = ${perKg / 10} kr`,
        `Steg 2: ${hg} hg kostar ${hg} · ${perKg / 10} = ${ans} kr`,
        `Svar: ${ans}`
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
    part,
    level,
    npSource: npTag,
    title: `Rektangelns area & omkrets (NP Delprov ${part})`,
    facts: ['🏛️ Frisläppt NP-typ', `📏 Omkrets = ${perim} cm`, `📐 Basen (${mult}x) är ${mult} ggr höjden (x)`],
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

if (typeof window !== 'undefined') {
  window.CATEGORIES = CATEGORIES;
  window.STATIC_QUESTIONS = STATIC_QUESTIONS;
  window.generateDynamicQuestion = generateDynamicQuestion;
  window.createSeededRandom = createSeededRandom;
  window.checkUserAnswer = checkUserAnswer;
}
if (typeof global !== 'undefined') {
  global.CATEGORIES = CATEGORIES;
  global.STATIC_QUESTIONS = STATIC_QUESTIONS;
  global.generateDynamicQuestion = generateDynamicQuestion;
  global.createSeededRandom = createSeededRandom;
  global.checkUserAnswer = checkUserAnswer;
}
