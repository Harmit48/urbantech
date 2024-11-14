// Sample product data
const productData = [
    
    { name: "iPhone 15",                        price: "71,999",    image: "../Img/HomeImage/Apple/iPhone15.png",                  url: "../html/iphone15.html",                                brand: "apple"     },
    { name: "iPhone 15 Pro",                    price: "1,39,900",  image: "../Img/HomeImage/Apple/iPhone15Pro.png",               url: "../html/iphone15pro.html",                             brand: "apple"     },
    { name: "iPhone 15 Pro Max",                price: "1,50,090",  image: "../Img/HomeImage/Apple/iPhone15ProMax.png",            url: "../html/iphone15promax.html",                          brand: "apple"     },
    { name: "iPad Air 5 Generation",            price: "74,900",    image: "../Img/HomeImage/Apple/iPadAir5Gen.png",               url: "../html/ipadair5generation.html",                      brand: "apple"     },
    { name: "AirPods Pro 2 Generation",         price: "23,590",    image: "../Img/HomeImage/Apple/airPodsPro2Gen.png",            url: "../html/airpodspro2generation.html",                   brand: "apple"     },
    { name: "Macbook Air 2022 M2 Chip",         price: "92,900",    image: "../Img/HomeImage/Apple/Macbook2022M2.png",             url: "../html/macbookair2022m2chip.html",                    brand: "apple"     },
    { name: "20W Charger for iPhone",           price: "699",       image: "../Img/HomeImage/Apple/appleCharger.png",              url: "../html/20wcharger.html",                              brand: "apple"     },
    { name: "Acer Nitro V Gaming Laptop",       price: "77,990",    image: "../Img/HomeImage/ProductAUT/AcerNitroVGaming.png",     url: "../html/acerNitroVGamingLaptop.html",                  brand: "acer"      },
    { name: "Ambrane Unbreakable 60W",          price: "199",       image: "../Img/HomeImage/ProductAUT/AmbraneUnbreakable.png",   url: "../html/AmbraneUnbreakable60W.html",                   brand: "ambrane"   },
    { name: "ASUS Vivobook 15",                 price: "38,990",    image: "../Img/HomeImage/ProductAUT/AsusVivoBook15.png",       url: "../html/ASUSVivobook15IntelCorei7-12650H12thGen.html", brand: "asus"      },
    { name: "boAt Airdopes 141 Bluetooth",      price: "999",       image: "../Img/HomeImage/ProductAUT/boatAirPodes141.png",      url: "../html/boAtAirdopes141Bluetooth.html",                brand: "boat"      },
    { name: "Boult Audio Z40 Pro",              price: "1,599",     image: "../Img/HomeImage/ProductAUT/boultAudioZ40Pro.png",                                                                 brand: "boult"     },
    { name: "Dell 15 Laptop",                   price: "46,990",    image: "../Img/HomeImage/ProductAUT/Dell15.png",                                                                           brand: "dell"      },
    { name: "Fire-Boltt Ninja Call Pro Plus",   price: "1,199",     image: "../Img/HomeImage/ProductAUT/FireBolttNinja.png",                                                                   brand: "fireboltt" },
    { name: "Honeywell Suono P2100",            price: "1,649",     image: "../Img/HomeImage/ProductAUT/HoneywellSuonoP2100.png",                                                              brand: "honeywell" },
    { name: "HONOR MagicBook X16 Pro",          price: "58,990",    image: "../Img/HomeImage/ProductAUT/HONORMagicBookX16.png",                                                                brand: "honor"     },
    { name: "HP Laptop 14s",                    price: "38,490",    image: "../Img/HomeImage/ProductAUT/HP14s.png",                                                                            brand: "hp"        },
    { name: "HP Laptop 15s",                    price: "37,689",    image: "../Img/HomeImage/ProductAUT/HP15s.png",                                                                            brand: "hp"        },
    { name: "iQOOZ7Pro 5G",                     price: "23,999",    image: "../Img/HomeImage/ProductAUT/IQOOZ7Pro.png",                                                                        brand: "iqoo"      },
    { name: "IQOOZ9 5G",                        price: "19,999",    image: "../Img/HomeImage/ProductAUT/IQOOZ9.png",                                                                           brand: "iqoo"      },
    { name: "JBL Tune Beam",                    price: "5,498",     image: "../Img/HomeImage/ProductAUT/jblTuneBeam.png",                                                                      brand: "jbl"       },
    { name: "Lenovo IdeaPad 1 AMD",             price: "37,600",    image: "../Img/HomeImage/ProductAUT/LenovoIdeaPad1.png",                                                                   brand: "lenovo"    },       
    { name: "MI Power Bank 3i 20000mAh",        price: "2,109",     image: "../Img/HomeImage/ProductAUT/MIPowerBank3i20000mAH.png",                                                            brand: "mi"        },
    { name: "OnePlus 12R",                      price: "39,999",    image: "../Img/HomeImage/ProductAUT/onePlus12R.png",                                                                       brand: "oneplus"   },
    { name: "OnePlus Nord CE 3 Lite 5G",        price: "17,999",    image: "../Img/HomeImage/ProductAUT/onePlusNordCE3Lite.png",                                                               brand: "oneplus"   },
    { name: "realme Buds T300",                 price: "2,149",     image: "../Img/HomeImage/ProductAUT/onePlusNordBuds2.png",                                                                 brand: "oneplus"   },
    { name: "Samsung 25W",                      price: "999",       image: "../Img/HomeImage/ProductAUT/Samsung25W.png",                                                                       brand: "samsung"   }
];
// Get the brand query from the URL
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search')?.toLowerCase();

// Elements to display the brand name, logo, products, and filter inputs
const brandNameText = document.getElementById('brand-name-text');
const brandLogo = document.getElementById('brand-logo');
const productsContainer = document.getElementById('products-container');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const filterButton = document.getElementById('filter-button');
const backButton = document.getElementById('back-button');

// Display products based on brand or price range
function displayProducts(products) {
    productsContainer.innerHTML = ''; // Clear previous content
    if (products.length > 0) {
        products.forEach(product => {
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
        productsContainer.innerHTML = "<p>No products found for this brand or within the selected price range.</p>";
    }
}

// Initial display of products by brand
let matchingProducts = productData.filter(product => product.brand === searchQuery);
displayProducts(matchingProducts);

// Set brand name and logo if matching products exist
if (matchingProducts.length > 0) {
    brandNameText.textContent = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    brandLogo.src = matchingProducts[0].logo; // Ensure each product has a logo property if needed
    brandLogo.style.display = 'block';
}

// Filter function based on price range
function filterByPrice() {
    const minPrice = parseInt(minPriceInput.value.replace(',', '')) || 0;
    const maxPrice = parseInt(maxPriceInput.value.replace(',', '')) || Infinity;
    const filteredProducts = matchingProducts.filter(product => {
        const productPrice = parseInt(product.price.replace(',', ''));
        return productPrice >= minPrice && productPrice <= maxPrice;
    });
    displayProducts(filteredProducts);
}

// Event listener for the filter button
filterButton.addEventListener('click', filterByPrice);

// Event listener for the back button
backButton.addEventListener('click', () => {
    window.history.back();
});

// Event listener for pressing "Enter" key in the price filter inputs
[minPriceInput, maxPriceInput].forEach(input => {
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            filterByPrice();
        }
    });
});