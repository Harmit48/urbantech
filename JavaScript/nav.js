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




const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const search = document.querySelector('.search');
const closeBtn = document.querySelector('.close-btn');

searchBtn.addEventListener('click', function(){
    console.log(search.classList.contains('active'))
    if(search.classList.contains('active')){
        searchBox.value = ''
    }
    else {
        search.classList.add('active');
        searchBox.focus()
    }
})

closeBtn.addEventListener('click', function(){
    search.classList.remove('active');
    searchBox.value = '';

})
