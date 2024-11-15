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
            '../Img/ProductDetailsImg/Mobiles/iphone16/b1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/b2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/b3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/b4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/b5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/b6.jpg'
        ],
        name: 'Apple iPhone 16 (128 GB) - Black',
        price: '₹79,900'
    },
    pink: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16/p1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/p2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/p3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/p4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/p5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/p6.jpg'
        ],
        name: 'Apple iPhone 16 (128 GB) - Pink',
        price: '₹79,900'
    },
    teal: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16/g1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/g2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/g3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/g4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/g5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/g6.jpg'
        ],
        name: 'Apple iPhone 16 (128 GB) - Teal',
        price: '₹79,900'
    },
    ultramarine: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16/1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/6.jpg'
        ],
        name: 'Apple iPhone 16 (128 GB) - Ultramarine',
        price: '₹79,900'
    },
    white: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16/w1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/w2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/w3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/w4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/w5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16/w6.jpg'
        ],
        name: 'Apple iPhone 16 (128 GB) - White',
        price: '₹79,900'
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