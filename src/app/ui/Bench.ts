/** Bench container helper — scene root for the current phase. */

export function createBenchRoot(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'bench';
  el.id = 'bench';
  return el;
}
