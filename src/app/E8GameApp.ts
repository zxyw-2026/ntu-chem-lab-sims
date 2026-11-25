import {
  CATALOG,
  PHASE_TITLES,
  PROC_STEPS,
  TIMING_QUIZ,
  TRIALS,
  type Choice,
} from '../experiments/e8/config';
import {
  concI,
  concS2O3,
  concS2O8,
  designX,
  formatSci,
  initialRate,
  roundSig,
} from '../experiments/e8/chemistry';
import {
  canAdvance,
  createInitialState,
  createSkipToPhaseState,
  expectedKAvg,
  expectedM,
  expectedN,
  gradeSelection,
  MEASURE_RUNS,
  phaseChecklist,
  type GameState,
  type PhaseId,
} from '../experiments/e8/phases';
import { pickChoices, shuffle } from '../shared/random';
import { toast } from '../shared/toast';

function initialFromUrl(): GameState {
  const params = new URLSearchParams(window.location.search);
  const skip = params.get('skipTo') ?? params.get('skip');
  if (skip === '5' || skip === '6') return createSkipToPhaseState(5);
  if (skip === '4') return createSkipToPhaseState(4);
  if (skip === '3') return createSkipToPhaseState(3);
  if (skip === '2') return createSkipToPhaseState(2);
  if (skip === '1') return createSkipToPhaseState(1);
  return createInitialState();
}

