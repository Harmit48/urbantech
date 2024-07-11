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
    const currentPriceText = productPriceElement.innerText.match(/₹[\d,]+/)[0];
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
                <p>₹${product.price.toLocaleString('en-IN')}</p>
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
    totalAmount.innerText = totalCost.toLocaleString('en-IN');

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