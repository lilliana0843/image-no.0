const images = document.querySelectorAll('.carousel img');
let index = 0;

function update() {
  images.forEach((img, i) => img.classList.toggle('active', i === index));
}

document.getElementById('next').onclick = () => {
  index = (index + 1) % images.length;
  update();
};

document.getElementById('prev').onclick = () => {
  index = (index - 1 + images.length) % images.length;
  update();
};

images.forEach((img, i) => {
  img.addEventListener('click', () => {
    index = i;
    update();
  });
});
