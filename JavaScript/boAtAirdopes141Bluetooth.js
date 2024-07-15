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
    BoldBlack: {
        images: [
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/11.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/12.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/13.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/14.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/15.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/16.jpg'
        ],
        name: 'boAt Airdopes 141 Bluetooth TWS Earbuds(Bold Black)',
        price: '₹1,299'
    }, 
    Cidercyan: {
        images: [
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/21.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/22.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/23.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/24.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/25.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/26.jpg'
        ],
        name: 'boAt Airdopes 141 Bluetooth TWS Earbuds(Cider Cyan)',
        price: '₹1,348'
    },
    OliveGreen: {
        images: [
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/31.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/32.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/33.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/34.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/35.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/36.jpg'
        ],
        name: 'boAt Airdopes 141 Bluetooth TWS Earbuds(Olive Green)',
        price: '₹1,490'
    },
    PureWhite: {
        images: [
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/41.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/42.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/43.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/44.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/45.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/46.jpg'
        ],
      name: 'boAt Airdopes 141 Bluetooth TWS Earbuds(Pure White)',
        price: '₹1,538'
    },
    ThunderBlue: {
        images: [
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/51.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/52.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/53.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/54.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/55.jpg',
            '../Img/ProductDetailsImg/TWS/boatAirdopes141/56.jpg'
        ],
        name: 'boAt Airdopes 141 Bluetooth TWS Earbuds(Thunder Blue)',
        price: '₹1,299'
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
        productPriceElement.innerHTML = `<span class="discount">-71%</span> ${colorImages[selectedColor].price}`;
        originalPriceElement.innerHTML = 'M.R.P.: <del>₹4,490</del>';
    });
});