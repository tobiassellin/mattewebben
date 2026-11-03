// ============================================================================
// NP-MÄSTAREN ÅK 9 - ARBETSYTA MED TRAJEKTORIE-TOLKNING FÖR INRINGAT SVAR
// & LEKFULLA PENN-EFFEKTER (REGNBÅGSPENNA, NEON, ELD)
// ============================================================================

// Kanoniska handskriftstrajektorier för siffrorna 0-9 (används tillsammans med geometriska regler)
const DIGIT_TEMPLATES = {
  '0': [
    [[0.5, 0.05], [0.15, 0.2], [0.08, 0.5], [0.15, 0.82], [0.5, 0.95], [0.85, 0.82], [0.92, 0.5], [0.85, 0.2], [0.5, 0.05]],
    [[0.5, 0.05], [0.85, 0.2], [0.92, 0.5], [0.85, 0.82], [0.5, 0.95], [0.15, 0.82], [0.08, 0.5], [0.15, 0.2], [0.5, 0.05]]
  ],
  '1': [
    [[0.5, 0.05], [0.5, 0.5], [0.5, 0.95]],
    [[0.2, 0.25], [0.55, 0.05], [0.55, 0.5], [0.55, 0.95]]
  ],
  '2': [
    [[0.12, 0.25], [0.48, 0.05], [0.86, 0.18], [0.82, 0.42], [0.45, 0.68], [0.08, 0.92], [0.52, 0.92], [0.95, 0.92]],
    [[0.15, 0.15], [0.6, 0.05], [0.9, 0.25], [0.5, 0.62], [0.08, 0.94], [0.94, 0.94]]
  ],
  '3': [
    [[0.15, 0.15], [0.55, 0.05], [0.88, 0.22], [0.75, 0.42], [0.32, 0.48], [0.8, 0.58], [0.92, 0.78], [0.55, 0.95], [0.12, 0.88]],
    [[0.2, 0.1], [0.85, 0.2], [0.35, 0.48], [0.9, 0.75], [0.15, 0.92]]
  ],
  '4': [
    [[0.65, 0.05], [0.1, 0.62], [0.92, 0.62], [0.65, 0.62], [0.65, 0.95]],
    [[0.2, 0.08], [0.12, 0.58], [0.9, 0.58], [0.65, 0.2], [0.65, 0.95]]
  ],
  '5': [
    [[0.85, 0.08], [0.2, 0.08], [0.15, 0.45], [0.65, 0.45], [0.9, 0.65], [0.8, 0.88], [0.45, 0.95], [0.12, 0.85]],
    [[0.2, 0.08], [0.15, 0.45], [0.7, 0.45], [0.9, 0.7], [0.5, 0.95], [0.12, 0.85]]
  ],
  '6': [
    [[0.78, 0.08], [0.35, 0.25], [0.1, 0.6], [0.22, 0.9], [0.6, 0.95], [0.88, 0.75], [0.75, 0.52], [0.38, 0.5], [0.15, 0.65]]
  ],
  '7': [
    [[0.1, 0.1], [0.9, 0.1], [0.6, 0.5], [0.3, 0.95]],
    [[0.1, 0.12], [0.92, 0.08], [0.42, 0.95]]
  ],
  '8': [
    [[0.5, 0.06], [0.18, 0.22], [0.5, 0.48], [0.85, 0.75], [0.5, 0.95], [0.15, 0.75], [0.5, 0.48], [0.82, 0.22], [0.5, 0.06]],
    [[0.5, 0.06], [0.82, 0.22], [0.5, 0.48], [0.15, 0.75], [0.5, 0.95], [0.85, 0.75], [0.5, 0.48], [0.18, 0.22], [0.5, 0.06]]
  ],
  '9': [
    [[0.82, 0.32], [0.5, 0.06], [0.12, 0.25], [0.25, 0.48], [0.65, 0.48], [0.85, 0.28], [0.8, 0.65], [0.65, 0.95]],
    [[0.82, 0.32], [0.5, 0.06], [0.12, 0.25], [0.25, 0.48], [0.65, 0.48], [0.85, 0.28], [0.85, 0.95]]
  ]
};

class CalculationWorkspace {
  constructor() {
    this.mode = 'split';
    this.isPenFullscreen = false;
    this.tool = 'pen'; // 'pen' | 'circle-answer' | 'line' | 'highlighter' | 'eraser'
    this.color = '#0f172a';
    this.penFx = 'normal'; // 'normal' | 'rainbow' | 'neon' | 'fire'
    this.lineWidth = 3.2;
    this.gridType = 'grid';
    this.isDrawing = false;
    this.strokes = [];
    this.currentStroke = null;
    this.hoverPos = null;

    this.dpr = window.devicePixelRatio || 1;
    this.logicalW = 300;
    this.logicalH = 200;

    this.steps = [
      { id: 1, math: '', note: '' },
      { id: 2, math: '', note: '' }
    ];
    this.activeInputEl = null;

    this.calcExpression = '';
    this.calcAllowed = true;
  }

