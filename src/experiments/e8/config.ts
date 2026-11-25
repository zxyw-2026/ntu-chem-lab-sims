export type CatalogItem = {
  id: string;
  label: string;
  required: boolean;
  icon: string;
  hint: string;
};

export type Choice = {
  id: string;
  label: string;
  ok: boolean;
  why: string;
};

export const PHASE_TITLES = [
  '選取器材與藥品',
  '排出操作順序',
  '統一計時方式',
  '測定變色時間',
  '計算 m、n、k',
  '設計取量／碘鐘交響曲',
] as const;

export const CATALOG: CatalogItem[] = [
  { id: 'timer', label: '計時器', required: true, icon: '⏱️', hint: '測定變色時間需要計時器（助教點發）。' },
  { id: 'pipette_5', label: '5 mL 刻度吸量管 ×2', required: true, icon: '💉', hint: '量取 K₂SO₄、K₂S₂O₈。' },
  { id: 'erlenmeyer', label: '50 mL 錐形瓶 ×10', required: true, icon: '🧉', hint: '反應在錐形瓶中進行。' },
  { id: 'cork', label: '軟木塞 ×2', required: true, icon: '🪵', hint: '搖晃混合時要塞緊。' },
  { id: 'bulb', label: '安全吸球', required: true, icon: '🔴', hint: '搭配吸量管取液。' },
  { id: 'pipette_rack', label: '吸量管架', required: true, icon: '🗄️', hint: '放置吸量管。' },
  { id: 'label', label: '標籤紙', required: true, icon: '🏷️', hint: '標記燒杯／藥品。' },
  { id: 'beaker_100', label: '100 mL 燒杯 ×2（洗烘）', required: true, icon: '🥛', hint: '分裝 K₂SO₄、K₂S₂O₈。' },
  { id: 'calc', label: '工程用計算機', required: true, icon: '🧮', hint: '計算速率與級數。' },
  { id: 'k2s2o8', label: '0.10 M K₂S₂O₈', required: true, icon: '🧪', hint: '過硫酸鉀，反應物之一。' },
  { id: 'k2so4', label: '0.10 M K₂SO₄', required: true, icon: '🧪', hint: '維持離子強度。' },
  { id: 'nai', label: '0.20 M NaI', required: true, icon: '🧪', hint: '碘化鈉，提供 I⁻。' },
  { id: 'nacl', label: '0.20 M NaCl', required: true, icon: '🧪', hint: '維持離子強度／總體積。' },
  { id: 's2o3', label: '0.0050 M Na₂S₂O₃', required: true, icon: '🧪', hint: '限量計時劑（硫代硫酸鈉）。' },
  { id: 'starch', label: '2% 澱粉溶液', required: true, icon: '🥛', hint: '指示劑，變色終點。' },
  // decoys (E12 / E10)
  { id: 'ph_meter', label: '酸鹼度測定計', required: false, icon: '📟', hint: '這是 E12 緩衝溶液用的。' },
  { id: 'spec', label: '分光光度計', required: false, icon: '🔦', hint: '這是 E10 鈷離子定量用的。' },
  { id: 'acetone', label: '丙酮', required: false, icon: '🧴', hint: 'E10 試劑，碘鐘實驗不用。' },
  { id: 'hoac', label: '濃醋酸', required: false, icon: '🧴', hint: 'E12 配緩衝液用，不是碘鐘。' },
  { id: 'electrode', label: 'pH 電極／測溫棒', required: false, icon: '🔌', hint: 'E12 器材。' },
];

export const REQUIRED_IDS = CATALOG.filter((c) => c.required).map((c) => c.id);

export const PROC_STEPS = [
  { id: 'beakers', label: '以 100 mL 燒杯分裝約 30 mL K₂SO₄ 與 K₂S₂O₈' },
  { id: 'flasks', label: '準備洗淨烘乾放冷的 50 mL 錐形瓶' },
  { id: 'dispense', label: '用定量分注器取 NaI、NaCl、Na₂S₂O₃、澱粉入錐形瓶' },
  { id: 'k2so4', label: '以 5 mL 吸量管取 K₂SO₄（依表）入錐形瓶' },
  { id: 'start', label: '加入 K₂S₂O₈ 的同時開始計時' },
  { id: 'shake', label: '塞上軟木塞，手搖 20 秒後靜置觀察' },
  { id: 'stop', label: '溶液一開始變色立即停表，記錄 Δt' },
] as const;

/** 學習單「計時方式」正確圈選 */
export const TIMING_QUIZ: {
  id: string;
  prompt: string;
  options: Choice[];
}[] = [
  {
    id: 'start',
    prompt: '開始計時為？',
    options: [
      { id: 's1', label: '拔安全吸球', ok: false, why: '應在 K₂S₂O₈ 加入（開始流放／加入）時同步計時。' },
      { id: 's2', label: '按壓 E 閥', ok: false, why: '全班統一：加 K₂S₂O₈ 即開始計時。' },
      { id: 's3', label: '加入／流放過硫酸鉀時', ok: true, why: '正確' },
    ],
  },
  {
    id: 'shake',
    prompt: '搖晃時長為？',
    options: [
      { id: 'k1', label: '搖 20 秒', ok: true, why: '正確' },
      { id: 'k2', label: '搖到第 20 秒（含變色也繼續）', ok: false, why: '固定手搖 20 秒後靜置觀察。' },
      { id: 'k3', label: '搖至變色', ok: false, why: '不是搖到變色為止，是搖 20 秒。' },
    ],
  },
  {
    id: 'stop',
    prompt: '何時停止計時？',
    options: [
      { id: 't1', label: '開始變色的瞬間', ok: true, why: '正確' },
      { id: 't2', label: '變色至不再變化', ok: false, why: '應在開始變色瞬間停表。' },
      { id: 't3', label: '過硫酸鉀流完', ok: false, why: '流完不是停表點；停表是變色瞬間。' },
    ],
  },
];

export type TrialId = 1 | 2 | 3;

export type TrialRecipe = {
  id: TrialId;
  nai: number;
  nacl: number;
  s2o3: number;
  starch: number;
  k2so4: number;
  k2s2o8: number;
  /** 教學用平均變色時間（s），對齊講義示例 */
  dt: number;
};

export const TRIALS: TrialRecipe[] = [
  { id: 1, nai: 2.0, nacl: 2.0, s2o3: 1.0, starch: 1.0, k2so4: 2.0, k2s2o8: 2.0, dt: 109 },
  { id: 2, nai: 2.0, nacl: 2.0, s2o3: 1.0, starch: 1.0, k2so4: 0, k2s2o8: 4.0, dt: 59 },
  { id: 3, nai: 4.0, nacl: 0, s2o3: 1.0, starch: 1.0, k2so4: 2.0, k2s2o8: 2.0, dt: 58 },
];

export const TOTAL_VOL_ML = 10.0;
