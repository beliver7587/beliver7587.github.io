// 把产品所在的盒子变成可点击的按钮
document.querySelectorAll('.product-box').forEach(box => {
    box.addEventListener('click'), () => {
        const link = box.querySelector('h3');
        if (link) {
            window.location.href = link.href;
        }
    };
    box.style.cursor = 'pointer';
    box.addEventListener('mouseover', () => {
        box.style.backgroundColor = '#040404ff';
    });
    box.addEventListener('mouseout', () => {
        box.style.backgroundColor = '';
    });
});
// 把名字为product - box的盒子变成可点击的按钮，点击后跳出弹窗
// document.querySelectorAll('.product-box').forEach(box => {
//     box.addEventListener('click', () => {
//         const productName = box.querySelector('h3').innerText;
//         alert(`你点击了${productName}`);
//     });
//     box.style.cursor = 'pointer';
//     box.addEventListener('mouseover', () => {
//         box.style.backgroundColor = '#f0f0f0';
//     });
//     box.addEventListener('mouseout', () => {
//         box.style.backgroundColor = '';
//     });
// });
