export type CatalogItem = {
  id: string;
  label: string;
  category: 'gear' | 'reagent' | 'decoy';
  required: boolean;
  icon: string;
  /** Why this item is / isn't for E12 — shown after wrong submit */
  hint: string;
};

export type SampleRecipe = {
  id: 'a' | 'b' | 'c' | 'd' | 'e';
  hoac: number;
  naoac: number;
  water: number;
  kind: 'buffer' | 'acid' | 'base' | 'water';
};

export type Choice = {
  id: string;
  label: string;
  ok: boolean;
  why: string;
};

export const PHASE_TITLES = [
  '選取器材與藥品',
  '校正酸鹼度計',
  '配製 0.050 M HOAc / NaOAc',
  '量測一滴溶液體積',
  '配製試樣溶液 (a)~(e)',
  '量測 pH 變化',
] as const;

export const CATALOG: CatalogItem[] = [
  { id: 'ph_meter', label: '酸鹼度測定計 (pH meter)', category: 'gear', required: true, icon: '📟', hint: '本實驗要測 pH 變化，需要 pH 計。' },
  { id: 'electrode', label: '複合玻璃電極／測溫棒', category: 'gear', required: true, icon: '🔌', hint: 'pH 計需搭配電極與測溫棒。' },
  { id: 'stir_bar', label: '攪拌子', category: 'gear', required: true, icon: '🧲', hint: '滴加酸鹼時需低速攪拌使溶液均勻。' },
  { id: 'beaker_50', label: '50 mL 燒杯 ×5', category: 'gear', required: true, icon: '🧪', hint: '試樣 (a)~(e) 置於 50 mL 燒杯。' },
  { id: 'flask_250', label: '250 mL 容量瓶', category: 'gear', required: true, icon: '🫙', hint: '配 0.050 M 溶液需定容至 250 mL。' },
  { id: 'pipette_10', label: '10 mL 刻度吸量管', category: 'gear', required: true, icon: '💉', hint: '量取 HOAc／NaOAc 試樣體積用。' },
  { id: 'pipette_2', label: '2 mL 刻度吸量管', category: 'gear', required: true, icon: '💉', hint: '取 0.74 mL 濃醋酸需用 2 mL 吸量管。' },
  { id: 'bulb', label: '安全吸球', category: 'gear', required: true, icon: '🔴', hint: '吸量管搭配安全吸球取液。' },
  { id: 'dropper', label: '塑膠滴管 ×2', category: 'gear', required: true, icon: '🧴', hint: '定容近標線與滴加減液需要滴管。' },
  { id: 'cylinder', label: '10 / 50 mL 量筒', category: 'gear', required: true, icon: '📏', hint: '量測一滴體積與量取去離子水用。' },
  { id: 'beaker_400', label: '400 mL 燒杯', category: 'gear', required: true, icon: '🥣', hint: '配好的 HOAc／NaOAc 轉入 400 mL 燒杯供取用。' },
  { id: 'test_tube', label: '試管 ×2', category: 'gear', required: true, icon: '🧫', hint: '分別裝 1.0 M HCl 與 NaOH 備用。' },
  { id: 'wash_bottle', label: '洗瓶（去離子水）', category: 'gear', required: true, icon: '🚿', hint: '沖洗電極、潤洗與配製都需要。' },
  { id: 'funnel', label: '漏斗', category: 'gear', required: true, icon: '⚗️', hint: '溶液轉入容量瓶時使用漏斗。' },
  { id: 'balance', label: '天平', category: 'gear', required: true, icon: '⚖️', hint: '稱取 NaOAc·3H₂O 需要天平。' },
  { id: 'beaker_100', label: '100 mL 燒杯', category: 'gear', required: true, icon: '🥛', hint: '初步稀釋／溶解用 100 mL 燒杯。' },
  { id: 'hoac_conc', label: '濃醋酸 (17 M HOAc)', category: 'reagent', required: true, icon: '🧴', hint: '用來配 0.050 M 醋酸。' },
  { id: 'naoac_solid', label: 'NaOAc·3H₂O 固體', category: 'reagent', required: true, icon: '🧂', hint: '用來配 0.050 M 醋酸鈉。' },
  { id: 'hcl', label: '1.0 M HCl', category: 'reagent', required: true, icon: '🧪', hint: '測試緩衝能力時滴加的強酸。' },
  { id: 'naoh', label: '1.0 M NaOH', category: 'reagent', required: true, icon: '🧪', hint: '測試緩衝能力時滴加的強鹼。' },
  { id: 'di_water', label: '去離子水', category: 'reagent', required: true, icon: '💧', hint: '稀釋、定容與對照組 (e) 都需要。' },
  { id: 'std_7', label: 'pH 7.00 標準液', category: 'reagent', required: true, icon: '🟩', hint: '校正 pH 計先用 7.00。' },
  { id: 'std_4', label: 'pH 4.00 標準液', category: 'reagent', required: true, icon: '🟨', hint: '校正 pH 計再用 4.00 調 SLOPE。' },
  { id: 'spec', label: '分光光度計', category: 'decoy', required: false, icon: '🔦', hint: '這是 E10 鈷離子定量用的，緩衝溶液實驗不需要。' },
  { id: 'acetone', label: '丙酮', category: 'decoy', required: false, icon: '🧴', hint: 'E10 配位／呈色才用丙酮，E12 不用。' },
  { id: 'kscn', label: '50% KSCN', category: 'decoy', required: false, icon: '🧪', hint: '硫氰酸鉀是 E10 試劑，不是緩衝溶液實驗。' },
  { id: 'erlenmeyer', label: '50 mL 錐形瓶（碘鐘組）', category: 'decoy', required: false, icon: '🧉', hint: '錐形瓶是 E8 碘鐘實驗器材。' },
  { id: 'starch', label: '2% 澱粉溶液', category: 'decoy', required: false, icon: '🥛', hint: '澱粉指示劑用於碘鐘／碘相關實驗。' },
  { id: 'timer', label: '計時器', category: 'decoy', required: false, icon: '⏱️', hint: '計時器主要是碘鐘測變色時間用。' },
  { id: 'cuvette', label: '測光管', category: 'decoy', required: false, icon: '▭', hint: '測光管配合分光光度計，屬 E10。' },
];

