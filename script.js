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


// ==========================
// 滑鼠移上 → 變成 active
// ==========================
items.forEach((item, i) => {
  item.addEventListener("mouseenter", () => {
    index = i;
    update();
  });
});


// ==========================
// 點擊 active → 放大顯示
// 點擊非 active → 不放大，只選中
// ==========================
items.forEach((item, i) => {
  item.addEventListener("click", () => {
    // 如果不是 active → 只負責切換 active
    if (i !== index) {
      index = i;
      update();
      return;
    }

    // 是 active → 開大圖
    const img = item.querySelector("img");
    const full = img.dataset.full || img.src;
    lightboxImg.src = full;
    lightbox.style.display = "flex";
  });
});


// 點擊背景關閉大圖
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
