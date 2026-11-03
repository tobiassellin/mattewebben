// ============================================================================
// NP-MÄSTAREN ÅK 9 - HUVUDAPPLIKATION (HELSKÄRMSPENNA, VITT PAPPER & RÄTTVISA POÄNG)
// ============================================================================

const RANKS = [
  { minLevel: 1, title: 'Nybörjare 🌱' },
  { minLevel: 3, title: 'Bråkbrytare 🔢' },
  { minLevel: 5, title: 'Ekvationsjägare ✖️' },
  { minLevel: 8, title: 'Pythagoras Lärling 📐' },
  { minLevel: 12, title: 'Grafmästare 📈' },
  { minLevel: 16, title: 'Delprov D-Proffs 🚀' },
  { minLevel: 20, title: 'NP-Legend (A) 👑' }
];

const BOSSES = [
  {
    id: 'boss-procent',
    name: 'Kapten Procent',
    avatar: '🏴‍☠️',
    category: 'tal',
    maxHp: 300,
    rewardStars: 40,
    rewardXp: 300,
    desc: 'Rabatter, tiopotenser och bråk!',
    taunt: 'Klarar du mina rabatter utan räknare?'
  },
  {
    id: 'boss-algebra',
    name: 'Algebrans Fantom',
    avatar: '🎭',
    category: 'algebra',
    maxHp: 450,
    rewardStars: 60,
    rewardXp: 450,
    desc: 'Ekvationer, parenteser och mönster.',
    taunt: 'Hittar du x innan tiden är ute?'
  },
  {
    id: 'boss-pythagoras',
    name: 'Baron Pythagoras',
    avatar: '📐',
    category: 'geometri',
    maxHp: 600,
    rewardStars: 80,
    rewardXp: 600,
    desc: 'Trianglar, cylindrar och vinklar.',
    taunt: 'a² + b² = c²... visa din uträkning!'
  },
  {
    id: 'boss-np',
    name: 'Slutbossen: NP Åk 9',
    avatar: '🐉',
    category: 'all',
    maxHp: 900,
    rewardStars: 150,
    rewardXp: 1000,
    desc: 'Blandar Delprov B, C och D!',
    taunt: 'Sista testet – besegra mig!'
  }
];

const SHOP_ITEMS = [
  // Magiska pennor för det vita pappret
  { id: 'penfx-rainbow', type: 'penfx', value: 'rainbow', name: 'Regnbågspenna', desc: 'Skriver i regnbågens färger på pappret!', icon: '🌈', cost: 30 },
  { id: 'penfx-neon', type: 'penfx', value: 'neon', name: 'Neon-Laserpenna', desc: 'Glödande neoneffekt när du räknar!', icon: '✨', cost: 45 },
  { id: 'penfx-fire', type: 'penfx', value: 'fire', name: 'Eldpenna', desc: 'Skriver i eldiga guld- och rödtoner!', icon: '🔥', cost: 60 },

  // Matte-Husdjur (följer med i Räkna-vyn & ger bonus)
  { id: 'pet-owl', type: 'pet', value: '🦉', name: 'Ugglan Arkimedes', desc: 'Ger +20 XP extra på varje rätt svar!', icon: '🦉', cost: 40 },
  { id: 'pet-fox', type: 'pet', value: '🦊', name: 'Räven Kalkyl', desc: 'Ger +3 ⭐ extra stjärnor vid rätt svar!', icon: '🦊', cost: 55 },
  { id: 'pet-dragon', type: 'pet', value: '🐲', name: 'Minidraken Pyro', desc: 'Ger +35 XP & +25 Boss-skada vid rätt svar!', icon: '🐲', cost: 80 },

  // Power-ups mot Rivalen & för snabbare poäng
  { id: 'boost-xp', type: 'consumable', value: 'xp_boost', name: '2x XP-Boost (3 uppg)', desc: 'Dubbla XP på dina nästa 3 rätta svar!', icon: '🧪', cost: 30 },
  { id: 'freeze-rival', type: 'consumable', value: 'freeze_rival', name: 'Frys Rivalen (3 uppg)', desc: 'Rivalen står helt stilla i 3 uppgifter!', icon: '❄️', cost: 25 },
  { id: 'push-rival', type: 'consumable', value: 'push_rival', name: 'Knuffa bak Rivalen', desc: 'Trycker direkt bak Rivalen -150 XP på linjen!', icon: '💥', cost: 20 },
  { id: 'shield-1', type: 'consumable', value: 'shield', name: 'Streak-Sköld (1 fel)', desc: 'Skyddar din streak om du råkar svara fel.', icon: '🛡️', cost: 35 },

  // Teman & Avatarer
  { id: 'theme-midnight', type: 'theme', value: 'midnight', name: 'Midnattsblå', desc: 'Klassiskt mörkt tema.', icon: '🌌', cost: 0 },
  { id: 'theme-light', type: 'theme', value: 'light', name: 'Ljust Papper', desc: 'Ljust och luftigt tema.', icon: '☀️', cost: 20 },
  { id: 'theme-cyber', type: 'theme', value: 'cyber', name: 'Cyberpunk Neon', desc: 'Framtidstema med turkos & rosa.', icon: '⚡', cost: 50 },
  { id: 'theme-forest', type: 'theme', value: 'forest', name: 'Skogsro Grön', desc: 'Lugnt skogsgrönt tema.', icon: '🌲', cost: 50 },
  { id: 'theme-gold', type: 'theme', value: 'gold', name: 'Guld-Mästare', desc: 'Exklusivt guldtema!', icon: '👑', cost: 100 },
  { id: 'avatar-fox', type: 'avatar', value: '🦊', name: 'Klipska Räven', desc: 'Profil-avatar på topplistan & linjen.', icon: '🦊', cost: 30 },
  { id: 'avatar-robot', type: 'avatar', value: '🤖', name: 'Kalkyl-Robot', desc: 'Profil-avatar på topplistan & linjen.', icon: '🤖', cost: 40 },
  { id: 'avatar-wizard', type: 'avatar', value: '🧙‍♂️', name: 'Trollkarlen', desc: 'Profil-avatar på topplistan & linjen.', icon: '🧙‍♂️', cost: 60 },
  { id: 'avatar-dragon', type: 'avatar', value: '🐲', name: 'Matte-Draken', desc: 'Profil-avatar på topplistan & linjen.', icon: '🐲', cost: 90 }
];

// Utvecklingslinjens milstolpar (NP-Resan)
const JOURNEY_MILESTONES = [
  { id: 'ms-0', xp: 0, name: 'Startlägret', icon: '🏕️', rewardStars: 0 },
  { id: 'ms-1', xp: 300, name: 'Bråkbron', icon: '🌉', rewardStars: 30 },
  { id: 'ms-2', xp: 700, name: 'Procentborgen', icon: '🏰', rewardStars: 45 },
  { id: 'ms-3', xp: 1200, name: 'Algebraskogen', icon: '🌲', rewardStars: 60 },
  { id: 'ms-4', xp: 1800, name: 'Pythagoras Topp', icon: '⛰️', rewardStars: 80 },
  { id: 'ms-5', xp: 2500, name: 'Grafportalen', icon: '🌀', rewardStars: 100 },
  { id: 'ms-6', xp: 3500, name: 'NP-Pokalen', icon: '🏆', rewardStars: 150 }
];

// Rivaler att tävla mot längs utvecklingslinjen
const RIVALS = [
  { name: 'Turbo-Bot 1.0', avatar: '🤖', startXp: 240, speed: 30, rewardStars: 40, rewardXp: 120, taunt: 'Jag leder! Kan du räkna ikapp mig?' },
  { name: 'Räknar-Räven', avatar: '🦊', startXp: 680, speed: 35, rewardStars: 60, rewardXp: 180, taunt: 'Snabba bråk och procent – hänger du med?' },
  { name: 'Cyber-Kalkyl', avatar: '⚡', startXp: 1250, speed: 40, rewardStars: 80, rewardXp: 250, taunt: 'Ingen slår mina ekvationer!' },
  { name: 'Algebramästaren', avatar: '🧙‍♂️', startXp: 1900, speed: 45, rewardStars: 110, rewardXp: 350, taunt: 'Pythagoras och grafer är min hemmaplan!' },
  { name: 'Guld-Draken (Slutrival)', avatar: '🐉', startXp: 2800, speed: 50, rewardStars: 180, rewardXp: 500, taunt: 'Slutspurten mot NP-Pokalen!' }
];

const ACHIEVEMENTS = [
  { id: 'first-solve', title: 'Första rätt!', desc: 'Lös 1 uppgift.', icon: '🎯' },
  { id: 'show-work-5', title: 'Visad uträkning!', desc: 'Visa uträkning 5 ggr.', icon: '✍️' },
  { id: 'streak-5', title: '5 i rad!', desc: '5 rätt i rad.', icon: '🔥' },
  { id: 'streak-10', title: '10 i rad!', desc: '10 rätt i rad.', icon: '☄️' },
  { id: 'level-a-3', title: 'A-Klurare', desc: 'Lös 3 st A-uppgifter.', icon: '💎' },
  { id: 'sprint-hero', title: 'Snabbtänkt', desc: '5 rätt i 60s Sprint.', icon: '⏱️' },
  { id: 'boss-slayer', title: 'Boss-Vinnare', desc: 'Besegra 1 Boss.', icon: '⚔️' },
  { id: 'np-sim-done', title: 'NP-Redo!', desc: 'Klara NP-Simulatorn.', icon: '🎓' }
];

class MatteApp {
  constructor() {
    this.workspace = new CalculationWorkspace();
    this.state = this.loadState();

    this.currentMode = 'practice';
    this.selectedCategory = 'all';
    this.selectedPart = 'all';
    this.selectedLevel = 'all';

    this.currentQuestion = null;
    this.questionAnswered = false;
    this.stepsRevealedCount = 0;
    this.usedMultipleChoice = false;
    this.seenQuestionIds = new Set();

    // Boss
    this.activeBoss = null;
    this.bossCurrentHp = 0;

    // Sprint
    this.sprintTimer = null;
    this.sprintSecondsLeft = 60;
    this.sprintScore = 0;
    this.sprintCorrectCount = 0;

    // Kompisduell
    this.duelSubMode = 'code';
    this.duelCode = '';
    this.duelRng = null;
    this.duelQuestions = [];
    this.duelIndex = 0;
    this.duelStartTime = 0;
    this.duelScoreP1 = 0;
    this.duelScoreP2 = 0;
    this.duelCurrentPlayer = 1;

    // NP-Simulator
    this.examQuestions = [];
    this.examIndex = 0;
    this.examResults = [];
  }

