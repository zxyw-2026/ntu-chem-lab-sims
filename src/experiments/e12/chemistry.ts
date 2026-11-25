import type { SampleRecipe } from './config';

const PKA = 4.76;
const DROP_MOL = 0.05e-3; // ~0.05 mL of 1.0 M → moles
const SAMPLE_L = 0.03;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function hh(ha: number, a: number): number {
  if (ha <= 1e-12 && a <= 1e-12) return 7;
  if (ha <= 1e-12) return 11.5;
  if (a <= 1e-12) return Math.max(2.2, 0.5 * (PKA - Math.log10(Math.max(ha, 1e-6))));
  return PKA + Math.log10(a / ha);
}

/** Approximate pH after adding n drops of 1.0 M strong acid or base. */
export function simulatePh(
  sample: SampleRecipe,
  acidDrops: number,
  baseDrops: number,
): number {
  const totalVol = sample.hoac + sample.naoac + sample.water || 30;
  const ha0 = (0.05 * sample.hoac) / totalVol;
  const a0 = (0.05 * sample.naoac) / totalVol;

  if (sample.kind === 'water') {
    if (acidDrops === 0 && baseDrops === 0) return 6.2 + Math.random() * 0.6;
    if (acidDrops > 0) {
      return clamp(-Math.log10((acidDrops * DROP_MOL) / SAMPLE_L), 1.2, 6);
    }
    return clamp(14 + Math.log10((baseDrops * DROP_MOL) / SAMPLE_L), 8, 12.8);
  }

  let molesHa = ha0 * SAMPLE_L;
  let molesA = a0 * SAMPLE_L;

  if (sample.kind === 'acid') {
    molesA = 1e-8;
  }
  if (sample.kind === 'base') {
    molesHa = 1e-8;
  }

  // H+ converts A- → HA; OH- converts HA → A-
  molesHa += acidDrops * DROP_MOL;
  molesA -= acidDrops * DROP_MOL;
  molesHa -= baseDrops * DROP_MOL;
  molesA += baseDrops * DROP_MOL;

  if (molesA < 0) {
    const excess = -molesA;
    molesA = 0;
    molesHa = Math.max(0, molesHa);
    return clamp(-Math.log10(excess / SAMPLE_L + (molesHa > 0 ? 0 : 1e-4)), 1.4, 3.8);
  }
  if (molesHa < 0) {
    const excess = -molesHa;
    molesHa = 0;
    return clamp(14 + Math.log10(excess / SAMPLE_L), 10, 13);
  }

  if (sample.kind === 'base' && acidDrops === 0 && baseDrops === 0) {
    return 8.55 + Math.random() * 0.12;
  }

  const noise = sample.kind === 'buffer' ? (Math.random() - 0.5) * 0.04 : (Math.random() - 0.5) * 0.08;
  return clamp(hh(molesHa / SAMPLE_L, molesA / SAMPLE_L) + noise, 1, 13);
}

export function formatPh(ph: number): string {
  return ph.toFixed(2);
}
