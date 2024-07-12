document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const newRequestBtn = document.getElementById('new-request-btn');
    const message = document.getElementById('message');
    const form = document.getElementById('service-form');
    const requestsPreview = document.getElementById('requests-preview');

    // Show the form when the button is clicked
    newRequestBtn.addEventListener('click', () => {
        formContainer.style.display = 'block';
        message.style.display = 'none'; // Hide success message when form is shown
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Gather form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Display success message
        formContainer.style.display = 'none';
        message.style.display = 'block';

        // Save request to local storage
        saveRequest(data);
        showRequests();
    });

    // Load and display service requests
    function showRequests() {
        const requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        if (requests.length === 0) {
            // Show form if there are no requests
            formContainer.style.display = 'block';
        } else {
            // Hide form if there are requests
            formContainer.style.display = 'none';
        }
        
        requestsPreview.innerHTML = requests.map((request, index) => `
            <div class="request-preview">
                <button class="remove-btn" data-index="${index}">Remove</button>
                <h3>${request.name}</h3>
                <p>Email: ${request.email}</p>
                <p>Phone: ${request.phone}</p>
                <p>Product: ${request.product}</p>
                <p>Complaint: ${request.complaint}</p>
            </div>
        `).join('');

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                removeRequest(index);
                showRequests(); // Refresh the list after removal
            });
        });
    }

    // Save service request to local storage
    function saveRequest(request) {
        const requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        requests.push(request);
        localStorage.setItem('serviceRequests', JSON.stringify(requests));
    }

    // Remove service request from local storage
    function removeRequest(index) {
        let requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        requests.splice(index, 1);
        localStorage.setItem('serviceRequests', JSON.stringify(requests));
        // Show form if there are no requests left
        if (requests.length === 0) {
            formContainer.style.display = 'block';
        }
    }

    // Add some sample data to local storage
    if (!localStorage.getItem('serviceRequests')) {
        const sampleRequests = [
            {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "123-456-7890",
                "product": "Widget",
                "complaint": "The widget is defective."
            },
            {
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "phone": "098-765-4321",
                "product": "Gadget",
                "complaint": "The gadget stopped working after one use."
            }
        ];
        localStorage.setItem('serviceRequests', JSON.stringify(sampleRequests));
    }

    // Show existing requests on page load
    showRequests();
});