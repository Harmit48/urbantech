document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    showMessage('Thank You For Registration');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    showMessage('Thank You For login');
});

document.getElementById('ok-button').addEventListener('click', function() {
    document.getElementById('message-box').classList.add('hidden');
});

function showMessage(message) {
    document.getElementById('message-text').textContent = message;
    document.getElementById('message-box').classList.remove('hidden');
}