export const REQUIRED_IDS = CATALOG.filter((c) => c.required).map((c) => c.id);

export const SAMPLES: SampleRecipe[] = [
  { id: 'a', hoac: 15, naoac: 15, water: 0, kind: 'buffer' },
  { id: 'b', hoac: 5, naoac: 5, water: 20, kind: 'buffer' },
  { id: 'c', hoac: 30, naoac: 0, water: 0, kind: 'acid' },
  { id: 'd', hoac: 0, naoac: 30, water: 0, kind: 'base' },
  { id: 'e', hoac: 0, naoac: 0, water: 30, kind: 'water' },
];

export const CALIB_STEPS = [
  { id: 'power', label: '按 POWER 開機暖機' },
  { id: 'rinse1', label: '以洗瓶沖洗電極與測溫棒' },
  { id: 'std7', label: '浸入 pH 7.00 標準液' },
  { id: 'calib', label: '旋轉 CALIB. 至顯示 7.00' },
  { id: 'hold', label: '按 HOLD 鎖定讀值' },
  { id: 'rinse2', label: '取出並沖洗電極' },
  { id: 'std4', label: '浸入 pH 4.00 標準液，解除 HOLD' },
  { id: 'slope', label: '旋轉 SLOPE 至顯示 4.00' },
  { id: 'standby', label: '沖洗後置於去離子水備用' },
] as const;

