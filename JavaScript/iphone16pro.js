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
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/b1.jpeg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/b2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/b3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/b4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/b5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/b6.jpg'
        ],
        name: 'Apple iPhone 16 Pro (128 GB) - Black Titanium',
        price: '₹1,19,900'
    },
    naturaltitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/n1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/n2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/n3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/n4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/n5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/n4.jpg'
        ],
        name: 'Apple iPhone 16 Pro (128 GB) - Natural Titanium',
        price: '₹1,19,900'
    },
    whitetitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/w1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/w2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/w3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/w4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/w5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/w4.jpg'
        ],
        name: 'Apple iPhone 16 Pro (128 GB) - White Titanium',
        price: '₹1,19,900'
    },
    deserttitanium: {
        images: [
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/d1.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/d2.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/d3.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/d4.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/d5.jpg',
            '../Img/ProductDetailsImg/Mobiles/iphone16Pro/d6.jpg'
        ],
        name: 'Apple iPhone 16 Pro (128 GB) - Desert Titanium',
        price: '₹1,19,900'
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
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹1,31,890</del>';
    });
});