  loadState() {
    const defaultState = {
      playerName: 'Åk 9-Elev',
      avatar: '🎓',
      theme: 'midnight',
      xp: 0,
      stars: 25,
      streak: 0,
      bestStreak: 0,
      streakShields: 1,
      pointsE: 0,
      pointsC: 0,
      pointsA: 0,
      totalSolved: 0,
      workBonusCount: 0,
      bestSprintScore: 0,
      defeatedBosses: [],
      unlockedItems: ['theme-midnight'],
      achievements: [],
      rivalIndex: 0,
      rivalXp: 240,
      rivalFrozenTurns: 0,
      xpBoostTurns: 0,
      claimedMilestones: ['ms-0'],
      activePet: '',
      activePenFx: 'normal',
      categoryStats: {
        tal: { solved: 0, attempted: 0 },
        algebra: { solved: 0, attempted: 0 },
        funktioner: { solved: 0, attempted: 0 },
        geometri: { solved: 0, attempted: 0 },
        statistik: { solved: 0, attempted: 0 },
        problemlosning: { solved: 0, attempted: 0 }
      },
      dailyQuests: {
        date: new Date().toISOString().slice(0, 10),
        solvedToday: 0,
        workShownToday: 0,
        noCalcSolvedToday: 0,
        claimed: [false, false, false]
      },
      leaderboard: [
        { name: 'Maja_9B', xp: 2450, badge: '🧙‍♂️', streak: 11 },
        { name: 'Liam_Kalkyl', xp: 1850, badge: '🐲', streak: 8 },
        { name: 'EkvationsSara', xp: 1320, badge: '🦊', streak: 7 },
        { name: 'Noel_9A', xp: 890, badge: '🤖', streak: 5 }
      ]
    };

    try {
      const saved = localStorage.getItem('np_mastaren_ak9_v1');
      if (!saved) return defaultState;
      const parsed = { ...defaultState, ...JSON.parse(saved) };
      const today = new Date().toISOString().slice(0, 10);
      if (!parsed.dailyQuests || parsed.dailyQuests.date !== today) {
        parsed.dailyQuests = {
          date: today,
          solvedToday: 0,
          workShownToday: 0,
          noCalcSolvedToday: 0,
          claimed: [false, false, false]
        };
      }
      return parsed;
    } catch {
      return defaultState;
    }
  }

  saveState() {
    try {
      localStorage.setItem('np_mastaren_ak9_v1', JSON.stringify(this.state));
    } catch {
      // Ignorera lagringsfel
    }
  }

  init() {
    this.applyTheme(this.state.theme);
    this.workspace.init();
    this.workspace.setPenFx(this.state.activePenFx || 'normal');
    this.bindNavigation();
    this.bindPracticeControls();
    this.bindPenFxToolbar();
    this.bindGameModes();
    this.bindModals();
    this.updateHeaderUI();
    this.renderDashboard();
  }

