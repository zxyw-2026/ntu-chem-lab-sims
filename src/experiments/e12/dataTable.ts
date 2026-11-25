import { SAMPLES, type SampleRecipe } from './config';

/**
 * 學習單公式：
 * 緩衝容量 (meq/(L·pH)) =
 *   [1 / slope(pH/滴)] × Vd(mL/滴) × CM(eq/L) × 1000(mL/L) / 30 mL
 *
 * slope ≈ |pH₅ − pH₀| / 5
 * CM = 1.0，緩衝液體積 = 30 mL
 */
export const BUFFER_VOLUME_ML = 30;
export const CM_EQL = 1.0;
export const DROP_COUNT_FOR_SLOPE = 5;

/** 模擬學習單「濃度對緩衝容量之影響」讀表（固定教學數值）。 */
const PH_BY_DROPS: Record<
  SampleRecipe['id'],
  { naoh: number[]; hcl: number[] }
> = {
  // index = 滴數 0..5
  a: {
    // 0.050 M 1:1 緩衝：變化小
    naoh: [4.76, 4.81, 4.86, 4.91, 4.96, 5.01],
    hcl: [4.76, 4.71, 4.66, 4.61, 4.56, 4.51],
  },
  b: {
    // 較稀 1:1 緩衝：變化較大
    naoh: [4.76, 4.88, 5.00, 5.12, 5.24, 5.36],
    hcl: [4.76, 4.64, 4.52, 4.40, 4.28, 4.16],
  },
  c: {
    naoh: [3.15, 3.55, 4.20, 5.40, 10.2, 11.3],
    hcl: [3.15, 2.85, 2.55, 2.30, 2.10, 1.95],
  },
  d: {
    naoh: [8.60, 9.20, 10.1, 11.0, 11.5, 11.9],
    hcl: [8.60, 7.40, 6.20, 5.40, 4.80, 4.35],
  },
  e: {
    naoh: [6.40, 8.50, 10.2, 11.0, 11.4, 11.7],
    hcl: [6.40, 4.20, 3.10, 2.50, 2.20, 2.00],
  },
};

export function phAt(
  id: SampleRecipe['id'],
  side: 'naoh' | 'hcl',
  drops: number,
): number {
  return PH_BY_DROPS[id][side][drops];
}

export function slopePhPerDrop(
  id: SampleRecipe['id'],
  side: 'naoh' | 'hcl',
): number {
  const p0 = phAt(id, side, 0);
  const p5 = phAt(id, side, DROP_COUNT_FOR_SLOPE);
  return Math.abs(p5 - p0) / DROP_COUNT_FOR_SLOPE;
}

/** 依學習單公式計算緩衝容量 (meq/(L·pH)) */
export function bufferCapacityMeq(
  slopePhPerDrop: number,
  vDropMl: number,
  cmEql: number = CM_EQL,
  volumeMl: number = BUFFER_VOLUME_ML,
): number {
  if (slopePhPerDrop < 1e-9) return Number.POSITIVE_INFINITY;
  return ((1 / slopePhPerDrop) * vDropMl * cmEql * 1000) / volumeMl;
}

export function formatCap(beta: number): string {
  if (!Number.isFinite(beta)) return '∞';
  // 學習單強調有效數字；遊戲核對用三位小數
  return beta.toFixed(1);
}

export const SAMPLE_LABELS: Record<SampleRecipe['id'], string> = {
  a: '0.050 M\n醋酸/醋酸鈉 (1:1)',
  b: '0.017 M\n醋酸/醋酸鈉 (1:1)',
  c: '0.050 M\n醋酸',
  d: '0.050 M\n醋酸鈉',
  e: 'DI Water',
};

export { SAMPLES };
