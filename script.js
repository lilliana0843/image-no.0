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

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// 點擊圖片：只有 active 才會開啟大圖
items.forEach((item) => {
  item.addEventListener("click", () => {
    // 不是 active → 只是切換 index，不開大圖
    if (!item.classList.contains("active")) {
      index = [...items].indexOf(item);
      update();
      return;
    }

    // 是 active → 開啟大圖
    const img = item.querySelector("img");
    const full = img.dataset.full || img.src; // 優先使用 data-full
    lightboxImg.src = full;
    lightbox.style.display = "flex";
  });
});

// 點擊背景關閉大圖
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
