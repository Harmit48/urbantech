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

// Toggle the dropdown menu visibility when clicking the "Shop" button
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

// cart slider

let cart = [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartContent = document.getElementById('cart-content');
const totalItems = document.getElementById('total-items');
const totalAmount = document.getElementById('total-amount');
const addToCartBtn = document.getElementById('add-to-cart-btn');

// Check if cart data exists in localStorage on page load
window.addEventListener('load', () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
});

// Add event listener to the "Add to Cart" button
addToCartBtn.addEventListener('click', () => {
    addToCart({
        name: 'realme narzo 60X 5G',
        price: 14999,
        quantity: 1,
        image: '../Img/ProductDetailsImg/Mobiles/realmeNarzo60X5G/11.jpg'
    });
});

// Open and close cart functions
function openCart() {
    cartSidebar.style.right = '0';
    cartSidebar.classList.add('open');
}

function closeCart() {
    cartSidebar.style.right = '-500px';
    cartSidebar.classList.remove('open');
}

// Add to cart function
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCart();
    openCart();
}

// Update cart and save to localStorage
function updateCart() {
    cartContent.innerHTML = '';
    let totalQuantity = 0;
    let totalCost = 0;

    cart.forEach(product => {
        totalQuantity += product.quantity;
        totalCost += product.price * product.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
                <p>${product.name}</p>
                <p>₹${product.price}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQuantity('${product.name}', -1)">-</button>
                <span>${product.quantity}</span>
                <button onclick="changeQuantity('${product.name}', 1)">+</button>
            </div>
        `;

        cartContent.appendChild(cartItem);
    });

    totalItems.innerText = totalQuantity;
    totalAmount.innerText = totalCost;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Change quantity function
function changeQuantity(productName, change) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);
        }
        updateCart();
    }
}

// Proceed to checkout function
function proceedToCheckout() {
    alert('Proceeding to checkout with total amount: ₹' + totalAmount.innerText);
}

// Handle cart button click to toggle cart sidebar
document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("cart-button");
    cartButton.addEventListener("click", () => {
        if (cartSidebar.classList.contains("open")) {
            closeCart();
        } else {
            openCart();
        }
    });

    // Close cart when clicking the close button
    document.querySelector('.close-cart').addEventListener('click', () => {
        closeCart();
    });
});