  // --------------------------------------------------------------------------
  // NAVIGATION & VYER
  // --------------------------------------------------------------------------
  bindNavigation() {
    document.querySelectorAll('[data-nav-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.navView;
        this.switchView(view);
      });
    });

    const quickShopPill = document.getElementById('btn-quick-shop-pill');
    if (quickShopPill) {
      quickShopPill.addEventListener('click', () => this.switchView('rewards'));
    }
  }

  switchView(viewName) {
    if (viewName !== 'arena') {
      this.workspace.togglePenFullscreen(false);
    }
    if (this.sprintTimer && viewName !== 'arena') {
      clearInterval(this.sprintTimer);
      this.sprintTimer = null;
    }

    document.querySelectorAll('[data-nav-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.navView === viewName);
    });

    document.querySelectorAll('.app-view').forEach(sec => {
      sec.classList.toggle('active', sec.id === `view-${viewName}`);
    });

    if (viewName === 'dashboard') {
      this.renderDashboard();
    } else if (viewName === 'arena') {
      this.renderJourneyTrack();
      this.renderArenaPowerupsAndPet();
      if (!this.currentQuestion) {
        this.currentMode = 'practice';
        this.updateArenaModeBanner();
        this.loadNextQuestion();
      }
      requestAnimationFrame(() => {
        this.workspace.resizeCanvas();
      });
    } else if (viewName === 'modes') {
      this.renderBossCards();
    } else if (viewName === 'rewards') {
      this.renderRewardsAndShop();
    }
  }

  // --------------------------------------------------------------------------
  // UTVECKLINGSLINJE ATT KÄMPA EMOT (NP-RESAN MOT RIVALEN) & POWER-UPS
  // --------------------------------------------------------------------------
  getCurrentRival() {
    const idx = Math.min(RIVALS.length - 1, Math.max(0, this.state.rivalIndex || 0));
    return RIVALS[idx];
  }

  renderJourneyTrack() {
    const maxTrackXp = JOURNEY_MILESTONES[JOURNEY_MILESTONES.length - 1].xp;
    const playerPct = Math.min(100, Math.max(2, Math.round((this.state.xp / maxTrackXp) * 100)));
    const rival = this.getCurrentRival();
    const rivalXp = this.state.rivalXp ?? rival.startXp;
    const rivalPct = Math.min(100, Math.max(4, Math.round((rivalXp / maxTrackXp) * 100)));

    const diff = this.state.xp - rivalXp;
    const statusText =
      diff >= 0
        ? `🔥 Du ligger +${diff} XP före ${rival.name}!`
        : `⚡ ${Math.abs(diff)} XP kvar för att springa om ${rival.avatar} ${rival.name}!`;

    const frozenBadge =
      this.state.rivalFrozenTurns > 0
        ? `<span class="rival-frozen-pill">❄️ Fryst (${this.state.rivalFrozenTurns} uppg)</span>`
        : '';

    const nodesHtml = JOURNEY_MILESTONES.map(ms => {
      const pct = Math.round((ms.xp / maxTrackXp) * 100);
      const reached = this.state.xp >= ms.xp;
      const claimed = (this.state.claimedMilestones || []).includes(ms.id);
      const canClaim = reached && !claimed && ms.rewardStars > 0;

      return `
        <div class="journey-node ${reached ? 'reached' : ''}" style="left: ${pct}%">
          <div class="journey-node-dot" title="${ms.name} (${ms.xp} XP)">${ms.icon}</div>
          <span class="journey-node-label">${ms.name}</span>
          <span class="journey-node-xp">${ms.xp} XP</span>
          ${
            canClaim
              ? `<button type="button" class="journey-chest-btn" data-claim-ms="${ms.id}">🎁 +${ms.rewardStars}⭐</button>`
              : ''
          }
        </div>
      `;
    }).join('');

    const buildTrackHtml = (isCompact) => `
      <div class="journey-header-row">
        <div class="journey-title-col">
          <span class="journey-badge">🗺️ Utvecklingslinje • Kampen mot ${rival.avatar} ${rival.name}</span>
          <strong class="journey-status-msg">${statusText}</strong>
          ${frozenBadge}
        </div>
        <div class="journey-actions-col">
          <button type="button" class="btn-secondary btn-sm" data-quick-power="push_rival" title="Kostar 20 ⭐">
            💥 Knuffa bak Rival (-150 XP) • 20⭐
          </button>
          <button type="button" class="btn-secondary btn-sm" data-quick-power="freeze_rival" title="Kostar 25 ⭐">
            ❄️ Frys Rival • 25⭐
          </button>
          ${
            isCompact
              ? `<button type="button" class="btn-accent btn-sm" data-open-shop-now="1">🛒 Poäng-Shop (${this.state.stars}⭐)</button>`
              : `<button type="button" class="btn-primary btn-sm" data-race-rival="1">⚔️ Kör ikapp nu →</button>`
          }
        </div>
      </div>

      <div class="journey-road-wrap">
        <div class="journey-road-bar">
          <div class="journey-road-fill" style="width: ${playerPct}%"></div>
        </div>
        ${nodesHtml}

        <!-- Rivalens markör -->
        <div class="journey-racer rival-racer" style="left: ${rivalPct}%" title="${rival.name}: ${rivalXp} XP">
          <span class="racer-bubble">${rival.avatar}</span>
          <span class="racer-tag">Rival (${rivalXp})</span>
        </div>

        <!-- Spelarens markör -->
        <div class="journey-racer player-racer" style="left: ${playerPct}%" title="Du: ${this.state.xp} XP">
          <span class="racer-bubble">${this.state.avatar}</span>
          <span class="racer-tag">Du (${this.state.xp})</span>
        </div>
      </div>
    `;

    ['journey-track-dashboard', 'journey-track-arena'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = buildTrackHtml(id === 'journey-track-arena');

      el.querySelectorAll('[data-claim-ms]').forEach(btn => {
        btn.addEventListener('click', () => this.claimMilestoneChest(btn.dataset.claimMs));
      });
      el.querySelectorAll('[data-quick-power]').forEach(btn => {
        btn.addEventListener('click', () => this.activateQuickPowerup(btn.dataset.quickPower));
      });
      el.querySelectorAll('[data-open-shop-now]').forEach(btn => {
        btn.addEventListener('click', () => this.switchView('rewards'));
      });
      el.querySelectorAll('[data-race-rival]').forEach(btn => {
        btn.addEventListener('click', () => this.switchView('arena'));
      });
    });
  }

  claimMilestoneChest(msId) {
    const ms = JOURNEY_MILESTONES.find(m => m.id === msId);
    if (!ms) return;
    if (!Array.isArray(this.state.claimedMilestones)) this.state.claimedMilestones = ['ms-0'];
    if (this.state.claimedMilestones.includes(msId)) return;

    this.state.claimedMilestones.push(msId);
    this.state.stars += ms.rewardStars;
    this.saveState();
    this.updateHeaderUI();
    this.renderJourneyTrack();
    this.launchConfetti();
    this.showSummaryModal(
      `🎁 Kista vid ${ms.icon} ${ms.name} öppnad!`,
      `Du har nått <strong>${ms.xp} XP</strong> längs utvecklingslinjen och fick <strong>+${ms.rewardStars} ⭐ Stjärnor</strong> att handla för i shopen!`
    );
  }

  activateQuickPowerup(powerType) {
    if (powerType === 'push_rival') {
      if (this.state.stars < 20) {
        this.showSummaryModal('⭐ Behöver 20 Stjärnor!', 'Lös ett par uppgifter (eller växla XP i Shopen) för att få fler stjärnor!');
        return;
      }
      this.state.stars -= 20;
      this.state.rivalXp = Math.max(0, (this.state.rivalXp || 240) - 150);
      this.checkRivalOvertake();
    } else if (powerType === 'freeze_rival') {
      if (this.state.stars < 25) {
        this.showSummaryModal('⭐ Behöver 25 Stjärnor!', 'Lös ett par uppgifter (eller växla XP i Shopen) för att få fler stjärnor!');
        return;
      }
      this.state.stars -= 25;
      this.state.rivalFrozenTurns = (this.state.rivalFrozenTurns || 0) + 3;
    } else if (powerType === 'xp_boost') {
      if (this.state.stars < 30) {
        this.showSummaryModal('⭐ Behöver 30 Stjärnor!', 'Lös ett par uppgifter (eller växla XP i Shopen) för att få fler stjärnor!');
        return;
      }
      this.state.stars -= 30;
      this.state.xpBoostTurns = (this.state.xpBoostTurns || 0) + 3;
    }

    this.saveState();
    this.updateHeaderUI();
    this.renderJourneyTrack();
    this.renderArenaPowerupsAndPet();
  }

  checkRivalOvertake() {
    const rival = this.getCurrentRival();
    if (this.state.xp >= this.state.rivalXp) {
      const wonRival = rival;
      this.state.stars += wonRival.rewardStars;
      this.state.xp += wonRival.rewardXp;

      if ((this.state.rivalIndex || 0) < RIVALS.length - 1) {
        this.state.rivalIndex = (this.state.rivalIndex || 0) + 1;
        const nextRival = this.getCurrentRival();
        this.state.rivalXp = Math.max(this.state.xp + 280, nextRival.startXp);
      } else {
        this.state.rivalXp = this.state.xp + 350;
      }

      this.launchConfetti();
      this.showSummaryModal(
        `🏆 Du sprang om ${wonRival.avatar} ${wonRival.name}!`,
        `Snyggt jobbat på utvecklingslinjen!<br/><br/>
        Belöning: <strong>+${wonRival.rewardStars} ⭐ Stjärnor</strong> och <strong>+${wonRival.rewardXp} Bonus-XP</strong>!<br/>
        Nästa utmanare på linjen: <strong>${this.getCurrentRival().avatar} ${this.getCurrentRival().name}</strong>!`
      );
      return true;
    }
    return false;
  }

  bindPenFxToolbar() {
    document.querySelectorAll('[data-pen-fx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fx = btn.dataset.penFx;
        if (fx === 'normal') {
          this.state.activePenFx = 'normal';
          this.workspace.setPenFx('normal');
          this.saveState();
          this.renderArenaPowerupsAndPet();
          return;
        }

        const itemId = `penfx-${fx}`;
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        const owned = this.state.unlockedItems.includes(itemId);

        if (owned) {
          this.state.activePenFx = fx;
          this.workspace.setPenFx(fx);
          this.saveState();
          this.renderArenaPowerupsAndPet();
        } else if (item && this.state.stars >= item.cost) {
          if (confirm(`Vill du låsa upp ${item.icon} ${item.name} för ${item.cost} ⭐?`)) {
            this.state.stars -= item.cost;
            this.state.unlockedItems.push(itemId);
            this.state.activePenFx = fx;
            this.workspace.setPenFx(fx);
            this.saveState();
            this.updateHeaderUI();
            this.renderArenaPowerupsAndPet();
            this.launchConfetti();
          }
        } else if (item) {
          this.showSummaryModal(
            `${item.icon} ${item.name} (${item.cost} ⭐)`,
            `Du har <strong>${this.state.stars} ⭐</strong> just nu. Lös uppgifter (eller växla XP mot stjärnor i Shopen) för att låsa upp ${item.name}!`
          );
        }
      });
    });
  }

  renderArenaPowerupsAndPet() {
    // Uppdatera penneffekt-knappar i ritytan
    document.querySelectorAll('[data-pen-fx]').forEach(btn => {
      const fx = btn.dataset.penFx;
      const owned = fx === 'normal' || this.state.unlockedItems.includes(`penfx-${fx}`);
      const item = SHOP_ITEMS.find(i => i.id === `penfx-${fx}`);
      btn.classList.toggle('active', (this.state.activePenFx || 'normal') === fx);
      if (fx !== 'normal' && item) {
        btn.textContent = owned ? `${item.icon} ${item.name.replace('penna', '')}` : `🔒 ${item.icon} (${item.cost}⭐)`;
      }
    });

    // Uppdatera husdjurs-badge på frågekortet
    const petBadge = document.getElementById('pet-companion-badge');
    if (petBadge) {
      if (this.state.activePet) {
        const petItem = SHOP_ITEMS.find(i => i.type === 'pet' && i.value === this.state.activePet);
        petBadge.textContent = `${this.state.activePet} ${petItem ? petItem.name : 'Kompis'} aktiv!`;
        petBadge.classList.remove('hidden');
      } else {
        petBadge.classList.add('hidden');
      }
    }

    // Uppdatera snabb-powerups-raden i Räkna-vyn
    const strip = document.getElementById('arena-powerups-strip');
    if (!strip) return;

    const xpBoostActive = (this.state.xpBoostTurns || 0) > 0;
    strip.innerHTML = `
      <div class="powerup-strip-left">
        <span class="powerup-strip-label">⚡ Power-ups:</span>
        <button type="button" class="power-pill-btn ${xpBoostActive ? 'active-boost' : ''}" data-use-strip-power="xp_boost">
          🧪 2x XP ${xpBoostActive ? `(${this.state.xpBoostTurns} kvar!)` : '(30⭐)'}
        </button>
        <button type="button" class="power-pill-btn" data-use-strip-power="ExchangeXp">
          💱 Växla 100 XP → +25 ⭐
        </button>
      </div>
      <div class="powerup-strip-right">
        <span>Dina stjärnor: <strong>⭐ ${this.state.stars}</strong></span>
      </div>
    `;

    strip.querySelectorAll('[data-use-strip-power]').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.dataset.useStripPower;
        if (act === 'ExchangeXp') {
          this.exchangeXpForStars();
        } else {
          this.activateQuickPowerup(act);
        }
      });
    });
  }

  exchangeXpForStars() {
    if (this.state.xp < 100) {
      this.showSummaryModal('💱 Behöver minst 100 XP', 'Lös 1 uppgift först så har du minst 100 XP att växla till +25 ⭐ Stjärnor!');
      return;
    }
    this.state.xp -= 100;
    this.state.stars += 25;
    this.saveState();
    this.updateHeaderUI();
    this.renderJourneyTrack();
    this.renderArenaPowerupsAndPet();
    this.renderRewardsAndShop();
    this.launchConfetti();
  }

  // --------------------------------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------------------------------
  renderDashboard() {
    this.updateHeaderUI();
    this.renderJourneyTrack();

    const grid = document.getElementById('category-cards-grid');
    if (grid) {
      grid.innerHTML = '';
      CATEGORIES.forEach(cat => {
        const st = this.state.categoryStats[cat.id] || { solved: 0, attempted: 0 };
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.setProperty('--cat-color', cat.color);
        card.innerHTML = `
          <div class="cat-card-top">
            <span class="cat-icon">${cat.icon}</span>
            <span class="cat-stat-pill">✅ ${st.solved} klara</span>
          </div>
          <h3>${cat.name}</h3>
          <p>${cat.desc}</p>
          <div class="cat-progress-bar">
            <div class="cat-progress-fill" style="width: ${Math.min(100, st.solved * 10)}%"></div>
          </div>
          <button type="button" class="btn-primary full-w" data-start-cat="${cat.id}">
            Träna ${cat.name} →
          </button>
        `;
        grid.appendChild(card);
      });

      grid.querySelectorAll('[data-start-cat]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.startPracticeMode(btn.dataset.startCat);
        });
      });
    }

    this.renderDailyQuests();
    this.renderLeaderboard();
  }

  renderDailyQuests() {
    const container = document.getElementById('daily-quests-list');
    if (!container) return;
    const dq = this.state.dailyQuests;

    const quests = [
      { idx: 0, title: '🎯 Lös 5 uppgifter', current: dq.solvedToday, target: 5, rewardStars: 20, rewardXp: 150 },
      { idx: 1, title: '✍️ Visa uträkning 3 ggr', current: dq.workShownToday, target: 3, rewardStars: 25, rewardXp: 150 },
      { idx: 2, title: '🚫 3 rätt utan räknare (Del B/C)', current: dq.noCalcSolvedToday, target: 3, rewardStars: 25, rewardXp: 150 }
    ];

    container.innerHTML = '';
    quests.forEach(q => {
      const done = q.current >= q.target;
      const claimed = dq.claimed[q.idx];
      const pct = Math.min(100, Math.round((q.current / q.target) * 100));

      const item = document.createElement('div');
      item.className = `quest-item ${done ? 'quest-done' : ''}`;
      item.innerHTML = `
        <div class="quest-info">
          <div class="quest-title-row">
            <strong>${q.title}</strong>
            <span class="quest-reward">+${q.rewardStars} ⭐</span>
          </div>
          <div class="quest-bar-wrap">
            <div class="quest-bar-fill" style="width:${pct}%"></div>
          </div>
          <small>${Math.min(q.current, q.target)} / ${q.target}</small>
        </div>
        <div class="quest-action">
          ${
            claimed
              ? '<span class="quest-claimed-badge">✅ Klar</span>'
              : done
              ? `<button type="button" class="btn-accent btn-sm" data-claim-quest="${q.idx}">Hämta!</button>`
              : '<span class="quest-pending">Pågår</span>'
          }
        </div>
      `;
      container.appendChild(item);
    });

    container.querySelectorAll('[data-claim-quest]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.claimQuest);
        const q = quests[idx];
        if (q && !this.state.dailyQuests.claimed[idx] && q.current >= q.target) {
          this.state.dailyQuests.claimed[idx] = true;
          this.state.stars += q.rewardStars;
          this.addXp(q.rewardXp);
          this.saveState();
          this.renderDailyQuests();
          this.updateHeaderUI();
          this.launchConfetti();
        }
      });
    });
  }

  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    const allPlayers = [
      ...this.state.leaderboard,
      {
        name: `${this.state.playerName} (Du)`,
        xp: this.state.xp,
        badge: this.state.avatar,
        streak: this.state.bestStreak,
        isUser: true
      }
    ].sort((a, b) => b.xp - a.xp);

    tbody.innerHTML = '';
    allPlayers.forEach((p, i) => {
      const tr = document.createElement('tr');
      if (p.isUser) tr.className = 'leaderboard-user-row';
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
      tr.innerHTML = `
        <td><strong>${medal}</strong></td>
        <td><span class="lb-avatar">${p.badge}</span> ${this.escapeHtml(p.name)}</td>
        <td><strong>${p.xp} XP</strong></td>
        <td>🔥 ${p.streak}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --------------------------------------------------------------------------
  // TRÄNINGSLÄGE & ARENA-KONTROLLER
  // --------------------------------------------------------------------------
  bindPracticeControls() {
    const catSelect = document.getElementById('filter-category');
    const partSelect = document.getElementById('filter-part');
    const levelSelect = document.getElementById('filter-level');

    if (catSelect) {
      catSelect.addEventListener('change', () => {
        this.selectedCategory = catSelect.value;
        if (this.currentMode === 'practice') this.loadNextQuestion();
      });
    }
    if (partSelect) {
      partSelect.addEventListener('change', () => {
        this.selectedPart = partSelect.value;
        if (this.currentMode === 'practice') this.loadNextQuestion();
      });
    }
    if (levelSelect) {
      levelSelect.addEventListener('change', () => {
        this.selectedLevel = levelSelect.value;
        if (this.currentMode === 'practice') this.loadNextQuestion();
      });
    }

    const submitBtn = document.getElementById('btn-submit-answer');
    const ansInput = document.getElementById('answer-input');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.handleAnswerSubmit());
    }
    if (ansInput) {
      ansInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.questionAnswered) {
            this.handleNextStepAfterAnswer();
          } else {
            this.handleAnswerSubmit();
          }
        }
      });
    }

    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.handleNextStepAfterAnswer());
    }

    const nextStepBtn = document.getElementById('btn-show-hint');
    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', () => this.showNextStepHelper());
    }

    const mcBtn = document.getElementById('btn-show-choices');
    if (mcBtn) {
      mcBtn.addEventListener('click', () => this.showMultipleChoiceLifeline());
    }

    const revealBtn = document.getElementById('btn-reveal-answer');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => this.revealFullAnswerZeroPoints());
    }

    const speakBtn = document.getElementById('btn-speak-question');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => this.speakCurrentQuestion());
    }
  }

  startPracticeMode(category = 'all') {
    this.currentMode = 'practice';
    this.selectedCategory = category;
    const catSelect = document.getElementById('filter-category');
    if (catSelect) catSelect.value = category;

    this.loadNextQuestion();
    this.updateArenaModeBanner();
    this.switchView('arena');
  }

  updateArenaModeBanner() {
    const practiceBar = document.getElementById('arena-practice-filters');
    const specialBar = document.getElementById('arena-special-status');
    if (!practiceBar || !specialBar) return;

    if (this.currentMode === 'practice') {
      practiceBar.classList.remove('hidden');
      specialBar.classList.add('hidden');
    } else {
      practiceBar.classList.add('hidden');
      specialBar.classList.remove('hidden');
      this.renderSpecialModeHeader();
    }
  }

  renderSpecialModeHeader() {
    const specialBar = document.getElementById('arena-special-status');
    if (!specialBar) return;

    if (this.currentMode === 'boss' && this.activeBoss) {
      const hpPct = Math.max(0, Math.round((this.bossCurrentHp / this.activeBoss.maxHp) * 100));
      specialBar.innerHTML = `
        <div class="boss-arena-banner">
          <div class="boss-id">
            <span class="boss-big-avatar">${this.activeBoss.avatar}</span>
            <div>
              <strong>⚔️ ${this.activeBoss.name}</strong>
              <p class="boss-taunt">"${this.activeBoss.taunt}"</p>
            </div>
          </div>
          <div class="boss-hp-container">
            <div class="boss-hp-label">
              <span>Boss HP</span>
              <strong>${this.bossCurrentHp} / ${this.activeBoss.maxHp}</strong>
            </div>
            <div class="boss-hp-bar">
              <div class="boss-hp-fill" style="width: ${hpPct}%"></div>
            </div>
          </div>
          <button type="button" class="btn-secondary btn-sm" id="btn-exit-special">Avsluta</button>
        </div>
      `;
    } else if (this.currentMode === 'sprint') {
      specialBar.innerHTML = `
        <div class="sprint-arena-banner">
          <strong>⏱️ 60s Delprov B-Sprint (+2s per rätt!)</strong>
          <div class="sprint-metrics">
            <span class="sprint-timer-pill" id="sprint-timer-display">⏳ ${this.sprintSecondsLeft} s</span>
            <span class="sprint-score-pill">🏆 ${this.sprintScore} p (${this.sprintCorrectCount} rätt)</span>
          </div>
          <button type="button" class="btn-secondary btn-sm" id="btn-exit-special">Avbryt</button>
        </div>
      `;
    } else if (this.currentMode === 'duel') {
      if (this.duelSubMode === 'code') {
        specialBar.innerHTML = `
          <div class="duel-arena-banner">
            <strong>🤝 Kompisduell: <span class="code-highlight">${this.duelCode}</span> (${this.duelIndex + 1}/${this.duelQuestions.length})</strong>
            <span class="sprint-score-pill">Poäng: ${this.duelScoreP1} p</span>
            <button type="button" class="btn-secondary btn-sm" id="btn-exit-special">Avsluta</button>
          </div>
        `;
      } else {
        specialBar.innerHTML = `
          <div class="duel-arena-banner">
            <strong>🎮 Tur: <span class="code-highlight">Spelare ${this.duelCurrentPlayer}</span> (${this.duelIndex + 1}/${this.duelQuestions.length})</strong>
            <div class="duel-score-pills">
              <span class="player-pill ${this.duelCurrentPlayer === 1 ? 'active-turn' : ''}">Spelare 1: ${this.duelScoreP1} p</span>
              <span class="player-pill ${this.duelCurrentPlayer === 2 ? 'active-turn' : ''}">Spelare 2: ${this.duelScoreP2} p</span>
            </div>
            <button type="button" class="btn-secondary btn-sm" id="btn-exit-special">Avsluta</button>
          </div>
        `;
      }
    } else if (this.currentMode === 'exam') {
      specialBar.innerHTML = `
        <div class="exam-arena-banner">
          <strong>📝 NP-Simulator (${this.examIndex + 1}/${this.examQuestions.length})</strong>
          <div class="exam-progress-dots">
            ${this.examQuestions
              .map(
                (q, idx) =>
                  `<span class="exam-dot ${idx === this.examIndex ? 'current' : ''} ${
                    this.examResults[idx] === true
                      ? 'correct'
                      : this.examResults[idx] === false
                      ? 'wrong'
                      : ''
                  }">Del ${q.part}</span>`
              )
              .join('')}
          </div>
          <button type="button" class="btn-secondary btn-sm" id="btn-exit-special">Avbryt</button>
        </div>
      `;
    }

    const exitBtn = document.getElementById('btn-exit-special');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        if (this.sprintTimer) clearInterval(this.sprintTimer);
        this.startPracticeMode('all');
      });
    }
  }

  // --------------------------------------------------------------------------
  // HÄMTA OCH VISA UPPGIFT
  // --------------------------------------------------------------------------
  pickPracticeQuestion() {
    let pool = STATIC_QUESTIONS.filter(q => {
      if (this.selectedCategory !== 'all' && q.category !== this.selectedCategory) return false;
      if (this.selectedPart !== 'all' && q.part !== this.selectedPart) return false;
      if (this.selectedLevel !== 'all' && q.level !== this.selectedLevel) return false;
      return true;
    });

    const unseen = pool.filter(q => !this.seenQuestionIds.has(q.id));
    if (unseen.length > 0 && Math.random() < 0.7) {
      const chosen = unseen[Math.floor(Math.random() * unseen.length)];
      this.seenQuestionIds.add(chosen.id);
      return chosen;
    }

    return generateDynamicQuestion(
      this.selectedCategory,
      this.selectedLevel === 'all' ? null : this.selectedLevel
    );
  }

  loadNextQuestion() {
    if (this.currentMode === 'practice') {
      this.currentQuestion = this.pickPracticeQuestion();
    } else if (this.currentMode === 'boss' && this.activeBoss) {
      this.selectedCategory = this.activeBoss.category;
      this.currentQuestion = this.pickPracticeQuestion();
    } else if (this.currentMode === 'sprint') {
      const bPool = STATIC_QUESTIONS.filter(q => q.part === 'B');
      if (Math.random() < 0.5 && bPool.length > 0) {
        this.currentQuestion = bPool[Math.floor(Math.random() * bPool.length)];
      } else {
        this.currentQuestion = generateDynamicQuestion(
          Math.random() < 0.5 ? 'tal' : 'algebra',
          'E'
        );
      }
    } else if (this.currentMode === 'duel') {
      this.currentQuestion = this.duelQuestions[this.duelIndex];
    } else if (this.currentMode === 'exam') {
      this.currentQuestion = this.examQuestions[this.examIndex];
    }

    if (!this.currentQuestion) return;

    this.questionAnswered = false;
    this.stepsRevealedCount = 0;
    this.usedMultipleChoice = false;
    this.workspace.resetForNewQuestion();

    const allowCalc = this.currentQuestion.part === 'D';
    this.workspace.setCalculatorAllowed(allowCalc, this.currentQuestion.part);

    this.renderCurrentQuestion();
  }

  getHelperStepsOnly() {
    if (!this.currentQuestion || !this.currentQuestion.solutionSteps) return [];
    // Ta bara ledtrådsstegen (exkludera sista raden som är "Svar: ...")
    return this.currentQuestion.solutionSteps.filter(
      (s, idx, arr) => idx < arr.length - 1 && !s.toLowerCase().startsWith('svar:')
    );
  }

  renderCurrentQuestion() {
    const q = this.currentQuestion;
    const catInfo = CATEGORIES.find(c => c.id === q.category) || CATEGORIES[0];

    document.getElementById('q-category-badge').textContent = `${catInfo.icon} ${catInfo.name}`;
    document.getElementById('q-part-badge').textContent = `Delprov ${q.part}`;

    const levelBadge = document.getElementById('q-level-badge');
    levelBadge.textContent = `${q.level}-nivå`;
    levelBadge.className = `level-badge level-${q.level.toLowerCase()}`;

    document.getElementById('q-title').textContent = q.title;

    const factsContainer = document.getElementById('q-facts-row');
    if (factsContainer) {
      if (q.facts && q.facts.length > 0) {
        factsContainer.innerHTML = q.facts
          .map(f => `<span class="fact-chip">${this.escapeHtml(f)}</span>`)
          .join('');
        factsContainer.classList.remove('hidden');
      } else {
        factsContainer.innerHTML = '';
        factsContainer.classList.add('hidden');
      }
    }

    const mathBox = document.getElementById('q-math-display');
    if (mathBox) {
      if (q.mathDisplay) {
        mathBox.textContent = q.mathDisplay;
        mathBox.classList.remove('hidden');
      } else {
        mathBox.textContent = '';
        mathBox.classList.add('hidden');
      }
    }

    document.getElementById('q-text').textContent = q.question;

    const svgWrap = document.getElementById('q-svg-container');
    if (q.svg) {
      svgWrap.innerHTML = q.svg;
      svgWrap.classList.remove('hidden');
    } else {
      svgWrap.innerHTML = '';
      svgWrap.classList.add('hidden');
    }

    const unitLabel = document.getElementById('answer-unit-label');
    if (unitLabel) {
      unitLabel.textContent = q.unit || '';
      unitLabel.classList.toggle('hidden', !q.unit);
    }

    const ansInput = document.getElementById('answer-input');
    if (ansInput) {
      ansInput.value = '';
      ansInput.disabled = false;
      if (!this.workspace.isPenFullscreen) {
        ansInput.focus();
      }
    }

    document.getElementById('btn-submit-answer').classList.remove('hidden');
    document.getElementById('btn-next-question').classList.add('hidden');
    document.getElementById('hints-container').innerHTML = '';
    document.getElementById('mc-choices-container').innerHTML = '';
    document.getElementById('mc-choices-container').classList.add('hidden');
    document.getElementById('feedback-panel').classList.add('hidden');

    const helperSteps = this.getHelperStepsOnly();
    const hintBtn = document.getElementById('btn-show-hint');
    if (hintBtn) {
      hintBtn.disabled = false;
      hintBtn.textContent = `👣 Vad är nästa steg? (0/${helperSteps.length})`;
    }
    const mcBtn = document.getElementById('btn-show-choices');
    if (mcBtn) mcBtn.disabled = false;
    const revBtn = document.getElementById('btn-reveal-answer');
    if (revBtn) revBtn.disabled = false;

    requestAnimationFrame(() => this.workspace.resizeCanvas());
  }

  // --------------------------------------------------------------------------
  // "VAD ÄR NÄSTA STEG?" (GER LEDTRÅDSSTEG) & "VISA SVARET (0 POÄNG)"
  // --------------------------------------------------------------------------
  showNextStepHelper() {
    if (this.questionAnswered) return;
    const helperSteps = this.getHelperStepsOnly();
    if (this.stepsRevealedCount >= helperSteps.length) return;

    const stepText = helperSteps[this.stepsRevealedCount];
    this.stepsRevealedCount++;

    const container = document.getElementById('hints-container');
    const div = document.createElement('div');
    div.className = 'hint-box';

    const cleanFormula = stepText.replace(/^Steg \d+:\s*/i, '');
    div.innerHTML = `
      <div class="hint-step-row">
        <span>👣 <strong>${this.escapeHtml(stepText)}</strong></span>
        <button type="button" class="btn-secondary btn-sm" data-copy-step="${this.escapeHtml(cleanFormula)}">
          ➕ Lägg i uträkning
        </button>
      </div>
    `;

    container.appendChild(div);

    const copyBtn = div.querySelector('[data-copy-step]');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        this.workspace.appendHelperStepText(copyBtn.dataset.copyStep);
      });
    }

    const btn = document.getElementById('btn-show-hint');
    if (btn) {
      btn.textContent = `👣 Vad är nästa steg? (${this.stepsRevealedCount}/${helperSteps.length})`;
      if (this.stepsRevealedCount >= helperSteps.length) {
        btn.disabled = true;
      }
    }

    requestAnimationFrame(() => this.workspace.resizeCanvas());
  }

  // När eleven väljer "Visa svaret" avslutas uppgiften med 0 poäng så man inte får gratispoäng!
  revealFullAnswerZeroPoints() {
    if (!this.currentQuestion || this.questionAnswered) return;

    this.questionAnswered = true;
    const rightAns = this.currentQuestion.acceptedAnswers[0];
    const ansInput = document.getElementById('answer-input');
    if (ansInput) {
      ansInput.value = rightAns;
      ansInput.disabled = true;
    }

    document.getElementById('btn-submit-answer').classList.add('hidden');
    document.getElementById('btn-next-question').classList.remove('hidden');
    document.getElementById('btn-show-hint').disabled = true;
    document.getElementById('btn-show-choices').disabled = true;
    document.getElementById('btn-reveal-answer').disabled = true;

    if (this.currentMode === 'exam') {
      this.examResults[this.examIndex] = false;
      this.renderSpecialModeHeader();
    }

    const panel = document.getElementById('feedback-panel');
    if (panel) {
      panel.classList.remove('hidden', 'feedback-correct', 'feedback-wrong');
      panel.classList.add('feedback-neutral');
      const stepsHtml = (this.currentQuestion.solutionSteps || [])
        .map(s => `<li>${this.escapeHtml(s)}</li>`)
        .join('');

      panel.innerHTML = `
        <div class="feedback-header">
          <span class="feedback-icon">🔑</span>
          <div>
            <h4>Svar: <strong>${this.escapeHtml(rightAns)} ${this.escapeHtml(this.currentQuestion.unit || '')}</strong> (0 poäng – Svaret visades)</h4>
            <p class="sub-hint">Kika på stegen nedan och klicka sedan på <strong>Nästa →</strong> för att ta poäng på nästa uppgift!</p>
          </div>
        </div>
        <div class="solution-box-open">
          <ol class="solution-steps-list">${stepsHtml}</ol>
        </div>
      `;
    }

    requestAnimationFrame(() => this.workspace.resizeCanvas());
  }

  speakCurrentQuestion() {
    if (!this.currentQuestion || typeof window.speechSynthesis === 'undefined') return;
    window.speechSynthesis.cancel();
    const q = this.currentQuestion;
    const factsText = (q.facts || []).join('. ').replace(/[^\w\såäöÅÄÖ0-9.,+−\-/*=%°]/g, '');
    const mathSpoken = (q.mathDisplay || '')
      .replace(/\//g, ' delat med ')
      .replace(/·/g, ' gånger ')
      .replace(/−/g, ' minus ');
    const fullText = `${q.title}. ${factsText}. ${mathSpoken}. ${q.question}`;

    const utter = new SpeechSynthesisUtterance(fullText);
    utter.lang = 'sv-SE';
    utter.rate = 0.98;
    window.speechSynthesis.speak(utter);
  }

  showMultipleChoiceLifeline() {
    if (!this.currentQuestion || this.questionAnswered) return;
    this.usedMultipleChoice = true;
    const correctAns = this.currentQuestion.acceptedAnswers[0];
    const choices = this.generateDistractors(correctAns, this.currentQuestion.unit);

    const container = document.getElementById('mc-choices-container');
    container.innerHTML = '';
    container.classList.remove('hidden');

    choices.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mc-choice-btn';
      btn.textContent =
        this.currentQuestion.unit && !c.includes(this.currentQuestion.unit)
          ? `${c} ${this.currentQuestion.unit}`
          : c;
      btn.addEventListener('click', () => {
        const ansInput = document.getElementById('answer-input');
        if (ansInput) {
          ansInput.value = c;
          this.handleAnswerSubmit();
        }
      });
      container.appendChild(btn);
    });

    document.getElementById('btn-show-choices').disabled = true;
    requestAnimationFrame(() => this.workspace.resizeCanvas());
  }

  generateDistractors(correctStr, unit) {
    const clean = String(correctStr).replace(unit || '', '').trim();
    const num = Number(clean.replace(',', '.'));
    const options = new Set([clean]);

    if (!Number.isNaN(num) && clean !== '') {
      const offsets = [
        2,
        -2,
        5,
        -4,
        10,
        -10,
        Math.max(1, Math.round(num * 0.25)),
        -Math.max(1, Math.round(num * 0.2))
      ];
      for (const off of offsets) {
        if (options.size >= 4) break;
        const cand = Math.round((num + off) * 100) / 100;
        if (cand > 0 || num < 0) {
          options.add(String(cand).replace('.', ','));
        }
      }
    } else {
      options.add('2x + 5');
      options.add('4x - 7');
      options.add('y = 3x + 2');
      options.add('3/8');
    }

    return Array.from(options)
      .slice(0, 4)
      .sort(() => Math.random() - 0.5);
  }

  // --------------------------------------------------------------------------
  // RÄTTA SVAR, POÄNG, STREAK OCH REDOVISNINGSBONUS
  // --------------------------------------------------------------------------
  handleAnswerSubmit() {
    if (this.questionAnswered || !this.currentQuestion) return;
    const ansInput = document.getElementById('answer-input');
    const userVal = ansInput ? ansInput.value : '';
    if (!userVal.trim()) {
      ansInput.focus();
      return;
    }

    this.questionAnswered = true;
    ansInput.disabled = true;
    document.getElementById('btn-submit-answer').classList.add('hidden');
    document.getElementById('btn-next-question').classList.remove('hidden');

    const isCorrect = checkUserAnswer(userVal, this.currentQuestion);
    const showedWork = this.workspace.hasShownWork();
    const cat = this.currentQuestion.category;

    if (!this.state.categoryStats[cat]) {
      this.state.categoryStats[cat] = { solved: 0, attempted: 0 };
    }
    this.state.categoryStats[cat].attempted++;

    if (isCorrect) {
      this.onCorrectAnswer(showedWork, cat);
    } else {
      this.onWrongAnswer(userVal);
    }

    this.checkAchievements();
    this.saveState();
    this.updateHeaderUI();
    requestAnimationFrame(() => this.workspace.resizeCanvas());
  }

  onCorrectAnswer(showedWork, cat) {
    this.state.totalSolved++;
    this.state.categoryStats[cat].solved++;
    this.state.streak++;
    if (this.state.streak > this.state.bestStreak) {
      this.state.bestStreak = this.state.streak;
    }

    this.state.dailyQuests.solvedToday++;
    if (showedWork) {
      this.state.dailyQuests.workShownToday++;
      this.state.workBonusCount++;
    }
    if (this.currentQuestion.part !== 'D') {
      this.state.dailyQuests.noCalcSolvedToday++;
    }

    const lvl = this.currentQuestion.level;
    let baseXp = lvl === 'E' ? 100 : lvl === 'C' ? 180 : 300;
    if (this.usedMultipleChoice) baseXp = Math.round(baseXp * 0.75);
    if (this.stepsRevealedCount > 0) baseXp = Math.round(baseXp * 0.85);

    const streakBonus = Math.min(100, (this.state.streak - 1) * 15);
    const workBonus = showedWork ? 25 : 0;

    // Husdjursbonus!
    let petXpBonus = 0;
    let petStarBonus = 0;
    let petBossDmgBonus = 0;
    if (this.state.activePet === '🦉') petXpBonus = 20;
    if (this.state.activePet === '🦊') petStarBonus = 3;
    if (this.state.activePet === '🐲') {
      petXpBonus = 35;
      petBossDmgBonus = 25;
    }

    let totalXp = baseXp + streakBonus + workBonus + petXpBonus;
    let usedXpBoost = false;
    if ((this.state.xpBoostTurns || 0) > 0) {
      totalXp *= 2;
      this.state.xpBoostTurns--;
      usedXpBoost = true;
    }

    const earnedStars = (lvl === 'E' ? 3 : lvl === 'C' ? 5 : 8) + (showedWork ? 2 : 0) + petStarBonus;

    this.state.stars += earnedStars;
    if (lvl === 'E') this.state.pointsE += 1;
    if (lvl === 'C') this.state.pointsC += 2;
    if (lvl === 'A') this.state.pointsA += 3;

    this.addXp(totalXp);

    // Rivalen på utvecklingslinjen rör sig lite framåt (om den inte är fryst!)
    const rival = this.getCurrentRival();
    if ((this.state.rivalFrozenTurns || 0) > 0) {
      this.state.rivalFrozenTurns--;
    } else {
      this.state.rivalXp = (this.state.rivalXp || rival.startXp) + (rival.speed || 30);
    }
    this.checkRivalOvertake();
    this.renderJourneyTrack();
    this.renderArenaPowerupsAndPet();

    let modeExtraMsg = '';
    if (this.currentMode === 'boss' && this.activeBoss) {
      const dmg = (lvl === 'E' ? 80 : lvl === 'C' ? 120 : 160) + (showedWork ? 30 : 0) + petBossDmgBonus;
      this.bossCurrentHp = Math.max(0, this.bossCurrentHp - dmg);
      this.renderSpecialModeHeader();
      modeExtraMsg = `⚔️ −${dmg} HP på ${this.activeBoss.name}!`;
      if (this.bossCurrentHp === 0) {
        this.onBossDefeated();
      }
    } else if (this.currentMode === 'sprint') {
      this.sprintCorrectCount++;
      this.sprintScore += 100 + this.state.streak * 10;
      this.sprintSecondsLeft += 2;
      this.renderSpecialModeHeader();
    } else if (this.currentMode === 'duel') {
      const pts = (lvl === 'E' ? 100 : lvl === 'C' ? 150 : 200) + (showedWork ? 25 : 0);
      if (this.duelSubMode === 'local2p' && this.duelCurrentPlayer === 2) {
        this.duelScoreP2 += pts;
      } else {
        this.duelScoreP1 += pts;
      }
      this.renderSpecialModeHeader();
    } else if (this.currentMode === 'exam') {
      this.examResults[this.examIndex] = true;
      this.renderSpecialModeHeader();
    }

    this.showFeedback(true, {
      totalXp,
      earnedStars,
      workBonus,
      streakBonus,
      petXpBonus,
      petStarBonus,
      usedXpBoost,
      modeExtraMsg
    });
  }

  onWrongAnswer(userVal) {
    let shieldUsed = false;
    if (this.state.streak >= 2 && this.state.streakShields > 0) {
      this.state.streakShields--;
      shieldUsed = true;
    } else {
      this.state.streak = 0;
    }

    // Rivalen drar ifrån lite vid fel svar (om den inte är fryst!)
    const rival = this.getCurrentRival();
    if ((this.state.rivalFrozenTurns || 0) > 0) {
      this.state.rivalFrozenTurns--;
    } else {
      this.state.rivalXp = (this.state.rivalXp || rival.startXp) + 55;
    }
    this.renderJourneyTrack();
    this.renderArenaPowerupsAndPet();

    if (this.currentMode === 'exam') {
      this.examResults[this.examIndex] = false;
      this.renderSpecialModeHeader();
    }

    this.showFeedback(false, { userVal, shieldUsed });
  }

  showFeedback(isCorrect, details) {
    const panel = document.getElementById('feedback-panel');
    if (!panel) return;
    panel.classList.remove('hidden', 'feedback-correct', 'feedback-wrong', 'feedback-neutral');
    panel.classList.add(isCorrect ? 'feedback-correct' : 'feedback-wrong');

    const stepsHtml = (this.currentQuestion.solutionSteps || [])
      .map(s => `<li>${this.escapeHtml(s)}</li>`)
      .join('');

    if (isCorrect) {
      panel.innerHTML = `
        <div class="feedback-header">
          <span class="feedback-icon">🎉</span>
          <div>
            <h4>Rätt svar!</h4>
            <div class="feedback-pills">
              <span class="fb-pill">+${details.totalXp} XP</span>
              <span class="fb-pill">+${details.earnedStars} ⭐</span>
              ${details.usedXpBoost ? '<span class="fb-pill bonus">🧪 2x XP-Boost!</span>' : ''}
              ${details.workBonus > 0 ? '<span class="fb-pill bonus">✍️ +25 XP Uträkningsbonus!</span>' : ''}
              ${details.petXpBonus > 0 || details.petStarBonus > 0 ? `<span class="fb-pill bonus">${this.state.activePet} Husdjursbonus!</span>` : ''}
              ${details.streakBonus > 0 ? `<span class="fb-pill streak">🔥 +${details.streakBonus} XP Streak!</span>` : ''}
            </div>
            ${details.modeExtraMsg ? `<p class="mode-extra-msg">${details.modeExtraMsg}</p>` : ''}
          </div>
        </div>
        <details class="solution-details">
          <summary>Visa alla uträkningssteg</summary>
          <ol class="solution-steps-list">${stepsHtml}</ol>
        </details>
      `;
    } else {
      const rightAns = this.currentQuestion.acceptedAnswers[0];
      panel.innerHTML = `
        <div class="feedback-header">
          <span class="feedback-icon">💡</span>
          <div>
            <h4>Rätt svar är: <strong>${this.escapeHtml(rightAns)} ${this.escapeHtml(this.currentQuestion.unit || '')}</strong></h4>
            ${
              details.shieldUsed
                ? '<p class="shield-saved-msg">🛡️ Streak-Skölden räddade din streak!</p>'
                : ''
            }
          </div>
        </div>
        <div class="solution-box-open">
          <ol class="solution-steps-list">${stepsHtml}</ol>
        </div>
      `;
    }
  }

  handleNextStepAfterAnswer() {
    if (this.currentMode === 'duel') {
      if (this.duelSubMode === 'local2p') {
        if (this.duelCurrentPlayer === 1) {
          this.duelCurrentPlayer = 2;
        } else {
          this.duelCurrentPlayer = 1;
          this.duelIndex++;
        }
      } else {
        this.duelIndex++;
      }

      if (this.duelIndex >= this.duelQuestions.length) {
        this.finishDuel();
        return;
      }
      this.renderSpecialModeHeader();
    } else if (this.currentMode === 'exam') {
      this.examIndex++;
      if (this.examIndex >= this.examQuestions.length) {
        this.finishExam();
        return;
      }
      this.renderSpecialModeHeader();
    }

    this.loadNextQuestion();
  }

  // --------------------------------------------------------------------------
  // SPELLÄGEN
  // --------------------------------------------------------------------------
  bindGameModes() {
    const btnStartSprint = document.getElementById('btn-start-sprint');
    if (btnStartSprint) {
      btnStartSprint.addEventListener('click', () => this.startSprintMode());
    }

    const btnGenCode = document.getElementById('btn-generate-duel-code');
    if (btnGenCode) {
      btnGenCode.addEventListener('click', () => {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const inp = document.getElementById('duel-code-input');
        if (inp) inp.value = `NP-${randNum}`;
      });
    }

    const btnStartCodeDuel = document.getElementById('btn-start-code-duel');
    if (btnStartCodeDuel) {
      btnStartCodeDuel.addEventListener('click', () => {
        const inp = document.getElementById('duel-code-input');
        const code = (inp && inp.value.trim().toUpperCase()) || `NP-${Math.floor(1000 + Math.random() * 9000)}`;
        this.startCodeDuel(code);
      });
    }

    const btnStart2P = document.getElementById('btn-start-2p-duel');
    if (btnStart2P) {
      btnStart2P.addEventListener('click', () => this.startLocal2PDuel());
    }

    const btnStartExam = document.getElementById('btn-start-exam');
    if (btnStartExam) {
      btnStartExam.addEventListener('click', () => this.startExamSimulator());
    }
  }

  renderBossCards() {
    const grid = document.getElementById('boss-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';

    BOSSES.forEach(boss => {
      const defeated = this.state.defeatedBosses.includes(boss.id);
      const card = document.createElement('div');
      card.className = `boss-card ${defeated ? 'boss-defeated' : ''}`;
      card.innerHTML = `
        <div class="boss-card-header">
          <span class="boss-avatar">${boss.avatar}</span>
          <span class="boss-hp-tag">❤️ ${boss.maxHp} HP</span>
        </div>
        <h3>${boss.name} ${defeated ? '✅' : ''}</h3>
        <p>${boss.desc}</p>
        <div class="boss-reward-row">
          <span>Belöning: <strong>+${boss.rewardStars} ⭐ & +${boss.rewardXp} XP</strong></span>
        </div>
        <button type="button" class="btn-primary" data-fight-boss="${boss.id}">
          ${defeated ? 'Utmana igen ⚔️' : 'Starta Boss-kamp ⚔️'}
        </button>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('[data-fight-boss]').forEach(btn => {
      btn.addEventListener('click', () => {
        const boss = BOSSES.find(b => b.id === btn.dataset.fightBoss);
        if (boss) this.startBossBattle(boss);
      });
    });
  }

  startBossBattle(boss) {
    this.currentMode = 'boss';
    this.activeBoss = boss;
    this.bossCurrentHp = boss.maxHp;
    this.loadNextQuestion();
    this.updateArenaModeBanner();
    this.switchView('arena');
  }

  onBossDefeated() {
    if (!this.activeBoss) return;
    if (!this.state.defeatedBosses.includes(this.activeBoss.id)) {
      this.state.defeatedBosses.push(this.activeBoss.id);
    }
    this.state.stars += this.activeBoss.rewardStars;
    this.addXp(this.activeBoss.rewardXp);
    this.launchConfetti();
    this.showSummaryModal(
      `🏆 ${this.activeBoss.name} besegrad!`,
      `Belöning: <strong>+${this.activeBoss.rewardStars} ⭐</strong> och <strong>+${this.activeBoss.rewardXp} XP</strong>!`
    );
  }

  startSprintMode() {
    this.currentMode = 'sprint';
    this.sprintSecondsLeft = 60;
    this.sprintScore = 0;
    this.sprintCorrectCount = 0;
    this.loadNextQuestion();
    this.updateArenaModeBanner();
    this.switchView('arena');

    if (this.sprintTimer) clearInterval(this.sprintTimer);
    this.sprintTimer = setInterval(() => {
      this.sprintSecondsLeft--;
      const timerEl = document.getElementById('sprint-timer-display');
      if (timerEl) timerEl.textContent = `⏳ ${this.sprintSecondsLeft} s`;

      if (this.sprintSecondsLeft <= 0) {
        clearInterval(this.sprintTimer);
        this.sprintTimer = null;
        this.finishSprintMode();
      }
    }, 1000);
  }

  finishSprintMode() {
    const isRecord = this.sprintScore > this.state.bestSprintScore;
    if (isRecord) {
      this.state.bestSprintScore = this.sprintScore;
    }
    this.checkAchievements();
    this.saveState();
    this.launchConfetti();
    this.showSummaryModal(
      '⏱️ Tidsjakten klar!',
      `<strong>${this.sprintCorrectCount} rätt</strong> • <strong>${this.sprintScore} poäng</strong><br/>
      ${isRecord ? '🎉 <strong>NYTT REKORD!</strong>' : `Rekord: ${this.state.bestSprintScore} p`}`
    );
    this.startPracticeMode('all');
  }

  startCodeDuel(code) {
    this.currentMode = 'duel';
    this.duelSubMode = 'code';
    this.duelCode = code;
    this.duelRng = createSeededRandom(code);
    this.duelQuestions = [];
    const cats = ['tal', 'algebra', 'funktioner', 'geometri', 'statistik'];
    for (let i = 0; i < 5; i++) {
      this.duelQuestions.push(generateDynamicQuestion(cats[i], i < 2 ? 'E' : 'C', this.duelRng));
    }
    this.duelIndex = 0;
    this.duelScoreP1 = 0;
    this.duelStartTime = Date.now();
    this.loadNextQuestion();
    this.updateArenaModeBanner();
    this.switchView('arena');
  }

  startLocal2PDuel() {
    this.currentMode = 'duel';
    this.duelSubMode = 'local2p';
    this.duelCode = '2P-LOKAL';
    this.duelQuestions = [];
    for (let i = 0; i < 3; i++) {
      this.duelQuestions.push(generateDynamicQuestion('all', 'E'));
    }
    this.duelIndex = 0;
    this.duelScoreP1 = 0;
    this.duelScoreP2 = 0;
    this.duelCurrentPlayer = 1;
    this.loadNextQuestion();
    this.updateArenaModeBanner();
    this.switchView('arena');
  }

  finishDuel() {
    this.launchConfetti();
    if (this.duelSubMode === 'code') {
      const elapsedSec = Math.round((Date.now() - this.duelStartTime) / 1000);
      this.showSummaryModal(
        `🤝 Duell klar (Kod: ${this.duelCode})`,
        `Poäng: <strong>${this.duelScoreP1} p</strong> • Tid: <strong>${elapsedSec} s</strong><br/><br/>
        Ge koden <strong>${this.duelCode}</strong> till en kompis för exakt samma 5 uppgifter!`
      );
    } else {
      const winner =
        this.duelScoreP1 > this.duelScoreP2
          ? '🏆 Spelare 1 vann!'
          : this.duelScoreP2 > this.duelScoreP1
          ? '🏆 Spelare 2 vann!'
          : '🤝 Oavgjort!';
      this.showSummaryModal(
        winner,
        `Spelare 1: <strong>${this.duelScoreP1} p</strong><br/>Spelare 2: <strong>${this.duelScoreP2} p</strong>`
      );
    }
    this.startPracticeMode('all');
  }

  startExamSimulator() {
    this.currentMode = 'exam';
    const bQuestions = STATIC_QUESTIONS.filter(q => q.part === 'B');
    const cQuestions = STATIC_QUESTIONS.filter(q => q.part === 'C');
    const dQuestions = STATIC_QUESTIONS.filter(q => q.part === 'D');

    const pickTwo = (arr) => [...arr].sort(() => Math.random() - 0.5).slice(0, 2);
    this.examQuestions = [...pickTwo(bQuestions), ...pickTwo(cQuestions), ...pickTwo(dQuestions)];
    this.examIndex = 0;
    this.examResults = new Array(this.examQuestions.length).fill(null);

    this.loadNextQuestion();
    this.updateArenaModeBanner();
    this.switchView('arena');
  }

  finishExam() {
    const correctCount = this.examResults.filter(Boolean).length;
    const total = this.examQuestions.length;
    let grade = 'F – Träna lite till!';
    if (correctCount === 6) grade = 'A 🌟';
    else if (correctCount === 5) grade = 'B 🚀';
    else if (correctCount === 4) grade = 'C 💪';
    else if (correctCount >= 2) grade = 'E ✅';

    if (!this.state.achievements.includes('np-sim-done')) {
      this.state.achievements.push('np-sim-done');
    }
    this.saveState();
    this.launchConfetti();
    this.showSummaryModal(
      '🎓 NP-Simulator klar!',
      `Resultat: <strong>${correctCount} av ${total} rätt</strong><br/>
      Nivå: <strong>${grade}</strong>`
    );
    this.startPracticeMode('all');
  }

  // --------------------------------------------------------------------------
  // XP, LEVELS, TROFÉER & SHOP
  // --------------------------------------------------------------------------
  getLevelFromXp(xp) {
    return Math.floor(xp / 350) + 1;
  }

  getRankTitle(level) {
    let current = RANKS[0].title;
    for (const r of RANKS) {
      if (level >= r.minLevel) current = r.title;
    }
    return current;
  }

  addXp(amount) {
    const oldLevel = this.getLevelFromXp(this.state.xp);
    this.state.xp += amount;
    const newLevel = this.getLevelFromXp(this.state.xp);
    if (newLevel > oldLevel) {
      this.launchConfetti();
    }
  }

  checkAchievements() {
    const unlock = (id) => {
      if (!this.state.achievements.includes(id)) {
        this.state.achievements.push(id);
      }
    };
    if (this.state.totalSolved >= 1) unlock('first-solve');
    if (this.state.workBonusCount >= 5) unlock('show-work-5');
    if (this.state.streak >= 5) unlock('streak-5');
    if (this.state.streak >= 10) unlock('streak-10');
    if (this.state.pointsA >= 9) unlock('level-a-3');
    if (this.sprintCorrectCount >= 5) unlock('sprint-hero');
    if (this.state.defeatedBosses.length >= 1) unlock('boss-slayer');
  }

  renderRewardsAndShop() {
    const walletBar = document.getElementById('shop-wallet-bar');
    if (walletBar) {
      walletBar.innerHTML = `
        <div class="wallet-info">
          <span class="wallet-pill">⭐ Dina Stjärnor: <strong>${this.state.stars} ⭐</strong></span>
          <span class="wallet-pill">⚡ Din XP: <strong>${this.state.xp} XP</strong></span>
        </div>
        <div class="wallet-actions">
          <button type="button" class="btn-accent btn-sm" id="btn-shop-exchange-xp">
            💱 Växla 100 XP → +25 ⭐ Stjärnor
          </button>
        </div>
      `;
      const exBtn = walletBar.querySelector('#btn-shop-exchange-xp');
      if (exBtn) {
        exBtn.addEventListener('click', () => this.exchangeXpForStars());
      }
    }

    const achGrid = document.getElementById('achievements-grid');
    if (achGrid) {
      achGrid.innerHTML = '';
      ACHIEVEMENTS.forEach(a => {
        const unlocked = this.state.achievements.includes(a.id);
        const card = document.createElement('div');
        card.className = `ach-card ${unlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
          <span class="ach-icon">${unlocked ? a.icon : '🔒'}</span>
          <div>
            <h4>${a.title}</h4>
            <p>${a.desc}</p>
          </div>
        `;
        achGrid.appendChild(card);
      });
    }

    const shopGrid = document.getElementById('shop-items-grid');
    if (shopGrid) {
      shopGrid.innerHTML = '';
      SHOP_ITEMS.forEach(item => {
        const owned = this.state.unlockedItems.includes(item.id);
        const isEquipped =
          (item.type === 'theme' && this.state.theme === item.value) ||
          (item.type === 'avatar' && this.state.avatar === item.value) ||
          (item.type === 'penfx' && (this.state.activePenFx || 'normal') === item.value) ||
          (item.type === 'pet' && this.state.activePet === item.value);

        const typeLabelMap = {
          penfx: '✨ Magisk Penna',
          pet: '🐾 Matte-Husdjur',
          consumable: '⚡ Power-Up',
          theme: '🎨 Tema',
          avatar: '👤 Avatar'
        };

        const card = document.createElement('div');
        card.className = `shop-card ${isEquipped ? 'equipped' : ''}`;
        let btnHtml = '';
        if (item.type === 'consumable') {
          let countInfo = '';
          if (item.value === 'shield') countInfo = ` • Har: ${this.state.streakShields}`;
          if (item.value === 'xp_boost') countInfo = ` • Aktiva: ${this.state.xpBoostTurns || 0}`;
          if (item.value === 'freeze_rival') countInfo = ` • Fryst: ${this.state.rivalFrozenTurns || 0}`;
          btnHtml = `<button type="button" class="btn-primary btn-sm" data-buy-item="${item.id}">Köp (${item.cost} ⭐)${countInfo}</button>`;
        } else if (isEquipped) {
          btnHtml = `<span class="equipped-badge">Aktiv ✅</span>`;
        } else if (owned) {
          btnHtml = `<button type="button" class="btn-secondary btn-sm" data-equip-item="${item.id}">Aktivera</button>`;
        } else {
          btnHtml = `<button type="button" class="btn-primary btn-sm" data-buy-item="${item.id}">Köp (${item.cost} ⭐)</button>`;
        }

        card.innerHTML = `
          <span class="shop-type-tag">${typeLabelMap[item.type] || 'Föremål'}</span>
          <span class="shop-icon">${item.icon}</span>
          <h4>${item.name}</h4>
          <p class="shop-desc">${item.desc || ''}</p>
          ${btnHtml}
        `;
        shopGrid.appendChild(card);
      });

      shopGrid.querySelectorAll('[data-buy-item]').forEach(btn => {
        btn.addEventListener('click', () => this.buyShopItem(btn.dataset.buyItem));
      });
      shopGrid.querySelectorAll('[data-equip-item]').forEach(btn => {
        btn.addEventListener('click', () => this.equipShopItem(btn.dataset.equipItem));
      });
    }
  }

  buyShopItem(itemId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    if (this.state.stars < item.cost) {
      this.showSummaryModal(
        `⭐ Behöver ${item.cost} Stjärnor`,
        `Du har <strong>${this.state.stars} ⭐</strong>. Lös fler uppgifter eller klicka på <strong>"💱 Växla 100 XP → +25 ⭐"</strong> högst upp i Shopen!`
      );
      return;
    }

    if (item.type === 'consumable') {
      if (item.value === 'shield') {
        this.state.stars -= item.cost;
        this.state.streakShields++;
      } else {
        this.activateQuickPowerup(item.value);
      }
    } else {
      this.state.stars -= item.cost;
      if (!this.state.unlockedItems.includes(item.id)) {
        this.state.unlockedItems.push(item.id);
      }
      this.equipShopItem(item.id);
      this.launchConfetti();
    }
    this.saveState();
    this.updateHeaderUI();
    this.renderJourneyTrack();
    this.renderArenaPowerupsAndPet();
    this.renderRewardsAndShop();
  }

  equipShopItem(itemId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    if (item.type === 'theme') {
      this.state.theme = item.value;
      this.applyTheme(item.value);
    } else if (item.type === 'avatar') {
      this.state.avatar = item.value;
    } else if (item.type === 'penfx') {
      this.state.activePenFx = item.value;
      this.workspace.setPenFx(item.value);
    } else if (item.type === 'pet') {
      this.state.activePet = item.value;
    }
    this.saveState();
    this.updateHeaderUI();
    this.renderJourneyTrack();
    this.renderArenaPowerupsAndPet();
    this.renderRewardsAndShop();
  }

  applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName || 'midnight');
    if (this.workspace) {
      this.workspace.redrawAll();
    }
  }

  updateHeaderUI() {
    const level = this.getLevelFromXp(this.state.xp);
    const rank = this.getRankTitle(level);
    const xpInLevel = this.state.xp % 350;
    const xpPct = Math.round((xpInLevel / 350) * 100);

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt('header-avatar', this.state.avatar);
    setTxt('header-player-name', this.state.playerName);
    setTxt('header-rank-title', `Lvl ${level} • ${rank}`);
    setTxt('header-streak', `${this.state.streak}`);
    setTxt('header-shields', `${this.state.streakShields}`);
    setTxt('header-stars', `${this.state.stars}`);
    setTxt('header-xp-text', `${this.state.xp} XP`);
    setTxt('stat-points-e', `${this.state.pointsE}`);
    setTxt('stat-points-c', `${this.state.pointsC}`);
    setTxt('stat-points-a', `${this.state.pointsA}`);
    setTxt('stat-total-solved', `${this.state.totalSolved}`);

    const xpFill = document.getElementById('header-xp-fill');
    if (xpFill) xpFill.style.width = `${xpPct}%`;
  }

  bindModals() {
    const openFormulaBtn = document.getElementById('btn-open-formulas');
    const closeFormulaBtn = document.getElementById('btn-close-formulas');
    const formulaModal = document.getElementById('formula-modal');

    if (openFormulaBtn && formulaModal) {
      openFormulaBtn.addEventListener('click', () => formulaModal.classList.remove('hidden'));
    }
    if (closeFormulaBtn && formulaModal) {
      closeFormulaBtn.addEventListener('click', () => formulaModal.classList.add('hidden'));
    }

    // Spara / Flytta framsteg med Sparkod
    const openSaveBtn = document.getElementById('btn-open-save');
    const closeSaveBtn = document.getElementById('btn-close-save');
    const saveModal = document.getElementById('save-modal');
    const copySaveBtn = document.getElementById('btn-copy-save-code');
    const loadSaveBtn = document.getElementById('btn-load-save-code');

    if (openSaveBtn && saveModal) {
      openSaveBtn.addEventListener('click', () => {
        const out = document.getElementById('save-code-output');
        const statusEl = document.getElementById('save-modal-status');
        if (statusEl) statusEl.textContent = '';
        if (out) {
          const exportData = {
            n: this.state.playerName,
            a: this.state.avatar,
            t: this.state.theme,
            xp: this.state.xp,
            st: this.state.stars,
            sk: this.state.streak,
            bs: this.state.bestStreak,
            sh: this.state.streakShields,
            pe: this.state.pointsE,
            pc: this.state.pointsC,
            pa: this.state.pointsA,
            ts: this.state.totalSolved,
            wb: this.state.workBonusCount,
            sp: this.state.bestSprintScore,
            db: this.state.defeatedBosses,
            ui: this.state.unlockedItems,
            ac: this.state.achievements,
            cs: this.state.categoryStats
          };
          out.value = 'NPM9-' + btoa(encodeURIComponent(JSON.stringify(exportData)));
        }
        saveModal.classList.remove('hidden');
      });
    }
    if (closeSaveBtn && saveModal) {
      closeSaveBtn.addEventListener('click', () => saveModal.classList.add('hidden'));
    }
    if (copySaveBtn) {
      copySaveBtn.addEventListener('click', () => {
        const out = document.getElementById('save-code-output');
        const statusEl = document.getElementById('save-modal-status');
        if (out && out.value) {
          out.select();
          navigator.clipboard?.writeText(out.value);
          if (statusEl) statusEl.textContent = '✅ Sparkoden är kopierad!';
        }
      });
    }
    if (loadSaveBtn) {
      loadSaveBtn.addEventListener('click', () => {
        const inp = document.getElementById('save-code-input');
        const statusEl = document.getElementById('save-modal-status');
        const raw = (inp?.value || '').trim();
        if (!raw.startsWith('NPM9-')) {
          if (statusEl) statusEl.textContent = '⚠️ Ogiltig sparkod (ska börja med NPM9-).';
          return;
        }
        try {
          const decoded = JSON.parse(decodeURIComponent(atob(raw.slice(5))));
          this.state.playerName = decoded.n || this.state.playerName;
          this.state.avatar = decoded.a || this.state.avatar;
          this.state.theme = decoded.t || this.state.theme;
          this.state.xp = Number(decoded.xp) || 0;
          this.state.stars = Number(decoded.st) || 0;
          this.state.streak = Number(decoded.sk) || 0;
          this.state.bestStreak = Number(decoded.bs) || 0;
          this.state.streakShields = Number(decoded.sh) || 0;
          this.state.pointsE = Number(decoded.pe) || 0;
          this.state.pointsC = Number(decoded.pc) || 0;
          this.state.pointsA = Number(decoded.pa) || 0;
          this.state.totalSolved = Number(decoded.ts) || 0;
          this.state.workBonusCount = Number(decoded.wb) || 0;
          this.state.bestSprintScore = Number(decoded.sp) || 0;
          if (Array.isArray(decoded.db)) this.state.defeatedBosses = decoded.db;
          if (Array.isArray(decoded.ui)) this.state.unlockedItems = decoded.ui;
          if (Array.isArray(decoded.ac)) this.state.achievements = decoded.ac;
          if (decoded.cs) this.state.categoryStats = decoded.cs;

          this.saveState();
          this.applyTheme(this.state.theme);
          this.updateHeaderUI();
          this.renderDashboard();
          if (statusEl) statusEl.textContent = '🎉 Dina framsteg har laddats in!';
        } catch {
          if (statusEl) statusEl.textContent = '⚠️ Kunde inte läsa sparkoden.';
        }
      });
    }

    const closeSummaryBtn = document.getElementById('btn-close-summary');
    const summaryModal = document.getElementById('summary-modal');
    if (closeSummaryBtn && summaryModal) {
      closeSummaryBtn.addEventListener('click', () => summaryModal.classList.add('hidden'));
    }

    const editNameBtn = document.getElementById('btn-edit-name');
    if (editNameBtn) {
      editNameBtn.addEventListener('click', () => {
        const nextName = prompt('Ditt namn på topplistan:', this.state.playerName);
        if (nextName && nextName.trim()) {
          this.state.playerName = nextName.trim().slice(0, 18);
          this.saveState();
          this.updateHeaderUI();
          this.renderLeaderboard();
        }
      });
    }
  }

  showSummaryModal(title, htmlBody) {
    const modal = document.getElementById('summary-modal');
    if (!modal) return;
    document.getElementById('summary-modal-title').textContent = title;
    document.getElementById('summary-modal-body').innerHTML = htmlBody;
    modal.classList.remove('hidden');
  }

  launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#38bdf8'];
    for (let i = 0; i < 36; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.animationDuration = `${1.2 + Math.random() * 1.2}s`;
      piece.style.animationDelay = `${Math.random() * 0.25}s`;
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 2600);
    }
  }

  escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.matteApp = new MatteApp();
  window.matteApp.init();
});
