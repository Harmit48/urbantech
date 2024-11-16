
// JavaScript for product page functionality

// Select necessary DOM elements
const mainImage = document.getElementById('mainImage');
const zoomWindow = document.getElementById('zoom-window');
const thumbnailImages = document.querySelectorAll('.thumbnail');
const colorOptions = document.querySelectorAll('.color-option');
const productNameElement = document.querySelector('.product-details h1');
const productPriceElement = document.querySelector('.price-section .price');
const originalPriceElement = document.querySelector('.price-section .original-price');

// Add event listeners for the zoom functionality
mainImage.addEventListener('mouseover', () => {
    zoomWindow.style.display = 'block';
    zoomWindow.style.backgroundImage = `url(${mainImage.src})`;
    zoomWindow.style.backgroundSize = '300%'; // Set zoom level to 2x
});

mainImage.addEventListener('mousemove', (event) => {
    const rect = mainImage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / mainImage.width) * 100;
    const yPercent = (y / mainImage.height) * 100;
    zoomWindow.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});

mainImage.addEventListener('mouseout', () => {
    zoomWindow.style.display = 'none';
});



// Handle thumbnail clicks
thumbnailImages.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = thumbnail.getAttribute('data-full');
        zoomWindow.style.backgroundImage = `url(${thumbnail.getAttribute('data-full')})`;
    });
});

// Handle color option clicks
const colorImages = {
    blue: {
        images: [
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/b1.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/b2.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/b3.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/b4.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/b5.jpeg',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/b6.jpeg'
        ],
        name: 'Apple iPad Mini (7th Generation) - Blue - 128GB',
        price: '₹48,899'
    },
    purple: {
        images: [
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/p1.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/p2.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/p3.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/p4.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/p5.jpeg',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/p6.jpeg'
        ],
        name: 'Apple iPad Mini (7th Generation) - Purple - 128GB',
        price: '₹48,899'
    },
    spacegray: {
        images: [
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/g1.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/g2.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/g3.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/g4.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/g5.jpeg',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/g6.jpeg'
        ],
        name: 'Apple iPad Mini (7th Generation) - Space Gray - 128GB',
        price: '₹48,899'
    },
    starlight: {
        images: [
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/s1.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/s2.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/s3.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/s4.png',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/s5.jpeg',
            '../Img/ProductDetailsImg/Tablets/ipadmini7gen/s6.jpeg'
        ],
        name: 'Apple iPad Mini (7th Generation) - Space Light - 128GB',
        price: '₹48,899'
    }
};

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedColor = option.getAttribute('data-color');
        const selectedImages = colorImages[selectedColor].images;
        mainImage.src = selectedImages[0];
        zoomWindow.style.backgroundImage = `url(${selectedImages[0]})`;
        thumbnailImages.forEach((thumbnail, index) => {
            thumbnail.src = selectedImages[index];
            thumbnail.setAttribute('data-full', selectedImages[index]);
        });
        // Update product name and price
        productNameElement.innerText = colorImages[selectedColor].name;
        productPriceElement.innerHTML = `<span class="discount">-2%</span> ${colorImages[selectedColor].price}`;
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹49,900</del>';
    });
});
