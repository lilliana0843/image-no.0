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

  const visibleIndexes = [];
  for (let i = 0; i < showCount; i++) {
    visibleIndexes.push((startIndex + i) % items.length);
  }

  visibleIndexes.forEach((index, i) => {
    items[index].style.display = "flex";
    items[index].classList.remove("active");

    // 預設讓第 1 張成為 active
    if (i === 1) items[index].classList.add("active");
  });

  updateCounter(visibleIndexes[1]);
  updateButtons();
}

// Counter 顯示（例如 2 / 12）
function updateCounter(activeIndex) {
  counter.textContent = `${activeIndex + 1} / ${items.length}`;
}

// 按鈕灰色控制
function updateButtons() {
  prevBtn.disabled = startIndex === 0;
  nextBtn.disabled = startIndex >= items.length - showCount;
}

// 左右按鈕
nextBtn.addEventListener("click", () => {
  if (startIndex < items.length - showCount) {
    startIndex++;
    renderCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (startIndex > 0) {
    startIndex--;
    renderCarousel();
  }
});

// ==============================
// 點圖片（依照你的需求區分兩段邏輯）
// ==============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

items.forEach(item => {
  item.addEventListener("click", () => {

    // 如果這張已經是 active → 再點一下就是打開大圖
    if (item.classList.contains("active")) {
      const imgURL = item.querySelector("img").dataset.full;
      lightboxImg.src = imgURL;
      lightbox.style.display = "flex";
      return;
    }

    // 點到別張 → 變 active（不開大圖）
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Lightbox 收合
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// 初始化
renderCarousel();
