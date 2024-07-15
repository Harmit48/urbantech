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
    blue: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone14/11.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/12.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/13.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/14.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/15.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/16.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Blue',
        price: '₹62,800'
    },
    black: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone14/21.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/22.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/23.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/24.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/25.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/26.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Midnight',
        price: '₹62,800'
    },
    purple: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone14/31.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/32.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/33.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/34.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/35.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/36.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Purple',
        price: '₹62,800'
    },
    red: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone14/51.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/52.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/53.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/54.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/55.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/56.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Red',
        price: '62,800'
    },
    starlight: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone14/41.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/42.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/43.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/44.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/45.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone14/46.jpg'
        ],
        name: 'Apple iPhone 15 (128 GB) - Starlight',
        price: '₹62,800'
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
        productPriceElement.innerHTML = `<span class="discount">-21%</span> ${colorImages[selectedColor].price}`;
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹79,900</del>';
    });
});