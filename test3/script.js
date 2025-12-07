// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

let pageSize = 10;
let pageIndex = 0;

// grid 設定（須與 CSS minmax 的最小值一致）
const MIN_COL_WIDTH = 180; // px
const GAP = 12; // grid gap (與 CSS 一致)

/* 計算目前一頁可顯示幾個 item（欄數 * 固定 2 行） */
function updatePageSize() {
  const grid = document.querySelector(".grid-wrapper");
  if (!grid) { pageSize = 4; return; }
  const gridWidth = grid.getBoundingClientRect().width;

  // 計算能放多少欄（考慮 gap）
  // 若欄為 n，總寬約 = n * MIN_COL_WIDTH + (n - 1) * GAP
  // solve for n: n <= (gridWidth + GAP) / (MIN_COL_WIDTH + GAP)
  const possibleColumns = Math.floor((gridWidth + GAP) / (MIN_COL_WIDTH + GAP));
  const columns = Math.max(1, possibleColumns);

  const rows = 2; // 固定顯示 2 行（可改成變數）
  pageSize = columns * rows;
}

/* 重新渲染當前頁面 */
function renderCarousel() {
  updatePageSize();

  // 計算總頁數並確保 pageIndex 不超界
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  if (pageIndex >= totalPages) pageIndex = totalPages - 1;
  if (pageIndex < 0) pageIndex = 0;

  // 隱藏全部
  items.forEach(item => (item.style.display = "none"));

  // 顯示本頁
  const start = pageIndex * pageSize;
  const end = Math.min(start + pageSize, items.length);
  items.slice(start, end).forEach(item => item.style.display = "flex");

  updateCounter();
  updateButtons();
}

/* 更新 counter */
function updateCounter() {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  counter.textContent = `${pageIndex + 1} / ${totalPages}`;
}

/* 更新按鈕狀態 */
function updateButtons() {
  prevBtn.disabled = pageIndex === 0;
  nextBtn.disabled = pageIndex >= Math.ceil(items.length / pageSize) - 1;
}

/* 綁定上下頁 */
prevBtn.addEventListener("click", () => {
  if (pageIndex > 0) {
    pageIndex--;
    renderCarousel();
  }
});
nextBtn.addEventListener("click", () => {
  if (pageIndex < Math.ceil(items.length / pageSize) - 1) {
    pageIndex++;
    renderCarousel();
  }
});

/* lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
items.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    if (!img) return;
    const imgURL = img.dataset.full || img.src;
    lightboxImg.src = imgURL;
    lightbox.style.display = "flex";
  });
});
lightbox.addEventListener("click", () => lightbox.style.display = "none");

/* resize 時重算 */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => renderCarousel(), 120);
});

/* 初始化 */
document.addEventListener("DOMContentLoaded", () => renderCarousel());
