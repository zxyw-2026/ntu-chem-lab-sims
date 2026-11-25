let host: HTMLElement | null = null;

function ensureHost(): HTMLElement {
  if (!host) {
    host = document.createElement('div');
    host.className = 'toast-host';
    document.body.appendChild(host);
  }
  return host;
}

export function toast(message: string, kind: 'ok' | 'err' | 'info' = 'info'): void {
  const el = document.createElement('div');
  el.className = `toast toast--${kind}`;
  el.textContent = message;
  ensureHost().appendChild(el);
  requestAnimationFrame(() => el.classList.add('toast--show'));
  window.setTimeout(() => {
    el.classList.remove('toast--show');
    window.setTimeout(() => el.remove(), 280);
  }, 2600);
}
