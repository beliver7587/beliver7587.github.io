// 把产品所在的盒子变成可点击的按钮

// 把名字为product - box的盒子变成可点击的按钮，点击后跳出弹窗
const productBox = document.querySelectorAll(`.product-box`);
for (let i = 0; i < productBox.length; i++) {
    productBox[i].addEventListener(`click`, function () {
        alert(`你点击了第${i + 1}个产品`);
    });
}

// 轮播图
// 轮播图功能
let slideIndex = 1;
let slideTimer = null;

function showSlides(n) {
    const slides = document.querySelectorAll(".carousel .slide");
    if (slides.length === 0) return;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex - 1].classList.add("active");
}

function autoSlides() {
    const slides = document.querySelectorAll(".carousel .slide");
    if (slides.length === 0) return;
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    showSlides(slideIndex);
    slideTimer = setTimeout(autoSlides, 2000);
}

function prevSlide() {
    clearTimeout(slideTimer);
    slideIndex--;
    showSlides(slideIndex);
    slideTimer = setTimeout(autoSlides, 2000);
}

function nextSlide() {
    clearTimeout(slideTimer);
    slideIndex++;
    showSlides(slideIndex);
    slideTimer = setTimeout(autoSlides, 2000);
}

// 页面加载后自动轮播
window.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    slideTimer = setTimeout(autoSlides, 2000);
});