import { TOTAL_VOL_ML, TRIALS, type TrialId, type TrialRecipe } from './config';

/** 學習單：rate = 0.00025 / Δt */
export function initialRate(dtSec: number): number {
  return 0.00025 / dtSec;
}

export function concS2O8(trial: TrialRecipe): number {
  return (0.1 * trial.k2s2o8) / TOTAL_VOL_ML;
}

export function concI(trial: TrialRecipe): number {
  return (0.2 * trial.nai) / TOTAL_VOL_ML;
}

export function concS2O3(trial: TrialRecipe): number {
  return (0.005 * trial.s2o3) / TOTAL_VOL_ML;
}

/** m：比較試驗 2 與 1，rate2/rate1 = 2^m = Δt1/Δt2 */
export function calcM(dt1: number, dt2: number): number {
  return Math.log(dt1 / dt2) / Math.log(2);
}

/** n：比較試驗 3 與 1 */
export function calcN(dt1: number, dt3: number): number {
  return Math.log(dt1 / dt3) / Math.log(2);
}

/** k = rate / ([S2O8]^m [I]^n) */
export function calcK(trial: TrialRecipe, m: number, n: number): number {
  const rate = initialRate(trial.dt);
  const a = concS2O8(trial);
  const b = concI(trial);
  return rate / (a ** m * b ** n);
}

export function trialById(id: TrialId): TrialRecipe {
  return TRIALS.find((t) => t.id === id)!;
}

/**
 * 設計長秒數取量：rx/r1 = Δt1/Δtx = (x/2)^m
 * → x = 2 * (Δt1/Δtx)^(1/m)
 */
export function designX(dt1: number, dtTarget: number, m: number): number {
  return 2 * (dt1 / dtTarget) ** (1 / m);
}

/**
 * 短秒數：ry/r3 = Δt3/Δty = (y/2)^m
 * → y = 2 * (Δt3/Δty)^(1/m)
 */
export function designY(dt3: number, dtTarget: number, m: number): number {
  return 2 * (dt3 / dtTarget) ** (1 / m);
}

export function formatSci(n: number, digits = 2): string {
  return n.toExponential(digits);
}

export function roundSig(n: number, sig = 2): number {
  if (n === 0) return 0;
  const d = Math.ceil(Math.log10(Math.abs(n)));
  const p = sig - d;
  const f = 10 ** p;
  return Math.round(n * f) / f;
}
