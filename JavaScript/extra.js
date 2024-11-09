
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



// search bar
// Sample product data for searching

// Sample product data (Replace this with your actual data source)
const products = [
    { id: 1, name: "Apple 20W USB-C Power Adapter", price: 1699, image: "path-to-image" },
    { id: 2, name: "Apple iPhone 15 Pro Max", price: 149999, image: "path-to-image" },
    { id: 3, name: "Apple iPhone 15", price: 71999, image: "path-to-image" },
    { id: 4, name: "Apple iPhone 14", price: 59999, image: "path-to-image" }
];

// Display products in the product container
function displayProducts(productsToDisplay) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // Clear previous content
    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p class="price">₹${product.price.toLocaleString()}</p>
        `;
        container.appendChild(productDiv);
    });
}

// Filter products based on search input and price range
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const minValue = parseInt(document.getElementById('minValue').value) || 0;
    const maxValue = parseInt(document.getElementById('maxValue').value) || Infinity;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput);
        const matchesPrice = product.price >= minValue && product.price <= maxValue;
        return matchesSearch && matchesPrice;
    });

    displayProducts(filteredProducts);
}

// Show all results when the search icon is clicked
function showAllResults() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const minValue = parseInt(document.getElementById('minValue').value) || 0;
    const maxValue = parseInt(document.getElementById('maxValue').value) || Infinity;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput);
        const matchesPrice = product.price >= minValue && product.price <= maxValue;
        return matchesSearch && matchesPrice;
    });

    displayProducts(filteredProducts);
}


// Redirect to results.html with the search query as a parameter
function redirectToResults() {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput) {
        // Redirect to results.html with the search query in the URL
        window.location.href = `results.html?search=${encodeURIComponent(searchInput)}`;
    }
}

// Handle Enter key press in the search input
function handleEnter(event) {
    if (event.key === "Enter") {
        redirectToResults();
    }
}