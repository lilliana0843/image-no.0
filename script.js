// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

let startIndex = 0; // 目前顯示起始 index
const showCount = 5; // 一次顯示 5 張

// ==============================
// 更新畫面：顯示 5 張 + 套 active
// ==============================
function renderCarousel() {
  items.forEach(item => item.style.display = "none");

  const visibleIndexes = [];
  for (let i = 0; i < showCount; i++) {
    visibleIndexes.push((startIndex + i) % items.length);
  }

  visibleIndexes.forEach((index, i) => {
    const item = items[index];
    item.style.display = "flex";

    // 保留原本 active，不會每次被清掉
    if (!item.classList.contains("active")) {
      if (i === 2) {
        item.classList.add("active");
      }
    }
  });

  // 顯示 counter
  const activeIndex = visibleIndexes.find(index =>
    items[index].classList.contains("active")
  );

  updateCounter(activeIndex);
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

  prevBtn.classList.toggle("disabled", prevBtn.disabled);
  nextBtn.classList.toggle("disabled", nextBtn.disabled);
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
// 點圖片（hover → active → open big）
// ==============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

items.forEach(item => {
  item.addEventListener("click", () => {

    // 若已是 active → 開大圖
    if (item.classList.contains("active")) {
      const imgURL = item.querySelector("img").dataset.full;
      lightboxImg.src = imgURL;
      lightbox.style.display = "flex";
      return;
    }

    // 變成 active（第一次點）
    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // ⭐ 點了第幾張，就把它滾到第二格位置（保持穩定）
    const index = items.indexOf(item);
    startIndex = Math.max(0, Math.min(index - 2, items.length - showCount));

    renderCarousel();
  });
});

// Lightbox 收合
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// 初始化
renderCarousel();
