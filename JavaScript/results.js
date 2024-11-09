// Sample product data
const productData = [
    { name: "iPhone 15", price: "$799", image: "link_to_image", url: "./html/iphone15.html", brand: "apple", logo: "link_to_apple_logo" },
    { name: "iPhone 15 Pro", price: "$999", image: "link_to_image", url: "./html/iphone15pro.html", brand: "apple", logo: "link_to_apple_logo" },
    { name: "MacBook Air", price: "$1199", image: "link_to_image", url: "./html/macbookair2022m2chip.html", brand: "apple", logo: "link_to_apple_logo" },
    { name: "Samsung Galaxy S24", price: "$899", image: "link_to_image", url: "./html/galaxys24.html", brand: "samsung", logo: "link_to_samsung_logo" },
    { name: "Samsung Galaxy Tab", price: "$649", image: "link_to_image", url: "./html/galaxytab.html", brand: "samsung", logo: "link_to_samsung_logo" },
    { name: "Samsung Galaxy Watch 6", price: "$349", image: "link_to_image", url: "./html/galaxywatch6.html", brand: "samsung", logo: "link_to_samsung_logo" }
];

// Get the brand query from the URL
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search')?.toLowerCase();

// Elements to display the brand name, logo, and products
const brandNameText = document.getElementById('brand-name-text');
const brandLogo = document.getElementById('brand-logo');
const productsContainer = document.getElementById('products-container');

// Filter products based on search query
const matchingProducts = productData.filter(product => product.brand === searchQuery);

// If there are matching products, display them
if (matchingProducts.length > 0) {
    // Set brand name and logo
    brandNameText.textContent = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    brandLogo.src = matchingProducts[0].logo;
    brandLogo.style.display = 'block';

    // Display each matching product
    matchingProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.price}</p>
                <a href="${product.url}" class="view-product">View Product</a>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
} else {
    productsContainer.innerHTML = "<p>No products found for this brand.</p>";
}
