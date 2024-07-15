


// JavaScript for product page functionality

// Select necessary DOM elements
const mainImage = document.getElementById('mainImage');
const zoomWindow = document.getElementById('zoom-window');
const thumbnailImages = document.querySelectorAll('.thumbnail');
const colorOptions = document.querySelectorAll('.color-option');

// Add event listeners for the zoom functionality
mainImage.addEventListener('mouseover', () => {
    zoomWindow.style.display = 'block';
    zoomWindow.style.backgroundImage = `url(${mainImage.src})`;
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
    BlackTitanium: [
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/11.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/12.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/13.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/14.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/15.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/16.jpg'
    ],
    BlueTitanium: [
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/21.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/22.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/23.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/24.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/25.jpg',
        '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/26.jpg'
    ]
};

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedColor = option.getAttribute('data-color');
        const selectedImages = colorImages[selectedColor];
        mainImage.src = selectedImages[0];
        zoomWindow.style.backgroundImage = `url(${selectedImages[0]})`;
        thumbnailImages.forEach((thumbnail, index) => {
            thumbnail.src = selectedImages[index];
            thumbnail.setAttribute('data-full', selectedImages[index]);
        });
    });
});