/** Wrong actions that can appear as distractors during calibration. */
export const CALIB_DISTRACTORS: Choice[] = [
  { id: 'w-slope-first', label: '先旋轉 SLOPE 調到 7.00', ok: false, why: '應先用 pH 7.00 調 CALIB.，再用 pH 4.00 調 SLOPE。' },
  { id: 'w-std4-first', label: '直接浸入 pH 4.00 開始校正', ok: false, why: '講義規定先校正 pH 7.00，再校正 pH 4.00。' },
  { id: 'w-no-rinse', label: '不沖洗，電極直接換標準液', ok: false, why: '更換溶液前後都要以去離子水沖洗，避免交叉污染。' },
  { id: 'w-calib-4', label: '在 pH 4.00 標準液上轉 CALIB.', ok: false, why: 'pH 4.00 是調 SLOPE，不是 CALIB。' },
  { id: 'w-skip-hold', label: '不按 HOLD，直接拿出電極去調下一點', ok: false, why: '校正 7.00 後需 HOLD 鎖定，沖洗換液後再解除。' },
  { id: 'w-shake', label: '用力甩電極上的水', ok: false, why: '電極昂貴易損，應以面紙輕沾，不可甩撞。' },
  { id: 'w-off', label: '校正中途按 POWER 關機重來', ok: false, why: '開機暖機後應保持開啟；結束後才關機且不拔插頭保暖機。' },
];

export const HOAC_STEPS = [
  { id: 'pipette', label: '用 2 mL 吸量管取 0.74 mL 濃醋酸' },
  { id: 'dilute', label: '加入含約 50 mL DI 水的 100 mL 燒杯稀釋' },
  { id: 'transfer', label: '經漏斗轉入 250 mL 容量瓶並潤洗' },
  { id: 'volume', label: '定容至標線' },
  { id: 'mix', label: '蓋緊倒置混合均勻' },
  { id: 'pour', label: '倒入 400 mL 燒杯並貼標「0.050 M HOAc」' },
] as const;

export const NAOAC_STEPS = [
  { id: 'weigh', label: '天平精稱 1.70 g NaOAc·3H₂O' },
  { id: 'dissolve', label: '於 100 mL 燒杯以約 50 mL DI 水溶解' },
  { id: 'transfer', label: '經漏斗轉入 250 mL 容量瓶並潤洗' },
  { id: 'volume', label: '定容至標線' },
  { id: 'mix', label: '蓋緊倒置混合均勻' },
  { id: 'pour', label: '倒入 400 mL 燒杯並貼標「0.050 M NaOAc」' },
] as const;

export const HOAC_DISTRACTORS: Choice[] = [
  { id: 'h-17', label: '直接量取 17.0 mL 濃醋酸定容', ok: false, why: '濃醋酸約 17 M；要配 0.050 M×250 mL，應取約 0.74 mL。' },
  { id: 'h-74', label: '用吸量管取 7.4 mL 濃醋酸', ok: false, why: '體積多了十倍，濃度會變成約 0.50 M。' },
  { id: 'h-no-dilute', label: '濃醋酸直接倒進容量瓶再加水', ok: false, why: '應先在燒杯初步稀釋，較安全也較易混合。' },
  { id: 'h-100flask', label: '改用 100 mL 容量瓶定容', ok: false, why: '講義指定稀釋至 250 mL。' },
  { id: 'h-label-naoac', label: '貼標成「0.050 M NaOAc」', ok: false, why: '兩液皆無色，貼錯標會整組實驗作廢。' },
];

export const NAOAC_DISTRACTORS: Choice[] = [
  { id: 'n-17g', label: '稱取 17.0 g NaOAc·3H₂O', ok: false, why: '正確是約 1.70 g（配 0.050 M、250 mL）。' },
  { id: 'n-0.17', label: '稱取 0.17 g', ok: false, why: '質量少了十倍，濃度會太稀。' },
  { id: 'n-anhydrous', label: '當作成無水 NaOAc 直接用同一質量', ok: false, why: '用的是三水合醋酸鈉，式量不同，不可混用。' },
  { id: 'n-no-funnel', label: '不經漏斗，固體直接倒入容量瓶', ok: false, why: '應先溶解於燒杯，再經漏斗轉入並潤洗。' },
  { id: 'n-label-hoac', label: '貼標成「0.050 M HOAc」', ok: false, why: '標籤貼反會導致後續配方全錯。' },
];
