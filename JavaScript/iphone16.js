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
    zoomWindow.style.backgroundSize = '500%'; // Set zoom level to 2x
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
    black: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15/1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/6.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Black',
        price: '₹71,999'
    },
    blue: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15/b1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/b2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/b3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/b4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/b5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/b6.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Blue',
        price: '₹71,999'
    },
    green: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15/g1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/g2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/g3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/g4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/g5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/g6.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Green',
        price: '₹71,999'
    },
    pink: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15/p1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/p2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/p3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/p4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/p5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/p6.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Pink',
        price: '₹71,999'
    },
    yellow: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15/y1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/y2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/y3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/y4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/y5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15/y6.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Yellow',
        price: '₹71,999'
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
        productPriceElement.innerHTML = `<span class="discount">-10%</span> ${colorImages[selectedColor].price}`;
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹79,900</del>';
    });
});