export class E8GameApp {
  private state: GameState = initialFromUrl();
  private root: HTMLElement;
  private choiceCache: { key: string; choices: Choice[] } | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.render();
  }

  private clearChoices(): void {
    this.choiceCache = null;
  }

  private choicesFor(key: string, correct: Choice, wrongs: Choice[], total = 4): Choice[] {
    if (this.choiceCache?.key === key) return this.choiceCache.choices;
    const choices = pickChoices(correct, wrongs, total);
    this.choiceCache = { key, choices };
    return choices;
  }

  private advance(): void {
    if (!canAdvance(this.state)) {
      toast('本階段還沒過關', 'err');
      return;
    }
    if (this.state.phase === 5) {
      this.state.cleared = true;
      toast('E8 通關成功！', 'ok');
      this.render();
      return;
    }
    this.clearChoices();
    this.state.phase = (this.state.phase + 1) as PhaseId;
    toast(`進入：${PHASE_TITLES[this.state.phase]}`, 'ok');
    this.render();
  }

  private render(): void {
    if (this.state.cleared) {
      this.root.innerHTML = `
        <div class="victory">
          <div class="victory__card">
            <p class="victory__eyebrow">CLEAR · E8</p>
            <h1>碘鐘交響曲 通關</h1>
            <p>你完成了選器材、操作排序、計時規範、變色測定、速率定律（m、n、k），並設計了指定時間的取量。</p>
            <div class="panel__actions" style="justify-content:center">
              <button class="btn btn--primary" id="btn-home" style="width:auto">回實驗選單</button>
              <button class="btn" id="btn-replay">再玩一次</button>
            </div>
          </div>
        </div>`;
      this.root.querySelector('#btn-home')?.addEventListener('click', () => {
        location.href = '/';
      });
      this.root.querySelector('#btn-replay')?.addEventListener('click', () => {
        this.state = createInitialState();
        this.render();
      });
      return;
    }

    const checklist = phaseChecklist(this.state);
    const ready = canAdvance(this.state);

    this.root.innerHTML = `
      <div class="layout">
        <header class="topbar">
          <div class="topbar__left">
            <span class="badge">LAB SIM</span>
            <strong>E8 碘鐘交響曲虛擬實驗</strong>
            <a class="topbar-link" href="/">選單</a>
          </div>
          <div class="topbar__hint">${PHASE_TITLES[this.state.phase]}</div>
        </header>
        <aside class="sidebar">
          <div class="hud">
            <div class="hud__brand">
              <div class="hud__eyebrow">台大普化實驗 · 虛擬預習</div>
              <h1 class="hud__title">E8 碘鐘交響曲</h1>
            </div>
            <div class="hud__progress">
              ${PHASE_TITLES.map((_, i) => {
                const cls = i < this.state.phase ? 'done' : i === this.state.phase ? 'current' : '';
                return `<span class="hud__dot ${cls}"></span>`;
              }).join('')}
              <span class="hud__phase-label">步驟 ${this.state.phase + 1}/6 · ${PHASE_TITLES[this.state.phase]}</span>
            </div>
            <div class="hud__check">
              <h2>過關條件</h2>
              <p class="hud__note">選錯會說明原因；重複測定用勾選帶過。</p>
              <ul>
                ${checklist
                  .map(
                    (c) =>
                      `<li class="${c.done ? 'is-done' : ''}"><span class="tick">${c.done ? '✓' : '○'}</span>${c.label}</li>`,
                  )
                  .join('')}
              </ul>
              <button class="btn btn--primary" id="btn-next" ${ready ? '' : 'disabled'}>
                ${this.state.phase === 5 ? '完成實驗 → 通關' : '本關通過 → 下一階段'}
              </button>
            </div>
          </div>
        </aside>
        <main class="bench-wrap"><div class="bench" id="bench"></div></main>
      </div>`;

    this.root.querySelector('#btn-next')?.addEventListener('click', () => this.advance());
    this.renderPhase(this.root.querySelector('#bench')!);
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

  /* ----- Phase 0 ----- */
  private renderPhase0(bench: HTMLElement): void {
    const byId = Object.fromEntries(CATALOG.map((c) => [c.id, c]));
    const items = this.state.catalogOrder.map((id) => byId[id]);

    bench.innerHTML = `
      <section class="panel">
        <h2>領取站：碘鐘實驗需要哪些？</h2>
        <p class="lede">清單已打亂並混入其他實驗器材。只勾 E8 真正需要的，再提交檢查。</p>
        <div class="item-grid">
          ${items
            .map((item) => {
              const on = this.state.selected.has(item.id);
              return `<button type="button" class="item-card ${on ? 'is-selected' : ''}" data-id="${item.id}">
                <span class="item-card__icon">${item.icon}</span>
                <span class="item-card__label">${item.label}</span>
              </button>`;
            })
            .join('')}
        </div>
        <div class="panel__actions">
          <button class="btn" id="btn-clear">清除</button>
          <button class="btn btn--primary" id="btn-submit" style="width:auto;min-width:140px">提交檢查</button>
        </div>
      </section>`;

    bench.querySelectorAll<HTMLButtonElement>('.item-card').forEach((btn) => {
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
      const r = gradeSelection(this.state.selected);
      if (r.ok) {
        this.state.phase0Passed = true;
        toast('器材檢查通過', 'ok');
      } else {
        this.state.phase0Passed = false;
        if (r.extras[0]) toast(byId[r.extras[0]].hint, 'err');
        else if (r.missing[0]) toast(`少了「${byId[r.missing[0]].label}」：${byId[r.missing[0]].hint}`, 'err');
      }
      this.render();
    });
  }

  /* ----- Phase 1：拖曳排序 ----- */
  private renderPhase1(bench: HTMLElement): void {
    const labelOf = Object.fromEntries(PROC_STEPS.map((s) => [s.id, s.label]));
    const order = this.state.procOrder;

    bench.innerHTML = `
      <section class="panel">
        <h2>排出正確操作順序</h2>
        <p class="lede"><strong>拖曳</strong>步驟到正確位置後提交。注意：加 K₂S₂O₈ 時就要開始計時。</p>
        ${
          this.state.procSolved
            ? `<p class="ok-banner">順序正確。</p>`
            : `<ol class="sort-list">
                ${order
                  .map(
                    (id, i) => `
                  <li class="sort-item" data-index="${i}" draggable="true">
                    <span class="sort-item__handle">⠿</span>
                    <span class="sort-item__num">${i + 1}</span>
                    <span class="sort-item__text">${labelOf[id]}</span>
                  </li>`,
                  )
                  .join('')}
              </ol>
              <div class="panel__actions">
                <button class="btn" id="btn-reshuffle">重新打亂</button>
                <button class="btn btn--primary" id="btn-submit-order" style="width:auto">提交順序</button>
              </div>`
        }
      </section>`;

    if (this.state.procSolved) return;
    this.bindSort(
      bench,
      () => this.state.procOrder,
      (n) => {
        this.state.procOrder = n;
      },
      () => {
        const expected = PROC_STEPS.map((s) => s.id);
        if (this.state.procOrder.join() === expected.join()) {
          this.state.procSolved = true;
          toast('操作順序正確', 'ok');
        } else {
          const i = expected.findIndex((id, idx) => this.state.procOrder[idx] !== id);
          toast(`第 ${i + 1} 步應是「${labelOf[expected[i]]}」`, 'err');
        }
        this.render();
      },
      () => {
        this.state.procOrder = shuffle(PROC_STEPS.map((s) => s.id));
        this.render();
      },
    );
  }

  private bindSort(
    root: HTMLElement,
    getOrder: () => string[],
    setOrder: (n: string[]) => void,
    onSubmit: () => void,
    onReshuffle: () => void,
  ): void {
    const list = root.querySelector('.sort-list');
    if (!list) return;
    let fromIndex: number | null = null;
    const clear = () =>
      list.querySelectorAll('.sort-item').forEach((el) => {
        el.classList.remove('drag-over-before', 'drag-over-after', 'is-dragging');
      });

    list.querySelectorAll<HTMLElement>('.sort-item').forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        fromIndex = Number(item.dataset.index);
        item.classList.add('is-dragging');
        e.dataTransfer?.setData('text/plain', String(fromIndex));
        e.dataTransfer!.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        clear();
        fromIndex = null;
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        const before = e.clientY < item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2;
        clear();
        item.classList.add(before ? 'drag-over-before' : 'drag-over-after');
        item.classList.add('is-dragging');
      });
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const from = fromIndex ?? Number(e.dataTransfer?.getData('text/plain'));
        const to = Number(item.dataset.index);
        const before = e.clientY < item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2;
        let insertAt = before ? to : to + 1;
        if (from < insertAt) insertAt -= 1;
        if (!Number.isFinite(from) || from === insertAt) {
          clear();
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

  /* ----- Phase 2：計時方式 ----- */
  private renderPhase2(bench: HTMLElement): void {
    bench.innerHTML = `
      <section class="panel">
        <h2>全班統一的計時方式</h2>
        <p class="lede">對齊學習單圈選題。想清楚「何時開始／搖多久／何時停表」。</p>
        <div id="timing-quiz"></div>
        ${
          this.state.timingPassed
            ? `<p class="ok-banner">計時規範答對了。</p>`
            : `<button class="btn btn--primary" id="btn-timing" style="width:auto;margin-top:0.8rem">核對答案</button>`
        }
      </section>`;

    const box = bench.querySelector('#timing-quiz')!;
    box.innerHTML = TIMING_QUIZ.map((q) => {
      const picked = this.state.timingAnswers[q.id];
      return `
        <div class="quiz-box">
          <p class="challenge-q">${q.prompt}</p>
          <div class="choice-list">
            ${q.options
              .map(
                (o) =>
                  `<button type="button" class="choice-btn ${picked === o.id ? 'is-picked' : ''}" data-q="${q.id}" data-id="${o.id}">${o.label}</button>`,
              )
              .join('')}
          </div>
        </div>`;
    }).join('');

    box.querySelectorAll<HTMLButtonElement>('.choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.state.timingPassed) return;
        this.state.timingAnswers[btn.dataset.q!] = btn.dataset.id!;
        this.render();
      });
    });

    bench.querySelector('#btn-timing')?.addEventListener('click', () => {
      for (const q of TIMING_QUIZ) {
        const ans = this.state.timingAnswers[q.id];
        const correct = q.options.find((o) => o.ok)!;
        if (ans !== correct.id) {
          const picked = q.options.find((o) => o.id === ans);
          toast(picked?.why ?? `「${q.prompt}」尚未選對`, 'err');
          return;
        }
      }
      this.state.timingPassed = true;
      toast('計時方式全部正確', 'ok');
      this.render();
    });
  }

  /* ----- Phase 3：示範一次 + 勾選 ----- */
  private renderPhase3(bench: HTMLElement): void {
    if (!this.state.demoDone) {
      this.renderDemo(bench);
      return;
    }
    this.renderCheck(bench);
  }

  private renderDemo(bench: HTMLElement): void {
    // simplified step machine for trial 1
    const steps = [
      { id: 'prep', label: '依試驗1取量：分注 NaI/NaCl/S₂O₃/澱粉，吸量管取 K₂SO₄' },
      { id: 'add', label: '加入 2.0 mL K₂S₂O₈ 並同時開始計時' },
      { id: 'shake', label: '塞緊軟木塞，手腕搖 20 秒（勿握瓶底以免體溫影響）' },
      { id: 'watch', label: '靜置觀察；開始變色瞬間停表' },
      { id: 'record', label: `記錄 Δt ≈ ${TRIALS[0].dt} s（二次差 >3 s 需重做）` },
    ];
    const step = this.state.demoStep;
    const done = step >= steps.length;

    let choicesHtml = '';
    if (!done) {
      const correct: Choice = { id: steps[step].id, label: steps[step].label, ok: true, why: '' };
      const wrongs: Choice[] = [
        { id: 'w1', label: '先加 K₂S₂O₈ 再慢慢找計時器', ok: false, why: '加 K₂S₂O₈ 須與計時同步。' },
        { id: 'w2', label: '握著瓶底大力上下甩到變色', ok: false, why: '手搖 20 秒即可；握瓶底會影響溫度。' },
        { id: 'w3', label: '等到顏色完全不再變化才停表', ok: false, why: '開始變色瞬間停表。' },
        { id: 'w4', label: '用未潤洗的吸量管直接取過硫酸鉀', ok: false, why: '吸量管需以試劑潤洗 2 次。' },
      ];
      const choices = this.choicesFor(`e8-demo-${step}`, correct, wrongs, 4);
      choicesHtml = `
        <p class="progress-pill">示範步驟 ${step + 1}/${steps.length} · 試驗1</p>
        <p class="challenge-q">現在正確操作是？</p>
        <div class="choice-list">
          ${choices.map((c) => `<button type="button" class="choice-btn" data-id="${c.id}">${c.label}</button>`).join('')}
        </div>`;
    }

    bench.innerHTML = `
      <section class="panel panel--split">
        <div class="clock-visual ${step >= 3 ? 'is-blue' : ''}">
          <div class="clock-flask">${step >= 3 ? '變色！' : '無色'}</div>
          <div class="clock-time">Δt ${step >= 4 ? TRIALS[0].dt + ' s' : '—'}</div>
        </div>
        <div class="step-board">
          <h2>測定示範（試驗1，只做一次）</h2>
          <p class="lede">三組試驗流程相同，這裡練一次；其餘用勾選帶過。</p>
          ${
            done
              ? `<p class="ok-banner">示範完成。接著勾選其餘測定。</p>
                 <button class="btn btn--primary" id="btn-to-check" style="width:auto">前往勾選 →</button>`
              : choicesHtml
          }
        </div>
      </section>`;

    bench.querySelector('#btn-to-check')?.addEventListener('click', () => {
      this.state.demoDone = true;
      this.state.checkedRuns.add('1a');
      this.clearChoices();
      this.render();
    });

    bench.querySelectorAll<HTMLButtonElement>('.choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id!;
        if (id !== steps[step].id) {
          const w = [
            { id: 'w1', why: '加 K₂S₂O₈ 須與計時同步。' },
            { id: 'w2', why: '手搖 20 秒即可；握瓶底會影響溫度。' },
            { id: 'w3', why: '開始變色瞬間停表。' },
            { id: 'w4', why: '吸量管需以試劑潤洗 2 次。' },
          ].find((x) => x.id === id);
          toast(w?.why ?? '不正確', 'err');
          this.clearChoices();
          this.render();
          return;
        }
        this.state.demoStep = step + 1;
        this.clearChoices();
        toast('正確 ✓', 'ok');
        this.render();
      });
    });
  }

  private renderCheck(bench: HTMLElement): void {
    bench.innerHTML = `
      <section class="panel">
        <h2>勾選其餘變色時間測定</h2>
        <p class="lede">二次重複若差超過 3 秒需重做。教學數據採用講義示例平均值。</p>
        <div class="check-grid">
          ${MEASURE_RUNS.map((r) => {
            const on = this.state.checkedRuns.has(r.key);
            return `<label class="check-card ${on ? 'is-on' : ''}">
              <input type="checkbox" data-key="${r.key}" ${on ? 'checked' : ''} ${r.key === '1a' ? 'disabled' : ''}/>
              <span>${r.label}${r.key === '1a' ? '（示範）' : ''} · Δt≈${TRIALS[r.trial - 1].dt}s</span>
            </label>`;
          }).join('')}
        </div>
        <div class="panel__actions">
          <button class="btn" id="btn-all">一鍵勾選全部</button>
        </div>
        <table class="data-table" style="margin-top:1rem">
          <thead><tr><th>試驗</th><th>K₂S₂O₈ (mL)</th><th>NaI (mL)</th><th>平均 Δt (s)</th></tr></thead>
          <tbody>
            ${TRIALS.map((t) => `<tr><td>${t.id}</td><td>${t.k2s2o8.toFixed(1)}</td><td>${t.nai.toFixed(1)}</td><td>${t.dt}</td></tr>`).join('')}
          </tbody>
        </table>
      </section>`;

    bench.querySelectorAll<HTMLInputElement>('input[data-key]').forEach((input) => {
      input.addEventListener('change', () => {
        const key = input.dataset.key!;
        if (key === '1a') {
          input.checked = true;
          return;
        }
        if (input.checked) this.state.checkedRuns.add(key);
        else this.state.checkedRuns.delete(key);
        this.render();
      });
    });
    bench.querySelector('#btn-all')?.addEventListener('click', () => {
      for (const r of MEASURE_RUNS) this.state.checkedRuns.add(r.key);
      toast('已勾選全部測定', 'ok');
      this.render();
    });
  }

  /* ----- Phase 4：計算 m n k ----- */
  private renderPhase4(bench: HTMLElement): void {
    const t1 = TRIALS[0];
    const t2 = TRIALS[1];
    const t3 = TRIALS[2];
    const mTrue = expectedM();
    const nTrue = expectedN();
    const kAvg = expectedKAvg();

    bench.innerHTML = `
      <section class="panel">
        <h2>數據處理：初速率、級數與 k</h2>
        <p class="lede">依學習單：rate = 0.00025 / Δt。比較試驗求 m、n，再求各試驗 k 與平均 k，最後寫出速率定律式。</p>

        <table class="data-table">
          <thead>
            <tr>
              <th>試驗</th><th>[S₂O₈²⁻]₀</th><th>[I⁻]₀</th><th>[S₂O₃²⁻]₀</th><th>Δt (s)</th><th>rate (M/s)</th>
            </tr>
          </thead>
          <tbody>
            ${TRIALS.map((t) => {
              const rate = initialRate(t.dt);
              return `<tr>
                <td>${t.id}</td>
                <td>${concS2O8(t).toFixed(3)}</td>
                <td>${concI(t).toFixed(3)}</td>
                <td>${concS2O3(t).toFixed(4)}</td>
                <td>${t.dt}</td>
                <td>${formatSci(rate, 2)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>

        <div class="formula-box">
          <p>rate₂/rate₁ = Δt₁/Δt₂ = 2<sup>m</sup>　→　m = log(Δt₁/Δt₂) / log(2)</p>
          <p>rate₃/rate₁ = Δt₁/Δt₃ = 2<sup>n</sup>　→　n = log(Δt₁/Δt₃) / log(2)</p>
          <p>k = rate / ([S₂O₈²⁻]<sup>m</sup>[I⁻]<sup>n</sup>)（三組皆算，再平均）</p>
        </div>

        <div class="quiz-box">
          <p class="challenge-q">1. 級數 m（二位有效數字，如 0.89）</p>
          <div class="calc-row">
            <input id="in-m" type="number" step="0.01" ${this.state.calc.mOk ? 'disabled' : ''} />
            <button class="btn" id="btn-m" ${this.state.calc.mOk ? 'disabled' : ''}>核對 m</button>
            ${this.state.calc.mOk ? '<span class="ok-inline">✓</span>' : ''}
          </div>
        </div>
        <div class="quiz-box">
          <p class="challenge-q">2. 級數 n（二位有效數字）</p>
          <div class="calc-row">
            <input id="in-n" type="number" step="0.01" ${this.state.calc.nOk ? 'disabled' : ''} />
            <button class="btn" id="btn-n" ${this.state.calc.nOk ? 'disabled' : ''}>核對 n</button>
            ${this.state.calc.nOk ? '<span class="ok-inline">✓</span>' : ''}
          </div>
        </div>
        <div class="quiz-box">
          <p class="challenge-q">3. 平均速率常數 k（科學記號也可，容許 ±15%）</p>
          <div class="calc-row">
            <input id="in-k" type="text" placeholder="例如 0.0027 或 2.7e-3" ${this.state.calc.kOk ? 'disabled' : ''} />
            <button class="btn" id="btn-k" ${this.state.calc.kOk ? 'disabled' : ''}>核對 k</button>
            ${this.state.calc.kOk ? '<span class="ok-inline">✓</span>' : ''}
          </div>
        </div>
        <div class="quiz-box">
          <p class="challenge-q">4. 速率定律式應為？</p>
          <div class="choice-list" id="law-choices"></div>
          ${this.state.calc.lawOk ? '<p class="ok-banner">速率定律式正確。</p>' : ''}
        </div>
      </section>`;

    const mRounded = roundSig(mTrue, 2);
    const nRounded = roundSig(nTrue, 2);

    bench.querySelector('#btn-m')?.addEventListener('click', () => {
      const v = Number((bench.querySelector('#in-m') as HTMLInputElement).value);
      if (!Number.isFinite(v)) {
        toast('請輸入 m', 'err');
        return;
      }
      if (Math.abs(v - mRounded) > 0.05 && Math.abs(v - mTrue) > 0.05) {
        toast(`再算：m = log(${t1.dt}/${t2.dt}) / log(2)`, 'err');
        return;
      }
      this.state.calc.mOk = true;
      toast('m 正確', 'ok');
      this.render();
    });

    bench.querySelector('#btn-n')?.addEventListener('click', () => {
      const v = Number((bench.querySelector('#in-n') as HTMLInputElement).value);
      if (!Number.isFinite(v)) {
        toast('請輸入 n', 'err');
        return;
      }
      if (Math.abs(v - nRounded) > 0.05 && Math.abs(v - nTrue) > 0.05) {
        toast(`再算：n = log(${t1.dt}/${t3.dt}) / log(2)`, 'err');
        return;
      }
      this.state.calc.nOk = true;
      toast('n 正確', 'ok');
      this.render();
    });

    bench.querySelector('#btn-k')?.addEventListener('click', () => {
      const raw = (bench.querySelector('#in-k') as HTMLInputElement).value.trim();
      const v = Number(raw);
      if (!Number.isFinite(v)) {
        toast('請輸入數字（可用 2.7e-3）', 'err');
        return;
      }
      if (Math.abs(v - kAvg) / kAvg > 0.15) {
        toast('再檢查：先用你的 m、n 算三組 k 再平均', 'err');
        return;
      }
      this.state.calc.kOk = true;
      toast('平均 k 正確', 'ok');
      this.render();
    });

    if (!this.state.calc.lawOk) {
      const correct: Choice = {
        id: 'law-ok',
        label: `rate = k [S₂O₈²⁻]^m [I⁻]^n　（m≈${mRounded}, n≈${nRounded}）`,
        ok: true,
        why: '',
      };
      const wrongs: Choice[] = [
        {
          id: 'l1',
          label: 'rate = k [S₂O₈²⁻][I⁻]（固定一級，不需實驗）',
          ok: false,
          why: '級數要由初速率法實驗決定。',
        },
        {
          id: 'l2',
          label: 'rate = k [S₂O₃²⁻] / Δt',
          ok: false,
          why: 'S₂O₃²⁻ 是計時工具；速率定律是對 S₂O₈²⁻ 與 I⁻。',
        },
        {
          id: 'l3',
          label: 'rate = k [S₂O₈²⁻]^n [I⁻]^m（m、n 對調）',
          ok: false,
          why: 'm 對應過硫酸根，n 對應碘離子。',
        },
      ];
      const choices = this.choicesFor('e8-law', correct, wrongs, 4);
      const box = bench.querySelector('#law-choices')!;
      box.innerHTML = choices
        .map((c) => `<button type="button" class="choice-btn" data-id="${c.id}">${c.label}</button>`)
        .join('');
      box.querySelectorAll<HTMLButtonElement>('.choice-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.dataset.id !== 'law-ok') {
            const w = wrongs.find((x) => x.id === btn.dataset.id);
            toast(w?.why ?? '不正確', 'err');
            this.clearChoices();
            this.render();
            return;
          }
          this.state.calc.lawOk = true;
          this.clearChoices();
          toast('速率定律式正確', 'ok');
          this.render();
        });
      });
    }
  }

  /* ----- Phase 5：設計取量 ----- */
  private renderPhase5(bench: HTMLElement): void {
    const m = expectedM();
    const dt1 = TRIALS[0].dt;
    const target = 80; // 指定變色時間（教學用）
    const xTrue = designX(dt1, target, m);

    bench.innerHTML = `
      <section class="panel">
        <h2>自行設計取量（碘鐘交響曲）</h2>
        <p class="lede">學習單：長秒數配方保持試驗1的 I⁻，只改過硫酸鉀取量 x mL（K₂SO₄ = 4.0−x），使 Δt 接近指定時間。</p>
        <div class="formula-box">
          <p>r<sub>x</sub>/r<sub>1</sub> = Δt<sub>1</sub>/Δt<sub>x</sub> = (x/2.0)<sup>m</sup></p>
          <p>→ x = 2.0 × (Δt<sub>1</sub>/Δt<sub>指定</sub>)<sup>1/m</sup></p>
          <p>本關指定變色時間 Δt<sub>指定</sub> = <strong>${target} s</strong>；Δt<sub>1</sub> = ${dt1} s；使用你求出的 m≈${roundSig(m, 2)}</p>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>NaI</th><th>NaCl</th><th>S₂O₃</th><th>澱粉</th><th>K₂SO₄</th><th>K₂S₂O₈</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2.0</td><td>2.0</td><td>1.0</td><td>1.0</td><td>4.0 − x</td><td>x</td>
            </tr>
          </tbody>
        </table>
        <div class="quiz-box">
          <p class="challenge-q">求出過硫酸鉀取量 x（mL），容許 ±0.15 mL</p>
          <div class="calc-row">
            <input id="in-x" type="number" step="0.01" placeholder="x" ${this.state.designOk ? 'disabled' : ''} />
            <button class="btn btn--primary" id="btn-x" style="width:auto" ${this.state.designOk ? 'disabled' : ''}>核對設計</button>
          </div>
        </div>
        ${
          this.state.designOk
            ? `<p class="ok-banner">設計正確！實測時應在指定時間附近變色（交響曲比賽同理）。K₂SO₄ 取 ${(4 - xTrue).toFixed(2)} mL。</p>
               <div class="clock-visual is-blue" style="margin:1rem auto;max-width:200px">
                 <div class="clock-flask">準點變色</div>
                 <div class="clock-time">~${target}s</div>
               </div>`
            : ''
        }
      </section>`;

    bench.querySelector('#btn-x')?.addEventListener('click', () => {
      const v = Number((bench.querySelector('#in-x') as HTMLInputElement).value);
      if (!Number.isFinite(v)) {
        toast('請輸入 x', 'err');
        return;
      }
      if (Math.abs(v - xTrue) > 0.15) {
        toast(`再算：x = 2 × (${dt1}/${target})^(1/m)`, 'err');
        return;
      }
      this.state.designOk = true;
      toast('取量設計正確', 'ok');
      this.render();
    });
  }
}
