// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

let startIndex = 0; // 目前顯示的起始 index
const showCount = 5; // 一次顯示 5 張

// ==============================
// 更新畫面：顯示 5 張 + 套 active
// ==============================
function renderCarousel() {
  items.forEach(item => item.style.display = "none");

  // 計算這頁可顯示的 index
  const visibleIndexes = [];
  for (let i = 0; i < showCount; i++) {
    visibleIndexes.push((startIndex + i) % items.length);
  }

  // 讓 4 張出現
  visibleIndexes.forEach((index, i) => {
    const item = items[index];
    item.style.display = "flex";
    item.classList.remove("active", "clicked");
    if (i === 1) item.classList.add("active"); // 第二張 active（你的原設定）
  });

  updateCounter(visibleIndexes[1]);

  updateButtons();
}

// ==============================
// 控制按鈕灰色（不可點）
// ==============================
function updateButtons() {
  prevBtn.disabled = startIndex === 0;
  nextBtn.disabled = startIndex + showCount >= items.length;
}

// ==============================
// Counter 顯示（例如 2 / 12）
// ==============================
function updateCounter(activeIndex) {
  counter.textContent = `${activeIndex + 1} / ${items.length}`;
}

// ==============================
// 左右按鈕（不可超過兩端）
// ==============================
nextBtn.addEventListener("click", () => {
  if (startIndex + showCount < items.length) {
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
// 點圖片：hover → clicked → 放大
// ==============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

items.forEach((item, i) => {
  item.addEventListener("click", () => {

    // 若是第二張 active，那就可能需要 clicked → 放大
    if (item.classList.contains("active")) {

      // 第一次點 → clicked（亮框）
      if (!item.classList.contains("clicked")) {
        item.classList.add("clicked");
        return;
      }

      // 第二次點 → lightbox 放大
      const img = item.querySelector("img").dataset.full;
      lightboxImg.src = img;
      lightbox.style.display = "flex";
      return;
    }

    // 若點別張 → 不進入 clicked，比照你的原本邏輯：不跳頁，只是顯示 lightbox
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
