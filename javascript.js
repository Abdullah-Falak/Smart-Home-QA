// Data Models: 25 Futuristic Smart Products
const products = [
    // Climate
    { id: 'SH01', name: 'Quantum Thermostat', cat: 'Climate', price: 199.99, stock: true, img: 'https://loremflickr.com/400/300/thermostat?lock=1' },
    { id: 'SH02', name: 'AeroPurifier Hub', cat: 'Climate', price: 249.00, stock: true, img: 'https://loremflickr.com/400/300/airpurifier?lock=2' },
    { id: 'SH03', name: 'Smart Vent Controller', cat: 'Climate', price: 85.00, stock: true, img: 'https://loremflickr.com/400/300/vent?lock=3' },
    { id: 'SH04', name: 'Climate Mesh Node', cat: 'Climate', price: 45.00, stock: false, img: 'https://loremflickr.com/400/300/sensor?lock=4' },
    { id: 'SH05', name: 'Hydration Station V2', cat: 'Climate', price: 120.00, stock: true, img: 'https://loremflickr.com/400/300/water,smart?lock=5' },
    
    // Security
    { id: 'SH06', name: 'Omni-Lens Cam 360', cat: 'Security', price: 149.99, stock: true, img: 'https://loremflickr.com/400/300/cctv?lock=6' },
    { id: 'SH07', name: 'Biometric Door Lock', cat: 'Security', price: 289.00, stock: true, img: 'https://loremflickr.com/400/300/doorlock?lock=7' },
    { id: 'SH08', name: 'Laser Tripwire Node', cat: 'Security', price: 75.00, stock: false, img: 'https://loremflickr.com/400/300/laser?lock=8' },
    { id: 'SH09', name: 'Glass Break Sensor', cat: 'Security', price: 35.00, stock: true, img: 'https://loremflickr.com/400/300/window?lock=9' },
    { id: 'SH10', name: 'AI Sentry Drone', cat: 'Security', price: 899.00, stock: true, img: 'https://loremflickr.com/400/300/drone?lock=10' },
    { id: 'SH11', name: 'Smart Vault Nano', cat: 'Security', price: 450.00, stock: true, img: 'https://loremflickr.com/400/300/safe?lock=11' },

    // Lighting
    { id: 'SH12', name: 'Neon LED Matrix', cat: 'Lighting', price: 110.00, stock: true, img: 'https://loremflickr.com/400/300/led?lock=12' },
    { id: 'SH13', name: 'Holo-Bulb Pack (x4)', cat: 'Lighting', price: 80.00, stock: true, img: 'https://loremflickr.com/400/300/lightbulb?lock=13' },
    { id: 'SH14', name: 'Lumen Pathway Strips', cat: 'Lighting', price: 55.00, stock: false, img: 'https://loremflickr.com/400/300/ledstrip?lock=14' },
    { id: 'SH15', name: 'Adaptive Desk Lamp', cat: 'Lighting', price: 95.00, stock: true, img: 'https://loremflickr.com/400/300/lamp?lock=15' },
    { id: 'SH16', name: 'Smart Switch Relay', cat: 'Lighting', price: 25.00, stock: true, img: 'https://loremflickr.com/400/300/switch?lock=16' },

    // Entertainment & Hubs
    { id: 'SH17', name: 'Neural Home Hub', cat: 'Entertainment', price: 299.00, stock: true, img: 'https://loremflickr.com/400/300/router?lock=17' },
    { id: 'SH18', name: 'Sonic-Cast Soundbar', cat: 'Entertainment', price: 350.00, stock: true, img: 'https://loremflickr.com/400/300/speaker?lock=18' },
    { id: 'SH19', name: 'Haptic Gaming Node', cat: 'Entertainment', price: 180.00, stock: true, img: 'https://loremflickr.com/400/300/gaming?lock=19' },
    { id: 'SH20', name: 'VR Environment Mapper', cat: 'Entertainment', price: 420.00, stock: false, img: 'https://loremflickr.com/400/300/vr?lock=20' },
    { id: 'SH21', name: 'Smart Mirror Display', cat: 'Entertainment', price: 650.00, stock: true, img: 'https://loremflickr.com/400/300/mirror?lock=21' },
    { id: 'SH22', name: 'Automated Blinds V2', cat: 'Climate', price: 145.00, stock: true, img: 'https://loremflickr.com/400/300/blinds?lock=22' },
    { id: 'SH23', name: 'Pet Feeder Pro', cat: 'Entertainment', price: 130.00, stock: true, img: 'https://loremflickr.com/400/300/pet?lock=23' },
    { id: 'SH24', name: 'Fiber Optic Router X', cat: 'Entertainment', price: 210.00, stock: true, img: 'https://loremflickr.com/400/300/wifi?lock=24' },
    { id: 'SH25', name: 'Quantum Energy Monitor', cat: 'Security', price: 175.00, stock: false, img: 'https://loremflickr.com/400/300/meter?lock=25' }
];

