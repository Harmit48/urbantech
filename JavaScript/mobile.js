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
    window.location.href = './html/myorder.html'; // Replace with the actual path to your order page
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


// Select elements
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const search = document.querySelector('.search');
const closeBtn = document.querySelector('.close-btn');
const suggestionsContainer = document.querySelector('.suggestions-container');

// Product Data with Specific URLs
const productData = [
    { name: "iPhone 15",                        price: "71,999",    image: "../Img/HomeImage/Apple/iPhone15.png",                  url: "../html/iphone15.html",                                brand: "apple"     },
    { name: "iPhone 15 Pro",                    price: "1,39,900",  image: "../Img/HomeImage/Apple/iPhone15Pro.png",               url: "../html/iphone15pro.html",                             brand: "apple"     },
    { name: "iPhone 15 Pro Max",                price: "1,50,090",  image: "../Img/HomeImage/Apple/iPhone15ProMax.png",            url: "../html/iphone15promax.html",                          brand: "apple"     },
    { name: "iPad Air 5 Generation",            price: "74,900",    image: "../Img/HomeImage/Apple/iPadAir5Gen.png",               url: "../html/ipadair5generation.html",                      brand: "apple"     },
    { name: "AirPods Pro 2 Generation",         price: "23,590",    image: "../Img/HomeImage/Apple/airPodsPro2Gen.png",            url: "../html/airpodspro2generation.html",                   brand: "apple"     },
    { name: "Macbook Air 2022 M2 Chip",         price: "92,900",    image: "../Img/HomeImage/Apple/Macbook2022M2.png",             url: "../html/macbookair2022m2chip.html",                    brand: "apple"     },
    { name: "20W Charger for iPhone",           price: "699",       image: "../Img/HomeImage/Apple/appleCharger.png",              url: "../html/20wcharger.html",                              brand: "apple"     },
    { name: "Acer Nitro V Gaming Laptop",       price: "77,990",    image: "../Img/HomeImage/ProductAUT/AcerNitroVGaming.png",     url: "../html/acerNitroVGamingLaptop.html",                  brand: "acer"      },
    { name: "Ambrane Unbreakable 60W",          price: "199",       image: "../Img/HomeImage/ProductAUT/AmbraneUnbreakable.png",   url: "../html/AmbraneUnbreakable60W.html",                   brand: "Ambrane"   },
    { name: "ASUS Vivobook 15",                 price: "38,990",    image: "../Img/HomeImage/ProductAUT/AsusVivoBook15.png",       url: "../html/ASUSVivobook15IntelCorei7-12650H12thGen.html", brand: "Asus"      },
    { name: "boAt Airdopes 141 Bluetooth",      price: "999",       image: "../Img/HomeImage/ProductAUT/boatAirPodes141.png",      url: "../html/boAtAirdopes141Bluetooth.html",                brand: "boAt"      },
    { name: "Boult Audio Z40 Pro",              price: "1,599",     image: "../Img/HomeImage/ProductAUT/boultAudioZ40Pro.png",                                                                 brand: "Boult"     },
    { name: "Dell 15 Laptop",                   price: "46,990",    image: "../Img/HomeImage/ProductAUT/Dell15.png",                                                                           brand: "Dell"      },
    { name: "Fire-Boltt Ninja Call Pro Plus",   price: "1,199",     image: "../Img/HomeImage/ProductAUT/FireBolttNinja.png",                                                                   brand: "FireBoltt" },
    { name: "Honeywell Suono P2100",            price: "1,649",     image: "../Img/HomeImage/ProductAUT/HoneywellSuonoP2100.png",                                                              brand: "Honeywell" },
    { name: "HONOR MagicBook X16 Pro",          price: "58,990",    image: "../Img/HomeImage/ProductAUT/HONORMagicBookX16.png",                                                                brand: "Honor"     },
    { name: "HP Laptop 14s",                    price: "38,490",    image: "../Img/HomeImage/ProductAUT/HP14s.png",                                                                            brand: "Hp"        },
    { name: "HP Laptop 15s",                    price: "37,689",    image: "../Img/HomeImage/ProductAUT/HP15s.png",                                                                            brand: "Hp"        },
    { name: "iQOOZ7Pro 5G",                     price: "23,999",    image: "../Img/HomeImage/ProductAUT/IQOOZ7Pro.png",                                                                        brand: "Iqoo"      },
    { name: "IQOOZ9 5G",                        price: "19,999",    image: "../Img/HomeImage/ProductAUT/IQOOZ9.png",                                                                           brand: "Iqoo"      },
    { name: "JBL Tune Beam",                    price: "5,498",     image: "../Img/HomeImage/ProductAUT/jblTuneBeam.png",                                                                      brand: "Jbl"       },
    { name: "Lenovo IdeaPad 1 AMD",             price: "37,600",    image: "../Img/HomeImage/ProductAUT/LenovoIdeaPad1.png",                                                                   brand: "Lenovo"    },       
    { name: "MI Power Bank 3i 20000mAh",        price: "2,109",     image: "../Img/HomeImage/ProductAUT/MIPowerBank3i20000mAH.png",                                                            brand: "Mi"        },
    { name: "OnePlus 12R",                      price: "39,999",    image: "../Img/HomeImage/ProductAUT/onePlus12R.png",                                                                       brand: "OnePlus"   },
    { name: "OnePlus Nord CE 3 Lite 5G",        price: "17,999",    image: "../Img/HomeImage/ProductAUT/onePlusNordCE3Lite.png",                                                               brand: "OnePlus"   },
    { name: "realme Buds T300",                 price: "2,149",     image: "../Img/HomeImage/ProductAUT/onePlusNordBuds2.png",                                                                 brand: "OnePlus"   },
    { name: "Samsung 25W",                      price: "999",       image: "../Img/HomeImage/ProductAUT/Samsung25W.png",                                                                       brand: "Samsung"   }
    // Add more products as needed
];

