
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
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/11.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/12.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/13.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/14.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/15.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/16.jpg'
        ],
        name: 'Apple iPad Air (5th generation) - Blue - 256GB',
        price: '₹74,900'
    },
    pink: {
        images: [
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/21.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/22.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/23.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/24.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/25.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/26.jpg'
        ],
        name: 'Apple iPad Air (5th generation) - Pink - 256GB',
        price: '₹72,900'
    },
    Starlight: {
        images: [
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/31.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/32.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/33.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/34.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/35.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/36.jpg'
        ],
        name: 'Apple iPad Air (5th generation) - Starlight - 256GB',
        price: '₹79,900'
    },
    spacegray: {
        images: [
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/41.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/42.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/43.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/44.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/45.jpg',
            '../Img/ProductDetailsImg/Tablets/iPadAir5thGen/46.jpg'
        ],
        name: 'Apple iPad Air (5th generation) - Space Gray - 256GB',
        price: '₹59,900'
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
        productPriceElement.innerHTML = `<span class="discount">-19%</span> ${colorImages[selectedColor].price}`;
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹89,900</del>';
    });
});
