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

// Cart slider

let cart = [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartContent = document.getElementById('cart-content');
const totalItems = document.getElementById('total-items');
const totalAmount = document.getElementById('total-amount');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn'); // Add this line to select the close button

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
    const currentImageSrc = mainImage.src;
    const currentProductName = productNameElement.innerText;
    const currentPriceText = productPriceElement.innerText.match(/₹\d+,?\d+/)[0];
    const currentPrice = parseInt(currentPriceText.replace(/₹|,/g, ''));
    
    addToCart({
        name: currentProductName,
        price: currentPrice,
        quantity: 1,
        image: currentImageSrc
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

// Function to change quantity of a product in the cart
function changeQuantity(productName, amount) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += amount;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.name !== productName);
        }
        updateCart();
    }
}

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

// Proceed to checkout function
function proceedToCheckout() {
    alert('Proceeding to checkout with total amount: ₹' + totalAmount.innerText);
}


document.querySelectorAll('.accordion-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const icon = event.target.nextElementSibling.querySelector('.icon, .icon-5');
        icon.textContent = isChecked ? '-' : '+';
    });
});