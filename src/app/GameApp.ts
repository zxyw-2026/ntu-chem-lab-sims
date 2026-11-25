import {
  CALIB_STEPS,
  CATALOG,
  HOAC_STEPS,
  NAOAC_STEPS,
  PHASE_TITLES,
  SAMPLES,
  type Choice,
} from '../experiments/e12/config';
import { formatPh, simulatePh } from '../experiments/e12/chemistry';
import {
  BUFFER_VOLUME_ML,
  CM_EQL,
  SAMPLE_LABELS,
  bufferCapacityMeq,
  phAt,
  slopePhPerDrop,
} from '../experiments/e12/dataTable';
import {
  canAdvance,
  createInitialState,
  createSkipToPhase5State,
  gradeSelection,
  MEASURE_RUNS,
  recipeMatches,
  type GameState,
} from '../experiments/e12/phases';
import { pickChoices, shuffle } from '../shared/random';
import { toast } from '../shared/toast';
import { renderHud } from './ui/Hud';

function initialStateFromUrl(): GameState {
  const params = new URLSearchParams(window.location.search);
  const skip = params.get('skipTo') ?? params.get('skip');
  // ?skipTo=5 或 ?skipTo=6 → 直接檢視最後測定／緩衝容量關
  if (skip === '5' || skip === '6' || skip === 'phase5') {
    const stage =
      params.get('stage') === 'demo'
        ? 'demo'
        : params.get('stage') === 'check'
          ? 'check'
          : 'capacity';
    return createSkipToPhase5State(stage);
  }
  return createInitialState();
}

