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

// 點擊圖片 → 成為 active，再點一次才放大
items.forEach((item, i) => {
  item.addEventListener('click', () => {

    // 1. 如果不是 active → 點一下變 active
    if (!item.classList.contains("active")) {
      index = i;
      update();
      return;
    }

    // 2. 如果已經是 active → 點一下放大
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
