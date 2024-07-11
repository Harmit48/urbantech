    function updateProfile() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const balance = document.getElementById('balance').value;
        const orders = document.getElementById('orders').value;
        const address = document.getElementById('address').value;
        const photoInput = document.getElementById('photoInput');
        const userPhoto = document.getElementById('userPhoto');
        
        if (photoInput.files && photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userPhoto.src = e.target.result;
            }
            reader.readAsDataURL(photoInput.files[0]);
        }

        alert(`Profile Updated:
    Name: ${name}
    Email: ${email}
    Mobile: ${mobile}
    Wallet Balance: ${balance}
    Orders: ${orders}
    Address: ${address}`);
    }
