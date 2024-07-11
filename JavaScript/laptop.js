// view More Button
document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const productCart = document.querySelector('.all-product-cart-2');

    viewMoreBtn.addEventListener('click', () => {
        productCart.classList.toggle('expand');
        viewMoreBtn.textContent = productCart.classList.contains('expand') ? 'View Less' : 'View More';
    });
});
