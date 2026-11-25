(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`選取器材與藥品`,`校正酸鹼度計`,`配製 0.050 M HOAc / NaOAc`,`量測一滴溶液體積`,`配製試樣溶液 (a)~(e)`,`量測 pH 變化`],t=[{id:`ph_meter`,label:`酸鹼度測定計 (pH meter)`,category:`gear`,required:!0,icon:`📟`,hint:`本實驗要測 pH 變化，需要 pH 計。`},{id:`electrode`,label:`複合玻璃電極／測溫棒`,category:`gear`,required:!0,icon:`🔌`,hint:`pH 計需搭配電極與測溫棒。`},{id:`stir_bar`,label:`攪拌子`,category:`gear`,required:!0,icon:`🧲`,hint:`滴加酸鹼時需低速攪拌使溶液均勻。`},{id:`beaker_50`,label:`50 mL 燒杯 ×5`,category:`gear`,required:!0,icon:`🧪`,hint:`試樣 (a)~(e) 置於 50 mL 燒杯。`},{id:`flask_250`,label:`250 mL 容量瓶`,category:`gear`,required:!0,icon:`🫙`,hint:`配 0.050 M 溶液需定容至 250 mL。`},{id:`pipette_10`,label:`10 mL 刻度吸量管`,category:`gear`,required:!0,icon:`💉`,hint:`量取 HOAc／NaOAc 試樣體積用。`},{id:`pipette_2`,label:`2 mL 刻度吸量管`,category:`gear`,required:!0,icon:`💉`,hint:`取 0.74 mL 濃醋酸需用 2 mL 吸量管。`},{id:`bulb`,label:`安全吸球`,category:`gear`,required:!0,icon:`🔴`,hint:`吸量管搭配安全吸球取液。`},{id:`dropper`,label:`塑膠滴管 ×2`,category:`gear`,required:!0,icon:`🧴`,hint:`定容近標線與滴加減液需要滴管。`},{id:`cylinder`,label:`10 / 50 mL 量筒`,category:`gear`,required:!0,icon:`📏`,hint:`量測一滴體積與量取去離子水用。`},{id:`beaker_400`,label:`400 mL 燒杯`,category:`gear`,required:!0,icon:`🥣`,hint:`配好的 HOAc／NaOAc 轉入 400 mL 燒杯供取用。`},{id:`test_tube`,label:`試管 ×2`,category:`gear`,required:!0,icon:`🧫`,hint:`分別裝 1.0 M HCl 與 NaOH 備用。`},{id:`wash_bottle`,label:`洗瓶（去離子水）`,category:`gear`,required:!0,icon:`🚿`,hint:`沖洗電極、潤洗與配製都需要。`},{id:`funnel`,label:`漏斗`,category:`gear`,required:!0,icon:`⚗️`,hint:`溶液轉入容量瓶時使用漏斗。`},{id:`balance`,label:`天平`,category:`gear`,required:!0,icon:`⚖️`,hint:`稱取 NaOAc·3H₂O 需要天平。`},{id:`beaker_100`,label:`100 mL 燒杯`,category:`gear`,required:!0,icon:`🥛`,hint:`初步稀釋／溶解用 100 mL 燒杯。`},{id:`hoac_conc`,label:`濃醋酸 (17 M HOAc)`,category:`reagent`,required:!0,icon:`🧴`,hint:`用來配 0.050 M 醋酸。`},{id:`naoac_solid`,label:`NaOAc·3H₂O 固體`,category:`reagent`,required:!0,icon:`🧂`,hint:`用來配 0.050 M 醋酸鈉。`},{id:`hcl`,label:`1.0 M HCl`,category:`reagent`,required:!0,icon:`🧪`,hint:`測試緩衝能力時滴加的強酸。`},{id:`naoh`,label:`1.0 M NaOH`,category:`reagent`,required:!0,icon:`🧪`,hint:`測試緩衝能力時滴加的強鹼。`},{id:`di_water`,label:`去離子水`,category:`reagent`,required:!0,icon:`💧`,hint:`稀釋、定容與對照組 (e) 都需要。`},{id:`std_7`,label:`pH 7.00 標準液`,category:`reagent`,required:!0,icon:`🟩`,hint:`校正 pH 計先用 7.00。`},{id:`std_4`,label:`pH 4.00 標準液`,category:`reagent`,required:!0,icon:`🟨`,hint:`校正 pH 計再用 4.00 調 SLOPE。`},{id:`spec`,label:`分光光度計`,category:`decoy`,required:!1,icon:`🔦`,hint:`這是 E10 鈷離子定量用的，緩衝溶液實驗不需要。`},{id:`acetone`,label:`丙酮`,category:`decoy`,required:!1,icon:`🧴`,hint:`E10 配位／呈色才用丙酮，E12 不用。`},{id:`kscn`,label:`50% KSCN`,category:`decoy`,required:!1,icon:`🧪`,hint:`硫氰酸鉀是 E10 試劑，不是緩衝溶液實驗。`},{id:`erlenmeyer`,label:`50 mL 錐形瓶（碘鐘組）`,category:`decoy`,required:!1,icon:`🧉`,hint:`錐形瓶是 E8 碘鐘實驗器材。`},{id:`starch`,label:`2% 澱粉溶液`,category:`decoy`,required:!1,icon:`🥛`,hint:`澱粉指示劑用於碘鐘／碘相關實驗。`},{id:`timer`,label:`計時器`,category:`decoy`,required:!1,icon:`⏱️`,hint:`計時器主要是碘鐘測變色時間用。`},{id:`cuvette`,label:`測光管`,category:`decoy`,required:!1,icon:`▭`,hint:`測光管配合分光光度計，屬 E10。`}],n=t.filter(e=>e.required).map(e=>e.id),r=[{id:`a`,hoac:15,naoac:15,water:0,kind:`buffer`},{id:`b`,hoac:5,naoac:5,water:20,kind:`buffer`},{id:`c`,hoac:30,naoac:0,water:0,kind:`acid`},{id:`d`,hoac:0,naoac:30,water:0,kind:`base`},{id:`e`,hoac:0,naoac:0,water:30,kind:`water`}],i=[{id:`power`,label:`按 POWER 開機暖機`},{id:`rinse1`,label:`以洗瓶沖洗電極與測溫棒`},{id:`std7`,label:`浸入 pH 7.00 標準液`},{id:`calib`,label:`旋轉 CALIB. 至顯示 7.00`},{id:`hold`,label:`按 HOLD 鎖定讀值`},{id:`rinse2`,label:`取出並沖洗電極`},{id:`std4`,label:`浸入 pH 4.00 標準液，解除 HOLD`},{id:`slope`,label:`旋轉 SLOPE 至顯示 4.00`},{id:`standby`,label:`沖洗後置於去離子水備用`}],a=[{id:`pipette`,label:`用 2 mL 吸量管取 0.74 mL 濃醋酸`},{id:`dilute`,label:`加入含約 50 mL DI 水的 100 mL 燒杯稀釋`},{id:`transfer`,label:`經漏斗轉入 250 mL 容量瓶並潤洗`},{id:`volume`,label:`定容至標線`},{id:`mix`,label:`蓋緊倒置混合均勻`},{id:`pour`,label:`倒入 400 mL 燒杯並貼標「0.050 M HOAc」`}],o=[{id:`weigh`,label:`天平精稱 1.70 g NaOAc·3H₂O`},{id:`dissolve`,label:`於 100 mL 燒杯以約 50 mL DI 水溶解`},{id:`transfer`,label:`經漏斗轉入 250 mL 容量瓶並潤洗`},{id:`volume`,label:`定容至標線`},{id:`mix`,label:`蓋緊倒置混合均勻`},{id:`pour`,label:`倒入 400 mL 燒杯並貼標「0.050 M NaOAc」`}],s=4.76,c=5e-5,l=.03;function u(e,t,n){return Math.min(n,Math.max(t,e))}function d(e,t){return e<=1e-12&&t<=1e-12?7:e<=1e-12?11.5:t<=1e-12?Math.max(2.2,.5*(s-Math.log10(Math.max(e,1e-6)))):s+Math.log10(t/e)}function f(e,t,n){let r=e.hoac+e.naoac+e.water||30,i=.05*e.hoac/r,a=.05*e.naoac/r;if(e.kind===`water`)return t===0&&n===0?6.2+Math.random()*.6:t>0?u(-Math.log10(t*c/l),1.2,6):u(14+Math.log10(n*c/l),8,12.8);let o=i*l,s=a*l;if(e.kind===`acid`&&(s=1e-8),e.kind===`base`&&(o=1e-8),o+=t*c,s-=t*c,o-=n*c,s+=n*c,s<0){let e=-s;return s=0,o=Math.max(0,o),u(-Math.log10(e/l+(o>0?0:1e-4)),1.4,3.8)}if(o<0){let e=-o;return o=0,u(14+Math.log10(e/l),10,13)}if(e.kind===`base`&&t===0&&n===0)return 8.55+Math.random()*.12;let f=e.kind===`buffer`?(Math.random()-.5)*.04:(Math.random()-.5)*.08;return u(d(o/l,s/l)+f,1,13)}function p(e){return e.toFixed(2)}var m={a:{naoh:[4.76,4.81,4.86,4.91,4.96,5.01],hcl:[4.76,4.71,4.66,4.61,4.56,4.51]},b:{naoh:[4.76,4.88,5,5.12,5.24,5.36],hcl:[4.76,4.64,4.52,4.4,4.28,4.16]},c:{naoh:[3.15,3.55,4.2,5.4,10.2,11.3],hcl:[3.15,2.85,2.55,2.3,2.1,1.95]},d:{naoh:[8.6,9.2,10.1,11,11.5,11.9],hcl:[8.6,7.4,6.2,5.4,4.8,4.35]},e:{naoh:[6.4,8.5,10.2,11,11.4,11.7],hcl:[6.4,4.2,3.1,2.5,2.2,2]}};function h(e,t,n){return m[e][t][n]}function g(e,t){let n=h(e,t,0),r=h(e,t,5);return Math.abs(r-n)/5}function _(e,t,n=1,r=30){return e<1e-9?1/0:1/e*t*n*1e3/r}var v={a:`0.050 M
醋酸/醋酸鈉 (1:1)`,b:`0.017 M
醋酸/醋酸鈉 (1:1)`,c:`0.050 M
醋酸`,d:`0.050 M
醋酸鈉`,e:`DI Water`};function y(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function b(e,t,n=4){return y([e,...y(t).slice(0,Math.max(0,n-1))])}var x=r.flatMap(e=>[{key:`${e.id}-acid`,sample:e.id,side:`acid`,label:`(${e.id}) 滴加 HCl`},{key:`${e.id}-base`,sample:e.id,side:`base`,label:`(${e.id}) 滴加 NaOH`}]);function S(){let e={};for(let t of r)e[t.id]={acid:[],base:[],acidDone:!1,baseDone:!1};return{phase:0,catalogOrder:y(t.map(e=>e.id)),selected:new Set,phase0Passed:!1,phase0Attempts:0,calibOrder:y(i.map(e=>e.id)),calibSolved:!1,prepTrack:`hoac`,hoacOrder:y(a.map(e=>e.id)),naoacOrder:y(o.map(e=>e.id)),hoacSolved:!1,naoacSolved:!1,drop:{reagent:null,initialMl:!1,drops:0,finalMl:null,trueAvgUl:null,done:!1},samplesReady:new Set,mixing:null,recipePeeks:0,showRecipeTable:!1,bufferQuizDone:!1,measures:e,activeSample:`a`,activeSide:`acid`,electrodeIn:!1,stirOn:!1,rinsed:!1,dropsOnSide:0,measureStage:`demo`,demoDone:!1,checkedRuns:new Set,capacityDone:!1,cleared:!1}}function ee(e){switch(e.phase){case 0:return[{id:`sel`,label:`已勾選 ${e.selected.size} 項`,done:e.selected.size>0},{id:`pass`,label:`提交並通過器材檢查`,done:e.phase0Passed}];case 1:return[{id:`c`,label:`將校正步驟排成正確順序並提交`,done:e.calibSolved}];case 2:return[{id:`h`,label:`HOAc 步驟順序正確`,done:e.hoacSolved},{id:`n`,label:`NaOAc 步驟順序正確`,done:e.naoacSolved}];case 3:return[{id:`proc`,label:`滴液中（目前 ${e.drop.drops} 滴，約 20～45 即可）`,done:e.drop.done||e.drop.drops>=20&&e.drop.initialMl},{id:`calc`,label:`算出正確的每滴平均 μL`,done:e.drop.done}];case 4:return[{id:`mix`,label:`配齊試樣 ${e.samplesReady.size}/${r.length}`,done:r.every(t=>e.samplesReady.has(t.id))},{id:`quiz`,label:`分辨哪些是緩衝溶液`,done:e.bufferQuizDone}];case 5:return[{id:`demo`,label:`示範：完成一次正確測定流程`,done:e.demoDone},{id:`check`,label:`勾選其餘測定 ${e.checkedRuns.size}/10`,done:e.checkedRuns.size>=10},{id:`cap`,label:`讀表估算緩衝容量`,done:e.capacityDone}];default:return[]}}function C(e){switch(e.phase){case 0:return e.phase0Passed;case 1:return e.calibSolved;case 2:return e.hoacSolved&&e.naoacSolved;case 3:return e.drop.done;case 4:return r.every(t=>e.samplesReady.has(t.id))&&e.bufferQuizDone;case 5:return e.capacityDone;default:return!1}}function w(e,t){return t.hoac===e.hoac&&t.naoac===e.naoac&&t.water===e.water}function T(e){let t=n.filter(t=>!e.has(t)),r=[...e].filter(e=>!n.includes(e));return{ok:t.length===0&&r.length===0,missing:t,extras:r}}function E(e=`capacity`){let t=S();t.phase=5,t.phase0Passed=!0;for(let e of n)t.selected.add(e);t.calibSolved=!0,t.hoacSolved=!0,t.naoacSolved=!0,t.drop={reagent:`hcl`,initialMl:!0,drops:30,finalMl:2.5,trueAvgUl:50,done:!0};for(let e of r)t.samplesReady.add(e.id);t.bufferQuizDone=!0,t.demoDone=!0,t.measures.a.acidDone=!0,t.measures.a.initial=4.76,t.measures.a.acid=[4.71,4.66,4.61,4.56,4.51];for(let e of x)t.checkedRuns.add(e.key);return t.measureStage=e,t.capacityDone=!1,t}var D=null;function O(){return D||(D=document.createElement(`div`),D.className=`toast-host`,document.body.appendChild(D)),D}function k(e,t=`info`){let n=document.createElement(`div`);n.className=`toast toast--${t}`,n.textContent=e,O().appendChild(n),requestAnimationFrame(()=>n.classList.add(`toast--show`)),window.setTimeout(()=>{n.classList.remove(`toast--show`),window.setTimeout(()=>n.remove(),280)},2600)}function te(t,n,r){let i=ee(n),a=C(n);t.innerHTML=`
    <div class="hud">
      <div class="hud__brand">
        <div class="hud__eyebrow">台大普化實驗 · 虛擬預習</div>
        <h1 class="hud__title">E12 緩衝溶液</h1>
      </div>
      <div class="hud__progress">
        ${e.map((t,r)=>`<span class="hud__dot ${r<n.phase?`done`:r===n.phase?`current`:``}" title="${e[r]}"></span>`).join(``)}
        <span class="hud__phase-label">步驟 ${n.phase+1}/6 · ${e[n.phase]}</span>
      </div>
      <div class="hud__check">
        <h2>過關條件</h2>
        <p class="hud__note">不會劇透正確步驟；選錯會說明原因。</p>
        <ul>
          ${i.map(e=>`<li class="${e.done?`is-done`:``}"><span class="tick">${e.done?`✓`:`○`}</span>${e.label}</li>`).join(``)}
        </ul>
        <button class="btn btn--primary" id="btn-next" ${a&&!n.cleared?``:`disabled`}>
          ${n.phase===5?`完成實驗 → 通關`:`本關通過 → 下一階段`}
        </button>
      </div>
    </div>
  `,t.querySelector(`#btn-next`)?.addEventListener(`click`,r)}function ne(){let e=new URLSearchParams(window.location.search),t=e.get(`skipTo`)??e.get(`skip`);return t===`5`||t===`6`||t===`phase5`?E(e.get(`stage`)===`demo`?`demo`:e.get(`stage`)===`check`?`check`:`capacity`):S()}var re=class{state=ne();root;choiceCache=null;constructor(e){this.root=e,this.render()}setState(e){Object.assign(this.state,e),this.render()}choicesFor(e,t,n,r=4){if(this.choiceCache?.key===e)return this.choiceCache.choices;let i=b(t,n,r);return this.choiceCache={key:e,choices:i},i}clearChoices(){this.choiceCache=null}advance(){if(!C(this.state)){k(`本階段還沒過關，再想想看`,`err`);return}if(this.state.phase===5){this.clearChoices(),this.setState({cleared:!0}),k(`實驗完成！通關成功`,`ok`);return}this.clearChoices();let t=this.state.phase+1;this.setState({phase:t}),k(`進入：${e[t]}`,`ok`)}render(){this.state.cleared?this.renderVictory():(this.root.innerHTML=`
      <div class="layout">
        <header class="topbar">
          <div class="topbar__left">
            <span class="badge">LAB SIM</span>
            <strong>E12 緩衝溶液虛擬實驗桌</strong>
            <a class="topbar-link" href="/">選單</a>
          </div>
          <div class="topbar__hint">${e[this.state.phase]}</div>
        </header>
        <aside class="sidebar" id="hud"></aside>
        <main class="bench-wrap"><div class="bench" id="bench"></div></main>
      </div>
    `,te(this.root.querySelector(`#hud`),this.state,()=>this.advance()),this.renderPhase(this.root.querySelector(`#bench`)))}renderVictory(){this.root.innerHTML=`
      <div class="victory">
        <div class="victory__card">
          <p class="victory__eyebrow">CLEAR</p>
          <h1>通關成功</h1>
          <p>你靠判斷完成了 E12：分辨器材、校正順序、配製關鍵量、自行計算滴體積、依配方配試樣，並理解緩衝與非緩衝的 pH 差異。</p>
          <button class="btn btn--primary" id="btn-replay">再玩一次（選項會重洗）</button>
        </div>
      </div>
    `,this.root.querySelector(`#btn-replay`)?.addEventListener(`click`,()=>{this.clearChoices(),this.state=S(),this.render()})}renderPhase(e){switch(this.state.phase){case 0:this.renderPhase0(e);break;case 1:this.renderPhase1(e);break;case 2:this.renderPhase2(e);break;case 3:this.renderPhase3(e);break;case 4:this.renderPhase4(e);break;case 5:this.renderPhase5(e)}}renderPhase0(e){let n=Object.fromEntries(t.map(e=>[e.id,e])),r=this.state.catalogOrder.map(e=>n[e]).filter(Boolean);e.innerHTML=`
      <section class="panel">
        <h2>領取站：你會帶走哪些？</h2>
        <p class="lede">下方器材／藥品已打亂，也混入其他實驗會用的東西。請只勾選 <strong>E12 緩衝溶液</strong> 真正需要的項目，再按「提交檢查」。答錯會告訴你為什麼，可重選。</p>
        <div class="item-grid" id="catalog"></div>
        <div class="panel__actions">
          <button class="btn" id="btn-clear">清除勾選</button>
          <button class="btn btn--primary" id="btn-submit" style="width:auto;min-width:160px">提交檢查</button>
        </div>
        <p class="hint-line">提示：想想「要校正什麼、配什麼溶液、怎麼測緩衝能力」——不要把 E8／E10 的東西帶進來。</p>
      </section>
    `;let i=e.querySelector(`#catalog`);i.innerHTML=r.map(e=>`<button type="button" class="item-card ${this.state.selected.has(e.id)?`is-selected`:``}" data-id="${e.id}">
          <span class="item-card__icon">${e.icon}</span>
          <span class="item-card__label">${e.label}</span>
        </button>`).join(``),i.querySelectorAll(`.item-card`).forEach(e=>{e.addEventListener(`click`,()=>{if(this.state.phase0Passed)return;let t=e.dataset.id;this.state.selected.has(t)?this.state.selected.delete(t):this.state.selected.add(t),this.render()})}),e.querySelector(`#btn-clear`)?.addEventListener(`click`,()=>{this.state.selected.clear(),this.state.phase0Passed=!1,this.render()}),e.querySelector(`#btn-submit`)?.addEventListener(`click`,()=>{this.state.phase0Attempts+=1;let e=T(this.state.selected);if(e.ok){this.state.phase0Passed=!0,k(`器材檢查通過！你選對了 E12 所需項目`,`ok`),this.render();return}this.state.phase0Passed=!1;let t=[];if(e.extras.length){let r=n[e.extras[0]];t.push(`多選了「${r.label}」：${r.hint}`)}if(e.missing.length){let r=n[e.missing[0]];t.push(`少了「${r.label}」：${r.hint}`)}k(t[0]??`選取不正確`,`err`),t[1]&&window.setTimeout(()=>k(t[1],`info`),900),this.render()})}renderPhase1(e){let t=Object.fromEntries(i.map(e=>[e.id,e.label])),n=this.state.calibSolved,r=this.state.calibOrder;e.innerHTML=`
      <section class="panel panel--split">
        <div class="ph-meter ${n?`is-on`:``}">
          <div class="ph-meter__screen">
            <div class="ph-meter__mode">pH</div>
            <div class="ph-meter__value">${n?`ready`:`— —`}</div>
            <div class="ph-meter__status">${n?`OK`:`待校正`}</div>
          </div>
          <div class="ph-meter__knobs"><span>CALIB.</span><span>SLOPE</span><span>MODE</span><span>HOLD</span></div>
          <div class="ph-meter__probe">電極 · 測溫棒</div>
        </div>
        <div class="step-board">
          <h2>校正關卡：排出正確順序</h2>
          <p class="lede">以下是校正時會用到的步驟（已打亂）。<strong>按住拖曳</strong>到目標位置即可重排，排好後按「提交順序」。</p>
          ${n?`<p class="ok-banner">順序正確：先 pH 7.00（CALIB.）再 pH 4.00（SLOPE）。</p>`:`<ol class="sort-list" id="sort-list">
                  ${r.map((e,n)=>`
                    <li class="sort-item" data-index="${n}" draggable="true">
                      <span class="sort-item__handle" aria-hidden="true">⠿</span>
                      <span class="sort-item__num">${n+1}</span>
                      <span class="sort-item__text">${t[e]}</span>
                    </li>`).join(``)}
                </ol>
                <div class="panel__actions">
                  <button class="btn" id="btn-reshuffle">重新打亂</button>
                  <button class="btn btn--primary" id="btn-submit-order" style="width:auto;min-width:140px">提交順序</button>
                </div>`}
        </div>
      </section>
    `,this.bindSortList(e,()=>this.state.calibOrder,e=>{this.state.calibOrder=e},()=>{let e=i.map(e=>e.id);if(this.state.calibOrder.join()===e.join())this.state.calibSolved=!0,k(`校正順序正確！`,`ok`);else{let n=e.findIndex((e,t)=>this.state.calibOrder[t]!==e),r=t[e[n]];k(`第 ${n+1} 步不對：那裡應是「${r}」`,`err`)}this.render()},()=>{this.state.calibOrder=y(i.map(e=>e.id)),this.render()})}renderPhase2(e){let t=this.state.prepTrack,n=t===`hoac`?a:o,r=t===`hoac`?this.state.hoacOrder:this.state.naoacOrder,i=t===`hoac`?this.state.hoacSolved:this.state.naoacSolved,s=Object.fromEntries(n.map(e=>[e.id,e.label])),c=this.state.hoacSolved&&this.state.naoacSolved;e.innerHTML=`
      <section class="panel">
        <h2>配製關卡：排出操作順序</h2>
        <p class="lede">HOAc 與 NaOAc 的步驟都已列出但順序打亂。先選要排哪一組，再<strong>拖曳</strong>調整順序後提交。注意標籤上的關鍵數字（0.74 mL、1.70 g、250 mL）。</p>
        <div class="chip-row">
          <button type="button" class="chip ${t===`hoac`?`is-on`:``}" data-track="hoac">配 HOAc ${this.state.hoacSolved?`✓`:``}</button>
          <button type="button" class="chip ${t===`naoac`?`is-on`:``}" data-track="naoac">配 NaOAc ${this.state.naoacSolved?`✓`:``}</button>
        </div>
        ${c?`<p class="ok-banner">兩種溶液的配製順序都正確了。</p>`:i?`<p class="ok-banner">${t===`hoac`?`HOAc`:`NaOAc`} 順序正確。請切換去排另一組。</p>`:`<p class="challenge-q">正在排：${t===`hoac`?`0.050 M HOAc`:`0.050 M NaOAc`}（拖曳排序）</p>
                <ol class="sort-list">
                  ${r.map((e,t)=>`
                    <li class="sort-item" data-index="${t}" draggable="true">
                      <span class="sort-item__handle" aria-hidden="true">⠿</span>
                      <span class="sort-item__num">${t+1}</span>
                      <span class="sort-item__text">${s[e]}</span>
                    </li>`).join(``)}
                </ol>
                <div class="panel__actions">
                  <button class="btn" id="btn-reshuffle">重新打亂</button>
                  <button class="btn btn--primary" id="btn-submit-order" style="width:auto;min-width:140px">提交順序</button>
                </div>`}
      </section>
    `,e.querySelectorAll(`[data-track]`).forEach(e=>{e.addEventListener(`click`,()=>{this.setState({prepTrack:e.dataset.track})})}),!i&&!c&&this.bindSortList(e,()=>t===`hoac`?this.state.hoacOrder:this.state.naoacOrder,e=>{t===`hoac`?this.state.hoacOrder=e:this.state.naoacOrder=e},()=>{let e=n.map(e=>e.id),r=t===`hoac`?this.state.hoacOrder:this.state.naoacOrder;if(r.join()===e.join())t===`hoac`?this.state.hoacSolved=!0:this.state.naoacSolved=!0,k(`順序正確！`,`ok`);else{let t=e.findIndex((e,t)=>r[t]!==e);k(`第 ${t+1} 步不對：應是「${s[e[t]]}」`,`err`)}this.render()},()=>{let e=y(n.map(e=>e.id));t===`hoac`?this.state.hoacOrder=e:this.state.naoacOrder=e,this.render()})}bindSortList(e,t,n,r,i){let a=e.querySelector(`.sort-list`);if(!a)return;let o=null,s=()=>{a.querySelectorAll(`.sort-item`).forEach(e=>{e.classList.remove(`drag-over-before`,`drag-over-after`,`is-dragging`)})};a.querySelectorAll(`.sort-item`).forEach(e=>{e.addEventListener(`dragstart`,t=>{o=Number(e.dataset.index),e.classList.add(`is-dragging`),t.dataTransfer?.setData(`text/plain`,String(o)),t.dataTransfer.effectAllowed=`move`,t.dataTransfer&&(t.dataTransfer.dropEffect=`move`)}),e.addEventListener(`dragend`,()=>{s(),o=null}),e.addEventListener(`dragover`,t=>{t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect=`move`);let n=e.getBoundingClientRect(),r=t.clientY<n.top+n.height/2;a.querySelectorAll(`.sort-item`).forEach(e=>{e.classList.remove(`drag-over-before`,`drag-over-after`)}),e.classList.add(r?`drag-over-before`:`drag-over-after`)}),e.addEventListener(`dragleave`,()=>{e.classList.remove(`drag-over-before`,`drag-over-after`)}),e.addEventListener(`drop`,r=>{r.preventDefault();let i=r.dataTransfer?.getData(`text/plain`),a=o??(i!==void 0&&i!==``?Number(i):NaN),c=Number(e.dataset.index);if(!Number.isFinite(a)||!Number.isFinite(c)){s();return}let l=e.getBoundingClientRect(),u=r.clientY<l.top+l.height/2?c:c+1;if(a<u&&--u,a===u){s();return}let d=[...t()],[f]=d.splice(a,1);d.splice(u,0,f),n(d),this.render()})}),e.querySelector(`#btn-submit-order`)?.addEventListener(`click`,r),e.querySelector(`#btn-reshuffle`)?.addEventListener(`click`,i)}resetDropTrial(e=!0){let t=e?this.state.drop.reagent:null;this.state.drop={reagent:t,initialMl:!1,drops:0,finalMl:null,trueAvgUl:null,done:!1}}renderPhase3(e){let t=this.state.drop,n=t.drops*.05,r=t.initialMl?1+n:0,i=t.initialMl&&t.drops>=20&&n>=1-1e-9;e.innerHTML=`
      <section class="panel panel--split">
        <div class="drop-visual">
          <div class="cylinder">
            <div class="cylinder__liquid" style="height:${t.initialMl?Math.min(92,18+t.drops*1.4):0}%"></div>
            <span class="cylinder__label">10 mL 量筒</span>
            <span class="cylinder__reading">${t.initialMl?`${r.toFixed(2)} mL`:`空`}</span>
          </div>
        </div>
        <div class="step-board">
          <h2>一滴體積關卡</h2>
          <p class="lede">量筒先約 1 mL，再滴入<strong>大約 30 滴</strong>（不必剛好 30；重點是 ΔV≥約 1 mL）。再<strong>自己算出</strong>每滴平均 μL。滴錯可退回或整關重來。</p>
          <div class="chip-row">
            <button class="chip ${t.reagent===`hcl`?`is-on`:``}" data-r="hcl" ${t.done?`disabled`:``}>使用 1.0 M HCl</button>
            <button class="chip ${t.reagent===`naoh`?`is-on`:``}" data-r="naoh" ${t.done?`disabled`:``}>使用 1.0 M NaOH</button>
          </div>
          <div class="action-row stacked">
            <button class="btn" id="btn-init" ${t.reagent&&!t.initialMl&&!t.done?``:`disabled`}>量筒先加入約 1.00 mL</button>
            <div class="drop-controls">
              <button class="btn" id="btn-undrop5" ${t.initialMl&&t.drops>=5&&!t.done?``:`disabled`}>−5 滴</button>
              <button class="btn" id="btn-undrop" ${t.initialMl&&t.drops>=1&&!t.done?``:`disabled`}>−1 滴</button>
              <span class="drop-count">目前 <strong>${t.drops}</strong> 滴 · ΔV ≈ ${n.toFixed(2)} mL</span>
              <button class="btn" id="btn-drop" ${t.initialMl&&t.drops<45&&!t.done?``:`disabled`}>+1 滴</button>
              <button class="btn" id="btn-drop5" ${t.initialMl&&t.drops<=40&&!t.done?``:`disabled`}>+5 滴</button>
            </div>
            <button class="btn" id="btn-drop-approx30" ${t.initialMl&&!t.done?``:`disabled`}>一次滴到約 30 滴</button>
          </div>
          <div class="panel__actions">
            <button class="btn" id="btn-reset-drop">倒掉重做（刷新本關）</button>
          </div>
          ${i&&!t.done?`<div class="calc-box">
                  <p>初始 ≈ 1.00 mL，目前讀數 ≈ <strong>${r.toFixed(2)} mL</strong>，共 <strong>${t.drops}</strong> 滴（ΔV ≈ ${n.toFixed(2)} mL）。</p>
                  <p class="challenge-q">每滴平均體積是多少 μL？</p>
                  <p class="hint-line">公式：ΔV(mL) × 1000 ÷ 滴數。容許誤差 ±2 μL。</p>
                  <div class="calc-row">
                    <input id="avg-input" type="number" step="0.1" placeholder="輸入 μL" />
                    <button class="btn btn--primary" id="btn-check-avg" style="width:auto">核對答案</button>
                  </div>
                </div>`:t.done?``:`<p class="hint-line">再滴一些：建議約 20～45 滴（講義寫「約 30 滴」），且 ΔV 至少約 1 mL 後才會出現計算框。</p>`}
          ${t.done?`<p class="ok-banner">計算正確：約 ${t.trueAvgUl.toFixed(1)} μL／滴（${t.drops} 滴）</p>`:``}
        </div>
      </section>
    `,e.querySelectorAll(`[data-r]`).forEach(e=>{e.addEventListener(`click`,()=>{this.state.drop.done||(this.state.drop.reagent=e.dataset.r,this.render())})}),e.querySelector(`#btn-init`)?.addEventListener(`click`,()=>{this.state.drop.initialMl=!0,k(`已加入約 1.00 mL`,`ok`),this.render()}),e.querySelector(`#btn-drop`)?.addEventListener(`click`,()=>{this.state.drop.drops=Math.min(45,this.state.drop.drops+1),this.render()}),e.querySelector(`#btn-drop5`)?.addEventListener(`click`,()=>{this.state.drop.drops=Math.min(45,this.state.drop.drops+5),this.render()}),e.querySelector(`#btn-undrop`)?.addEventListener(`click`,()=>{this.state.drop.drops=Math.max(0,this.state.drop.drops-1),this.render()}),e.querySelector(`#btn-undrop5`)?.addEventListener(`click`,()=>{this.state.drop.drops=Math.max(0,this.state.drop.drops-5),this.render()}),e.querySelector(`#btn-drop-approx30`)?.addEventListener(`click`,()=>{this.state.drop.drops=30,k(`已設為 30 滴（仍可再用 ±1／±5 微調）`,`info`),this.render()}),e.querySelector(`#btn-reset-drop`)?.addEventListener(`click`,()=>{this.resetDropTrial(!0),k(`已倒掉重做，可重新量測`,`info`),this.render()}),e.querySelector(`#btn-check-avg`)?.addEventListener(`click`,()=>{let t=this.state.drop.drops,n=t*.05;if(t<20||n<1){k(`請至少滴到 ΔV≈1 mL（約 20 滴以上；講義建議約 30 滴）`,`err`);return}let r=n*1e3/t,i=Number(e.querySelector(`#avg-input`).value);Number.isFinite(i)?Math.abs(i-r)>2?k(`不正確。再算：ΔV(mL)×1000 ÷ 滴數`,`err`):(this.state.drop.finalMl=1+n,this.state.drop.trueAvgUl=r,this.state.drop.done=!0,k(`計算正確！`,`ok`),this.render()):k(`請輸入數值（單位 μL）`,`err`)})}renderPhase4(e){let t=this.state.mixing,n=r.every(e=>this.state.samplesReady.has(e.id));e.innerHTML=`
      <section class="panel">
        <h2>試樣配製關卡</h2>
        <p class="lede">配方不會一直顯示在燒杯旁。你可以「偷看講義表」（限 2 次），然後憑記憶／筆記量取。量錯就清空重來。</p>
        <div class="panel__actions">
          <button class="btn" id="btn-peek" ${this.state.recipePeeks>=2&&!this.state.showRecipeTable?`disabled`:``}>
            ${this.state.showRecipeTable?`隱藏講義表`:`偷看講義表（剩 ${Math.max(0,2-this.state.recipePeeks)} 次）`}
          </button>
        </div>
        <div id="recipe-table"></div>
        <div class="sample-table">
          ${r.map(e=>{let n=this.state.samplesReady.has(e.id),r=t?.id===e.id;return`<button class="sample-pill ${n?`is-ready`:``} ${r?`is-active`:``}" data-id="${e.id}">
              <strong>(${e.id})</strong>
              <span>${n?`已配好`:r?`配製中`:`開始配`}</span>
            </button>`}).join(``)}
        </div>
        <div id="mixer"></div>
        <div id="buffer-quiz"></div>
      </section>
    `;let i=e.querySelector(`#recipe-table`);i.innerHTML=this.state.showRecipeTable?`
        <table class="data-table">
          <thead><tr><th>編號</th><th>HOAc (mL)</th><th>NaOAc (mL)</th><th>水 (mL)</th></tr></thead>
          <tbody>
            ${r.map(e=>`<tr><td>(${e.id})</td><td>${e.hoac}</td><td>${e.naoac}</td><td>${e.water}</td></tr>`).join(``)}
          </tbody>
        </table>`:`<p class="hint-line">講義表目前收起——靠記憶配，或用偷看次數。</p>`,e.querySelector(`#btn-peek`)?.addEventListener(`click`,()=>{this.state.showRecipeTable?this.setState({showRecipeTable:!1}):this.state.recipePeeks>=2?k(`偷看次數用完了，試著回想配方`,`err`):(this.state.recipePeeks+=1,this.setState({showRecipeTable:!0}),k(`講義表開啟（已用 ${this.state.recipePeeks}/2 次）`,`info`))}),e.querySelectorAll(`.sample-pill`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id;this.state.samplesReady.has(t)?k(`(${t}) 已經配好`,`info`):(this.state.mixing={id:t,hoac:0,naoac:0,water:0},this.state.showRecipeTable=!1,this.render())})});let a=e.querySelector(`#mixer`);if(t){let e=[5,15,20,30];a.innerHTML=`
        <div class="mixer">
          <h3>配製 (${t.id}) — 燒杯內：HOAc ${t.hoac} · NaOAc ${t.naoac} · H₂O ${t.water}</h3>
          <p class="hint-line">按鈕有多種體積，加錯就會在確認時失敗。</p>
          <div class="mixer__beaker">
            <div class="mixer__fill" style="height:${Math.min(100,(t.hoac+t.naoac+t.water)/30*100)}%"></div>
          </div>
          <div class="mixer__controls">
            <div class="mixer__group"><span>HOAc</span>${e.map(e=>`<button data-add="hoac" data-v="${e}">+${e} mL</button>`).join(``)}</div>
            <div class="mixer__group"><span>NaOAc</span>${e.map(e=>`<button data-add="naoac" data-v="${e}">+${e} mL</button>`).join(``)}</div>
            <div class="mixer__group"><span>水</span>${e.map(e=>`<button data-add="water" data-v="${e}">+${e} mL</button>`).join(``)}</div>
          </div>
          <div class="action-row">
            <button class="btn" id="btn-mix-reset">清空</button>
            <button class="btn btn--primary" id="btn-mix-ok" style="width:auto">確認配方</button>
          </div>
        </div>`,a.querySelectorAll(`[data-add]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.add;this.state.mixing[t]+=Number(e.dataset.v),this.render()})}),a.querySelector(`#btn-mix-reset`)?.addEventListener(`click`,()=>{this.state.mixing={id:t.id,hoac:0,naoac:0,water:0},this.render()}),a.querySelector(`#btn-mix-ok`)?.addEventListener(`click`,()=>{w(r.find(e=>e.id===t.id),this.state.mixing)?(this.state.samplesReady.add(t.id),this.state.mixing=null,k(`(${t.id}) 配方正確`,`ok`),this.render()):k(`配方不對。想想 (${t.id}) 的 HOAc / NaOAc / 水 比例`,`err`)})}let o=e.querySelector(`#buffer-quiz`);if(n&&!this.state.bufferQuizDone){o.innerHTML=`
        <div class="quiz-box">
          <p class="challenge-q">配完了——哪些試樣是「緩衝溶液」？（可多選）</p>
          <div class="chip-row" id="quiz-chips">
            ${r.map(e=>`<button type="button" class="chip" data-q="${e.id}">(${e.id})</button>`).join(``)}
          </div>
          <button class="btn btn--primary" id="btn-quiz" style="width:auto;margin-top:0.6rem">提交答案</button>
        </div>`;let e=new Set;o.querySelectorAll(`[data-q]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.q;e.has(n)?(e.delete(n),t.classList.remove(`is-on`)):(e.add(n),t.classList.add(`is-on`))})}),o.querySelector(`#btn-quiz`)?.addEventListener(`click`,()=>{let t=new Set(r.filter(e=>e.kind===`buffer`).map(e=>e.id));e.size===t.size&&[...t].every(t=>e.has(t))?(this.state.bufferQuizDone=!0,k(`正確！(a)(b) 才是 HOAc/NaOAc 緩衝體系`,`ok`),this.render()):k(`再想想：緩衝液需要共軛酸鹼對（弱酸＋其鹽）同時存在`,`err`)})}else this.state.bufferQuizDone&&(o.innerHTML=`<p class="ok-banner">已確認：(a)(b) 為緩衝溶液；(c)(d)(e) 否。</p>`)}renderPhase5(e){this.state.measureStage===`demo`?this.renderPhase5Demo(e):this.state.measureStage===`check`?this.renderPhase5Check(e):this.renderPhase5Capacity(e)}renderPhase5Demo(e){let t=r.find(e=>e.id===`a`),n=this.state.measures.a;this.state.activeSample=`a`,this.state.activeSide=`acid`;let i=`— —`;this.state.electrodeIn&&(i=this.state.dropsOnSide===0&&n.initial!==void 0?p(n.initial):n.acid.length?p(n.acid[n.acid.length-1]):`….`);let a;a=!this.state.rinsed&&!this.state.electrodeIn?{id:`rinse`,label:`沖洗電極與測溫棒`,ok:!0,why:``}:this.state.electrodeIn?this.state.stirOn?n.initial===void 0?{id:`init`,label:`記錄起始 pH`,ok:!0,why:``}:this.state.dropsOnSide<5?{id:`drop`,label:`滴 1 滴 1.0 M HCl 並記錄 pH（${this.state.dropsOnSide}/5）`,ok:!0,why:``}:{id:`finish`,label:`本杯測定結束（示範完成）`,ok:!0,why:``}:{id:`stir`,label:`放入攪拌子並低速攪拌`,ok:!0,why:``}:{id:`dip`,label:`將電極／測溫棒浸入溶液（鹽橋沒入）`,ok:!0,why:``};let o=[{id:`w-drop-early`,label:`還沒讀起始 pH 就先滴酸`,ok:!1,why:`要先記錄起始 pH。`},{id:`w-stir-first`,label:`電極還沒浸入就丟攪拌子`,ok:!1,why:`先浸電極，再低速攪拌。`},{id:`w-no-rinse`,label:`不沖洗直接插入`,ok:!1,why:`更換／開始測定前應沖洗電極。`},{id:`w-e`,label:`改去先測去離子水 (e)`,ok:!1,why:`(e) 應最後測定。`}],s=this.state.demoDone,c=s?[]:this.choicesFor(`demo-a-${a.id}-${this.state.dropsOnSide}`,a,o,4);e.innerHTML=`
      <section class="panel">
        <h2>步驟 6-1：測定流程示範（只做一次）</h2>
        <p class="lede">五組 × 酸鹼兩側流程都一樣，這裡用試樣 <strong>(a) 滴加 HCl</strong> 練一次正確順序即可，其餘用勾選帶過。</p>
        <div class="measure-layout">
          <div class="ph-meter is-on compact">
            <div class="ph-meter__screen">
              <div class="ph-meter__mode">pH</div>
              <div class="ph-meter__value">${i}</div>
              <div class="ph-meter__status">${this.state.electrodeIn?`MEAS`:`STANDBY`}</div>
            </div>
          </div>
          <div>
            ${s?`<p class="ok-banner">示範完成！接著勾選其餘測定項目。</p>
                   <button class="btn btn--primary" id="btn-to-check" style="width:auto">前往勾選測定 →</button>`:`<p class="challenge-q">現在正確的操作是？</p>
                   <div class="choice-list">
                     ${c.map(e=>`<button type="button" class="choice-btn" data-id="${e.id}">${e.label}</button>`).join(``)}
                   </div>
                   <div class="log" style="margin-top:0.8rem">起始：${n.initial===void 0?`—`:p(n.initial)}｜HCl：${n.acid.map(p).join(` → `)||`—`}</div>`}
          </div>
        </div>
      </section>
    `,e.querySelector(`#btn-to-check`)?.addEventListener(`click`,()=>{this.state.measureStage=`check`,this.state.checkedRuns.add(`a-acid`),this.render()}),e.querySelectorAll(`.choice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.id;if(r!==a.id)k(o.find(e=>e.id===r)?.why??`順序不對`,`err`),this.clearChoices(),this.render();else{if(r===`rinse`)this.state.rinsed=!0,k(`已沖洗`,`ok`);else if(r===`dip`)this.state.electrodeIn=!0,k(`電極已浸入`,`ok`);else if(r===`stir`)this.state.stirOn=!0,k(`低速攪拌中`,`ok`);else if(r===`init`)n.initial=f(t,0,0),k(`起始 pH = ${p(n.initial)}`,`ok`);else if(r===`drop`){this.state.dropsOnSide+=1;let e=f(t,this.state.dropsOnSide,0);n.acid.push(e),k(`pH = ${p(e)}`,`ok`)}else r===`finish`&&(n.acidDone=!0,this.state.demoDone=!0,k(`示範測定完成`,`ok`));this.clearChoices(),this.render()}})})}renderPhase5Check(e){let t=this.state.checkedRuns,n=x.filter(e=>e.sample!==`e`),r=x.filter(e=>e.sample===`e`),i=n.every(e=>t.has(e.key));e.innerHTML=`
      <section class="panel">
        <h2>步驟 6-2：勾選其餘測定</h2>
        <p class="lede">流程與示範相同，不必重做十次。請勾選你「已完成」的測定；（e）去離子水請留到 <strong>(a)~(d) 都勾完</strong> 再勾。</p>
        <div class="check-grid">
          ${n.map(e=>`
            <label class="check-card ${t.has(e.key)?`is-on`:``}">
              <input type="checkbox" data-key="${e.key}" ${t.has(e.key)?`checked`:``} ${e.key===`a-acid`?`disabled`:``} />
              <span>${e.label}${e.key===`a-acid`?`（示範已完成）`:``}</span>
            </label>`).join(``)}
        </div>
        <h3 class="subhead">最後測定</h3>
        <div class="check-grid">
          ${r.map(e=>`
            <label class="check-card ${t.has(e.key)?`is-on`:``} ${i?``:`is-locked`}">
              <input type="checkbox" data-key="${e.key}" ${t.has(e.key)?`checked`:``} ${i?``:`disabled`} />
              <span>${e.label}${i?``:`（先完成 a~d）`}</span>
            </label>`).join(``)}
        </div>
        <div class="panel__actions">
          <button class="btn" id="btn-check-all-ad" ${i?`disabled`:``}>一鍵勾選 (a)~(d) 全部</button>
          <button class="btn btn--primary" id="btn-to-cap" style="width:auto" ${t.size>=10?``:`disabled`}>
            進入緩衝容量讀表 →
          </button>
        </div>
      </section>
    `,e.querySelectorAll(`input[data-key]`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.dataset.key;t===`a-acid`?e.checked=!0:t.startsWith(`e-`)&&!n.every(e=>this.state.checkedRuns.has(e.key))?(e.checked=!1,k(`請先完成 (a)~(d) 的酸／鹼測定勾選`,`err`)):(e.checked?this.state.checkedRuns.add(t):this.state.checkedRuns.delete(t),this.render())})}),e.querySelector(`#btn-check-all-ad`)?.addEventListener(`click`,()=>{for(let e of n)this.state.checkedRuns.add(e.key);k(`已勾選 (a)~(d)`,`ok`),this.render()}),e.querySelector(`#btn-to-cap`)?.addEventListener(`click`,()=>{this.state.checkedRuns.size<10?k(`請勾齊 10 項測定（含 e 兩側）`,`err`):(this.state.measureStage=`capacity`,this.render())})}renderPhase5Capacity(e){let t=this.state.drop.trueAvgUl==null?.05:this.state.drop.trueAvgUl/1e3,n=g(`a`,`hcl`),i=g(`a`,`naoh`),a=_(n,t),o=_(i,t),s=(a+o)/2,c=r.map(e=>e.id),l=[5,4,3,2,1,0].map(e=>`
        <tr>
          ${e===5?`<th rowspan="6" class="side-label">1.0 M<br/>NaOH</th>`:``}
          <th>${e}</th>
          ${c.map(t=>`<td>${h(t,`naoh`,e).toFixed(2)}</td>`).join(``)}
        </tr>`).join(``),u=[0,1,2,3,4,5].map(e=>`
        <tr>
          ${e===0?`<th rowspan="6" class="side-label">1.0 M<br/>HCl</th>`:``}
          <th>${e}</th>
          ${c.map(t=>`<td>${h(t,`hcl`,e).toFixed(2)}</td>`).join(``)}
        </tr>`).join(``);e.innerHTML=`
      <section class="panel">
        <h2>步驟 6-3：濃度對緩衝容量之影響（學習單讀表）</h2>
        <p class="lede">下表格式對齊學習單。請用斜率（ΔpH／滴）與一滴體積，依講義公式計算 <strong>(a)</strong> 的緩衝容量。</p>

        <div class="sheet-scroll">
          <table class="data-table sheet-table">
            <thead>
              <tr>
                <th colspan="2">溶液<br/>酸/鹼　滴數</th>
                ${c.map(e=>`<th>(${e})<br/><span class="th-sub">${v[e].replace(`
`,`<br/>`)}</span></th>`).join(``)}
              </tr>
            </thead>
            <tbody>
              ${l}
              <tr class="avg-row">
                <th colspan="2">平均 (0)</th>
                ${c.map(e=>`<td>${h(e,`naoh`,0).toFixed(2)}</td>`).join(``)}
              </tr>
              ${u}
            </tbody>
          </table>
        </div>

        <div class="formula-box">
          <p class="challenge-q">學習單公式（單位：meq/(L·pH)）</p>
          <p class="formula">
            緩衝容量 =
            <span class="frac">
              <span class="frac__num">
                (1 / slope<sub>pH/滴</sub>) × V<sub>d</sub> (mL/滴) × C<sub>M</sub> (eq/L) × 1000 (mL/L)
              </span>
              <span class="frac__den">30 mL</span>
            </span>
          </p>
          <p class="hint-line">
            本關採用：C<sub>M</sub> = 1 eq/L；V<sub>d</sub> = ${t.toFixed(3)} mL/滴；
            緩衝液體積 = 30 mL。
            slope ≈ |pH<sub>5</sub> − pH<sub>0</sub>| / 5。
          </p>
        </div>

        <div class="quiz-box">
          <p class="challenge-q">計算試樣 (a) 的緩衝容量（meq/(L·pH)）</p>
          <p class="hint-line">
            可分別用 HCl 側與 NaOH 側斜率各算一次，再取平均填入（容許誤差 ±1.0）。
          </p>
          <div class="calc-row">
            <input id="beta-input" type="number" step="0.1" placeholder="(a) 緩衝容量" />
            <button class="btn btn--primary" id="btn-cap-submit" style="width:auto">提交並通關</button>
          </div>
        </div>
        ${this.state.capacityDone?`<p class="ok-banner">(a) 緩衝容量正確！可按右側「完成實驗 → 通關」。</p>`:``}
      </section>
    `,e.querySelector(`#btn-cap-submit`)?.addEventListener(`click`,()=>{let n=Number(e.querySelector(`#beta-input`).value);Number.isFinite(n)?Math.abs(n-s)<=1||Math.abs(n-a)<=1||Math.abs(n-o)<=1?(this.state.capacityDone=!0,k(`正確！已依學習單公式算出 (a) 緩衝容量`,`ok`),this.render()):k(`再算一次：slope=|pH5−pH0|/5，再代入學習單公式（Vd=${t.toFixed(3)}）`,`err`):k(`請輸入 (a) 的緩衝容量數值`,`err`)})}},A=[`選取器材與藥品`,`排出操作順序`,`統一計時方式`,`測定變色時間`,`計算 m、n、k`,`設計取量／碘鐘交響曲`],j=[{id:`timer`,label:`計時器`,required:!0,icon:`⏱️`,hint:`測定變色時間需要計時器（助教點發）。`},{id:`pipette_5`,label:`5 mL 刻度吸量管 ×2`,required:!0,icon:`💉`,hint:`量取 K₂SO₄、K₂S₂O₈。`},{id:`erlenmeyer`,label:`50 mL 錐形瓶 ×10`,required:!0,icon:`🧉`,hint:`反應在錐形瓶中進行。`},{id:`cork`,label:`軟木塞 ×2`,required:!0,icon:`🪵`,hint:`搖晃混合時要塞緊。`},{id:`bulb`,label:`安全吸球`,required:!0,icon:`🔴`,hint:`搭配吸量管取液。`},{id:`pipette_rack`,label:`吸量管架`,required:!0,icon:`🗄️`,hint:`放置吸量管。`},{id:`label`,label:`標籤紙`,required:!0,icon:`🏷️`,hint:`標記燒杯／藥品。`},{id:`beaker_100`,label:`100 mL 燒杯 ×2（洗烘）`,required:!0,icon:`🥛`,hint:`分裝 K₂SO₄、K₂S₂O₈。`},{id:`calc`,label:`工程用計算機`,required:!0,icon:`🧮`,hint:`計算速率與級數。`},{id:`k2s2o8`,label:`0.10 M K₂S₂O₈`,required:!0,icon:`🧪`,hint:`過硫酸鉀，反應物之一。`},{id:`k2so4`,label:`0.10 M K₂SO₄`,required:!0,icon:`🧪`,hint:`維持離子強度。`},{id:`nai`,label:`0.20 M NaI`,required:!0,icon:`🧪`,hint:`碘化鈉，提供 I⁻。`},{id:`nacl`,label:`0.20 M NaCl`,required:!0,icon:`🧪`,hint:`維持離子強度／總體積。`},{id:`s2o3`,label:`0.0050 M Na₂S₂O₃`,required:!0,icon:`🧪`,hint:`限量計時劑（硫代硫酸鈉）。`},{id:`starch`,label:`2% 澱粉溶液`,required:!0,icon:`🥛`,hint:`指示劑，變色終點。`},{id:`ph_meter`,label:`酸鹼度測定計`,required:!1,icon:`📟`,hint:`這是 E12 緩衝溶液用的。`},{id:`spec`,label:`分光光度計`,required:!1,icon:`🔦`,hint:`這是 E10 鈷離子定量用的。`},{id:`acetone`,label:`丙酮`,required:!1,icon:`🧴`,hint:`E10 試劑，碘鐘實驗不用。`},{id:`hoac`,label:`濃醋酸`,required:!1,icon:`🧴`,hint:`E12 配緩衝液用，不是碘鐘。`},{id:`electrode`,label:`pH 電極／測溫棒`,required:!1,icon:`🔌`,hint:`E12 器材。`}],M=j.filter(e=>e.required).map(e=>e.id),N=[{id:`beakers`,label:`以 100 mL 燒杯分裝約 30 mL K₂SO₄ 與 K₂S₂O₈`},{id:`flasks`,label:`準備洗淨烘乾放冷的 50 mL 錐形瓶`},{id:`dispense`,label:`用定量分注器取 NaI、NaCl、Na₂S₂O₃、澱粉入錐形瓶`},{id:`k2so4`,label:`以 5 mL 吸量管取 K₂SO₄（依表）入錐形瓶`},{id:`start`,label:`加入 K₂S₂O₈ 的同時開始計時`},{id:`shake`,label:`塞上軟木塞，手搖 20 秒後靜置觀察`},{id:`stop`,label:`溶液一開始變色立即停表，記錄 Δt`}],P=[{id:`start`,prompt:`開始計時為？`,options:[{id:`s1`,label:`拔安全吸球`,ok:!1,why:`應在 K₂S₂O₈ 加入（開始流放／加入）時同步計時。`},{id:`s2`,label:`按壓 E 閥`,ok:!1,why:`全班統一：加 K₂S₂O₈ 即開始計時。`},{id:`s3`,label:`加入／流放過硫酸鉀時`,ok:!0,why:`正確`}]},{id:`shake`,prompt:`搖晃時長為？`,options:[{id:`k1`,label:`搖 20 秒`,ok:!0,why:`正確`},{id:`k2`,label:`搖到第 20 秒（含變色也繼續）`,ok:!1,why:`固定手搖 20 秒後靜置觀察。`},{id:`k3`,label:`搖至變色`,ok:!1,why:`不是搖到變色為止，是搖 20 秒。`}]},{id:`stop`,prompt:`何時停止計時？`,options:[{id:`t1`,label:`開始變色的瞬間`,ok:!0,why:`正確`},{id:`t2`,label:`變色至不再變化`,ok:!1,why:`應在開始變色瞬間停表。`},{id:`t3`,label:`過硫酸鉀流完`,ok:!1,why:`流完不是停表點；停表是變色瞬間。`}]}],F=[{id:1,nai:2,nacl:2,s2o3:1,starch:1,k2so4:2,k2s2o8:2,dt:109},{id:2,nai:2,nacl:2,s2o3:1,starch:1,k2so4:0,k2s2o8:4,dt:59},{id:3,nai:4,nacl:0,s2o3:1,starch:1,k2so4:2,k2s2o8:2,dt:58}];function I(e){return 25e-5/e}function L(e){return .1*e.k2s2o8/10}function R(e){return .2*e.nai/10}function z(e){return .005*e.s2o3/10}function B(e,t){return Math.log(e/t)/Math.log(2)}function V(e,t){return Math.log(e/t)/Math.log(2)}function H(e,t,n){let r=I(e.dt),i=L(e),a=R(e);return r/(i**t*a**n)}function U(e,t,n){return 2*(e/t)**(1/n)}function W(e,t=2){return e.toExponential(t)}function G(e,t=2){if(e===0)return 0;let n=10**(t-Math.ceil(Math.log10(Math.abs(e))));return Math.round(e*n)/n}var K=[{key:`1a`,label:`試驗1 第1次（示範）`,trial:1},{key:`1b`,label:`試驗1 第2次`,trial:1},{key:`2a`,label:`試驗2 第1次`,trial:2},{key:`2b`,label:`試驗2 第2次`,trial:2},{key:`3a`,label:`試驗3 第1次`,trial:3},{key:`3b`,label:`試驗3 第2次`,trial:3}];function q(){return{phase:0,catalogOrder:y(j.map(e=>e.id)),selected:new Set,phase0Passed:!1,procOrder:y(N.map(e=>e.id)),procSolved:!1,timingAnswers:Object.fromEntries(P.map(e=>[e.id,null])),timingPassed:!1,demoDone:!1,demoStep:0,checkedRuns:new Set,calc:{mOk:!1,nOk:!1,kOk:!1,lawOk:!1},designOk:!1,cleared:!1}}function ie(e){let t=M.filter(t=>!e.has(t)),n=[...e].filter(e=>!M.includes(e));return{ok:t.length===0&&n.length===0,missing:t,extras:n}}function J(){return B(F[0].dt,F[1].dt)}function Y(){return V(F[0].dt,F[2].dt)}function ae(){let e=J(),t=Y(),n=F.map(n=>H(n,e,t));return n.reduce((e,t)=>e+t,0)/n.length}function oe(e){switch(e.phase){case 0:return[{id:`sel`,label:`已勾選 ${e.selected.size} 項`,done:e.selected.size>0},{id:`pass`,label:`提交並通過器材檢查`,done:e.phase0Passed}];case 1:return[{id:`p`,label:`排出正確操作順序`,done:e.procSolved}];case 2:return[{id:`t`,label:`計時方式三題全對`,done:e.timingPassed}];case 3:return[{id:`d`,label:`完成試驗1示範流程`,done:e.demoDone},{id:`c`,label:`勾選其餘測定 ${e.checkedRuns.size}/6`,done:e.checkedRuns.size>=6}];case 4:return[{id:`m`,label:`算出級數 m`,done:e.calc.mOk},{id:`n`,label:`算出級數 n`,done:e.calc.nOk},{id:`k`,label:`算出平均 k`,done:e.calc.kOk},{id:`law`,label:`寫出速率定律式`,done:e.calc.lawOk}];case 5:return[{id:`des`,label:`設計取量使指定時間變色`,done:e.designOk}];default:return[]}}function X(e){switch(e.phase){case 0:return e.phase0Passed;case 1:return e.procSolved;case 2:return e.timingPassed;case 3:return e.demoDone&&e.checkedRuns.size>=6;case 4:return e.calc.mOk&&e.calc.nOk&&e.calc.kOk&&e.calc.lawOk;case 5:return e.designOk;default:return!1}}function Z(e){let t=q();t.phase=e,t.phase0Passed=!0;for(let e of M)t.selected.add(e);t.procSolved=!0,t.procOrder=N.map(e=>e.id),t.timingPassed=!0;for(let e of P){let n=e.options.find(e=>e.ok);t.timingAnswers[e.id]=n.id}t.demoDone=!0,t.demoStep=5;for(let e of K)t.checkedRuns.add(e.key);return e>=5?t.calc={mOk:!0,nOk:!0,kOk:!0,lawOk:!0}:e===4&&(t.calc={mOk:!1,nOk:!1,kOk:!1,lawOk:!1}),t.designOk=!1,t}function se(){let e=new URLSearchParams(window.location.search),t=e.get(`skipTo`)??e.get(`skip`);return t===`5`||t===`6`?Z(5):t===`4`?Z(4):t===`3`?Z(3):t===`2`?Z(2):t===`1`?Z(1):q()}var ce=class{state=se();root;choiceCache=null;constructor(e){this.root=e,this.render()}clearChoices(){this.choiceCache=null}choicesFor(e,t,n,r=4){if(this.choiceCache?.key===e)return this.choiceCache.choices;let i=b(t,n,r);return this.choiceCache={key:e,choices:i},i}advance(){X(this.state)?this.state.phase===5?(this.state.cleared=!0,k(`E8 通關成功！`,`ok`),this.render()):(this.clearChoices(),this.state.phase=this.state.phase+1,k(`進入：${A[this.state.phase]}`,`ok`),this.render()):k(`本階段還沒過關`,`err`)}render(){if(this.state.cleared){this.root.innerHTML=`
        <div class="victory">
          <div class="victory__card">
            <p class="victory__eyebrow">CLEAR · E8</p>
            <h1>碘鐘交響曲 通關</h1>
            <p>你完成了選器材、操作排序、計時規範、變色測定、速率定律（m、n、k），並設計了指定時間的取量。</p>
            <div class="panel__actions" style="justify-content:center">
              <button class="btn btn--primary" id="btn-home" style="width:auto">回實驗選單</button>
              <button class="btn" id="btn-replay">再玩一次</button>
            </div>
          </div>
        </div>`,this.root.querySelector(`#btn-home`)?.addEventListener(`click`,()=>{location.href=`/`}),this.root.querySelector(`#btn-replay`)?.addEventListener(`click`,()=>{this.state=q(),this.render()});return}let e=oe(this.state),t=X(this.state);this.root.innerHTML=`
      <div class="layout">
        <header class="topbar">
          <div class="topbar__left">
            <span class="badge">LAB SIM</span>
            <strong>E8 碘鐘交響曲虛擬實驗</strong>
            <a class="topbar-link" href="/">選單</a>
          </div>
          <div class="topbar__hint">${A[this.state.phase]}</div>
        </header>
        <aside class="sidebar">
          <div class="hud">
            <div class="hud__brand">
              <div class="hud__eyebrow">台大普化實驗 · 虛擬預習</div>
              <h1 class="hud__title">E8 碘鐘交響曲</h1>
            </div>
            <div class="hud__progress">
              ${A.map((e,t)=>`<span class="hud__dot ${t<this.state.phase?`done`:t===this.state.phase?`current`:``}"></span>`).join(``)}
              <span class="hud__phase-label">步驟 ${this.state.phase+1}/6 · ${A[this.state.phase]}</span>
            </div>
            <div class="hud__check">
              <h2>過關條件</h2>
              <p class="hud__note">選錯會說明原因；重複測定用勾選帶過。</p>
              <ul>
                ${e.map(e=>`<li class="${e.done?`is-done`:``}"><span class="tick">${e.done?`✓`:`○`}</span>${e.label}</li>`).join(``)}
              </ul>
              <button class="btn btn--primary" id="btn-next" ${t?``:`disabled`}>
                ${this.state.phase===5?`完成實驗 → 通關`:`本關通過 → 下一階段`}
              </button>
            </div>
          </div>
        </aside>
        <main class="bench-wrap"><div class="bench" id="bench"></div></main>
      </div>`,this.root.querySelector(`#btn-next`)?.addEventListener(`click`,()=>this.advance()),this.renderPhase(this.root.querySelector(`#bench`))}renderPhase(e){switch(this.state.phase){case 0:this.renderPhase0(e);break;case 1:this.renderPhase1(e);break;case 2:this.renderPhase2(e);break;case 3:this.renderPhase3(e);break;case 4:this.renderPhase4(e);break;case 5:this.renderPhase5(e)}}renderPhase0(e){let t=Object.fromEntries(j.map(e=>[e.id,e]));e.innerHTML=`
      <section class="panel">
        <h2>領取站：碘鐘實驗需要哪些？</h2>
        <p class="lede">清單已打亂並混入其他實驗器材。只勾 E8 真正需要的，再提交檢查。</p>
        <div class="item-grid">
          ${this.state.catalogOrder.map(e=>t[e]).map(e=>`<button type="button" class="item-card ${this.state.selected.has(e.id)?`is-selected`:``}" data-id="${e.id}">
                <span class="item-card__icon">${e.icon}</span>
                <span class="item-card__label">${e.label}</span>
              </button>`).join(``)}
        </div>
        <div class="panel__actions">
          <button class="btn" id="btn-clear">清除</button>
          <button class="btn btn--primary" id="btn-submit" style="width:auto;min-width:140px">提交檢查</button>
        </div>
      </section>`,e.querySelectorAll(`.item-card`).forEach(e=>{e.addEventListener(`click`,()=>{if(this.state.phase0Passed)return;let t=e.dataset.id;this.state.selected.has(t)?this.state.selected.delete(t):this.state.selected.add(t),this.render()})}),e.querySelector(`#btn-clear`)?.addEventListener(`click`,()=>{this.state.selected.clear(),this.state.phase0Passed=!1,this.render()}),e.querySelector(`#btn-submit`)?.addEventListener(`click`,()=>{let e=ie(this.state.selected);e.ok?(this.state.phase0Passed=!0,k(`器材檢查通過`,`ok`)):(this.state.phase0Passed=!1,e.extras[0]?k(t[e.extras[0]].hint,`err`):e.missing[0]&&k(`少了「${t[e.missing[0]].label}」：${t[e.missing[0]].hint}`,`err`)),this.render()})}renderPhase1(e){let t=Object.fromEntries(N.map(e=>[e.id,e.label])),n=this.state.procOrder;e.innerHTML=`
      <section class="panel">
        <h2>排出正確操作順序</h2>
        <p class="lede"><strong>拖曳</strong>步驟到正確位置後提交。注意：加 K₂S₂O₈ 時就要開始計時。</p>
        ${this.state.procSolved?`<p class="ok-banner">順序正確。</p>`:`<ol class="sort-list">
                ${n.map((e,n)=>`
                  <li class="sort-item" data-index="${n}" draggable="true">
                    <span class="sort-item__handle">⠿</span>
                    <span class="sort-item__num">${n+1}</span>
                    <span class="sort-item__text">${t[e]}</span>
                  </li>`).join(``)}
              </ol>
              <div class="panel__actions">
                <button class="btn" id="btn-reshuffle">重新打亂</button>
                <button class="btn btn--primary" id="btn-submit-order" style="width:auto">提交順序</button>
              </div>`}
      </section>`,this.state.procSolved||this.bindSort(e,()=>this.state.procOrder,e=>{this.state.procOrder=e},()=>{let e=N.map(e=>e.id);if(this.state.procOrder.join()===e.join())this.state.procSolved=!0,k(`操作順序正確`,`ok`);else{let n=e.findIndex((e,t)=>this.state.procOrder[t]!==e);k(`第 ${n+1} 步應是「${t[e[n]]}」`,`err`)}this.render()},()=>{this.state.procOrder=y(N.map(e=>e.id)),this.render()})}bindSort(e,t,n,r,i){let a=e.querySelector(`.sort-list`);if(!a)return;let o=null,s=()=>a.querySelectorAll(`.sort-item`).forEach(e=>{e.classList.remove(`drag-over-before`,`drag-over-after`,`is-dragging`)});a.querySelectorAll(`.sort-item`).forEach(e=>{e.addEventListener(`dragstart`,t=>{o=Number(e.dataset.index),e.classList.add(`is-dragging`),t.dataTransfer?.setData(`text/plain`,String(o)),t.dataTransfer.effectAllowed=`move`}),e.addEventListener(`dragend`,()=>{s(),o=null}),e.addEventListener(`dragover`,t=>{t.preventDefault();let n=t.clientY<e.getBoundingClientRect().top+e.getBoundingClientRect().height/2;s(),e.classList.add(n?`drag-over-before`:`drag-over-after`),e.classList.add(`is-dragging`)}),e.addEventListener(`drop`,r=>{r.preventDefault();let i=o??Number(r.dataTransfer?.getData(`text/plain`)),a=Number(e.dataset.index),c=r.clientY<e.getBoundingClientRect().top+e.getBoundingClientRect().height/2?a:a+1;if(i<c&&--c,!Number.isFinite(i)||i===c){s();return}let l=[...t()],[u]=l.splice(i,1);l.splice(c,0,u),n(l),this.render()})}),e.querySelector(`#btn-submit-order`)?.addEventListener(`click`,r),e.querySelector(`#btn-reshuffle`)?.addEventListener(`click`,i)}renderPhase2(e){e.innerHTML=`
      <section class="panel">
        <h2>全班統一的計時方式</h2>
        <p class="lede">對齊學習單圈選題。想清楚「何時開始／搖多久／何時停表」。</p>
        <div id="timing-quiz"></div>
        ${this.state.timingPassed?`<p class="ok-banner">計時規範答對了。</p>`:`<button class="btn btn--primary" id="btn-timing" style="width:auto;margin-top:0.8rem">核對答案</button>`}
      </section>`;let t=e.querySelector(`#timing-quiz`);t.innerHTML=P.map(e=>{let t=this.state.timingAnswers[e.id];return`
        <div class="quiz-box">
          <p class="challenge-q">${e.prompt}</p>
          <div class="choice-list">
            ${e.options.map(n=>`<button type="button" class="choice-btn ${t===n.id?`is-picked`:``}" data-q="${e.id}" data-id="${n.id}">${n.label}</button>`).join(``)}
          </div>
        </div>`}).join(``),t.querySelectorAll(`.choice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{this.state.timingPassed||(this.state.timingAnswers[e.dataset.q]=e.dataset.id,this.render())})}),e.querySelector(`#btn-timing`)?.addEventListener(`click`,()=>{for(let e of P){let t=this.state.timingAnswers[e.id];if(t!==e.options.find(e=>e.ok).id){k(e.options.find(e=>e.id===t)?.why??`「${e.prompt}」尚未選對`,`err`);return}}this.state.timingPassed=!0,k(`計時方式全部正確`,`ok`),this.render()})}renderPhase3(e){this.state.demoDone?this.renderCheck(e):this.renderDemo(e)}renderDemo(e){let t=[{id:`prep`,label:`依試驗1取量：分注 NaI/NaCl/S₂O₃/澱粉，吸量管取 K₂SO₄`},{id:`add`,label:`加入 2.0 mL K₂S₂O₈ 並同時開始計時`},{id:`shake`,label:`塞緊軟木塞，手腕搖 20 秒（勿握瓶底以免體溫影響）`},{id:`watch`,label:`靜置觀察；開始變色瞬間停表`},{id:`record`,label:`記錄 Δt ≈ ${F[0].dt} s（二次差 >3 s 需重做）`}],n=this.state.demoStep,r=n>=t.length,i=``;if(!r){let e={id:t[n].id,label:t[n].label,ok:!0,why:``},r=this.choicesFor(`e8-demo-${n}`,e,[{id:`w1`,label:`先加 K₂S₂O₈ 再慢慢找計時器`,ok:!1,why:`加 K₂S₂O₈ 須與計時同步。`},{id:`w2`,label:`握著瓶底大力上下甩到變色`,ok:!1,why:`手搖 20 秒即可；握瓶底會影響溫度。`},{id:`w3`,label:`等到顏色完全不再變化才停表`,ok:!1,why:`開始變色瞬間停表。`},{id:`w4`,label:`用未潤洗的吸量管直接取過硫酸鉀`,ok:!1,why:`吸量管需以試劑潤洗 2 次。`}],4);i=`
        <p class="progress-pill">示範步驟 ${n+1}/${t.length} · 試驗1</p>
        <p class="challenge-q">現在正確操作是？</p>
        <div class="choice-list">
          ${r.map(e=>`<button type="button" class="choice-btn" data-id="${e.id}">${e.label}</button>`).join(``)}
        </div>`}e.innerHTML=`
      <section class="panel panel--split">
        <div class="clock-visual ${n>=3?`is-blue`:``}">
          <div class="clock-flask">${n>=3?`變色！`:`無色`}</div>
          <div class="clock-time">Δt ${n>=4?F[0].dt+` s`:`—`}</div>
        </div>
        <div class="step-board">
          <h2>測定示範（試驗1，只做一次）</h2>
          <p class="lede">三組試驗流程相同，這裡練一次；其餘用勾選帶過。</p>
          ${r?`<p class="ok-banner">示範完成。接著勾選其餘測定。</p>
                 <button class="btn btn--primary" id="btn-to-check" style="width:auto">前往勾選 →</button>`:i}
        </div>
      </section>`,e.querySelector(`#btn-to-check`)?.addEventListener(`click`,()=>{this.state.demoDone=!0,this.state.checkedRuns.add(`1a`),this.clearChoices(),this.render()}),e.querySelectorAll(`.choice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.id;r===t[n].id?(this.state.demoStep=n+1,this.clearChoices(),k(`正確 ✓`,`ok`),this.render()):(k([{id:`w1`,why:`加 K₂S₂O₈ 須與計時同步。`},{id:`w2`,why:`手搖 20 秒即可；握瓶底會影響溫度。`},{id:`w3`,why:`開始變色瞬間停表。`},{id:`w4`,why:`吸量管需以試劑潤洗 2 次。`}].find(e=>e.id===r)?.why??`不正確`,`err`),this.clearChoices(),this.render())})})}renderCheck(e){e.innerHTML=`
      <section class="panel">
        <h2>勾選其餘變色時間測定</h2>
        <p class="lede">二次重複若差超過 3 秒需重做。教學數據採用講義示例平均值。</p>
        <div class="check-grid">
          ${K.map(e=>{let t=this.state.checkedRuns.has(e.key);return`<label class="check-card ${t?`is-on`:``}">
              <input type="checkbox" data-key="${e.key}" ${t?`checked`:``} ${e.key===`1a`?`disabled`:``}/>
              <span>${e.label}${e.key===`1a`?`（示範）`:``} · Δt≈${F[e.trial-1].dt}s</span>
            </label>`}).join(``)}
        </div>
        <div class="panel__actions">
          <button class="btn" id="btn-all">一鍵勾選全部</button>
        </div>
        <table class="data-table" style="margin-top:1rem">
          <thead><tr><th>試驗</th><th>K₂S₂O₈ (mL)</th><th>NaI (mL)</th><th>平均 Δt (s)</th></tr></thead>
          <tbody>
            ${F.map(e=>`<tr><td>${e.id}</td><td>${e.k2s2o8.toFixed(1)}</td><td>${e.nai.toFixed(1)}</td><td>${e.dt}</td></tr>`).join(``)}
          </tbody>
        </table>
      </section>`,e.querySelectorAll(`input[data-key]`).forEach(e=>{e.addEventListener(`change`,()=>{let t=e.dataset.key;t===`1a`?e.checked=!0:(e.checked?this.state.checkedRuns.add(t):this.state.checkedRuns.delete(t),this.render())})}),e.querySelector(`#btn-all`)?.addEventListener(`click`,()=>{for(let e of K)this.state.checkedRuns.add(e.key);k(`已勾選全部測定`,`ok`),this.render()})}renderPhase4(e){let t=F[0],n=F[1],r=F[2],i=J(),a=Y(),o=ae();e.innerHTML=`
      <section class="panel">
        <h2>數據處理：初速率、級數與 k</h2>
        <p class="lede">依學習單：rate = 0.00025 / Δt。比較試驗求 m、n，再求各試驗 k 與平均 k，最後寫出速率定律式。</p>

        <table class="data-table">
          <thead>
            <tr>
              <th>試驗</th><th>[S₂O₈²⁻]₀</th><th>[I⁻]₀</th><th>[S₂O₃²⁻]₀</th><th>Δt (s)</th><th>rate (M/s)</th>
            </tr>
          </thead>
          <tbody>
            ${F.map(e=>{let t=I(e.dt);return`<tr>
                <td>${e.id}</td>
                <td>${L(e).toFixed(3)}</td>
                <td>${R(e).toFixed(3)}</td>
                <td>${z(e).toFixed(4)}</td>
                <td>${e.dt}</td>
                <td>${W(t,2)}</td>
              </tr>`}).join(``)}
          </tbody>
        </table>

        <div class="formula-box">
          <p>rate₂/rate₁ = Δt₁/Δt₂ = 2<sup>m</sup>　→　m = log(Δt₁/Δt₂) / log(2)</p>
          <p>rate₃/rate₁ = Δt₁/Δt₃ = 2<sup>n</sup>　→　n = log(Δt₁/Δt₃) / log(2)</p>
          <p>k = rate / ([S₂O₈²⁻]<sup>m</sup>[I⁻]<sup>n</sup>)（三組皆算，再平均）</p>
        </div>

        <div class="quiz-box">
          <p class="challenge-q">1. 級數 m（二位有效數字，如 0.89）</p>
          <div class="calc-row">
            <input id="in-m" type="number" step="0.01" ${this.state.calc.mOk?`disabled`:``} />
            <button class="btn" id="btn-m" ${this.state.calc.mOk?`disabled`:``}>核對 m</button>
            ${this.state.calc.mOk?`<span class="ok-inline">✓</span>`:``}
          </div>
        </div>
        <div class="quiz-box">
          <p class="challenge-q">2. 級數 n（二位有效數字）</p>
          <div class="calc-row">
            <input id="in-n" type="number" step="0.01" ${this.state.calc.nOk?`disabled`:``} />
            <button class="btn" id="btn-n" ${this.state.calc.nOk?`disabled`:``}>核對 n</button>
            ${this.state.calc.nOk?`<span class="ok-inline">✓</span>`:``}
          </div>
        </div>
        <div class="quiz-box">
          <p class="challenge-q">3. 平均速率常數 k（科學記號也可，容許 ±15%）</p>
          <div class="calc-row">
            <input id="in-k" type="text" placeholder="例如 0.0027 或 2.7e-3" ${this.state.calc.kOk?`disabled`:``} />
            <button class="btn" id="btn-k" ${this.state.calc.kOk?`disabled`:``}>核對 k</button>
            ${this.state.calc.kOk?`<span class="ok-inline">✓</span>`:``}
          </div>
        </div>
        <div class="quiz-box">
          <p class="challenge-q">4. 速率定律式應為？</p>
          <div class="choice-list" id="law-choices"></div>
          ${this.state.calc.lawOk?`<p class="ok-banner">速率定律式正確。</p>`:``}
        </div>
      </section>`;let s=G(i,2),c=G(a,2);if(e.querySelector(`#btn-m`)?.addEventListener(`click`,()=>{let r=Number(e.querySelector(`#in-m`).value);Number.isFinite(r)?Math.abs(r-s)>.05&&Math.abs(r-i)>.05?k(`再算：m = log(${t.dt}/${n.dt}) / log(2)`,`err`):(this.state.calc.mOk=!0,k(`m 正確`,`ok`),this.render()):k(`請輸入 m`,`err`)}),e.querySelector(`#btn-n`)?.addEventListener(`click`,()=>{let n=Number(e.querySelector(`#in-n`).value);Number.isFinite(n)?Math.abs(n-c)>.05&&Math.abs(n-a)>.05?k(`再算：n = log(${t.dt}/${r.dt}) / log(2)`,`err`):(this.state.calc.nOk=!0,k(`n 正確`,`ok`),this.render()):k(`請輸入 n`,`err`)}),e.querySelector(`#btn-k`)?.addEventListener(`click`,()=>{let t=e.querySelector(`#in-k`).value.trim(),n=Number(t);Number.isFinite(n)?Math.abs(n-o)/o>.15?k(`再檢查：先用你的 m、n 算三組 k 再平均`,`err`):(this.state.calc.kOk=!0,k(`平均 k 正確`,`ok`),this.render()):k(`請輸入數字（可用 2.7e-3）`,`err`)}),!this.state.calc.lawOk){let t={id:`law-ok`,label:`rate = k [S₂O₈²⁻]^m [I⁻]^n　（m≈${s}, n≈${c}）`,ok:!0,why:``},n=[{id:`l1`,label:`rate = k [S₂O₈²⁻][I⁻]（固定一級，不需實驗）`,ok:!1,why:`級數要由初速率法實驗決定。`},{id:`l2`,label:`rate = k [S₂O₃²⁻] / Δt`,ok:!1,why:`S₂O₃²⁻ 是計時工具；速率定律是對 S₂O₈²⁻ 與 I⁻。`},{id:`l3`,label:`rate = k [S₂O₈²⁻]^n [I⁻]^m（m、n 對調）`,ok:!1,why:`m 對應過硫酸根，n 對應碘離子。`}],r=this.choicesFor(`e8-law`,t,n,4),i=e.querySelector(`#law-choices`);i.innerHTML=r.map(e=>`<button type="button" class="choice-btn" data-id="${e.id}">${e.label}</button>`).join(``),i.querySelectorAll(`.choice-btn`).forEach(e=>{e.addEventListener(`click`,()=>{e.dataset.id===`law-ok`?(this.state.calc.lawOk=!0,this.clearChoices(),k(`速率定律式正確`,`ok`),this.render()):(k(n.find(t=>t.id===e.dataset.id)?.why??`不正確`,`err`),this.clearChoices(),this.render())})})}}renderPhase5(e){let t=J(),n=F[0].dt,r=U(n,80,t);e.innerHTML=`
      <section class="panel">
        <h2>自行設計取量（碘鐘交響曲）</h2>
        <p class="lede">學習單：長秒數配方保持試驗1的 I⁻，只改過硫酸鉀取量 x mL（K₂SO₄ = 4.0−x），使 Δt 接近指定時間。</p>
        <div class="formula-box">
          <p>r<sub>x</sub>/r<sub>1</sub> = Δt<sub>1</sub>/Δt<sub>x</sub> = (x/2.0)<sup>m</sup></p>
          <p>→ x = 2.0 × (Δt<sub>1</sub>/Δt<sub>指定</sub>)<sup>1/m</sup></p>
          <p>本關指定變色時間 Δt<sub>指定</sub> = <strong>80 s</strong>；Δt<sub>1</sub> = ${n} s；使用你求出的 m≈${G(t,2)}</p>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>NaI</th><th>NaCl</th><th>S₂O₃</th><th>澱粉</th><th>K₂SO₄</th><th>K₂S₂O₈</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2.0</td><td>2.0</td><td>1.0</td><td>1.0</td><td>4.0 − x</td><td>x</td>
            </tr>
          </tbody>
        </table>
        <div class="quiz-box">
          <p class="challenge-q">求出過硫酸鉀取量 x（mL），容許 ±0.15 mL</p>
          <div class="calc-row">
            <input id="in-x" type="number" step="0.01" placeholder="x" ${this.state.designOk?`disabled`:``} />
            <button class="btn btn--primary" id="btn-x" style="width:auto" ${this.state.designOk?`disabled`:``}>核對設計</button>
          </div>
        </div>
        ${this.state.designOk?`<p class="ok-banner">設計正確！實測時應在指定時間附近變色（交響曲比賽同理）。K₂SO₄ 取 ${(4-r).toFixed(2)} mL。</p>
               <div class="clock-visual is-blue" style="margin:1rem auto;max-width:200px">
                 <div class="clock-flask">準點變色</div>
                 <div class="clock-time">~80s</div>
               </div>`:``}
      </section>`,e.querySelector(`#btn-x`)?.addEventListener(`click`,()=>{let t=Number(e.querySelector(`#in-x`).value);Number.isFinite(t)?Math.abs(t-r)>.15?k(`再算：x = 2 × (${n}/80)^(1/m)`,`err`):(this.state.designOk=!0,k(`取量設計正確`,`ok`),this.render()):k(`請輸入 x`,`err`)})}},Q=document.querySelector(`#app`);if(!Q)throw Error(`#app not found`);function le(){Q.innerHTML=`
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
    </div>`}var $=new URLSearchParams(window.location.search).get(`exp`);$===`e12`?(document.title=`E12 緩衝溶液虛擬實驗`,new re(Q)):$===`e8`?(document.title=`E8 碘鐘交響曲虛擬實驗`,new ce(Q)):(document.title=`普化實驗虛擬預習`,le());