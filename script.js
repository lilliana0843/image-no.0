// 取得 DOM
const items = Array.from(document.querySelectorAll(".item"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.querySelector(".counter");

let startIndex = 0;        // 現在顯示的第 1 張 index
const showCount = 5;       // 一次顯示 4 張

// ==============================
// 更新畫面：顯示５ 張 + setting active
// ==============================
function renderCarousel() {
  items.forEach((item, i) => item.style.display = "none");

  for (let i = 0; i < showCount; i++) {
    const index = startIndex + i;

    if (index < items.length) {
      items[index].style.display = "flex";
      items[index].classList.remove("active");
      if (i === 1) items[index].classList.add("active");
    }
  }

  updateCounter(startIndex + 1);
}

// ==============================
// 計數器
// ==============================
function updateCounter(activeIndex) {
  counter.textContent = `${activeIndex} / ${items.length}`;
}

// ==============================
// 下一頁：到最後一頁後停止 → 再按一次跳回第一頁
// ==============================
nextBtn.addEventListener("click", () => {

  const maxStart = items.length - showCount; // 最後一頁起點 index

  if (startIndex < maxStart) {
    // 正常往後
    startIndex++;
  } else {
    // 已經在最後 → 再按一次才跳回第一頁
    startIndex = 0;
  }

  renderCarousel();
});

// ==============================
// 上一頁：到第一頁後停止 → 再按一次跳回最後頁
// ==============================
prevBtn.addEventListener("click", () => {

  const maxStart = items.length - showCount;

  if (startIndex > 0) {
    // 正常往前
    startIndex--;
  } else {
    // 已經在第一頁 → 再按一次才跳最後頁
    startIndex = maxStart;
  }

  renderCarousel();
});

// ==============================
// 點圖片開大圖
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
