import {
  CATALOG,
  PROC_STEPS,
  REQUIRED_IDS,
  TIMING_QUIZ,
  TRIALS,
} from './config';
import { calcK, calcM, calcN } from './chemistry';
import { shuffle } from '../../shared/random';

export type PhaseId = 0 | 1 | 2 | 3 | 4 | 5;

export type GameState = {
  phase: PhaseId;
  catalogOrder: string[];
  selected: Set<string>;
  phase0Passed: boolean;
  procOrder: string[];
  procSolved: boolean;
  timingAnswers: Record<string, string | null>;
  timingPassed: boolean;
  demoDone: boolean;
  demoStep: number;
  checkedRuns: Set<string>;
  calc: {
    mOk: boolean;
    nOk: boolean;
    kOk: boolean;
    lawOk: boolean;
  };
  designOk: boolean;
  cleared: boolean;
};

/** 測定勾選：試驗1示範 + 1重複 + 2×2 + 3×2 */
export const MEASURE_RUNS = [
  { key: '1a', label: '試驗1 第1次（示範）', trial: 1 as const },
  { key: '1b', label: '試驗1 第2次', trial: 1 as const },
  { key: '2a', label: '試驗2 第1次', trial: 2 as const },
  { key: '2b', label: '試驗2 第2次', trial: 2 as const },
  { key: '3a', label: '試驗3 第1次', trial: 3 as const },
  { key: '3b', label: '試驗3 第2次', trial: 3 as const },
];

export function createInitialState(): GameState {
  return {
    phase: 0,
    catalogOrder: shuffle(CATALOG.map((c) => c.id)),
    selected: new Set(),
    phase0Passed: false,
    procOrder: shuffle(PROC_STEPS.map((s) => s.id)),
    procSolved: false,
    timingAnswers: Object.fromEntries(TIMING_QUIZ.map((q) => [q.id, null])),
    timingPassed: false,
    demoDone: false,
    demoStep: 0,
    checkedRuns: new Set(),
    calc: { mOk: false, nOk: false, kOk: false, lawOk: false },
    designOk: false,
    cleared: false,
  };
}

export function gradeSelection(selected: Set<string>): {
  ok: boolean;
  missing: string[];
  extras: string[];
} {
  const missing = REQUIRED_IDS.filter((id) => !selected.has(id));
  const extras = [...selected].filter((id) => !REQUIRED_IDS.includes(id));
  return { ok: missing.length === 0 && extras.length === 0, missing, extras };
}

export function expectedM(): number {
  return calcM(TRIALS[0].dt, TRIALS[1].dt);
}

export function expectedN(): number {
  return calcN(TRIALS[0].dt, TRIALS[2].dt);
}

export function expectedKAvg(): number {
  const m = expectedM();
  const n = expectedN();
  const ks = TRIALS.map((t) => calcK(t, m, n));
  return ks.reduce((a, b) => a + b, 0) / ks.length;
}

export function phaseChecklist(state: GameState): { id: string; label: string; done: boolean }[] {
  switch (state.phase) {
    case 0:
      return [
        { id: 'sel', label: `已勾選 ${state.selected.size} 項`, done: state.selected.size > 0 },
        { id: 'pass', label: '提交並通過器材檢查', done: state.phase0Passed },
      ];
    case 1:
      return [{ id: 'p', label: '排出正確操作順序', done: state.procSolved }];
    case 2:
      return [{ id: 't', label: '計時方式三題全對', done: state.timingPassed }];
    case 3:
      return [
        { id: 'd', label: '完成試驗1示範流程', done: state.demoDone },
        {
          id: 'c',
          label: `勾選其餘測定 ${state.checkedRuns.size}/6`,
          done: state.checkedRuns.size >= 6,
        },
      ];
    case 4:
      return [
        { id: 'm', label: '算出級數 m', done: state.calc.mOk },
        { id: 'n', label: '算出級數 n', done: state.calc.nOk },
        { id: 'k', label: '算出平均 k', done: state.calc.kOk },
        { id: 'law', label: '寫出速率定律式', done: state.calc.lawOk },
      ];
    case 5:
      return [{ id: 'des', label: '設計取量使指定時間變色', done: state.designOk }];
    default:
      return [];
  }
}

export function canAdvance(state: GameState): boolean {
  switch (state.phase) {
    case 0:
      return state.phase0Passed;
    case 1:
      return state.procSolved;
    case 2:
      return state.timingPassed;
    case 3:
      return state.demoDone && state.checkedRuns.size >= 6;
    case 4:
      return state.calc.mOk && state.calc.nOk && state.calc.kOk && state.calc.lawOk;
    case 5:
      return state.designOk;
    default:
      return false;
  }
}

export function createSkipToPhaseState(phase: PhaseId): GameState {
  const s = createInitialState();
  s.phase = phase;
  s.phase0Passed = true;
  for (const id of REQUIRED_IDS) s.selected.add(id);
  s.procSolved = true;
  s.procOrder = PROC_STEPS.map((p) => p.id);
  s.timingPassed = true;
  for (const q of TIMING_QUIZ) {
    const ok = q.options.find((o) => o.ok)!;
    s.timingAnswers[q.id] = ok.id;
  }
  s.demoDone = true;
  s.demoStep = 5;
  for (const r of MEASURE_RUNS) s.checkedRuns.add(r.key);
  if (phase >= 5) {
    s.calc = { mOk: true, nOk: true, kOk: true, lawOk: true };
  } else if (phase === 4) {
    s.calc = { mOk: false, nOk: false, kOk: false, lawOk: false };
  }
  s.designOk = false;
  return s;
}
