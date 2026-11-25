import './style.css';
import { GameApp } from './app/GameApp';
import { E8GameApp } from './app/E8GameApp';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('#app not found');

function renderHome(): void {
  app!.innerHTML = `
    <div class="home">
      <div class="home__card">
        <p class="home__eyebrow">台大普化實驗 · 虛擬預習小遊戲</p>
        <h1 class="home__title">實驗桌模擬</h1>
        <p class="home__lede">選一個實驗開始。可操作、要判斷，適合當預報延伸交給助教。</p>
        <div class="home__grid">
          <a class="home__exp" href="?exp=e12">
            <span class="home__code">E12</span>
            <strong>緩衝溶液</strong>
            <span>選器材 → 校正 → 配製 → 測 pH → 緩衝容量</span>
          </a>
          <a class="home__exp" href="?exp=e8">
            <span class="home__code">E8</span>
            <strong>碘鐘交響曲</strong>
            <span>選器材 → 排序 → 計時 → 變色測定 → m,n,k → 設計取量</span>
          </a>
        </div>
        <p class="home__hint">檢視用跳關：E12 用 <code>?exp=e12&amp;skipTo=5</code>；E8 用 <code>?exp=e8&amp;skipTo=5</code></p>
      </div>
    </div>`;
}

const params = new URLSearchParams(window.location.search);
const exp = params.get('exp');

if (exp === 'e12') {
  document.title = 'E12 緩衝溶液虛擬實驗';
  new GameApp(app);
} else if (exp === 'e8') {
  document.title = 'E8 碘鐘交響曲虛擬實驗';
  new E8GameApp(app);
} else {
  document.title = '普化實驗虛擬預習';
  renderHome();
}
