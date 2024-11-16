// Toggle the dropdown menu visibility when clicking the "Shop" button
document.getElementById("shop-button").addEventListener("click", function(event) {
    event.stopPropagation();
    var dropdown = document.getElementById("dropdown-content");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Hide the dropdown menu when clicking outside of it
document.addEventListener("click", function(event) {
    var dropdown = document.getElementById("dropdown-content");
    if (event.target !== dropdown && event.target.closest(".playground") === null) {
        dropdown.style.display = "none";
    }
});

// Toggle the dropdown menu visibility when clicking the "Profile" button
document.getElementById("profile-button").addEventListener("click", function(event) {
    event.stopPropagation();
    var dropdown = document.getElementById("dropdown-content-1");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Hide the dropdown menu when clicking outside of it
document.addEventListener("click", function(event) {
    var dropdown = document.getElementById("dropdown-content-1");
    if (event.target !== dropdown && event.target.closest(".playground-1") === null) {
        dropdown.style.display = "none";
    }
});

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
    blacktitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/b1.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/b2.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/b3.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/b4.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/b5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/b6.jpg'
        ],
        name: 'Apple iPhone 16 Pro Max (128 GB) - Black Titanium',
        price: '₹1,64,900'
    },
    naturaltitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/n1.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/n2.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/n3.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/n4.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/n5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/n6.jpg'
        ],
        name: 'Apple iPhone 16 Pro Max (128 GB) - Natural Titanium',
        price: '₹1,64,900'
    },
    whitetitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/w1.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/w2.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/w3.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/w4.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/w5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/w6.jpg'
        ],
        name: 'Apple iPhone 16 Pro Max (128 GB) - White Titanium',
        price: '₹1,64,900'
    },
    deserttitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/d1.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/d2.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/d3.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/d4.png',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/d5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16ProMax/d6.jpg'
        ],
        name: 'Apple iPhone 16 Pro Max (128 GB) - Desert Titanium',
        price: '₹1,64,900'
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
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹1,81,390</del>';
    });
});