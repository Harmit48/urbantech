/// Toggle the dropdown menu visibility when clicking the "Shop" button
document.getElementById("shop-button").addEventListener("click", function(event) {
    event.stopPropagation();
    var shopDropdown = document.getElementById("dropdown-content");
    var profileDropdown = document.getElementById("dropdown-content-1");
    
    // Close profile dropdown if it's open
    if (profileDropdown.style.display === "block") {
        profileDropdown.style.display = "none";
    }
    
    // Toggle shop dropdown
    shopDropdown.style.display = shopDropdown.style.display === "block" ? "none" : "block";
});

// Toggle the dropdown menu visibility when clicking the "Profile" button
document.getElementById("profile-button").addEventListener("click", function(event) {
    event.stopPropagation();
    var profileDropdown = document.getElementById("dropdown-content-1");
    var shopDropdown = document.getElementById("dropdown-content");
    
    // Close shop dropdown if it's open
    if (shopDropdown.style.display === "block") {
        shopDropdown.style.display = "none";
    }
    
    // Toggle profile dropdown
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
});

// Hide the dropdown menus when clicking outside of them
document.addEventListener("click", function(event) {
    var shopDropdown = document.getElementById("dropdown-content");
    var profileDropdown = document.getElementById("dropdown-content-1");
    
    if (event.target.closest(".playground") === null && shopDropdown.style.display === "block") {
        shopDropdown.style.display = "none";
    }
    
    if (event.target.closest(".playground-1") === null && profileDropdown.style.display === "block") {
        profileDropdown.style.display = "none";
    }
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


// Proceed to checkout function
function proceedToCheckout() {
    // Save cart data to sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // Redirect to the order page
    window.location.href = 'myorder.html'; // Replace with the actual path to your order page
}


// view More Button
document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const productCart = document.querySelector('.all-product-cart-2');

    viewMoreBtn.addEventListener('click', () => {
        productCart.classList.toggle('expand');
        viewMoreBtn.textContent = productCart.classList.contains('expand') ? 'View Less' : 'View More';
    });
});