  init() {
    this.canvas = document.getElementById('draw-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.bindModeButtons();
    this.bindDrawTools();
    this.bindCanvasEvents();
    this.bindKeyboardWorkspace();
    this.bindCalculator();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeCanvas();
      });
      this.resizeObserver.observe(this.canvas);
      if (this.canvas.parentElement) {
        this.resizeObserver.observe(this.canvas.parentElement);
      }
    }

    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas();
    this.renderSteps();
  }

  // --------------------------------------------------------------------------
  // VÄXLA LÄGE & HELSKÄRMSLÄGE FÖR PENNA
  // --------------------------------------------------------------------------
  bindModeButtons() {
    document.querySelectorAll('[data-ws-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedMode = btn.dataset.wsMode;
        if (selectedMode === 'draw') {
          this.setMode('draw', true);
        } else {
          this.setMode(selectedMode, false);
        }
      });
    });

    const toggleFsBtn = document.getElementById('btn-toggle-pen-fullscreen');
    if (toggleFsBtn) {
      toggleFsBtn.addEventListener('click', () => {
        this.togglePenFullscreen(!this.isPenFullscreen);
      });
    }

    const exitFsBtn = document.getElementById('btn-exit-pen-fullscreen');
    if (exitFsBtn) {
      exitFsBtn.addEventListener('click', () => {
        this.setMode('split', false);
      });
    }
  }

  setMode(mode, openFullscreen = false) {
    this.mode = mode;
    document.querySelectorAll('[data-ws-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.wsMode === mode);
    });

    const container = document.getElementById('workspace-panels');
    if (container) {
      container.setAttribute('data-mode', mode);
    }

    this.togglePenFullscreen(openFullscreen);
  }

  togglePenFullscreen(enable) {
    this.isPenFullscreen = Boolean(enable);
    document.body.classList.toggle('pen-fullscreen-mode', this.isPenFullscreen);

    const toggleFsBtn = document.getElementById('btn-toggle-pen-fullscreen');
    if (toggleFsBtn) {
      toggleFsBtn.textContent = this.isPenFullscreen ? '↙ Mindre vy' : '⛶ Helskärm';
    }

    const exitFsBtn = document.getElementById('btn-exit-pen-fullscreen');
    if (exitFsBtn) {
      exitFsBtn.classList.toggle('hidden', !this.isPenFullscreen);
    }

    requestAnimationFrame(() => {
      this.resizeCanvas();
      setTimeout(() => this.resizeCanvas(), 40);
    });
  }

  setPenEffect(fxName) {
    this.penFx = fxName || 'normal';
    document.querySelectorAll('[data-pen-fx]').forEach(b => {
      b.classList.toggle('active', b.dataset.penFx === this.penFx);
    });
  }

  // --------------------------------------------------------------------------
  // RITYTA FÖR TOUCHPENNA / FINGER / MUS
  // --------------------------------------------------------------------------
  bindDrawTools() {
    document.querySelectorAll('[data-draw-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.tool = btn.dataset.drawTool;
        document.querySelectorAll('[data-draw-tool]').forEach(b =>
          b.classList.toggle('active', b.dataset.drawTool === this.tool)
        );
      });
    });

    document.querySelectorAll('[data-draw-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.color = btn.dataset.drawColor;
        this.penFx = 'normal';
        if (this.tool === 'eraser') {
          this.tool = 'pen';
          document.querySelectorAll('[data-draw-tool]').forEach(b =>
            b.classList.toggle('active', b.dataset.drawTool === 'pen')
          );
        }
        document.querySelectorAll('[data-draw-color]').forEach(b =>
          b.classList.toggle('active', b.dataset.drawColor === this.color)
        );
      });
    });

    const gridBtn = document.getElementById('btn-toggle-grid');
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        const order = ['grid', 'dots', 'blank'];
        const nextIdx = (order.indexOf(this.gridType) + 1) % order.length;
        this.gridType = order[nextIdx];
        const labels = { grid: '⊞ Rutat papper', dots: '∷ Prickat papper', blank: '⬜ Blankt papper' };
        gridBtn.textContent = labels[this.gridType];
        this.redrawAll();
      });
    }

    const axesBtn = document.getElementById('btn-stamp-axes');
    if (axesBtn) {
      axesBtn.addEventListener('click', () => this.stampCoordinateAxes());
    }

    const undoBtn = document.getElementById('btn-draw-undo');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => {
        this.strokes.pop();
        this.hideCircledBanner();
        this.redrawAll();
        this.updateWorkStatusBadge();
      });
    }

    const clearBtn = document.getElementById('btn-draw-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.strokes = [];
        this.hideCircledBanner();
        this.redrawAll();
        this.updateWorkStatusBadge();
      });
    }
  }

  syncCanvasSizeIfNeeded() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return;

    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (
      Math.abs(this.canvas.width - targetW) > 1 ||
      Math.abs(this.canvas.height - targetH) > 1 ||
      this.dpr !== dpr
    ) {
      this.dpr = dpr;
      this.logicalW = rect.width;
      this.logicalH = rect.height;
      this.canvas.width = targetW;
      this.canvas.height = targetH;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.redrawAll();
    }
  }

  getExactPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? this.logicalW / rect.width : 1;
    const scaleY = rect.height > 0 ? this.logicalH / rect.height : 1;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  bindCanvasEvents() {
    if (!this.canvas) return;

    this.canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.syncCanvasSizeIfNeeded();
      try {
        this.canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignorera
      }

      const pos = this.getExactPointerPos(e);
      this.hoverPos = pos;
      this.isDrawing = true;
      const isCircleTool = this.tool === 'circle-answer';
      this.currentStroke = {
        tool: this.tool,
        color: isCircleTool ? '#10b981' : this.color,
        penFx: isCircleTool ? 'normal' : this.penFx,
        width: this.tool === 'highlighter' ? 16 : (this.tool === 'eraser' ? 24 : (isCircleTool ? 3.5 : this.lineWidth)),
        alpha: this.tool === 'highlighter' ? 0.35 : 1,
        dashed: isCircleTool,
        points: [pos]
      };
      this.redrawAll();
    });

    this.canvas.addEventListener('pointermove', (e) => {
      const pos = this.getExactPointerPos(e);
      this.hoverPos = pos;

      if (!this.isDrawing || !this.currentStroke) {
        this.redrawAll();
        return;
      }
      e.preventDefault();

      if (this.currentStroke.tool === 'line') {
        this.currentStroke.points = [this.currentStroke.points[0], pos];
      } else {
        this.currentStroke.points.push(pos);
      }
      this.redrawAll();
    });

    const finishStroke = () => {
      if (!this.isDrawing || !this.currentStroke) return;
      this.isDrawing = false;
      const finished = this.currentStroke;
      this.currentStroke = null;

      if (finished.points.length > 0) {
        const circledResult = this.checkIfStrokeCirclesAnswer(finished);
        if (circledResult) {
          finished.isAnswerRing = true;
          finished.color = '#10b981';
          finished.penFx = 'normal';
          finished.width = 3.5;
          finished.dashed = true;
          this.strokes.push(finished);
          this.onAnswerCircled(circledResult);
        } else {
          this.strokes.push(finished);
        }
      }
      this.redrawAll();
      this.updateWorkStatusBadge();
    };

    this.canvas.addEventListener('pointerup', finishStroke);
    this.canvas.addEventListener('pointercancel', finishStroke);
    this.canvas.addEventListener('pointerleave', () => {
      this.hoverPos = null;
      this.redrawAll();
    });
  }

  // --------------------------------------------------------------------------
  // EXAKT HANDSKRIFTSTOLKNING FÖR INRINGADE SVAR (32-PUNKTS TRAJEKTORIEMATCHNING)
  // --------------------------------------------------------------------------
  getStrokeBounds(stroke) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let pathLen = 0;
    const pts = stroke.points || [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
      if (i > 0) {
        pathLen += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y);
      }
    }
    const w = Math.max(1, maxX - minX);
    const h = Math.max(1, maxY - minY);
    return {
      minX, minY, maxX, maxY,
      w, h,
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      pathLen
    };
  }

  checkIfStrokeCirclesAnswer(ringStroke) {
    if (!ringStroke || !ringStroke.points || ringStroke.points.length < 10) return null;
    if (ringStroke.tool === 'eraser' || ringStroke.tool === 'line' || ringStroke.tool === 'highlighter') {
      return null;
    }

    const rb = this.getStrokeBounds(ringStroke);
    if (rb.w < 32 || rb.h < 22) return null;

    const firstPt = ringStroke.points[0];
    const lastPt = ringStroke.points[ringStroke.points.length - 1];
    const closeDist = Math.hypot(firstPt.x - lastPt.x, firstPt.y - lastPt.y);
    const maxDim = Math.max(rb.w, rb.h);

    const isExplicitTool = ringStroke.tool === 'circle-answer';
    const isClosedLoop = isExplicitTool
      ? closeDist < maxDim * 0.95 && rb.pathLen > (rb.w + rb.h) * 1.05
      : closeDist < maxDim * 0.65 && rb.pathLen > (rb.w + rb.h) * 1.4;

    if (!isClosedLoop) return null;

    // Ta bort gamla inringningar om man ritar en ny ring
    this.strokes = this.strokes.filter(s => !s.isAnswerRing);

    const innerStrokes = [];
    for (const s of this.strokes) {
      if (s.tool === 'eraser' || s.tool === 'highlighter' || s.isAnswerRing) continue;
      const sb = this.getStrokeBounds(s);
      const insideCenter =
        sb.cx > rb.minX + rb.w * 0.04 &&
        sb.cx < rb.maxX - rb.w * 0.04 &&
        sb.cy > rb.minY + rb.h * 0.04 &&
        sb.cy < rb.maxY - rb.h * 0.04;
      const smallerThanRing = sb.w < rb.w * 0.94 && sb.h < rb.h * 0.94;

      if (insideCenter && smallerThanRing) {
        innerStrokes.push({ stroke: s, bounds: sb });
      }
    }

    if (innerStrokes.length === 0) return null;

    const innerMinX = Math.min(...innerStrokes.map(is => is.bounds.minX));
    const innerMaxX = Math.max(...innerStrokes.map(is => is.bounds.maxX));
    const innerMinY = Math.min(...innerStrokes.map(is => is.bounds.minY));
    const innerMaxY = Math.max(...innerStrokes.map(is => is.bounds.maxY));

    const enclosesInner =
      rb.minX <= innerMinX + 12 &&
      rb.maxX >= innerMaxX - 12 &&
      rb.minY <= innerMinY + 12 &&
      rb.maxY >= innerMaxY - 12;

    if (!isExplicitTool && !enclosesInner) return null;

    const { primary, alternatives } = this.recognizeHandwrittenStrokes(innerStrokes);
    return {
      recognizedText: primary,
      alternatives,
      ringBounds: rb
    };
  }

  resamplePolyline(pts, n = 24) {
    if (!pts || pts.length === 0) return [];
    if (pts.length === 1) return Array.from({ length: n }, () => ({ x: pts[0].x, y: pts[0].y }));

    let totalLen = 0;
    for (let i = 1; i < pts.length; i++) {
      totalLen += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    }
    if (totalLen < 1e-3) {
      return Array.from({ length: n }, () => ({ x: pts[0].x, y: pts[0].y }));
    }

    const step = totalLen / (n - 1);
    const resampled = [{ x: pts[0].x, y: pts[0].y }];
    let acc = 0;
    let srcPts = pts.map(p => ({ x: p.x, y: p.y }));

    for (let i = 1; i < srcPts.length; i++) {
      const d = Math.hypot(srcPts[i].x - srcPts[i - 1].x, srcPts[i].y - srcPts[i - 1].y);
      if (acc + d >= step) {
        const t = (step - acc) / d;
        const nx = srcPts[i - 1].x + t * (srcPts[i].x - srcPts[i - 1].x);
        const ny = srcPts[i - 1].y + t * (srcPts[i].y - srcPts[i - 1].y);
        resampled.push({ x: nx, y: ny });
        srcPts.splice(i, 0, { x: nx, y: ny });
        acc = 0;
      } else {
        acc += d;
      }
    }
    while (resampled.length < n) {
      resampled.push({ x: pts[pts.length - 1].x, y: pts[pts.length - 1].y });
    }
    return resampled.slice(0, n);
  }

  recognizeHandwrittenStrokes(innerStrokes) {
    const sorted = [...innerStrokes].sort((a, b) => a.bounds.minX - b.bounds.minX);
    const heights = sorted.map(s => s.bounds.h).filter(h => h > 8).sort((a, b) => a - b);
    const medianH = heights[Math.floor(heights.length / 2)] || 32;

    // Gruppera bara streck som verkligen korsar/överlappar varandra (t.ex. tvärstreck på 4, 5, 7, +)
    // En smal etta (w/h < 0.38) ska ALDRIG slås ihop med siffran bredvid!
    const groups = [];
    for (const item of sorted) {
      if (groups.length === 0) {
        groups.push({ items: [item], ...item.bounds });
        continue;
      }
      const prev = groups[groups.length - 1];
      const prevIsNarrowOne = prev.w / prev.h < 0.38 && prev.h > medianH * 0.55;
      const currIsNarrowOne = item.bounds.w / item.bounds.h < 0.38 && item.bounds.h > medianH * 0.55;

      const overlapX = Math.min(prev.maxX, item.bounds.maxX) - Math.max(prev.minX, item.bounds.minX);
      const maxW = Math.max(prev.w, item.bounds.w, 1);

      // Ett smalt vertikalt streck som ligger mitt inne i ett bredare streck (t.ex. 2-strecks "4") ska slås ihop,
      // medan en "1" som står bredvid en annan siffra (t.ex. "12", "14", "21") aldrig ska slås ihop.
      const narrowInsideWide =
        (currIsNarrowOne && !prevIsNarrowOne && item.bounds.cx > prev.minX + prev.w * 0.22 && item.bounds.cx < prev.maxX - prev.w * 0.1) ||
        (prevIsNarrowOne && !currIsNarrowOne && prev.cx > item.bounds.minX + item.bounds.w * 0.22 && prev.cx < item.bounds.maxX - item.bounds.w * 0.1);

      const shouldMerge =
        narrowInsideWide ||
        (!prevIsNarrowOne && !currIsNarrowOne && overlapX > maxW * 0.35);

      if (shouldMerge) {
        prev.items.push(item);
        prev.minX = Math.min(prev.minX, item.bounds.minX);
        prev.minY = Math.min(prev.minY, item.bounds.minY);
        prev.maxX = Math.max(prev.maxX, item.bounds.maxX);
        prev.maxY = Math.max(prev.maxY, item.bounds.maxY);
        prev.w = prev.maxX - prev.minX;
        prev.h = prev.maxY - prev.minY;
        prev.cx = (prev.minX + prev.maxX) / 2;
        prev.cy = (prev.minY + prev.maxY) / 2;
      } else {
        groups.push({ items: [item], ...item.bounds });
      }
    }

    const perCharCandidates = groups.map(g => this.classifyCharacterWithScores(g, medianH));
    let primary = perCharCandidates.map(c => c[0]?.char || '').join('');

    // Ta fram upp till 3 alternativa gissningar om någon siffra låg nära en annan
    const altSet = new Set();
    if (primary) altSet.add(primary);

    for (let i = 0; i < perCharCandidates.length; i++) {
      if (perCharCandidates[i].length > 1) {
        const chars = perCharCandidates.map((c, idx) => (idx === i ? c[1].char : c[0].char));
        altSet.add(chars.join(''));
      }
    }

    if (primary.includes('=')) {
      const afterEq = primary.split('=').pop();
      if (afterEq) primary = afterEq;
    }

    return {
      primary,
      alternatives: Array.from(altSet).slice(0, 4)
    };
  }

  normalizePoints01(pts) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    const w = Math.max(1e-4, maxX - minX);
    const h = Math.max(1e-4, maxY - minY);
    return pts.map(p => ({
      x: (maxX - minX) > 1e-3 ? (p.x - minX) / w : 0.5,
      y: (maxY - minY) > 1e-3 ? (p.y - minY) / h : 0.5
    }));
  }

  classifyCharacterWithScores(group, medianH) {
    const { w, h, minX, minY, items } = group;

    // 1. Kommatecken
    if (h < medianH * 0.42 && w < medianH * 0.42) {
      return [{ char: ',', score: 100 }];
    }

    // 2. Minustecken eller likhetstecken
    if (w > h * 2.3) {
      return [{ char: items.length >= 2 ? '=' : '-', score: 100 }];
    }

    // 3. Smalt vertikalt streck -> Siffran 1
    if (w / h < 0.38 && items.length === 1) {
      return [{ char: '1', score: 100 }, { char: '7', score: 35 }];
    }

    // Samla alla punkter och normalisera till [0, 1] x [0, 1]
    const rawPts = [];
    items.forEach(it => {
      const subResampled = this.resamplePolyline(it.stroke.points, Math.max(12, Math.round(24 / items.length)));
      subResampled.forEach(p => {
        rawPts.push({
          x: w > 4 ? (p.x - minX) / w : 0.5,
          y: h > 4 ? (p.y - minY) / h : 0.5
        });
      });
    });

    const resampled = this.normalizePoints01(this.resamplePolyline(rawPts, 24));
    if (resampled.length === 0) return [{ char: '0', score: 10 }];

    const pStart = resampled[0];
    const pEnd = resampled[resampled.length - 1];
    const startEndDist = Math.hypot(pStart.x - pEnd.x, pStart.y - pEnd.y);

    let centerCount = 0;
    let minBottomLeftX = 1.0;
    let minBottomLeftIdx = -1;
    let maxTopRightX = 0.0;

    resampled.forEach((p, idx) => {
      if (p.x > 0.3 && p.x < 0.7 && p.y > 0.3 && p.y < 0.7) centerCount++;
      if (idx < 15 && p.y < 0.55 && p.x > maxTopRightX) maxTopRightX = p.x;
      if (idx >= 8 && idx <= 21 && p.y > 0.6 && p.x < minBottomLeftX) {
        minBottomLeftX = p.x;
        minBottomLeftIdx = idx;
      }
    });
    const centerRatio = centerCount / resampled.length;

    const scores = {};
    for (const [digit, templates] of Object.entries(DIGIT_TEMPLATES)) {
      let bestDist = Infinity;
      for (const tpl of templates) {
        const tplPts = this.normalizePoints01(
          this.resamplePolyline(tpl.map(([x, y]) => ({ x, y })), 24)
        );
        let dSum = 0;
        for (let i = 0; i < 24; i++) {
          dSum += Math.hypot(resampled[i].x - tplPts[i].x, resampled[i].y - tplPts[i].y);
        }
        const avgDist = dSum / 24;
        if (avgDist < bestDist) bestDist = avgDist;
      }
      scores[digit] = Math.max(0, Math.round((1 - bestDist) * 100));
    }

    // Om tecknet är brett (w/h >= 0.42) kan det inte vara siffran 1
    if (w / h >= 0.42) {
      scores['1'] -= 50;
    }

    // Siffran 2: Går ner till nere-vänster och avslutas med en linje åt HÖGER längs botten!
    const movesRightAtBottom =
      minBottomLeftIdx !== -1 &&
      pEnd.y > 0.62 &&
      pEnd.x - minBottomLeftX > 0.32 &&
      pEnd.x > 0.52;

    if (movesRightAtBottom && pStart.y < 0.55 && maxTopRightX > 0.55) {
      scores['2'] += 45;
      scores['3'] -= 30;
      scores['4'] -= 30;
    }

    // Siffran 3 vs 5: Båda avslutas med en båge åt VÄNSTER längst ner,
    // men 3 går åt höger i toppen medan 5 går ner på VÄNSTER sida i övre halvan!
    const lastDx = pEnd.x - resampled[18].x;
    let upperLeftCount = 0;
    for (let i = 2; i <= 11; i++) {
      if (resampled[i].x < 0.28 && resampled[i].y > 0.12 && resampled[i].y < 0.58) {
        upperLeftCount++;
      }
    }
    if (lastDx < -0.15 && pEnd.y > 0.65 && pStart.y < 0.4) {
      scores['2'] -= 35;
      if (upperLeftCount >= 2 || pStart.x > 0.55) {
        scores['5'] += 25;
      } else if (pStart.x < 0.45) {
        scores['3'] += 25;
      }
    }

    // Siffran 4: Slutar med ett rakt vertikalt streck rakt ner (pEnd.y > 0.85 och sista delen har nästan samma x)
    const endVerticalDx = Math.abs(pEnd.x - resampled[19].x);
    const endVerticalDy = pEnd.y - resampled[19].y;
    if (pEnd.y > 0.85 && endVerticalDy > 0.15 && endVerticalDx < 0.12 && pStart.y < 0.3) {
      if (pEnd.x > 0.45 && pEnd.x < 0.85) {
        scores['4'] += 28;
        scores['6'] -= 25;
      }
    }

    // Siffran 0 vs 8: Sluten loop
    if (items.length === 1 && startEndDist < 0.35) {
      if (centerRatio < 0.1) {
        scores['0'] += 40;
      } else {
        scores['8'] += 35;
      }
    }

    // Två streck (4, 5, 7)
    if (items.length === 2) {
      const b0 = items[0].bounds;
      const b1 = items[1].bounds;
      const hasVerticalBar = (b0.w / b0.h < 0.42 && b0.h > h * 0.55) || (b1.w / b1.h < 0.42 && b1.h > h * 0.55);
      const horizStroke = b0.w > b0.h * 1.5 ? b0 : (b1.w > b1.h * 1.5 ? b1 : null);

      if (hasVerticalBar) {
        scores['4'] += 60;
      } else if (horizStroke) {
        const relCy = (horizStroke.cy - minY) / Math.max(1, h);
        if (relCy < 0.32) {
          scores['5'] += 55;
        } else if (relCy >= 0.32 && relCy <= 0.75) {
          scores['7'] += 55;
        }
      } else {
        scores['5'] += 30;
        scores['4'] += 25;
      }
    }

    const ranked = Object.entries(scores)
      .map(([char, score]) => ({ char, score }))
      .sort((a, b) => b.score - a.score);

    return ranked.slice(0, 3);
  }

  onAnswerCircled(circledResult) {
    const val = circledResult.recognizedText;
    if (val) {
      this.fillAnswerInput(val);
    }
    this.showCircledBanner(val, circledResult.alternatives || []);

    if (this.tool === 'circle-answer') {
      this.tool = 'pen';
      document.querySelectorAll('[data-draw-tool]').forEach(b =>
        b.classList.toggle('active', b.dataset.drawTool === 'pen')
      );
    }
  }

  showCircledBanner(recognizedVal, alternatives = []) {
    let banner = document.getElementById('circled-answer-banner');
    const container = this.canvas?.parentElement;
    if (!container) return;

    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'circled-answer-banner';
      banner.className = 'circled-answer-banner';
      container.appendChild(banner);
    }

    const otherAlts = alternatives.filter(a => a && a !== recognizedVal).slice(0, 2);
    const altButtonsHtml = otherAlts.length > 0
      ? `<div class="circled-alts">
          <span>Eller:</span>
          ${otherAlts.map(a => `<button type="button" class="alt-chip-btn" data-pick-alt="${this.escapeAttr(a)}">${this.escapeAttr(a)}</button>`).join('')}
        </div>`
      : '';

    banner.classList.remove('hidden');
    banner.innerHTML = `
      <span class="circled-tag">⭕ Ditt svar:</span>
      <input
        type="text"
        id="circled-answer-edit"
        class="circled-edit-input"
        value="${this.escapeAttr(recognizedVal)}"
        placeholder="Svar..."
        aria-label="Tolkning av inringat svar"
      />
      ${altButtonsHtml}
      <button type="button" class="btn-accent btn-sm" id="btn-submit-circled-now">
        ✓ Rätta nu!
      </button>
    `;

    const editInp = banner.querySelector('#circled-answer-edit');
    if (editInp) {
      editInp.addEventListener('input', () => {
        this.fillAnswerInput(editInp.value);
      });
      editInp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.fillAnswerInput(editInp.value);
          window.matteApp?.handleAnswerSubmit();
        }
      });
    }

    banner.querySelectorAll('[data-pick-alt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const picked = btn.dataset.pickAlt;
        if (editInp) editInp.value = picked;
        this.fillAnswerInput(picked);
      });
    });

    const submitNowBtn = banner.querySelector('#btn-submit-circled-now');
    if (submitNowBtn) {
      submitNowBtn.addEventListener('click', () => {
        if (editInp) this.fillAnswerInput(editInp.value);
        window.matteApp?.handleAnswerSubmit();
      });
    }
  }

  hideCircledBanner() {
    const banner = document.getElementById('circled-answer-banner');
    if (banner) banner.classList.add('hidden');
  }

  stampCoordinateAxes() {
    this.syncCanvasSizeIfNeeded();
    const w = this.logicalW || 360;
    const h = this.logicalH || 240;
    const cx = Math.round(w / 2 / 24) * 24;
    const cy = Math.round(h / 2 / 24) * 24;

    this.strokes.push({
      tool: 'line',
      color: '#475569',
      width: 2,
      alpha: 1,
      points: [{ x: 24, y: cy }, { x: w - 24, y: cy }]
    });
    this.strokes.push({
      tool: 'line',
      color: '#475569',
      width: 2,
      alpha: 1,
      points: [{ x: cx, y: 20 }, { x: cx, y: h - 20 }]
    });
    this.redrawAll();
    this.updateWorkStatusBadge();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return;

    const dpr = window.devicePixelRatio || 1;
    this.dpr = dpr;
    this.logicalW = rect.width;
    this.logicalH = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.redrawAll();
  }

  drawBackground(w, h) {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, w, h);

    const step = 24;
    if (this.gridType === 'grid') {
      this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.22)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      for (let x = step; x < w; x += step) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, h);
      }
      for (let y = step; y < h; y += step) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(w, y);
      }
      this.ctx.stroke();

      this.ctx.strokeStyle = 'rgba(244, 63, 94, 0.28)';
      this.ctx.beginPath();
      this.ctx.moveTo(48, 0);
      this.ctx.lineTo(48, h);
      this.ctx.stroke();
    } else if (this.gridType === 'dots') {
      this.ctx.fillStyle = 'rgba(71, 85, 105, 0.38)';
      for (let x = step; x < w; x += step) {
        for (let y = step; y < h; y += step) {
          this.ctx.beginPath();
          this.ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }

  drawSingleStroke(s) {
    if (!s || !s.points || s.points.length === 0) return;
    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.globalAlpha = s.alpha || 1;

    if (s.dashed) {
      this.ctx.setLineDash([6, 4]);
    }
    this.ctx.lineWidth = s.width;
    const pts = s.points;

    if (s.tool === 'eraser') {
      this.ctx.strokeStyle = '#ffffff';
    } else if (s.penFx === 'rainbow' && pts.length > 1) {
      // Regnbågspenna: varje segment skiftar färg!
      for (let i = 1; i < pts.length; i++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `hsl(${(i * 14) % 360}, 90%, 45%)`;
        this.ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        this.ctx.lineTo(pts[i].x, pts[i].y);
        this.ctx.stroke();
      }
      this.ctx.restore();
      return;
    } else if (s.penFx === 'neon') {
      this.ctx.strokeStyle = '#7c3aed';
      this.ctx.shadowColor = '#ec4899';
      this.ctx.shadowBlur = 8;
    } else if (s.penFx === 'fire') {
      this.ctx.strokeStyle = '#ea580c';
      this.ctx.shadowColor = '#facc15';
      this.ctx.shadowBlur = 6;
    } else {
      this.ctx.strokeStyle = s.color;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(pts[0].x, pts[0].y);
    if (pts.length === 1) {
      this.ctx.lineTo(pts[0].x + 0.5, pts[0].y + 0.5);
    } else {
      for (let i = 1; i < pts.length; i++) {
        this.ctx.lineTo(pts[i].x, pts[i].y);
      }
    }
    this.ctx.stroke();
    this.ctx.restore();
  }

  redrawAll() {
    if (!this.canvas || !this.ctx) return;
    const w = this.logicalW || this.canvas.clientWidth;
    const h = this.logicalH || this.canvas.clientHeight;
    this.drawBackground(w, h);

    for (const s of this.strokes) {
      this.drawSingleStroke(s);
    }
    if (this.currentStroke) {
      this.drawSingleStroke(this.currentStroke);
    }

    if (this.hoverPos) {
      this.ctx.save();
      this.ctx.beginPath();
      const radius = this.tool === 'eraser' ? 12 : 4;
      this.ctx.arc(this.hoverPos.x, this.hoverPos.y, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = this.tool === 'eraser' ? '#ef4444' : (this.tool === 'circle-answer' ? '#10b981' : this.color);
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // TANGENTBORDS-UTRÄKNING
  // --------------------------------------------------------------------------
  bindKeyboardWorkspace() {
    document.querySelectorAll('[data-insert-sym]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.insertSymbolInActiveStep(btn.dataset.insertSym);
      });
    });

    const addStepBtn = document.getElementById('btn-add-step');
    if (addStepBtn) {
      addStepBtn.addEventListener('click', () => this.addStep());
    }

    const clearStepsBtn = document.getElementById('btn-clear-steps');
    if (clearStepsBtn) {
      clearStepsBtn.addEventListener('click', () => {
        this.steps = [
          { id: 1, math: '', note: '' },
          { id: 2, math: '', note: '' }
        ];
        this.renderSteps();
        this.updateWorkStatusBadge();
      });
    }

    const copyToAnsBtn = document.getElementById('btn-copy-last-step');
    if (copyToAnsBtn) {
      copyToAnsBtn.addEventListener('click', () => this.copyLastResultToAnswer());
    }
  }

  renderSteps() {
    const list = document.getElementById('keyboard-steps-list');
    if (!list) return;
    list.innerHTML = '';

    this.steps.forEach((step, idx) => {
      const row = document.createElement('div');
      row.className = 'step-row';
      row.innerHTML = `
        <span class="step-badge">Steg ${idx + 1}</span>
        <input
          type="text"
          class="step-math-input"
          placeholder="Skriv uträkning (t.ex. 800 / 4 = 200)..."
          value="${this.escapeAttr(step.math)}"
          data-step-idx="${idx}"
          data-field="math"
          aria-label="Uträkning steg ${idx + 1}"
        />
        <button type="button" class="step-eval-btn" data-eval-idx="${idx}" title="Räkna ut raden">=</button>
        <button type="button" class="step-send-ans-btn" data-send-ans-idx="${idx}" title="Skicka talet till Ditt svar!">➡️ Svar</button>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('focus', () => {
        this.activeInputEl = inp;
      });
      inp.addEventListener('input', () => {
        const i = Number(inp.dataset.stepIdx);
        const field = inp.dataset.field;
        if (field === 'math') {
          const pos = inp.selectionStart;
          const formatted = inp.value
            .replace(/->/g, '⇒')
            .replace(/<=/g, '≤')
            .replace(/>=/g, '≥')
            .replace(/\^2/g, '²')
            .replace(/\^3/g, '³')
            .replace(/sqrt\(/gi, '√(');
          if (formatted !== inp.value) {
            inp.value = formatted;
            inp.setSelectionRange(pos, pos);
          }
        }
        this.steps[i][field] = inp.value;
        this.updateWorkStatusBadge();
      });

      inp.addEventListener('keydown', (e) => {
        const i = Number(inp.dataset.stepIdx);
        if (e.key === 'Enter') {
          e.preventDefault();
          this.evaluateStepMath(i, false);
          if (i === this.steps.length - 1) {
            this.addStep(i + 1);
          } else {
            const nextInput = list.querySelector(`input[data-step-idx="${i + 1}"][data-field="math"]`);
            if (nextInput) nextInput.focus();
          }
        }
      });
    });

    list.querySelectorAll('[data-eval-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.evalIdx);
        this.evaluateStepMath(idx, true);
      });
    });

    list.querySelectorAll('[data-send-ans-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.sendAnsIdx);
        this.evaluateStepMath(idx, false);
        this.sendStepValueToAnswer(idx);
      });
    });
  }

  evaluateStepMath(idx, reRender = true) {
    const raw = (this.steps[idx]?.math || '').trim();
    if (!raw) return null;
    const parts = raw.split('=');
    const exprToEval = parts[parts.length - 1].trim();
    const res = this.safeEvalMath(exprToEval);
    if (res !== null) {
      const formattedRes = String(Math.round(res * 10000) / 10000).replace('.', ',');
      if (!raw.endsWith(`= ${formattedRes}`) && exprToEval !== formattedRes) {
        this.steps[idx].math = `${raw} = ${formattedRes}`;
        if (reRender) this.renderSteps();
        this.updateWorkStatusBadge();
      }
      return formattedRes;
    }
    return null;
  }

  sendStepValueToAnswer(idx) {
    const raw = (this.steps[idx]?.math || '').trim();
    if (!raw) return;
    const arrowParts = raw.split('⇒');
    const lastClause = arrowParts[arrowParts.length - 1].trim();
    const eqParts = lastClause.split('=');
    const candidate = eqParts[eqParts.length - 1].trim();
    this.fillAnswerInput(candidate);
  }

  fillAnswerInput(val) {
    const ansInput = document.getElementById('answer-input');
    if (ansInput && val !== undefined && val !== null) {
      ansInput.value = val;
      ansInput.classList.add('input-flash');
      setTimeout(() => ansInput.classList.remove('input-flash'), 500);
    }
  }

  appendHelperStepText(text) {
    const emptyIdx = this.steps.findIndex(s => !s.math.trim());
    if (emptyIdx !== -1) {
      this.steps[emptyIdx].math = text;
    } else {
      this.steps.push({ id: this.steps.length + 1, math: text, note: '' });
    }
    this.renderSteps();
    this.updateWorkStatusBadge();
  }

  safeEvalMath(expr) {
    try {
      const clean = expr
        .replace(/,/g, '.')
        .replace(/·/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/²/g, '**2')
        .replace(/³/g, '**3')
        .replace(/π/g, '3.14159265')
        .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
        .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
      if (!/^[0-9+\-*/().\sMathsqrt]+$/.test(clean)) return null;
      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${clean});`)();
      if (typeof val === 'number' && Number.isFinite(val)) return val;
      return null;
    } catch {
      return null;
    }
  }

  addStep(focusIdx = null) {
    this.steps.push({ id: this.steps.length + 1, math: '', note: '' });
    this.renderSteps();
    const targetIdx = focusIdx !== null ? focusIdx : this.steps.length - 1;
    const nextInput = document.querySelector(`input[data-step-idx="${targetIdx}"][data-field="math"]`);
    if (nextInput) nextInput.focus();
  }

  insertSymbolInActiveStep(sym) {
    let target = this.activeInputEl;
    if (!target || !document.body.contains(target)) {
      target = document.querySelector('input[data-step-idx="0"][data-field="math"]');
    }
    if (!target) return;

    const start = target.selectionStart ?? target.value.length;
    const end = target.selectionEnd ?? target.value.length;
    const before = target.value.slice(0, start);
    const after = target.value.slice(end);
    target.value = before + sym + after;
    target.focus();
    const newPos = start + sym.length;
    target.setSelectionRange(newPos, newPos);

    const idx = Number(target.dataset.stepIdx);
    const field = target.dataset.field;
    if (!Number.isNaN(idx) && this.steps[idx]) {
      this.steps[idx][field] = target.value;
      this.updateWorkStatusBadge();
    }
  }

  copyLastResultToAnswer() {
    for (let i = this.steps.length - 1; i >= 0; i--) {
      if (this.steps[i].math.trim()) {
        this.evaluateStepMath(i, false);
        this.sendStepValueToAnswer(i);
        return;
      }
    }
  }

  bindCalculator() {
    const toggleBtn = document.getElementById('btn-toggle-calc');
    const panel = document.getElementById('calculator-popover');
    if (toggleBtn && panel) {
      toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
      });
    }

    document.querySelectorAll('[data-calc-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.calcAllowed) return;
        const key = btn.dataset.calcKey;
        const disp = document.getElementById('calc-display');
        if (!disp) return;

        if (key === 'C') {
          this.calcExpression = '';
        } else if (key === 'BACK') {
          this.calcExpression = this.calcExpression.slice(0, -1);
        } else if (key === '=') {
          const val = this.safeEvalMath(this.calcExpression);
          if (val !== null) {
            this.calcExpression = String(Math.round(val * 100000) / 100000).replace('.', ',');
          }
        } else if (key === 'sqrt') {
          const val = this.safeEvalMath(this.calcExpression);
          if (val !== null && val >= 0) {
            this.calcExpression = String(Math.round(Math.sqrt(val) * 100000) / 100000).replace('.', ',');
          }
        } else {
          this.calcExpression += key;
        }
        disp.value = this.calcExpression || '0';
      });
    });

    const useCalcBtn = document.getElementById('btn-calc-to-step');
    if (useCalcBtn) {
      useCalcBtn.addEventListener('click', () => {
        if (!this.calcExpression) return;
        this.fillAnswerInput(this.calcExpression);
      });
    }
  }

  setCalculatorAllowed(allowed, partName = 'B') {
    this.calcAllowed = allowed;
    const badge = document.getElementById('calc-lock-status');
    const calcBtn = document.getElementById('btn-toggle-calc');
    const calcBody = document.getElementById('calc-keys-container');

    if (badge) {
      if (allowed) {
        badge.textContent = `🖩 Delprov ${partName}: Miniräknare TILLÅTEN`;
        badge.className = 'part-tool-badge allowed';
      } else {
        badge.textContent = `🚫 Delprov ${partName}: UTAN miniräknare`;
        badge.className = 'part-tool-badge locked';
      }
    }
    if (calcBtn) {
      calcBtn.classList.toggle('locked', !allowed);
    }
    if (calcBody) {
      calcBody.classList.toggle('disabled-calc', !allowed);
    }
  }

  hasShownWork() {
    const hasDrawing = this.strokes.length >= 2;
    const hasKeyboardSteps = this.steps.some(s => s.math.trim().length >= 2);
    return hasDrawing || hasKeyboardSteps;
  }

  updateWorkStatusBadge() {
    const el = document.getElementById('work-bonus-indicator');
    if (!el) return;
    if (this.hasShownWork()) {
      el.textContent = '✅ Uträkning visad (+25 XP bonus!)';
      el.classList.add('active');
    } else {
      el.textContent = '✍️ Visa uträkning = +25 XP bonus • ⭕ Ringa in ditt svar på pappret!';
      el.classList.remove('active');
    }
  }

  resetForNewQuestion() {
    this.strokes = [];
    this.steps = [
      { id: 1, math: '', note: '' },
      { id: 2, math: '', note: '' }
    ];
    this.calcExpression = '';
    this.hideCircledBanner();
    const disp = document.getElementById('calc-display');
    if (disp) disp.value = '0';
    this.syncCanvasSizeIfNeeded();
    this.redrawAll();
    this.renderSteps();
    this.updateWorkStatusBadge();
  }

  escapeAttr(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

window.CalculationWorkspace = CalculationWorkspace;
