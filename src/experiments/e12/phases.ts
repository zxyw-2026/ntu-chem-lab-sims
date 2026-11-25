import {
  CALIB_STEPS,
  CATALOG,
  HOAC_STEPS,
  NAOAC_STEPS,
  REQUIRED_IDS,
  SAMPLES,
  type SampleRecipe,
} from './config';
import { shuffle } from '../../shared/random';

export type PhaseId = 0 | 1 | 2 | 3 | 4 | 5;
export type MeasureSide = 'acid' | 'base';

export type SampleMeasure = {
  initial?: number;
  acid: number[];
  base: number[];
  acidDone: boolean;
  baseDone: boolean;
};

export type GameState = {
  phase: PhaseId;
  catalogOrder: string[];
  selected: Set<string>;
  phase0Passed: boolean;
  phase0Attempts: number;
  /** Shuffled ids the player is arranging */
  calibOrder: string[];
  calibSolved: boolean;
  prepTrack: 'hoac' | 'naoac';
  hoacOrder: string[];
  naoacOrder: string[];
  hoacSolved: boolean;
  naoacSolved: boolean;
  drop: {
    reagent: 'hcl' | 'naoh' | null;
    initialMl: boolean;
    drops: number;
    finalMl: number | null;
    trueAvgUl: number | null;
    done: boolean;
  };
  samplesReady: Set<string>;
  mixing: { id: SampleRecipe['id']; hoac: number; naoac: number; water: number } | null;
  recipePeeks: number;
  showRecipeTable: boolean;
  bufferQuizDone: boolean;
  measures: Record<string, SampleMeasure>;
  activeSample: SampleRecipe['id'] | null;
  activeSide: MeasureSide;
  electrodeIn: boolean;
  stirOn: boolean;
  rinsed: boolean;
  dropsOnSide: number;
  /** Phase 5 sub-flow */
  measureStage: 'demo' | 'check' | 'capacity';
  demoDone: boolean;
  checkedRuns: Set<string>; // e.g. a-acid, e-base
  capacityDone: boolean;
  cleared: boolean;
};

export const MEASURE_RUNS: { key: string; sample: SampleRecipe['id']; side: MeasureSide; label: string }[] =
  SAMPLES.flatMap((s) => [
    { key: `${s.id}-acid`, sample: s.id, side: 'acid' as const, label: `(${s.id}) 滴加 HCl` },
    { key: `${s.id}-base`, sample: s.id, side: 'base' as const, label: `(${s.id}) 滴加 NaOH` },
  ]);

export function createInitialState(): GameState {
  const measures: Record<string, SampleMeasure> = {};
  for (const s of SAMPLES) {
    measures[s.id] = { acid: [], base: [], acidDone: false, baseDone: false };
  }
  return {
    phase: 0,
    catalogOrder: shuffle(CATALOG.map((c) => c.id)),
    selected: new Set(),
    phase0Passed: false,
    phase0Attempts: 0,
    calibOrder: shuffle(CALIB_STEPS.map((s) => s.id)),
    calibSolved: false,
    prepTrack: 'hoac',
    hoacOrder: shuffle(HOAC_STEPS.map((s) => s.id)),
    naoacOrder: shuffle(NAOAC_STEPS.map((s) => s.id)),
    hoacSolved: false,
    naoacSolved: false,
    drop: {
      reagent: null,
      initialMl: false,
      drops: 0,
      finalMl: null,
      trueAvgUl: null,
      done: false,
    },
    samplesReady: new Set(),
    mixing: null,
    recipePeeks: 0,
    showRecipeTable: false,
    bufferQuizDone: false,
    measures,
    activeSample: 'a',
    activeSide: 'acid',
    electrodeIn: false,
    stirOn: false,
    rinsed: false,
    dropsOnSide: 0,
    measureStage: 'demo',
    demoDone: false,
    checkedRuns: new Set(),
    capacityDone: false,
    cleared: false,
  };
}

