const items = document.querySelectorAll(".item");
const counter = document.querySelector(".counter");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;             // 目前是第幾張當「最左邊」
const perPage = 4;         // 一次顯示 4 張
const itemWidth = 240;     // 220px + margin(20px)

function update() {
  // 限制範圍（最後一頁不能超過總圖片數 - 4）
  index = Math.max(0, Math.min(index, items.length - perPage));

  // 移動畫面
  const x = index * itemWidth * -1;
  document.querySelector(".carousel").style.transform = `translateX(${x}px)`;

  // 顯示 X / Y（顯示最左邊的 index + 1）
  counter.textContent = `${index + 1} / ${items.length}`;
}

next.onclick = () => {
  index++;
  update();
};

prev.onclick = () => {
  index--;
  update();
};

update();
