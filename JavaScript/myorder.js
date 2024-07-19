document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart data from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        const cart = JSON.parse(storedCart);
        displayOrderSummary(cart);
    }

    // Handle form submission for placing orders
    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Generate a 7-digit tracking ID
        const trackId = Math.floor(1000000 + Math.random() * 9000000).toString();

        // Get order details
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        const orderDetails = {
            trackId,
            name,
            address,
            contact,
            paymentMethod,
            cart: JSON.parse(localStorage.getItem('cart')) || []
        };

        // Save order details to localStorage
        saveOrderDetails(orderDetails);

        // Clear the form and show the confirmation message
        document.getElementById('orderForm').reset();
        showOrderConfirmation(trackId);

        // Clear the cart from localStorage
        localStorage.removeItem('cart');

        // Refresh previous orders list
        displayPreviousOrders();
    });

    // Handle payment method change
    document.getElementById('paymentMethod').addEventListener('change', function() {
        const paymentMethod = this.value;
        const paymentDetails = document.getElementById('paymentDetails');
        paymentDetails.innerHTML = '';

        if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
            paymentDetails.innerHTML = `
                <div class="form-group">
                    <label for="cardNumber">Card Number:</label>
                    <input type="text" id="cardNumber" name="cardNumber" required>
                </div>
                <div class="form-group">
                    <label for="expiryDate">Expiry Date:</label>
                    <input type="text" id="expiryDate" name="expiryDate" required>
                </div>
                <div class="form-group">
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" required>
                </div>
            `;
        } else if (paymentMethod === 'upi') {
            paymentDetails.innerHTML = `
                <div class="form-group">
                    <label for="upiId">UPI ID:</label>
                    <input type="text" id="upiId" name="upiId" required>
                </div>
                <div class="form-group">
                    <label for="upiQrCode">Scan UPI QR Code:</label>
                    <img src="../Img/urbantechQRCode.jpg" alt="UPI QR Code" id="upiQrCode">
                </div>
            `;
        } else if (paymentMethod === 'netBanking') {
            paymentDetails.innerHTML = `
                <div class="form-group">
                    <label for="bankName">Bank Name:</label>
                    <input type="text" id="bankName" name="bankName" required>
                </div>
                <div class="form-group">
                    <label for="accountNumber">Account Number:</label>
                    <input type="text" id="accountNumber" name="accountNumber" required>
                </div>
                <div class="form-group">
                    <label for="ifscCode">IFSC Code:</label>
                    <input type="text" id="ifscCode" name="ifscCode" required>
                </div>
            `;
        }
    });

    // Handle order tracking
    document.getElementById('trackOrderForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const trackId = document.getElementById('trackId').value;
        displayOrderDetails(trackId);
    });

    // Toggle between new order form and track order form
    document.getElementById('newOrderButton').addEventListener('click', function() {
        document.getElementById('orderFormContainer').style.display = 'block';
        document.getElementById('previousOrders').style.display = 'none';
        this.style.display = 'none';
        document.getElementById('trackOrderButton').style.display = 'block';
    });

    document.getElementById('trackOrderButton').addEventListener('click', function() {
        document.getElementById('orderFormContainer').style.display = 'none';
        document.getElementById('previousOrders').style.display = 'block';
        this.style.display = 'none';
        document.getElementById('newOrderButton').style.display = 'block';
    });

    // Display previous orders on page load
    displayPreviousOrders();

    // Handle page navigation
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('cart', localStorage.getItem('cart'));
    });

    // Clear the cart if coming from the home page
    if (document.referrer.includes('homepage.html')) {
        localStorage.removeItem('cart');
    }
});

function displayOrderSummary(cart) {
    const orderItemsContainer = document.getElementById('orderItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let total = 0;

    orderItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const orderItem = createOrderItemElement(item);
        orderItemsContainer.appendChild(orderItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.innerText = total.toFixed(2);
}

function createOrderItemElement(item) {
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');
    orderItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="order-item-details">
            <p>${item.name}</p>
            <p>₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        </div>
    `;
    return orderItem;
}

function showOrderConfirmation(trackId) {
    document.getElementById('confirmationTrackId').innerText = trackId;
    document.getElementById('orderConfirmation').style.display = 'flex';
}

function hideOrderConfirmation() {
    document.getElementById('orderConfirmation').style.display = 'none';
}

function saveOrderDetails(orderDetails) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function displayOrderDetails(trackId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(order => order.trackId === trackId);

    if (order) {
        const trackOrderResult = document.getElementById('trackOrderResult');
        trackOrderResult.innerHTML = `
            <h3>Order Details</h3>
            <p>Name: ${order.name}</p>
            <p>Address: ${order.address}</p>
            <p>Contact: ${order.contact}</p>
            <p>Payment Method: ${order.paymentMethod}</p>
            <h4>Items:</h4>
        `;

        const itemsList = document.createElement('ul');
        order.cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                ${item.name} - ₹${item.price} (x${item.quantity})
            `;
            itemsList.appendChild(listItem);
        });
        trackOrderResult.appendChild(itemsList);
    } else {
        alert('Invalid Tracking ID');
    }
}

function displayPreviousOrders() {
    const previousOrdersContainer = document.getElementById('previousOrders');
    previousOrdersContainer.innerHTML = '<h2>Previous Orders</h2>';

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.forEach(order => {
        const orderBox = document.createElement('div');
        orderBox.classList.add('order-box');
        orderBox.innerHTML = `
            <div>
                <button class="remove-order" onclick="removeOrder('${order.trackId}')">Remove</button>
                <p>Tracking ID: ${order.trackId}</p>
                <p>Name: ${order.name}</p>
                <p>Total Amount: ₹${calculateTotal(order.cart)}</p>
            </div>
        `;

        const itemsList = document.createElement('ul');
        order.cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                ${item.name} - ₹${item.price} (x${item.quantity})
            `;
            itemsList.appendChild(listItem);
        });
        orderBox.appendChild(itemsList);

        previousOrdersContainer.appendChild(orderBox);
    });
}

function calculateTotal(cart) {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
}

function removeOrder(trackId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = orders.filter(order => order.trackId !== trackId);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    displayPreviousOrders();
}
