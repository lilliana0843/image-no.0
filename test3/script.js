// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

let pageSize = 10;
let pageIndex = 0;

/* ===========================
   計算「一頁顯示幾個」
   =========================== */
function updatePageSize() {
  const grid = document.querySelector(".grid-wrapper");
  const gridWidth = grid.clientWidth;

  // 單個卡片的最小寬度 (和 CSS 一致)
  const minWidth = 180;

  // 計算能塞幾欄（手機可能變成 1 欄、2 欄）
  const columns = Math.max(1, Math.floor(gridWidth / minWidth));

  // 想要固定顯示 2 行
  const rows = 2;

  pageSize = columns * rows;
}

/* ===========================
   重新渲染
   =========================== */
function renderCarousel() {
  updatePageSize();

  items.forEach(item => (item.style.display = "none"));

  const start = pageIndex * pageSize;
  const end = start + pageSize;

  items.slice(start, end).forEach(item => {
    item.style.display = "flex";
  });

  updateCounter();
  updateButtons();
}

/* 計數器 */
function updateCounter() {
  counter.textContent = `${pageIndex + 1} / ${Math.ceil(items.length / pageSize)}`;
}

/* 按鈕狀態 */
function updateButtons() {
  prevBtn.disabled = pageIndex === 0;
  nextBtn.disabled = pageIndex >= Math.ceil(items.length / pageSize) - 1;
}

/* 上一頁 */
prevBtn.addEventListener("click", () => {
  pageIndex--;
  renderCarousel();
});

/* 下一頁 */
nextBtn.addEventListener("click", () => {
  pageIndex++;
  renderCarousel();
});

/* Lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

items.forEach(item => {
  item.addEventListener("click", () => {
    const imgURL = item.querySelector("img").dataset.full;
    lightboxImg.src = imgURL;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

/* 重新計算 RWD */
window.addEventListener("resize", renderCarousel);

/* 初始化 */
renderCarousel();
