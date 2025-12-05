const items = document.querySelectorAll('.item');
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

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

/* ============================
   Hover 移上去就選中
   ============================ */
items.forEach((item, i) => {
  item.addEventListener("mouseenter", () => {
    index = i;    // 更新 index
    update();     // 刷新 active 顯示
  });
});

/* ============================
   點擊 active 才會開大圖
   ============================ */
items.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      const img = item.querySelector("img");
      const full = img.dataset.full || img.src;
      lightboxImg.src = full;
      lightbox.style.display = "flex";
    }
  });
});

// 點 Lightbox 背景關閉
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