export function phaseChecklist(state: GameState): { id: string; label: string; done: boolean }[] {
  switch (state.phase) {
    case 0:
      return [
        { id: 'sel', label: `已勾選 ${state.selected.size} 項`, done: state.selected.size > 0 },
        { id: 'pass', label: '提交並通過器材檢查', done: state.phase0Passed },
      ];
    case 1:
      return [
        {
          id: 'c',
          label: '將校正步驟排成正確順序並提交',
          done: state.calibSolved,
        },
      ];
    case 2:
      return [
        { id: 'h', label: 'HOAc 步驟順序正確', done: state.hoacSolved },
        { id: 'n', label: 'NaOAc 步驟順序正確', done: state.naoacSolved },
      ];
    case 3:
      return [
        {
          id: 'proc',
          label: `滴液中（目前 ${state.drop.drops} 滴，約 20～45 即可）`,
          done: state.drop.done || (state.drop.drops >= 20 && state.drop.initialMl),
        },
        { id: 'calc', label: '算出正確的每滴平均 μL', done: state.drop.done },
      ];
    case 4:
      return [
        {
          id: 'mix',
          label: `配齊試樣 ${state.samplesReady.size}/${SAMPLES.length}`,
          done: SAMPLES.every((s) => state.samplesReady.has(s.id)),
        },
        { id: 'quiz', label: '分辨哪些是緩衝溶液', done: state.bufferQuizDone },
      ];
    case 5:
      return [
        { id: 'demo', label: '示範：完成一次正確測定流程', done: state.demoDone },
        {
          id: 'check',
          label: `勾選其餘測定 ${state.checkedRuns.size}/10`,
          done: state.checkedRuns.size >= 10,
        },
        { id: 'cap', label: '讀表估算緩衝容量', done: state.capacityDone },
      ];
    default:
      return [];
  }
}

export function canAdvance(state: GameState): boolean {
  switch (state.phase) {
    case 0:
      return state.phase0Passed;
    case 1:
      return state.calibSolved;
    case 2:
      return state.hoacSolved && state.naoacSolved;
    case 3:
      return state.drop.done;
    case 4:
      return SAMPLES.every((s) => state.samplesReady.has(s.id)) && state.bufferQuizDone;
    case 5:
      return state.capacityDone;
    default:
      return false;
  }
}

export function recipeMatches(
  target: SampleRecipe,
  mix: { hoac: number; naoac: number; water: number },
): boolean {
  return mix.hoac === target.hoac && mix.naoac === target.naoac && mix.water === target.water;
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

/** (e) only after a–d fully done. */
export function canMeasureSample(state: GameState, id: SampleRecipe['id']): boolean {
  if (id !== 'e') return true;
  return SAMPLES.filter((s) => s.id !== 'e').every(
    (s) => state.measures[s.id].acidDone && state.measures[s.id].baseDone,
  );
}

/** 開發／檢視用：前面關卡直接視為已完成，跳到第 6 步。 */
export function createSkipToPhase5State(
  stage: GameState['measureStage'] = 'capacity',
): GameState {
  const state = createInitialState();
  state.phase = 5;
  state.phase0Passed = true;
  for (const id of REQUIRED_IDS) state.selected.add(id);
  state.calibSolved = true;
  state.hoacSolved = true;
  state.naoacSolved = true;
  state.drop = {
    reagent: 'hcl',
    initialMl: true,
    drops: 30,
    finalMl: 2.5,
    trueAvgUl: 50,
    done: true,
  };
  for (const s of SAMPLES) state.samplesReady.add(s.id);
  state.bufferQuizDone = true;
  state.demoDone = true;
  state.measures.a.acidDone = true;
  state.measures.a.initial = 4.76;
  state.measures.a.acid = [4.71, 4.66, 4.61, 4.56, 4.51];
  for (const r of MEASURE_RUNS) state.checkedRuns.add(r.key);
  state.measureStage = stage;
  state.capacityDone = false;
  return state;
}
