// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

let startIndex = 0; // 目前顯示的起始 index
const showCount = 4; // 一次顯示 4 張

// ==============================
// 更新畫面：顯示 4 張 + 套 active
// ==============================
function renderCarousel() {
  items.forEach((item, i) => item.style.display = "none");

  // 取出 4 個 index（環狀）
  const visibleIndexes = [];
  for (let i = 0; i < showCount; i++) {
    visibleIndexes.push((startIndex + i) % items.length);
  }

  // 讓 4 張出現
  visibleIndexes.forEach((index, i) => {
    items[index].style.display = "flex";
    items[index].classList.remove("active");
    if (i === 1) items[index].classList.add("active"); // 第二張做 active
  });

  updateCounter(visibleIndexes[1]); // active 的 index 用來顯示數字
}

// ==============================
// Counter 顯示（例如 2 / 12）
// ==============================
function updateCounter(activeIndex) {
  counter.textContent = `${activeIndex + 1} / ${items.length}`;
}

// ==============================
// 左右按鈕
// ==============================
nextBtn.addEventListener("click", () => {
  startIndex = (startIndex + 1) % items.length;
  renderCarousel();
});

prevBtn.addEventListener("click", () => {
  startIndex = (startIndex - 1 + items.length) % items.length;
  renderCarousel();
});

// ==============================
// 點圖片 → 開大圖
// ==============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

items.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img").dataset.full;
    lightboxImg.src = img;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// ==============================
// 初始化
// ==============================
renderCarousel();
