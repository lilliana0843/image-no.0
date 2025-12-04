const items = document.querySelectorAll('.item');
let index = 0;

// 更新 active 顯示
function update() {
  items.forEach((item, i) => item.classList.toggle('active', i === index));
}

// 下一張
document.getElementById('next').onclick = () => {
  index = (index + 1) % items.length;
  update();
};

// 上一張
document.getElementById('prev').onclick = () => {
  index = (index - 1 + items.length) % items.length;
  update();
};

// 點擊特定圖片跳到該張
items.forEach((item) => {
  item.addEventListener('click', () => {
    // 點擊會先更新 active 選項
    const img = item.querySelector("img");

    // 如果這一張是中間的 active → 開啟大圖
    if (item.classList.contains('active')) {
      const full = img.dataset.full || img.src; 
      lightboxImg.src = full;   // 讀取 data-full 大圖
      lightbox.style.display = "flex";
    }
  });
});

/* ===========================
   點擊 active 圖片 → 放大顯示
   =========================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

items.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('active')) {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    }
  });
});

// 點擊背景關閉 Lightbox
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
