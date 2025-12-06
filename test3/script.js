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
  const gridWidth = document.querySelector(".grid-wrapper").clientWidth;

  // 每張最小寬 180px（跟 CSS minmax 一致）
  const columns = Math.floor(gridWidth / 180);

  const rows = 2; // 你想要一頁顯示 2 行

  pageSize = columns * rows;

  if (pageSize < 1) pageSize = 1;
}

/* ===========================
   重新渲染
   =========================== */
function renderCarousel() {
  updatePageSize();

  // 隱藏全部
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
  if (pageIndex > 0) {
    pageIndex--;
    renderCarousel();
  }
});

/* 下一頁 */
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
    const imgURL = item.querySelector("img").dataset.full;
    lightboxImg.src = imgURL;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

/* 視窗大小變化 → 重新計算 */
window.addEventListener("resize", () => {
  renderCarousel();
});

/* 初始化 */
renderCarousel();
