export type DragPayload = {
  id: string;
  kind: string;
  label: string;
};

type DragHandlers = {
  onDrop?: (payload: DragPayload, target: HTMLElement) => void;
};

const MIME = 'application/x-lab-item';

export function makeDraggable(el: HTMLElement, payload: DragPayload): void {
  el.draggable = true;
  el.classList.add('is-draggable');
  el.addEventListener('dragstart', (e) => {
    e.dataTransfer?.setData(MIME, JSON.stringify(payload));
    e.dataTransfer!.effectAllowed = 'move';
    el.classList.add('is-dragging');
  });
  el.addEventListener('dragend', () => el.classList.remove('is-dragging'));
}

export function makeDropZone(el: HTMLElement, handlers: DragHandlers): void {
  el.classList.add('is-dropzone');
  el.addEventListener('dragover', (e) => {
    e.preventDefault();
    el.classList.add('is-drop-hover');
  });
  el.addEventListener('dragleave', () => el.classList.remove('is-drop-hover'));
  el.addEventListener('drop', (e) => {
    e.preventDefault();
    el.classList.remove('is-drop-hover');
    const raw = e.dataTransfer?.getData(MIME);
    if (!raw) return;
    try {
      const payload = JSON.parse(raw) as DragPayload;
      handlers.onDrop?.(payload, el);
    } catch {
      /* ignore */
    }
  });
}
