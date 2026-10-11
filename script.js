// Data Models
const products = [
    { id: 'SH01', name: 'Smart Thermostat V2', price: 199, stock: true },
    { id: 'SH02', name: 'Wi-Fi Security Camera', price: 149, stock: true },
    { id: 'SH03', name: 'Smart Door Lock', price: 250, stock: true },
    { id: 'SH04', name: 'Smart LED Bulb Pack', price: 45, stock: false },
    { id: 'SH05', name: 'Automated Blinds Hub', price: 120, stock: true }
];

let cart = [];
let isLoggedIn = false;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// Navigation logic for Single Page App structure
function navigate(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Render Shop Items
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>ID: ${p.id}</p>
            <p><strong>$${p.price}</strong></p>
            <p style="color: ${p.stock ? 'green' : 'red'};">${p.stock ? 'In Stock' : 'Out of Stock'}</p>
            <button onclick="addToCart('${p.id}')" ${!p.stock ? 'disabled style="background:#ccc;"' : ''}>
                ${p.stock ? 'Add to Cart' : 'Unavailable'}
            </button>
        </div>
    `).join('');
}

// Cart Functionality
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    updateCartUI();
    showToast(`${product.name} added to cart.`);
}

function updateCartUI() {
    document.getElementById('cartBtn').innerText = `Cart (${cart.reduce((sum, item) => sum + item.qty, 0)})`;
    const cartContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        document.getElementById('cartTotal').innerText = '0';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="item" style="margin-bottom: 10px; display: flex; justify-content: space-between;">
            <span>${item.name} (x${item.qty})</span>
            <span>$${item.price * item.qty}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cartTotal').innerText = total;
}

function checkout() {
    if (cart.length === 0) {
        showToast("Cannot checkout. Cart is empty.");
        return;
    }
    if (!isLoggedIn) {
        showToast("Please login to complete your purchase.");
        navigate('login');
        return;
    }
    
    showToast("Order placed successfully! Redirecting...");
    cart = [];
    updateCartUI();
    setTimeout(() => navigate('home'), 2000);
}

// Services Form Logic
function submitService(e, serviceType) {
    e.preventDefault();
    if (!isLoggedIn) {
        showToast(`Please login to submit a ${serviceType}.`);
        navigate('login');
        return;
    }
    showToast(`${serviceType} submitted successfully! Our team will contact you.`);
    e.target.reset();
}

// Authentication Logic
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('loginMessage');

    // Mock STQA Test credentials
    if (email === 'user@smarthome.com' && password === 'QApass123') {
        isLoggedIn = true;
        msg.style.color = 'green';
        msg.innerText = 'Login successful.';
        document.getElementById('loginBtn').innerText = 'My Account';
        showToast('Welcome back!');
        setTimeout(() => navigate('home'), 1000);
    } else {
        msg.style.color = 'red';
        msg.innerText = 'Invalid credentials. (Hint: user@smarthome.com / QApass123)';
    }
}

// UI Helpers
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
