# 普化實驗虛擬預習小遊戲

台大普通化學實驗預習用互動程式，目前包含：

- **E12 緩衝溶液**
- **E8 碘鐘交響曲**

## 啟動

```bash
npm install
npm run dev
```

開啟本機網址（通常 `http://127.0.0.1:5173/`）會看到實驗選單。

## 直接進入某實驗

- E12：`http://127.0.0.1:5173/?exp=e12`
- E8：`http://127.0.0.1:5173/?exp=e8`

## 跳關檢視（前面自動視為完成）

- E12 緩衝容量：`?exp=e12&skipTo=5`
- E8 設計取量：`?exp=e8&skipTo=5`
- E8 計算 m,n,k：`?exp=e8&skipTo=4`

## 建置

```bash
npm run build
npm run preview
```

## 專案結構

```
src/
  main.ts                 # 首頁選實驗
  app/GameApp.ts          # E12
  app/E8GameApp.ts        # E8
  experiments/e12/        # E12 設定與計算
  experiments/e8/         # E8 設定與計算
```

## E8 關卡概要

1. 選器材／藥品（打亂＋干擾項）
2. 拖曳排出操作順序
3. 計時方式三題（對齊學習單）
4. 試驗1示範一次 → 勾選其餘測定
5. 依學習單算 rate、m、n、k 與速率定律式
6. 設計過硫酸鉀取量 x，使指定時間變色
