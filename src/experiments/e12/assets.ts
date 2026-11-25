/** Simple icon / label helpers for E12 labware. */

export const GEAR_ICON: Record<string, string> = {
  ph_meter: '📟',
  electrode: '🔌',
  stir_bar: '🧲',
  beaker_50: '🧪',
  flask_250: '🫙',
  pipette_10: '💉',
  pipette_2: '💉',
  bulb: '🔴',
  dropper: '🧴',
  cylinder: '📏',
  beaker_400: '🥣',
  test_tube: '🧫',
  wash_bottle: '🚿',
  funnel: '⚗️',
  balance: '⚖️',
  beaker_100: '🥛',
};

export function iconFor(id: string): string {
  return GEAR_ICON[id] ?? '•';
}
