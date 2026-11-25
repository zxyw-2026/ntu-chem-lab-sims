import { PHASE_TITLES } from '../../experiments/e12/config';
import type { GameState } from '../../experiments/e12/phases';
import { canAdvance, phaseChecklist } from '../../experiments/e12/phases';

export function renderHud(
  root: HTMLElement,
  state: GameState,
  onNext: () => void,
): void {
  const checklist = phaseChecklist(state);
  const ready = canAdvance(state);

  root.innerHTML = `
    <div class="hud">
      <div class="hud__brand">
        <div class="hud__eyebrow">台大普化實驗 · 虛擬預習</div>
        <h1 class="hud__title">E12 緩衝溶液</h1>
      </div>
      <div class="hud__progress">
        ${PHASE_TITLES.map((_, i) => {
          const cls =
            i < state.phase ? 'done' : i === state.phase ? 'current' : '';
          return `<span class="hud__dot ${cls}" title="${PHASE_TITLES[i]}"></span>`;
        }).join('')}
        <span class="hud__phase-label">步驟 ${state.phase + 1}/6 · ${PHASE_TITLES[state.phase]}</span>
      </div>
      <div class="hud__check">
        <h2>過關條件</h2>
        <p class="hud__note">不會劇透正確步驟；選錯會說明原因。</p>
        <ul>
          ${checklist
            .map(
              (c) =>
                `<li class="${c.done ? 'is-done' : ''}"><span class="tick">${c.done ? '✓' : '○'}</span>${c.label}</li>`,
            )
            .join('')}
        </ul>
        <button class="btn btn--primary" id="btn-next" ${ready && !state.cleared ? '' : 'disabled'}>
          ${state.phase === 5 ? '完成實驗 → 通關' : '本關通過 → 下一階段'}
        </button>
      </div>
    </div>
  `;

  root.querySelector('#btn-next')?.addEventListener('click', onNext);
}