// Toggle search bar activation
searchBtn.addEventListener('click', function(){
    if (search.classList.contains('active')) {
        searchBox.value = ''; // Clear search input if closing search
    } else {
        search.classList.add('active');
        searchBox.focus();    // Focus on search input when opening
    }
});

// Close search bar and clear suggestions
closeBtn.addEventListener('click', function(){
    search.classList.remove('active');
    searchBox.value = '';
    suggestionsContainer.style.display = 'none';
});

// Detect Enter key and show suggestions
searchBox.addEventListener('keyup', function(event) {
    const query = searchBox.value.toLowerCase().trim();
    
    if (event.key === "Enter" && query) {
        // Redirect to search results page
        window.location.href = `../html/results.html?search=${query}`;
        searchBox.value = ''; // Clear search box after redirect
    } else {
        // Clear previous suggestions
        suggestionsContainer.innerHTML = '';
        
        // Filter products based on name or brand
        const matchingProducts = productData.filter(product => 
            product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query)
        );
        
        if (query && matchingProducts.length > 0) {
            suggestionsContainer.style.display = 'block';
            
            // Display matching products
            matchingProducts.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('suggestion-item');
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div><strong>${product.name}</strong><br>${product.price}</div>
                `;
                
                // Redirect to specific product page on click
                item.addEventListener('click', () => {
                    if (product.url) {
                        window.location.href = product.url;
                    }
                    searchBox.value = ''; // Clear search box after redirect
                });
                
                suggestionsContainer.appendChild(item);
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }
});

// Handle search button click to navigate based on input
searchBtn.addEventListener('click', function(){
    const query = searchBox.value.toLowerCase().trim();
    if (!search.classList.contains('active')){
        search.classList.add('active');
        searchBox.focus();
    } else if (query) {
        window.location.href = `../html/results.html?search=${query}`;
        searchBox.value = '';  // Clear search box after redirect
    }
});
