// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

let startIndex = 0;
const showCount = 4;

// ==============================
// 更新畫面：顯示 4 張 + 套 active
// ==============================
function renderCarousel() {
  items.forEach(item => item.style.display = "none");

  let visibleIndexes = [];
  for (let i = 0; i < showCount; i++) {
    visibleIndexes.push((startIndex + i) % items.length);
  }

  visibleIndexes.forEach((index, i) => {
    items[index].style.display = "flex";
    items[index].classList.remove("active");
    if (i === 1) items[index].classList.add("active"); // 第二張 = 主圖
  });

  updateCounter(visibleIndexes[1]);
}

// 更新 counter
function updateCounter(activeIndex) {
  counter.textContent = `${activeIndex + 1} / ${items.length}`;
}

// 左右按鈕
nextBtn.addEventListener("click", () => {
  startIndex = (startIndex + 1) % items.length;
  renderCarousel();
});

prevBtn.addEventListener("click", () => {
  startIndex = (startIndex - 1 + items.length) % items.length;
  renderCarousel();
});

// ==============================
// Lightbox 大圖
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

// 初始化
renderCarousel();
