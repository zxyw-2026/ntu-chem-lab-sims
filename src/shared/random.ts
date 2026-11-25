/** Fisher–Yates shuffle (copy). */
export function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickChoices<T extends { id: string }>(
  correct: T,
  wrongs: T[],
  total = 4,
): T[] {
  const pool = shuffle(wrongs).slice(0, Math.max(0, total - 1));
  return shuffle([correct, ...pool]);
}