let cart = [];
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    renderProducts('All');
});

// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('open');
}

// Navigation logic (Single Page App)
function navigate(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.getElementById('navMenu').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Products with Filtering
function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(category);
}

function renderProducts(filter) {
    const grid = document.getElementById('productGrid');
    const filtered = filter === 'All' ? products : products.filter(p => p.cat === filter);
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3>${p.name}</h3>
                <div class="product-meta">
                    <span>${p.id}</span>
                    <span>${p.cat}</span>
                </div>
                <div class="product-price">$${p.price.toFixed(2)}</div>
                <div class="stock-status ${p.stock ? 'in-stock' : 'out-of-stock'}">
                    ${p.stock ? '● IN STOCK' : '● OUT OF STOCK'}
                </div>
            </div>
            <button class="cyber-btn" onclick="addToCart('${p.id}')" ${!p.stock ? 'disabled' : ''}>
                ${p.stock ? 'ADD TO CART' : 'UNAVAILABLE'}
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
    showToast(`SYS: ${product.name} appended to cargo.`);
}

function adjustQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartBtn').innerText = `CART (${totalCount})`;
    
    const cartContainer = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color:var(--text-muted); margin: 2rem 0;">Cargo bay is empty.</p>';
        document.getElementById('cartTotal').innerText = '0.00';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <div style="color:var(--primary-cyan); font-size: 0.9rem;">$${item.price.toFixed(2)} / unit</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="adjustQty('${item.id}', -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="adjustQty('${item.id}', 1)">+</button>
                <div style="width: 80px; text-align:right; font-weight:bold;">$${(item.price * item.qty).toFixed(2)}</div>
            </div>
        </div>
    `).join('');

    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (document.getElementById('maintenancePlan').checked) {
        total += 99.00;
    }
    document.getElementById('cartTotal').innerText = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        showToast("ERR: Cannot execute. Cargo bay is empty.");
        return;
    }
    if (!isLoggedIn) {
        showToast("ERR: Unauthenticated. Redirecting to Identity Verification.");
        navigate('login');
        return;
    }
    
    showToast("SUCCESS: Transaction executed. Network synced.");
    cart = [];
    document.getElementById('maintenancePlan').checked = false;
    updateCartUI();
    setTimeout(() => navigate('home'), 2000);
}

// Diagnostics Tool Logic
function runDiagnostics() {
    const input = document.getElementById('deviceId').value.trim().toUpperCase();
    const terminal = document.getElementById('diagTerminal');
    const progressContainer = document.getElementById('diagProgress');
    const progressBar = document.getElementById('progressBar');
    
    if (!input) {
        terminal.innerHTML = "> ERR: Device MAC/ID required for scan.";
        return;
    }

    const deviceExists = products.some(p => p.id === input);
    
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    terminal.innerHTML = `> Initiating deep scan on ${input}...<br>`;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        terminal.innerHTML += `> Analyzing logic gates... ${progress}%<br>`;
        terminal.scrollTop = terminal.scrollHeight;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (deviceExists) {
                    terminal.innerHTML += `<br>> <strong>RESULT:</strong> Integrity Verified. Hardware nominal.`;
                } else {
                    terminal.innerHTML += `<br>> <strong>RESULT:</strong> ERR_DEVICE_NOT_FOUND in main registry.`;
                }
                terminal.scrollTop = terminal.scrollHeight;
                setTimeout(() => progressContainer.style.display = 'none', 1500);
            }, 500);
        }
    }, 400);
}

// Forms & Authentication
function submitService(e, serviceType) {
    e.preventDefault();
    if (!isLoggedIn) {
        showToast(`ERR: Authentication required for ${serviceType}.`);
        navigate('login');
        return;
    }
    showToast(`SUCCESS: ${serviceType} transmitted to engineering team.`);
    e.target.reset();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('loginMessage');

    if (email === 'user@smarthome.com' && password === 'QApass123') {
        isLoggedIn = true;
        msg.style.color = '#00ff88';
        msg.innerText = '> Authorization granted.';
        document.getElementById('loginBtn').innerText = 'SESSION ACTIVE';
        document.getElementById('loginBtn').style.borderColor = '#00ff88';
        document.getElementById('loginBtn').style.color = '#00ff88';
        showToast('SYS: Uplink established.');
        setTimeout(() => navigate('home'), 1000);
    } else {
        msg.style.color = '#ff3333';
        msg.innerText = '> ERR: Credentials rejected.';
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}
