// ------------------------
// 取得 DOM
// ------------------------
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");
const gridWrapper = document.querySelector(".grid-wrapper");

let pageSize = 10;
let pageIndex = 0;

// grid 設定（須與 CSS minmax 的最小值一致）
const MIN_COL_WIDTH = 180; // px
const GAP = 12; // grid gap (與 CSS 一致)

// ------------------------
// 計算一頁可容納多少 item（兩行）
// ------------------------
function updatePageSize() {
  const grid = document.querySelector(".grid-wrapper");
  if (!grid) { pageSize = 4; return; }

  const gridWidth = grid.getBoundingClientRect().width;
  const possibleColumns = Math.floor((gridWidth + GAP) / (MIN_COL_WIDTH + GAP));
  const columns = Math.max(1, possibleColumns);
  const rows = 2; 
  pageSize = columns * rows;
}

// ------------------------
// 🔥 建立 page-wrapper（滑動頁面需要）
// ------------------------
function rebuildPages() {
  updatePageSize();

  // 移除舊 page-wrapper
  const oldPages = document.querySelectorAll(".page-wrapper");
  oldPages.forEach(p => p.remove());

  gridWrapper.style.display = "flex";
  gridWrapper.style.transition = "none"; // 初始化不需要動畫
  gridWrapper.style.transform = "translateX(0)";

  const totalPages = Math.ceil(items.length / pageSize);
  gridWrapper.style.width = `${totalPages * 100}%`;

  let index = 0;

  for (let p = 0; p < totalPages; p++) {
    const page = document.createElement("div");
    page.className = "page-wrapper";
    page.style.width = `${100 / totalPages}%`;
    page.style.display = "grid";
    page.style.gridTemplateColumns = "repeat(auto-fill, minmax(180px, 1fr))";
    page.style.gap = `${GAP}px`;

    for (let i = 0; i < pageSize && index < items.length; i++) {
      page.appendChild(items[index]);
      index++;
    }

    gridWrapper.appendChild(page);
  }
}

// ------------------------
// 更新 counter
// ------------------------
function updateCounter() {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  counter.textContent = `${pageIndex + 1} / ${totalPages}`;
}

// ------------------------
// 更新按鈕
// ------------------------
function updateButtons() {
  const totalPages = Math.ceil(items.length / pageSize);
  prevBtn.disabled = pageIndex === 0;
  nextBtn.disabled = pageIndex >= totalPages - 1;
}

// ------------------------
// 🔥 滑動翻頁核心
// ------------------------
function slideToPage(index) {
  const totalPages = Math.ceil(items.length / pageSize);

  if (index < 0 || index >= totalPages) return;

  pageIndex = index;

  gridWrapper.style.transition = "transform 0.45s ease";
  gridWrapper.style.transform = `translateX(${-pageIndex * 100}%)`;

  updateButtons();
  updateCounter();
}

// ------------------------
// 初始化 + 渲染
// ------------------------
function renderCarousel() {
  const oldIndex = pageIndex;
  rebuildPages();

  // 超過最大頁數就調整
  const totalPages = Math.ceil(items.length / pageSize);
  if (pageIndex >= totalPages) pageIndex = totalPages - 1;
  if (pageIndex < 0) pageIndex = 0;

  // 立即定位到正確頁面（不使用動畫）
  gridWrapper.style.transition = "none";
  gridWrapper.style.transform = `translateX(${-pageIndex * 100}%)`;

  updateButtons();
  updateCounter();
}

// ------------------------
// 按鈕事件
// ------------------------
prevBtn.addEventListener("click", () => {
  slideToPage(pageIndex - 1);
});

nextBtn.addEventListener("click", () => {
  slideToPage(pageIndex + 1);
});

// ------------------------
// lightbox
// ------------------------
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

// ------------------------
// resize 時重新計算
// ------------------------
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => renderCarousel(), 150);
});

// ------------------------
// 初始化
// ------------------------
document.addEventListener("DOMContentLoaded", () => renderCarousel());