export class GameApp {
  private state: GameState = initialStateFromUrl();
  private root: HTMLElement;
  /** Cached shuffled choices for current decision so re-render doesn't reshuffle. */
  private choiceCache: { key: string; choices: Choice[] } | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.render();
  }

  private setState(patch: Partial<GameState>): void {
    Object.assign(this.state, patch);
    this.render();
  }

  private choicesFor(key: string, correct: Choice, wrongs: Choice[], total = 4): Choice[] {
    if (this.choiceCache?.key === key) return this.choiceCache.choices;
    const choices = pickChoices(correct, wrongs, total);
    this.choiceCache = { key, choices };
    return choices;
  }

  private clearChoices(): void {
    this.choiceCache = null;
  }

  private advance(): void {
    if (!canAdvance(this.state)) {
      toast('本階段還沒過關，再想想看', 'err');
      return;
    }
    if (this.state.phase === 5) {
      this.clearChoices();
      this.setState({ cleared: true });
      toast('實驗完成！通關成功', 'ok');
      return;
    }
    this.clearChoices();
    const next = (this.state.phase + 1) as GameState['phase'];
    this.setState({ phase: next });
    toast(`進入：${PHASE_TITLES[next]}`, 'ok');
  }

  private render(): void {
    if (this.state.cleared) {
      this.renderVictory();
      return;
    }

    this.root.innerHTML = `
      <div class="layout">
        <header class="topbar">
          <div class="topbar__left">
            <span class="badge">LAB SIM</span>
            <strong>E12 緩衝溶液虛擬實驗桌</strong>
            <a class="topbar-link" href="/">選單</a>
          </div>
          <div class="topbar__hint">${PHASE_TITLES[this.state.phase]}</div>
        </header>
        <aside class="sidebar" id="hud"></aside>
        <main class="bench-wrap"><div class="bench" id="bench"></div></main>
      </div>
    `;

    renderHud(this.root.querySelector('#hud')!, this.state, () => this.advance());
    this.renderPhase(this.root.querySelector('#bench')!);
  }

  private renderVictory(): void {
    this.root.innerHTML = `
      <div class="victory">
        <div class="victory__card">
          <p class="victory__eyebrow">CLEAR</p>
          <h1>通關成功</h1>
          <p>你靠判斷完成了 E12：分辨器材、校正順序、配製關鍵量、自行計算滴體積、依配方配試樣，並理解緩衝與非緩衝的 pH 差異。</p>
          <button class="btn btn--primary" id="btn-replay">再玩一次（選項會重洗）</button>
        </div>
      </div>
    `;
    this.root.querySelector('#btn-replay')?.addEventListener('click', () => {
      this.clearChoices();
      this.state = createInitialState();
      this.render();
    });
  }

  private renderPhase(bench: HTMLElement): void {
    switch (this.state.phase) {
      case 0:
        this.renderPhase0(bench);
        break;
      case 1:
        this.renderPhase1(bench);
        break;
      case 2:
        this.renderPhase2(bench);
        break;
      case 3:
        this.renderPhase3(bench);
        break;
      case 4:
        this.renderPhase4(bench);
        break;
      case 5:
        this.renderPhase5(bench);
        break;
    }
  }

  /* ========== Phase 0：打亂＋提交批改 ========== */
  private renderPhase0(bench: HTMLElement): void {
    const byId = Object.fromEntries(CATALOG.map((c) => [c.id, c]));
    const items = this.state.catalogOrder.map((id) => byId[id]).filter(Boolean);

    bench.innerHTML = `
      <section class="panel">
        <h2>領取站：你會帶走哪些？</h2>
        <p class="lede">下方器材／藥品已打亂，也混入其他實驗會用的東西。請只勾選 <strong>E12 緩衝溶液</strong> 真正需要的項目，再按「提交檢查」。答錯會告訴你為什麼，可重選。</p>
        <div class="item-grid" id="catalog"></div>
        <div class="panel__actions">
          <button class="btn" id="btn-clear">清除勾選</button>
          <button class="btn btn--primary" id="btn-submit" style="width:auto;min-width:160px">提交檢查</button>
        </div>
        <p class="hint-line">提示：想想「要校正什麼、配什麼溶液、怎麼測緩衝能力」——不要把 E8／E10 的東西帶進來。</p>
      </section>
    `;

    const grid = bench.querySelector('#catalog')!;
    grid.innerHTML = items
      .map((item) => {
        const on = this.state.selected.has(item.id);
        return `<button type="button" class="item-card ${on ? 'is-selected' : ''}" data-id="${item.id}">
          <span class="item-card__icon">${item.icon}</span>
          <span class="item-card__label">${item.label}</span>
        </button>`;
      })
      .join('');

    grid.querySelectorAll<HTMLButtonElement>('.item-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.state.phase0Passed) return;
        const id = btn.dataset.id!;
        if (this.state.selected.has(id)) this.state.selected.delete(id);
        else this.state.selected.add(id);
        this.render();
      });
    });

    bench.querySelector('#btn-clear')?.addEventListener('click', () => {
      this.state.selected.clear();
      this.state.phase0Passed = false;
      this.render();
    });

    bench.querySelector('#btn-submit')?.addEventListener('click', () => {
      this.state.phase0Attempts += 1;
      const result = gradeSelection(this.state.selected);
      if (result.ok) {
        this.state.phase0Passed = true;
        toast('器材檢查通過！你選對了 E12 所需項目', 'ok');
        this.render();
        return;
      }
      this.state.phase0Passed = false;
      const msgs: string[] = [];
      if (result.extras.length) {
        const first = byId[result.extras[0]];
        msgs.push(`多選了「${first.label}」：${first.hint}`);
      }
      if (result.missing.length) {
        const first = byId[result.missing[0]];
        msgs.push(`少了「${first.label}」：${first.hint}`);
      }
      toast(msgs[0] ?? '選取不正確', 'err');
      if (msgs[1]) window.setTimeout(() => toast(msgs[1], 'info'), 900);
      this.render();
    });
  }

  /* ========== Phase 1：全部列出 → 排順序 ========== */
  private renderPhase1(bench: HTMLElement): void {
    const labelOf = Object.fromEntries(CALIB_STEPS.map((s) => [s.id, s.label]));
    const done = this.state.calibSolved;
    const order = this.state.calibOrder;

    bench.innerHTML = `
      <section class="panel panel--split">
        <div class="ph-meter ${done ? 'is-on' : ''}">
          <div class="ph-meter__screen">
            <div class="ph-meter__mode">pH</div>
            <div class="ph-meter__value">${done ? 'ready' : '— —'}</div>
            <div class="ph-meter__status">${done ? 'OK' : '待校正'}</div>
          </div>
          <div class="ph-meter__knobs"><span>CALIB.</span><span>SLOPE</span><span>MODE</span><span>HOLD</span></div>
          <div class="ph-meter__probe">電極 · 測溫棒</div>
        </div>
        <div class="step-board">
          <h2>校正關卡：排出正確順序</h2>
          <p class="lede">以下是校正時會用到的步驟（已打亂）。<strong>按住拖曳</strong>到目標位置即可重排，排好後按「提交順序」。</p>
          ${
            done
              ? `<p class="ok-banner">順序正確：先 pH 7.00（CALIB.）再 pH 4.00（SLOPE）。</p>`
              : `<ol class="sort-list" id="sort-list">
                  ${order
                    .map(
                      (id, i) => `
                    <li class="sort-item" data-index="${i}" draggable="true">
                      <span class="sort-item__handle" aria-hidden="true">⠿</span>
                      <span class="sort-item__num">${i + 1}</span>
                      <span class="sort-item__text">${labelOf[id]}</span>
                    </li>`,
                    )
                    .join('')}
                </ol>
                <div class="panel__actions">
                  <button class="btn" id="btn-reshuffle">重新打亂</button>
                  <button class="btn btn--primary" id="btn-submit-order" style="width:auto;min-width:140px">提交順序</button>
                </div>`
          }
        </div>
      </section>
    `;

    this.bindSortList(
      bench,
      () => this.state.calibOrder,
      (next) => {
        this.state.calibOrder = next;
      },
      () => {
        const expected = CALIB_STEPS.map((s) => s.id);
        if (this.state.calibOrder.join() === expected.join()) {
          this.state.calibSolved = true;
          toast('校正順序正確！', 'ok');
        } else {
          const firstWrong = expected.findIndex((id, i) => this.state.calibOrder[i] !== id);
          const want = labelOf[expected[firstWrong]];
          toast(`第 ${firstWrong + 1} 步不對：那裡應是「${want}」`, 'err');
        }
        this.render();
      },
      () => {
        this.state.calibOrder = shuffle(CALIB_STEPS.map((s) => s.id));
        this.render();
      },
    );
  }

  /* ========== Phase 2：全部列出 → 排順序 ========== */
  private renderPhase2(bench: HTMLElement): void {
    const track = this.state.prepTrack;
    const steps = track === 'hoac' ? HOAC_STEPS : NAOAC_STEPS;
    const order = track === 'hoac' ? this.state.hoacOrder : this.state.naoacOrder;
    const solved = track === 'hoac' ? this.state.hoacSolved : this.state.naoacSolved;
    const labelOf = Object.fromEntries(steps.map((s) => [s.id, s.label]));
    const bothDone = this.state.hoacSolved && this.state.naoacSolved;

    bench.innerHTML = `
      <section class="panel">
        <h2>配製關卡：排出操作順序</h2>
        <p class="lede">HOAc 與 NaOAc 的步驟都已列出但順序打亂。先選要排哪一組，再<strong>拖曳</strong>調整順序後提交。注意標籤上的關鍵數字（0.74 mL、1.70 g、250 mL）。</p>
        <div class="chip-row">
          <button type="button" class="chip ${track === 'hoac' ? 'is-on' : ''}" data-track="hoac">配 HOAc ${this.state.hoacSolved ? '✓' : ''}</button>
          <button type="button" class="chip ${track === 'naoac' ? 'is-on' : ''}" data-track="naoac">配 NaOAc ${this.state.naoacSolved ? '✓' : ''}</button>
        </div>
        ${
          bothDone
            ? `<p class="ok-banner">兩種溶液的配製順序都正確了。</p>`
            : solved
              ? `<p class="ok-banner">${track === 'hoac' ? 'HOAc' : 'NaOAc'} 順序正確。請切換去排另一組。</p>`
              : `<p class="challenge-q">正在排：${track === 'hoac' ? '0.050 M HOAc' : '0.050 M NaOAc'}（拖曳排序）</p>
                <ol class="sort-list">
                  ${order
                    .map(
                      (id, i) => `
                    <li class="sort-item" data-index="${i}" draggable="true">
                      <span class="sort-item__handle" aria-hidden="true">⠿</span>
                      <span class="sort-item__num">${i + 1}</span>
                      <span class="sort-item__text">${labelOf[id]}</span>
                    </li>`,
                    )
                    .join('')}
                </ol>
                <div class="panel__actions">
                  <button class="btn" id="btn-reshuffle">重新打亂</button>
                  <button class="btn btn--primary" id="btn-submit-order" style="width:auto;min-width:140px">提交順序</button>
                </div>`
        }
      </section>
    `;

    bench.querySelectorAll<HTMLButtonElement>('[data-track]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setState({ prepTrack: btn.dataset.track as 'hoac' | 'naoac' });
      });
    });

    if (!solved && !bothDone) {
      this.bindSortList(
        bench,
        () => (track === 'hoac' ? this.state.hoacOrder : this.state.naoacOrder),
        (next) => {
          if (track === 'hoac') this.state.hoacOrder = next;
          else this.state.naoacOrder = next;
        },
        () => {
          const expected = steps.map((s) => s.id);
          const current = track === 'hoac' ? this.state.hoacOrder : this.state.naoacOrder;
          if (current.join() === expected.join()) {
            if (track === 'hoac') this.state.hoacSolved = true;
            else this.state.naoacSolved = true;
            toast('順序正確！', 'ok');
          } else {
            const firstWrong = expected.findIndex((id, i) => current[i] !== id);
            toast(`第 ${firstWrong + 1} 步不對：應是「${labelOf[expected[firstWrong]]}」`, 'err');
          }
          this.render();
        },
        () => {
          const next = shuffle(steps.map((s) => s.id));
          if (track === 'hoac') this.state.hoacOrder = next;
          else this.state.naoacOrder = next;
          this.render();
        },
      );
    }
  }

  private bindSortList(
    root: HTMLElement,
    getOrder: () => string[],
    setOrder: (next: string[]) => void,
    onSubmit: () => void,
    onReshuffle: () => void,
  ): void {
    const list = root.querySelector('.sort-list');
    if (!list) return;

    let fromIndex: number | null = null;

    const clearIndicators = () => {
      list.querySelectorAll('.sort-item').forEach((el) => {
        el.classList.remove('drag-over-before', 'drag-over-after', 'is-dragging');
      });
    };

    list.querySelectorAll<HTMLElement>('.sort-item').forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        fromIndex = Number(item.dataset.index);
        item.classList.add('is-dragging');
        e.dataTransfer?.setData('text/plain', String(fromIndex));
        e.dataTransfer!.effectAllowed = 'move';
        // 讓拖曳預覽更清楚
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
      });

      item.addEventListener('dragend', () => {
        clearIndicators();
        fromIndex = null;
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
        const rect = item.getBoundingClientRect();
        const before = e.clientY < rect.top + rect.height / 2;
        list.querySelectorAll('.sort-item').forEach((el) => {
          el.classList.remove('drag-over-before', 'drag-over-after');
        });
        item.classList.add(before ? 'drag-over-before' : 'drag-over-after');
      });

      item.addEventListener('dragleave', () => {
        item.classList.remove('drag-over-before', 'drag-over-after');
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const raw = e.dataTransfer?.getData('text/plain');
        const from = fromIndex ?? (raw !== undefined && raw !== '' ? Number(raw) : NaN);
        const to = Number(item.dataset.index);
        if (!Number.isFinite(from) || !Number.isFinite(to)) {
          clearIndicators();
          return;
        }
        const rect = item.getBoundingClientRect();
        const before = e.clientY < rect.top + rect.height / 2;
        let insertAt = before ? to : to + 1;
        if (from < insertAt) insertAt -= 1;
        if (from === insertAt) {
          clearIndicators();
          return;
        }
        const order = [...getOrder()];
        const [moved] = order.splice(from, 1);
        order.splice(insertAt, 0, moved);
        setOrder(order);
        this.render();
      });
    });

    root.querySelector('#btn-submit-order')?.addEventListener('click', onSubmit);
    root.querySelector('#btn-reshuffle')?.addEventListener('click', onReshuffle);
  }

  /* ========== Phase 3：自己算平均 ========== */
  private resetDropTrial(keepReagent = true): void {
    const reagent = keepReagent ? this.state.drop.reagent : null;
    this.state.drop = {
      reagent,
      initialMl: false,
      drops: 0,
      finalMl: null,
      trueAvgUl: null,
      done: false,
    };
  }

  private renderPhase3(bench: HTMLElement): void {
    const d = this.state.drop;
    const deltaMl = d.drops * 0.05;
    const liveMl = d.initialMl ? 1 + deltaMl : 0;
    // 講義：約 30 滴、ΔV 至少約 1 mL → 遊戲接受 20～45 滴（ΔV≥1）即可計算
    const canCalculate = d.initialMl && d.drops >= 20 && deltaMl >= 1 - 1e-9;

    bench.innerHTML = `
      <section class="panel panel--split">
        <div class="drop-visual">
          <div class="cylinder">
            <div class="cylinder__liquid" style="height:${d.initialMl ? Math.min(92, 18 + d.drops * 1.4) : 0}%"></div>
            <span class="cylinder__label">10 mL 量筒</span>
            <span class="cylinder__reading">${d.initialMl ? `${liveMl.toFixed(2)} mL` : '空'}</span>
          </div>
        </div>
        <div class="step-board">
          <h2>一滴體積關卡</h2>
          <p class="lede">量筒先約 1 mL，再滴入<strong>大約 30 滴</strong>（不必剛好 30；重點是 ΔV≥約 1 mL）。再<strong>自己算出</strong>每滴平均 μL。滴錯可退回或整關重來。</p>
          <div class="chip-row">
            <button class="chip ${d.reagent === 'hcl' ? 'is-on' : ''}" data-r="hcl" ${d.done ? 'disabled' : ''}>使用 1.0 M HCl</button>
            <button class="chip ${d.reagent === 'naoh' ? 'is-on' : ''}" data-r="naoh" ${d.done ? 'disabled' : ''}>使用 1.0 M NaOH</button>
          </div>
          <div class="action-row stacked">
            <button class="btn" id="btn-init" ${d.reagent && !d.initialMl && !d.done ? '' : 'disabled'}>量筒先加入約 1.00 mL</button>
            <div class="drop-controls">
              <button class="btn" id="btn-undrop5" ${d.initialMl && d.drops >= 5 && !d.done ? '' : 'disabled'}>−5 滴</button>
              <button class="btn" id="btn-undrop" ${d.initialMl && d.drops >= 1 && !d.done ? '' : 'disabled'}>−1 滴</button>
              <span class="drop-count">目前 <strong>${d.drops}</strong> 滴 · ΔV ≈ ${deltaMl.toFixed(2)} mL</span>
              <button class="btn" id="btn-drop" ${d.initialMl && d.drops < 45 && !d.done ? '' : 'disabled'}>+1 滴</button>
              <button class="btn" id="btn-drop5" ${d.initialMl && d.drops <= 40 && !d.done ? '' : 'disabled'}>+5 滴</button>
            </div>
            <button class="btn" id="btn-drop-approx30" ${d.initialMl && !d.done ? '' : 'disabled'}>一次滴到約 30 滴</button>
          </div>
          <div class="panel__actions">
            <button class="btn" id="btn-reset-drop">倒掉重做（刷新本關）</button>
          </div>
          ${
            canCalculate && !d.done
              ? `<div class="calc-box">
                  <p>初始 ≈ 1.00 mL，目前讀數 ≈ <strong>${liveMl.toFixed(2)} mL</strong>，共 <strong>${d.drops}</strong> 滴（ΔV ≈ ${deltaMl.toFixed(2)} mL）。</p>
                  <p class="challenge-q">每滴平均體積是多少 μL？</p>
                  <p class="hint-line">公式：ΔV(mL) × 1000 ÷ 滴數。容許誤差 ±2 μL。</p>
                  <div class="calc-row">
                    <input id="avg-input" type="number" step="0.1" placeholder="輸入 μL" />
                    <button class="btn btn--primary" id="btn-check-avg" style="width:auto">核對答案</button>
                  </div>
                </div>`
              : d.done
                ? ''
                : `<p class="hint-line">再滴一些：建議約 20～45 滴（講義寫「約 30 滴」），且 ΔV 至少約 1 mL 後才會出現計算框。</p>`
          }
          ${d.done ? `<p class="ok-banner">計算正確：約 ${d.trueAvgUl!.toFixed(1)} μL／滴（${d.drops} 滴）</p>` : ''}
        </div>
      </section>
    `;

    bench.querySelectorAll<HTMLButtonElement>('[data-r]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.state.drop.done) return;
        this.state.drop.reagent = btn.dataset.r as 'hcl' | 'naoh';
        this.render();
      });
    });

    bench.querySelector('#btn-init')?.addEventListener('click', () => {
      this.state.drop.initialMl = true;
      toast('已加入約 1.00 mL', 'ok');
      this.render();
    });

    bench.querySelector('#btn-drop')?.addEventListener('click', () => {
      this.state.drop.drops = Math.min(45, this.state.drop.drops + 1);
      this.render();
    });
    bench.querySelector('#btn-drop5')?.addEventListener('click', () => {
      this.state.drop.drops = Math.min(45, this.state.drop.drops + 5);
      this.render();
    });
    bench.querySelector('#btn-undrop')?.addEventListener('click', () => {
      this.state.drop.drops = Math.max(0, this.state.drop.drops - 1);
      this.render();
    });
    bench.querySelector('#btn-undrop5')?.addEventListener('click', () => {
      this.state.drop.drops = Math.max(0, this.state.drop.drops - 5);
      this.render();
    });
    bench.querySelector('#btn-drop-approx30')?.addEventListener('click', () => {
      this.state.drop.drops = 30;
      toast('已設為 30 滴（仍可再用 ±1／±5 微調）', 'info');
      this.render();
    });

    bench.querySelector('#btn-reset-drop')?.addEventListener('click', () => {
      this.resetDropTrial(true);
      toast('已倒掉重做，可重新量測', 'info');
      this.render();
    });

    bench.querySelector('#btn-check-avg')?.addEventListener('click', () => {
      const drops = this.state.drop.drops;
      const delta = drops * 0.05;
      if (drops < 20 || delta < 1) {
        toast('請至少滴到 ΔV≈1 mL（約 20 滴以上；講義建議約 30 滴）', 'err');
        return;
      }
      const trueAvg = (delta * 1000) / drops;
      const input = Number((bench.querySelector('#avg-input') as HTMLInputElement).value);
      if (!Number.isFinite(input)) {
        toast('請輸入數值（單位 μL）', 'err');
        return;
      }
      if (Math.abs(input - trueAvg) > 2) {
        toast('不正確。再算：ΔV(mL)×1000 ÷ 滴數', 'err');
        return;
      }
      this.state.drop.finalMl = 1 + delta;
      this.state.drop.trueAvgUl = trueAvg;
      this.state.drop.done = true;
      toast('計算正確！', 'ok');
      this.render();
    });
  }

  /* ========== Phase 4：查表有限＋配方驗證＋緩衝測驗 ========== */
  private renderPhase4(bench: HTMLElement): void {
    const mix = this.state.mixing;
    const allMixed = SAMPLES.every((s) => this.state.samplesReady.has(s.id));

    bench.innerHTML = `
      <section class="panel">
        <h2>試樣配製關卡</h2>
        <p class="lede">配方不會一直顯示在燒杯旁。你可以「偷看講義表」（限 2 次），然後憑記憶／筆記量取。量錯就清空重來。</p>
        <div class="panel__actions">
          <button class="btn" id="btn-peek" ${this.state.recipePeeks >= 2 && !this.state.showRecipeTable ? 'disabled' : ''}>
            ${this.state.showRecipeTable ? '隱藏講義表' : `偷看講義表（剩 ${Math.max(0, 2 - this.state.recipePeeks)} 次）`}
          </button>
        </div>
        <div id="recipe-table"></div>
        <div class="sample-table">
          ${SAMPLES.map((s) => {
            const ready = this.state.samplesReady.has(s.id);
            const active = mix?.id === s.id;
            return `<button class="sample-pill ${ready ? 'is-ready' : ''} ${active ? 'is-active' : ''}" data-id="${s.id}">
              <strong>(${s.id})</strong>
              <span>${ready ? '已配好' : active ? '配製中' : '開始配'}</span>
            </button>`;
          }).join('')}
        </div>
        <div id="mixer"></div>
        <div id="buffer-quiz"></div>
      </section>
    `;

    const table = bench.querySelector('#recipe-table')!;
    if (this.state.showRecipeTable) {
      table.innerHTML = `
        <table class="data-table">
          <thead><tr><th>編號</th><th>HOAc (mL)</th><th>NaOAc (mL)</th><th>水 (mL)</th></tr></thead>
          <tbody>
            ${SAMPLES.map((s) => `<tr><td>(${s.id})</td><td>${s.hoac}</td><td>${s.naoac}</td><td>${s.water}</td></tr>`).join('')}
          </tbody>
        </table>`;
    } else {
      table.innerHTML = `<p class="hint-line">講義表目前收起——靠記憶配，或用偷看次數。</p>`;
    }

    bench.querySelector('#btn-peek')?.addEventListener('click', () => {
      if (this.state.showRecipeTable) {
        this.setState({ showRecipeTable: false });
        return;
      }
      if (this.state.recipePeeks >= 2) {
        toast('偷看次數用完了，試著回想配方', 'err');
        return;
      }
      this.state.recipePeeks += 1;
      this.setState({ showRecipeTable: true });
      toast(`講義表開啟（已用 ${this.state.recipePeeks}/2 次）`, 'info');
    });

    bench.querySelectorAll<HTMLButtonElement>('.sample-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id as (typeof SAMPLES)[number]['id'];
        if (this.state.samplesReady.has(id)) {
          toast(`(${id}) 已經配好`, 'info');
          return;
        }
        this.state.mixing = { id, hoac: 0, naoac: 0, water: 0 };
        this.state.showRecipeTable = false;
        this.render();
      });
    });

    const mixer = bench.querySelector('#mixer')!;
    if (mix) {
      const volumes = [5, 15, 20, 30];
      mixer.innerHTML = `
        <div class="mixer">
          <h3>配製 (${mix.id}) — 燒杯內：HOAc ${mix.hoac} · NaOAc ${mix.naoac} · H₂O ${mix.water}</h3>
          <p class="hint-line">按鈕有多種體積，加錯就會在確認時失敗。</p>
          <div class="mixer__beaker">
            <div class="mixer__fill" style="height:${Math.min(100, ((mix.hoac + mix.naoac + mix.water) / 30) * 100)}%"></div>
          </div>
          <div class="mixer__controls">
            <div class="mixer__group"><span>HOAc</span>${volumes.map((v) => `<button data-add="hoac" data-v="${v}">+${v} mL</button>`).join('')}</div>
            <div class="mixer__group"><span>NaOAc</span>${volumes.map((v) => `<button data-add="naoac" data-v="${v}">+${v} mL</button>`).join('')}</div>
            <div class="mixer__group"><span>水</span>${volumes.map((v) => `<button data-add="water" data-v="${v}">+${v} mL</button>`).join('')}</div>
          </div>
          <div class="action-row">
            <button class="btn" id="btn-mix-reset">清空</button>
            <button class="btn btn--primary" id="btn-mix-ok" style="width:auto">確認配方</button>
          </div>
        </div>`;

      mixer.querySelectorAll<HTMLButtonElement>('[data-add]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.add as 'hoac' | 'naoac' | 'water';
          this.state.mixing![key] += Number(btn.dataset.v);
          this.render();
        });
      });
      mixer.querySelector('#btn-mix-reset')?.addEventListener('click', () => {
        this.state.mixing = { id: mix.id, hoac: 0, naoac: 0, water: 0 };
        this.render();
      });
      mixer.querySelector('#btn-mix-ok')?.addEventListener('click', () => {
        const target = SAMPLES.find((s) => s.id === mix.id)!;
        if (!recipeMatches(target, this.state.mixing!)) {
          toast(`配方不對。想想 (${mix.id}) 的 HOAc / NaOAc / 水 比例`, 'err');
          return;
        }
        this.state.samplesReady.add(mix.id);
        this.state.mixing = null;
        toast(`(${mix.id}) 配方正確`, 'ok');
        this.render();
      });
    }

    const quiz = bench.querySelector('#buffer-quiz')!;
    if (allMixed && !this.state.bufferQuizDone) {
      quiz.innerHTML = `
        <div class="quiz-box">
          <p class="challenge-q">配完了——哪些試樣是「緩衝溶液」？（可多選）</p>
          <div class="chip-row" id="quiz-chips">
            ${SAMPLES.map((s) => `<button type="button" class="chip" data-q="${s.id}">(${s.id})</button>`).join('')}
          </div>
          <button class="btn btn--primary" id="btn-quiz" style="width:auto;margin-top:0.6rem">提交答案</button>
        </div>`;
      const picked = new Set<string>();
      quiz.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.q!;
          if (picked.has(id)) {
            picked.delete(id);
            btn.classList.remove('is-on');
          } else {
            picked.add(id);
            btn.classList.add('is-on');
          }
        });
      });
      quiz.querySelector('#btn-quiz')?.addEventListener('click', () => {
        const correct = new Set(SAMPLES.filter((s) => s.kind === 'buffer').map((s) => s.id));
        const ok =
          picked.size === correct.size && [...correct].every((id) => picked.has(id));
        if (!ok) {
          toast('再想想：緩衝液需要共軛酸鹼對（弱酸＋其鹽）同時存在', 'err');
          return;
        }
        this.state.bufferQuizDone = true;
        toast('正確！(a)(b) 才是 HOAc/NaOAc 緩衝體系', 'ok');
        this.render();
      });
    } else if (this.state.bufferQuizDone) {
      quiz.innerHTML = `<p class="ok-banner">已確認：(a)(b) 為緩衝溶液；(c)(d)(e) 否。</p>`;
    }
  }

  /* ========== Phase 5：示範一次 → 勾選 → 緩衝容量 ========== */
  private renderPhase5(bench: HTMLElement): void {
    if (this.state.measureStage === 'demo') {
      this.renderPhase5Demo(bench);
      return;
    }
    if (this.state.measureStage === 'check') {
      this.renderPhase5Check(bench);
      return;
    }
    this.renderPhase5Capacity(bench);
  }

  private renderPhase5Demo(bench: HTMLElement): void {
    const active = SAMPLES.find((s) => s.id === 'a')!;
    const m = this.state.measures.a;
    this.state.activeSample = 'a';
    this.state.activeSide = 'acid';

    let phText = '— —';
    if (this.state.electrodeIn) {
      if (this.state.dropsOnSide === 0 && m.initial !== undefined) phText = formatPh(m.initial);
      else if (m.acid.length) phText = formatPh(m.acid[m.acid.length - 1]);
      else phText = '….';
    }

    type Act = { id: string; label: string; ok: boolean; why: string };
    let correct: Act;
    if (!this.state.rinsed && !this.state.electrodeIn) {
      correct = { id: 'rinse', label: '沖洗電極與測溫棒', ok: true, why: '' };
    } else if (!this.state.electrodeIn) {
      correct = { id: 'dip', label: '將電極／測溫棒浸入溶液（鹽橋沒入）', ok: true, why: '' };
    } else if (!this.state.stirOn) {
      correct = { id: 'stir', label: '放入攪拌子並低速攪拌', ok: true, why: '' };
    } else if (m.initial === undefined) {
      correct = { id: 'init', label: '記錄起始 pH', ok: true, why: '' };
    } else if (this.state.dropsOnSide < 5) {
      correct = {
        id: 'drop',
        label: `滴 1 滴 1.0 M HCl 並記錄 pH（${this.state.dropsOnSide}/5）`,
        ok: true,
        why: '',
      };
    } else {
      correct = { id: 'finish', label: '本杯測定結束（示範完成）', ok: true, why: '' };
    }

    const wrongs: Act[] = [
      { id: 'w-drop-early', label: '還沒讀起始 pH 就先滴酸', ok: false, why: '要先記錄起始 pH。' },
      { id: 'w-stir-first', label: '電極還沒浸入就丟攪拌子', ok: false, why: '先浸電極，再低速攪拌。' },
      { id: 'w-no-rinse', label: '不沖洗直接插入', ok: false, why: '更換／開始測定前應沖洗電極。' },
      { id: 'w-e', label: '改去先測去離子水 (e)', ok: false, why: '(e) 應最後測定。' },
    ];

    const done = this.state.demoDone;
    const choices = done
      ? []
      : this.choicesFor(
          `demo-a-${correct.id}-${this.state.dropsOnSide}`,
          correct,
          wrongs,
          4,
        );

    bench.innerHTML = `
      <section class="panel">
        <h2>步驟 6-1：測定流程示範（只做一次）</h2>
        <p class="lede">五組 × 酸鹼兩側流程都一樣，這裡用試樣 <strong>(a) 滴加 HCl</strong> 練一次正確順序即可，其餘用勾選帶過。</p>
        <div class="measure-layout">
          <div class="ph-meter is-on compact">
            <div class="ph-meter__screen">
              <div class="ph-meter__mode">pH</div>
              <div class="ph-meter__value">${phText}</div>
              <div class="ph-meter__status">${this.state.electrodeIn ? 'MEAS' : 'STANDBY'}</div>
            </div>
          </div>
          <div>
            ${
              done
                ? `<p class="ok-banner">示範完成！接著勾選其餘測定項目。</p>
                   <button class="btn btn--primary" id="btn-to-check" style="width:auto">前往勾選測定 →</button>`
                : `<p class="challenge-q">現在正確的操作是？</p>
                   <div class="choice-list">
                     ${choices.map((c) => `<button type="button" class="choice-btn" data-id="${c.id}">${c.label}</button>`).join('')}
                   </div>
                   <div class="log" style="margin-top:0.8rem">起始：${m.initial !== undefined ? formatPh(m.initial) : '—'}｜HCl：${m.acid.map(formatPh).join(' → ') || '—'}</div>`
            }
          </div>
        </div>
      </section>
    `;

    bench.querySelector('#btn-to-check')?.addEventListener('click', () => {
      this.state.measureStage = 'check';
      // 示範的 a-acid 先勾上
      this.state.checkedRuns.add('a-acid');
      this.render();
    });

    bench.querySelectorAll<HTMLButtonElement>('.choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id!;
        if (id !== correct.id) {
          toast(wrongs.find((w) => w.id === id)?.why ?? '順序不對', 'err');
          this.clearChoices();
          this.render();
          return;
        }
        if (id === 'rinse') {
          this.state.rinsed = true;
          toast('已沖洗', 'ok');
        } else if (id === 'dip') {
          this.state.electrodeIn = true;
          toast('電極已浸入', 'ok');
        } else if (id === 'stir') {
          this.state.stirOn = true;
          toast('低速攪拌中', 'ok');
        } else if (id === 'init') {
          m.initial = simulatePh(active, 0, 0);
          toast(`起始 pH = ${formatPh(m.initial)}`, 'ok');
        } else if (id === 'drop') {
          this.state.dropsOnSide += 1;
          const ph = simulatePh(active, this.state.dropsOnSide, 0);
          m.acid.push(ph);
          toast(`pH = ${formatPh(ph)}`, 'ok');
        } else if (id === 'finish') {
          m.acidDone = true;
          this.state.demoDone = true;
          toast('示範測定完成', 'ok');
        }
        this.clearChoices();
        this.render();
      });
    });
  }

  private renderPhase5Check(bench: HTMLElement): void {
    const checked = this.state.checkedRuns;
    const aToD = MEASURE_RUNS.filter((r) => r.sample !== 'e');
    const eRuns = MEASURE_RUNS.filter((r) => r.sample === 'e');
    const aToDDone = aToD.every((r) => checked.has(r.key));

    bench.innerHTML = `
      <section class="panel">
        <h2>步驟 6-2：勾選其餘測定</h2>
        <p class="lede">流程與示範相同，不必重做十次。請勾選你「已完成」的測定；（e）去離子水請留到 <strong>(a)~(d) 都勾完</strong> 再勾。</p>
        <div class="check-grid">
          ${aToD
            .map(
              (r) => `
            <label class="check-card ${checked.has(r.key) ? 'is-on' : ''}">
              <input type="checkbox" data-key="${r.key}" ${checked.has(r.key) ? 'checked' : ''} ${r.key === 'a-acid' ? 'disabled' : ''} />
              <span>${r.label}${r.key === 'a-acid' ? '（示範已完成）' : ''}</span>
            </label>`,
            )
            .join('')}
        </div>
        <h3 class="subhead">最後測定</h3>
        <div class="check-grid">
          ${eRuns
            .map(
              (r) => `
            <label class="check-card ${checked.has(r.key) ? 'is-on' : ''} ${!aToDDone ? 'is-locked' : ''}">
              <input type="checkbox" data-key="${r.key}" ${checked.has(r.key) ? 'checked' : ''} ${!aToDDone ? 'disabled' : ''} />
              <span>${r.label}${!aToDDone ? '（先完成 a~d）' : ''}</span>
            </label>`,
            )
            .join('')}
        </div>
        <div class="panel__actions">
          <button class="btn" id="btn-check-all-ad" ${aToDDone ? 'disabled' : ''}>一鍵勾選 (a)~(d) 全部</button>
          <button class="btn btn--primary" id="btn-to-cap" style="width:auto" ${checked.size >= 10 ? '' : 'disabled'}>
            進入緩衝容量讀表 →
          </button>
        </div>
      </section>
    `;

    bench.querySelectorAll<HTMLInputElement>('input[data-key]').forEach((input) => {
      input.addEventListener('change', () => {
        const key = input.dataset.key!;
        if (key === 'a-acid') {
          input.checked = true;
          return;
        }
        if (key.startsWith('e-') && !aToD.every((r) => this.state.checkedRuns.has(r.key))) {
          input.checked = false;
          toast('請先完成 (a)~(d) 的酸／鹼測定勾選', 'err');
          return;
        }
        if (input.checked) this.state.checkedRuns.add(key);
        else this.state.checkedRuns.delete(key);
        this.render();
      });
    });

    bench.querySelector('#btn-check-all-ad')?.addEventListener('click', () => {
      for (const r of aToD) this.state.checkedRuns.add(r.key);
      toast('已勾選 (a)~(d)', 'ok');
      this.render();
    });

    bench.querySelector('#btn-to-cap')?.addEventListener('click', () => {
      if (this.state.checkedRuns.size < 10) {
        toast('請勾齊 10 項測定（含 e 兩側）', 'err');
        return;
      }
      this.state.measureStage = 'capacity';
      this.render();
    });
  }

  private renderPhase5Capacity(bench: HTMLElement): void {
    // 學習單：一滴體積；若玩家在第 3 關算過就沿用，否則用 0.050 mL/滴
    const vDrop =
      this.state.drop.trueAvgUl != null ? this.state.drop.trueAvgUl / 1000 : 0.05;
    const slopeAcid = slopePhPerDrop('a', 'hcl');
    const slopeBase = slopePhPerDrop('a', 'naoh');
    const betaAcid = bufferCapacityMeq(slopeAcid, vDrop);
    const betaBase = bufferCapacityMeq(slopeBase, vDrop);
    // 學習單要填 (a) 的緩衝容量；以加酸／加鹼兩側平均作為核對答案
    const betaA = (betaAcid + betaBase) / 2;

    const ids = SAMPLES.map((s) => s.id);
    const naohRows = [5, 4, 3, 2, 1, 0]
      .map(
        (d) => `
        <tr>
          ${d === 5 ? `<th rowspan="6" class="side-label">1.0 M<br/>NaOH</th>` : ''}
          <th>${d}</th>
          ${ids.map((id) => `<td>${phAt(id, 'naoh', d).toFixed(2)}</td>`).join('')}
        </tr>`,
      )
      .join('');

    const hclRows = [0, 1, 2, 3, 4, 5]
      .map(
        (d) => `
        <tr>
          ${d === 0 ? `<th rowspan="6" class="side-label">1.0 M<br/>HCl</th>` : ''}
          <th>${d}</th>
          ${ids.map((id) => `<td>${phAt(id, 'hcl', d).toFixed(2)}</td>`).join('')}
        </tr>`,
      )
      .join('');

    bench.innerHTML = `
      <section class="panel">
        <h2>步驟 6-3：濃度對緩衝容量之影響（學習單讀表）</h2>
        <p class="lede">下表格式對齊學習單。請用斜率（ΔpH／滴）與一滴體積，依講義公式計算 <strong>(a)</strong> 的緩衝容量。</p>

        <div class="sheet-scroll">
          <table class="data-table sheet-table">
            <thead>
              <tr>
                <th colspan="2">溶液<br/>酸/鹼　滴數</th>
                ${ids
                  .map(
                    (id) =>
                      `<th>(${id})<br/><span class="th-sub">${SAMPLE_LABELS[id].replace('\n', '<br/>')}</span></th>`,
                  )
                  .join('')}
              </tr>
            </thead>
            <tbody>
              ${naohRows}
              <tr class="avg-row">
                <th colspan="2">平均 (0)</th>
                ${ids.map((id) => `<td>${phAt(id, 'naoh', 0).toFixed(2)}</td>`).join('')}
              </tr>
              ${hclRows}
            </tbody>
          </table>
        </div>

        <div class="formula-box">
          <p class="challenge-q">學習單公式（單位：meq/(L·pH)）</p>
          <p class="formula">
            緩衝容量 =
            <span class="frac">
              <span class="frac__num">
                (1 / slope<sub>pH/滴</sub>) × V<sub>d</sub> (mL/滴) × C<sub>M</sub> (eq/L) × 1000 (mL/L)
              </span>
              <span class="frac__den">30 mL</span>
            </span>
          </p>
          <p class="hint-line">
            本關採用：C<sub>M</sub> = ${CM_EQL} eq/L；V<sub>d</sub> = ${vDrop.toFixed(3)} mL/滴；
            緩衝液體積 = ${BUFFER_VOLUME_ML} mL。
            slope ≈ |pH<sub>5</sub> − pH<sub>0</sub>| / 5。
          </p>
        </div>

        <div class="quiz-box">
          <p class="challenge-q">計算試樣 (a) 的緩衝容量（meq/(L·pH)）</p>
          <p class="hint-line">
            可分別用 HCl 側與 NaOH 側斜率各算一次，再取平均填入（容許誤差 ±1.0）。
          </p>
          <div class="calc-row">
            <input id="beta-input" type="number" step="0.1" placeholder="(a) 緩衝容量" />
            <button class="btn btn--primary" id="btn-cap-submit" style="width:auto">提交並通關</button>
          </div>
        </div>
        ${
          this.state.capacityDone
            ? `<p class="ok-banner">(a) 緩衝容量正確！可按右側「完成實驗 → 通關」。</p>`
            : ''
        }
      </section>
    `;

    bench.querySelector('#btn-cap-submit')?.addEventListener('click', () => {
      const input = Number((bench.querySelector('#beta-input') as HTMLInputElement).value);
      if (!Number.isFinite(input)) {
        toast('請輸入 (a) 的緩衝容量數值', 'err');
        return;
      }
      // 也接受只算單側（酸或鹼）
      const ok =
        Math.abs(input - betaA) <= 1.0 ||
        Math.abs(input - betaAcid) <= 1.0 ||
        Math.abs(input - betaBase) <= 1.0;
      if (!ok) {
        toast(
          `再算一次：slope=|pH5−pH0|/5，再代入學習單公式（Vd=${vDrop.toFixed(3)}）`,
          'err',
        );
        return;
      }
      this.state.capacityDone = true;
      toast('正確！已依學習單公式算出 (a) 緩衝容量', 'ok');
      this.render();
    });
  }
}
