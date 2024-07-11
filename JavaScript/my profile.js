function updateProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const balance = document.getElementById('balance').value;
    const orders = document.getElementById('orders').value;
    const address = document.getElementById('address').value;
    const photoInput = document.getElementById('photoInput');
    const userPhoto = document.getElementById('userPhoto');
    
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate mobile number
    if (!/^\d+$/.test(mobile)) {
        alert('Please enter a valid mobile number.');
        return;
    }

    // Handle photo change and face detection
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userPhoto.src = e.target.result;
            detectFace(e.target.result, name, mobile, balance);
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        saveProfile(name, email, mobile, balance, orders, address);
    }
}

function detectFace(photoDataUrl, name, mobile, balance) {
    const img = new Image();
    img.src = photoDataUrl;
    img.onload = () => {
        const faceDetected = faceDetectionAlgorithm(img);
        if (!faceDetected) {
            showMessage('No face detected. Please upload a clear face photo.', name, mobile, photoDataUrl, balance, true);
        } else {
            saveProfile(name, email, mobile, balance, orders, address, photoDataUrl);
        }
    };
}

function faceDetectionAlgorithm(img) {
    // Simulate face detection logic
    // For simplicity, we'll assume that if the image width and height are greater than 100px, a face is detected
    return img.width > 100 && img.height > 100;
}

function saveProfile(name, email, mobile, balance, orders, address, photoDataUrl) {
    showMessage('Profile Updated:', name, mobile, photoDataUrl, balance, false);
}

function showMessage(message, name, mobile, photoUrl, balance, error) {
    const messageBox = document.getElementById('messageBox');
    const messageContent = document.getElementById('messageContent');
    messageContent.innerHTML = `
        <img src="${photoUrl}" alt="Profile Photo">
        <p>${message}</p>
        <p>Name: ${name}</p>
        <p>Mobile: ${mobile}</p>
        <p>Balance: ${balance}</p>
    `;
    messageBox.style.background = error ? 'linear-gradient(45deg, red, black)' : 'linear-gradient(45deg, orange, black)';
    messageBox.style.display = 'block';
}

function redirectToHome() {
    window.location.href = 'index.html';
}
