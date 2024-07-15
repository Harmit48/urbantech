
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
    BlackTitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt6.jpg'
        ],
        name: 'Apple iPhone 15 Pro Max (256 GB) - Black Titanium',
        price: '₹1,50,090'
    },
    BlueTitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/b1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/b2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/b3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/b4.jpg'
        ],
        name: 'Apple iPhone 15 Pro Max (256 GB) - Blue Titanium',
        price: '₹1,51,900'
    },
    NaturalTitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/n1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/n2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/n3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/n4.jpg'
        ],
        name: 'Apple iPhone 15 Pro Max (256 GB) - NaturalTitanium',
        price: '₹1,54,900'
    },
    WhiteTitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/w1.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/w2.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/w3.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt4.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/bt5.jpg',
            '../Img/ProductDetailsImg/Mobiles/Iphone15Pro/w4.jpg'
        ],
        name: 'Apple iPhone 15 Pro Max (256 GB) - White Titanium',
        price: '₹1,54,900'
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
        productPriceElement.innerHTML = `<span class="discount">-6%</span> ${colorImages[selectedColor].price}`;
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹1,59,900</del>';
    });
});
