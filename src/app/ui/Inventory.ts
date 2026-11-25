import type { CatalogItem } from '../../experiments/e12/config';

export function renderInventoryItems(
  items: CatalogItem[],
  selected: Set<string>,
  onToggle: (id: string) => void,
): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'item-grid';
  for (const item of items) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `item-card ${selected.has(item.id) ? 'is-selected' : ''}`;
    btn.innerHTML = `<span class="item-card__icon">${item.icon}</span><span class="item-card__label">${item.label}</span>`;
    btn.addEventListener('click', () => onToggle(item.id));
    wrap.appendChild(btn);
  }
  return wrap;
}
