// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

// 一頁顯示 5×2 = 10 張
const pageSize = 10;
let pageIndex = 0;

// ==============================
// 重新渲染
// ==============================
function renderCarousel() {
  items.forEach(item => (item.style.display = "none"));

  const start = pageIndex * pageSize;
  const end = start + pageSize;

  const visible = items.slice(start, end);

  visible.forEach(item => {
    item.style.display = "flex";
  });

  updateCounter();
  updateButtons();
}

// Counter 顯示
function updateCounter() {
  counter.textContent = `${pageIndex + 1} / ${Math.ceil(items.length / pageSize)}`;
}

// 按鈕狀態
function updateButtons() {
  prevBtn.disabled = pageIndex === 0;
  nextBtn.disabled = pageIndex >= Math.ceil(items.length / pageSize) - 1;

  prevBtn.classList.toggle("disabled", prevBtn.disabled);
  nextBtn.classList.toggle("disabled", nextBtn.disabled);
}

// 上（上一頁）
prevBtn.addEventListener("click", () => {
  if (pageIndex > 0) {
    pageIndex--;
    renderCarousel();
  }
});

// 下（下一頁）
nextBtn.addEventListener("click", () => {
  if (pageIndex < Math.ceil(items.length / pageSize) - 1) {
    pageIndex++;
    renderCarousel();
  }
});

// ==============================
// Lightbox 點圖放大
// ==============================
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

// 初始化
renderCarousel();
