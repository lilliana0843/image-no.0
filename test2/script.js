// 取得輪播相關元素
const carousel = document.querySelector('.carousel');
const pages = document.querySelectorAll('.carousel-page');

const arrowLeft = document.querySelector('.carousel-arrow.left');
const arrowRight = document.querySelector('.carousel-arrow.right');

// 當前頁面
let currentPage = 0;

// 計算總頁數（動態，不管你未來放幾張都會自動算）
const totalPages = pages.length;

// 更新輪播位置
function updateCarousel() {
  const offset = -currentPage * 100; // 每頁剛好 100% 寬
  carousel.style.transform = `translateX(${offset}%)`;
}

// 點擊左箭頭
arrowLeft.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateCarousel();
  }
});

// 點擊右箭頭
arrowRight.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateCarousel();
  }
});

// 當視窗大小改變時（例如從橫向→直向），強制重新定位避免跑版
window.addEventListener('resize', () => {
  updateCarousel();
});
