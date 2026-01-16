// Product Data
const products = [
    {
        id: 1,
        name: "Luxe Biker Jacket",
        brand: "VOGUE NOIR",
        category: "men",
        price: 299.99,
        stock: 5,
        image: "assets/men_leather_jacket_rugged_1768535554740.png",
        description: "Premium top-grain leather biker jacket with silver-tone hardware and asymmetrical zip fastening.",
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { user: "Alex M.", comment: "The quality is insane. Best purchase this year." },
            { user: "Sarah K.", comment: "Perfect fit and very warm." }
        ]
    },
    {
        id: 2,
        name: "Midnight Gala Dress",
        brand: "ELEGANCE",
        category: "women",
        price: 450.00,
        stock: 0, // Out of stock
        image: "assets/women_dress_elegant_1768535522659.png",
        description: "An elegant floor-length evening dress crafted from Italian silk, featuring a sophisticated silhouette.",
        sizes: ["XS", "S", "M"],
        reviews: [
            { user: "Jessica R.", comment: "Stunning! Wore it to a wedding and got so many compliments." }
        ]
    },
    {
        id: 3,
        name: "Cloud Cotton Hoodie",
        brand: "AURA",
        category: "men",
        price: 89.99,
        stock: 12,
        image: "assets/men_hoodie_premium_1768535501053.png",
        description: "Ultra-soft heavyweight cotton hoodie in a relaxed oversized fit, perfect for everyday luxury.",
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { user: "David L.", comment: "So soft on the inside. My new favorite." }
        ]
    },
    {
        id: 4,
        name: "Urban Explorer Puffer",
        brand: "KIDS-CO",
        category: "children",
        price: 120.00,
        stock: 8,
        image: "assets/kid_streetwear_outfit_1768535538066.png",
        description: "Durable and stylish multi-color puffer jacket designed for high-energy adventures.",
        sizes: ["4Y", "6Y", "8Y", "10Y"],
        reviews: [
            { user: "Parent X.", comment: "My son loves the colors! Very durable." }
        ]
    },
    {
        id: 5,
        name: "Classic Street Fit",
        brand: "AURA",
        category: "men",
        price: 155.00,
        stock: 3,
        image: "assets/hero_fashion_banner_1768535481382.png",
        description: "Minimalist streetwear set featuring tailored cargo pants and a structured blazer.",
        sizes: ["M", "L", "XL"],
        reviews: []
    },
    {
        id: 6,
        name: "Stealth Tech Parka",
        brand: "TITAN",
        category: "men",
        price: 210.00,
        stock: 0,
        image: "assets/men_leather_jacket_rugged_1768535554740.png", // Reuse for demonstration
        description: "Water-resistant tech parka with multiple hidden pockets and reflective accents.",
        sizes: ["S", "M", "L"],
        reviews: [{ user: "Chris P.", comment: "Great for rainy days." }]
    },
    {
        id: 7,
        name: "Silk Satin Blouse",
        brand: "VOGUE NOIR",
        category: "women",
        price: 135.00,
        stock: 15,
        image: "assets/women_dress_elegant_1768535522659.png",
        description: "Luxurious silk satin blouse with a delicate sheen and elegant draped neckline.",
        sizes: ["S", "M", "L"],
        reviews: []
    },
    {
        id: 8,
        name: "Eco-Active Runners",
        brand: "FORCE",
        category: "children",
        price: 75.00,
        stock: 20,
        image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800",
        description: "Breathable, lightweight sneakers with reinforced toes for active play.",
        sizes: ["28", "30", "32", "34"],
        reviews: [{ user: "Mike J.", comment: "Very durable for school." }]
    },
    {
        id: 9,
        name: "Emerald Grace Handbag",
        brand: "LUMIERE",
        category: "women",
        price: 850.00,
        stock: 2,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
        description: "Handcrafted Italian leather handbag with gold-plated hardware and velvet lining.",
        sizes: ["One Size"],
        reviews: []
    },
    {
        id: 10,
        name: "Denim Rebel Set",
        brand: "KIDS-CO",
        category: "children",
        price: 95.00,
        stock: 0,
        image: "https://images.unsplash.com/photo-1519457431-75514b723b9d?auto=format&fit=crop&q=80&w=800",
        description: "Classic denim jacket paired with distressed jeans for a timeless cool look.",
        sizes: ["4Y", "6Y", "8Y"],
        reviews: []
    }
];

// State
let cart = [];
let currentFilter = 'all';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const navLinks = document.querySelectorAll('.nav-link');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.querySelector('.cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const productModal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.getElementById('modal-body');

// Initialize
function init() {
    renderProducts(products);
    setupEventListeners();
}

// Render Products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    productsToRender.forEach(product => {
        const isOutOfStock = product.stock === 0;
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            ${isOutOfStock ? '<div class="stock-badge">OUT OF STOCK</div>' : ''}
            <div class="product-img-container" style="filter: ${isOutOfStock ? 'grayscale(1)' : 'none'}">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-brand">${product.brand}</div>
            <div class="product-category">${product.category.toUpperCase()}</div>
            <div class="product-info">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                </div>
                <button class="add-to-cart" onclick="openProductDetail(${product.id})" ${isOutOfStock ? 'disabled style="background: #444"' : ''}>
                    ${isOutOfStock ? 'Sold' : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>'}
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
        renderProducts(filtered);
    });

    // Filtering
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const filter = link.getAttribute('data-filter');
            currentFilter = filter;
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Cart Open/Close
    cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

    // Modal Close
    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    };
}

// Product Details Modal
window.openProductDetail = function (productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const reviewsHTML = product.reviews.length > 0
        ? product.reviews.map(r => `
            <div class="review-item">
                <div class="review-user">${r.user}</div>
                <div class="review-comment">${r.comment}</div>
            </div>
          `).join('')
        : '<p style="opacity: 0.6">No reviews yet. Be the first to review!</p>';

    modalBody.innerHTML = `
        <div class="modal-img">
            <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:1rem;">
        </div>
        <div class="modal-info">
            <div class="product-brand">${product.brand}</div>
            <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${product.name}</h2>
            <div style="margin-bottom: 1rem; color: #10b981; font-weight: bold;">
                ${product.stock > 0 ? `In Stock: ${product.stock} units` : '<span style="color: #ef4444">Out of Stock</span>'}
            </div>
            <p style="font-size: 1.5rem; color: var(--first-color); font-weight: bold; margin-bottom: 1.5rem;">$${product.price.toFixed(2)}</p>
            <p style="line-height: 1.6; margin-bottom: 2rem; color: var(--text-color);">${product.description}</p>
            
            <div class="size-section">
                <h4 style="margin-bottom: 1rem;">Select Size</h4>
                <div class="size-selector">
                    ${product.sizes.map(size => `<button class="size-btn" onclick="selectSize(this)">${size}</button>`).join('')}
                </div>
            </div>

            <div class="quantity-section" style="margin-top: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;">Quantity</h4>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <button onclick="changeQty(-1)" style="background: var(--container-color); color: white; width: 30px; height: 30px; border-radius: 5px;">-</button>
                    <span id="modal-qty">1</span>
                    <button onclick="changeQty(1)" style="background: var(--container-color); color: white; width: 30px; height: 30px; border-radius: 5px;">+</button>
                    <span style="font-size: 0.8rem; opacity: 0.6;">(Max: ${product.stock})</span>
                </div>
            </div>

            <button class="button" style="width: 100%; margin-top: 2rem;" 
                onclick="addToCart(${product.id})" 
                ${product.stock === 0 ? 'disabled style="opacity: 0.5"' : ''}>
                ${product.stock > 0 ? 'Add to Bag' : 'Out of Stock'}
            </button>

            <div class="reviews-section">
                <h4 style="margin-bottom: 1rem;">Customer Reviews</h4>
                <div class="reviews-list">
                    ${reviewsHTML}
                </div>
            </div>
        </div>
    `;
    productModal.style.display = 'flex';
};

window.selectSize = function (btn) {
    const buttons = btn.parentElement.querySelectorAll('.size-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
};

let currentQty = 1;

window.changeQty = function (n) {
    const product = products.find(p => p.id === parseInt(modalBody.dataset.productId));
    currentQty = Math.max(1, Math.min(product.stock, currentQty + n));
    document.getElementById('modal-qty').innerText = currentQty;
};

// Modified openProductDetail to reset currentQty
const originalOpenDetail = window.openProductDetail;
window.openProductDetail = function (productId) {
    currentQty = 1;
    originalOpenDetail(productId);
    modalBody.dataset.productId = productId;
};

// Cart Logic
window.addToCart = function (productId) {
    const product = products.find(p => p.id === productId);
    const selectedSizeBtn = document.querySelector('.size-btn.active');

    if (!selectedSizeBtn && product.sizes[0] !== "One Size") {
        alert('Please select a size first');
        return;
    }

    const size = selectedSizeBtn ? selectedSizeBtn.innerText : "One Size";

    for (let i = 0; i < currentQty; i++) {
        cart.push({ ...product, selectedSize: size, cartId: Date.now() + i });
    }
    updateCart();

    productModal.style.display = 'none';
    cartSidebar.classList.add('open');
};

function updateCart() {
    cartCount.innerText = cart.length;
    renderCart();

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.innerText = `$${total.toFixed(2)}`;
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4 style="color: white; font-size: 0.9rem;">${item.name}</h4>
                <p style="font-size: 0.7rem; opacity: 0.6;">${item.brand}</p>
                <p style="font-size: 0.8rem; opacity: 0.7;">Size: ${item.selectedSize}</p>
                <p style="color: var(--first-color); font-weight: bold;">$${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart(${item.cartId})" style="background:none; color: #ff4d4d; margin-left: auto;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

window.removeFromCart = function (cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCart();
};

// Checkout & QR Payment
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    showPaymentModal(total);
});

function showPaymentModal(amount) {
    cartSidebar.classList.remove('open');
    modalBody.innerHTML = `
        <div class="qr-container" style="grid-column: span 2;">
            <h2 style="margin-bottom: 1rem;">Final Checkout</h2>
            <p>Please scan the QR code to complete your payment of</p>
            <h1 style="color: var(--first-color); margin: 1rem 0;">$${amount.toFixed(2)}</h1>
            
            <div class="qr-code">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://luxe-fashion.com/pay/${Date.now()}" alt="Payment QR Code">
            </div>
            
            <p class="payment-status">Waiting for payment...</p>
            <button class="button" style="margin-top: 2rem;" onclick="confirmPayment()">I have Paid</button>
            <p style="margin-top: 1rem; font-size: 0.8rem; opacity: 0.6;">Secure payment powered by LUXE Pay</p>
        </div>
    `;
    productModal.style.display = 'flex';
}

window.confirmPayment = function () {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderId = Math.floor(Math.random() * 900000) + 100000;
    const date = new Date().toLocaleDateString();

    modalBody.innerHTML = `
        <div class="invoice-container" style="grid-column: span 2; padding: 2rem; background: #fff; color: #333; border-radius: 1rem;">
            <div style="display:flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 1rem; margin-bottom: 2rem;">
                <h1 style="color: #6366f1;">INVOICE</h1>
                <div style="text-align: right;">
                    <p>Order ID: #${orderId}</p>
                    <p>Date: ${date}</p>
                </div>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
                <thead>
                    <tr style="border-bottom: 1px solid #eee; text-align: left;">
                        <th style="padding: 10px;">Item</th>
                        <th style="padding: 10px;">Qty</th>
                        <th style="padding: 10px;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.values(cart.reduce((acc, item) => {
        if (!acc[item.id]) acc[item.id] = { ...item, count: 0 };
        acc[item.id].count++;
        return acc;
    }, {})).map(item => `
                        <tr style="border-bottom: 1px solid #f9f9f9;">
                            <td style="padding: 10px;">${item.name} (${item.brand})</td>
                            <td style="padding: 10px;">x${item.count}</td>
                            <td style="padding: 10px;">$${(item.price * item.count).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div style="text-align: right; font-size: 1.5rem; font-weight: bold; border-top: 2px solid #eee; padding-top: 1rem;">
                Total Paid: $${total.toFixed(2)}
            </div>
            
            <div style="margin-top: 3rem; text-align: center; color: #666; font-size: 0.9rem;">
                <p>Thank you for shopping with LUXE.</p>
                <p>Your order will be shipped within 2-3 business days.</p>
                <button class="button" style="margin-top: 2rem; width: auto;" onclick="productModal.style.display='none'">Close Invoice</button>
            </div>
        </div>
    `;

    cart = [];
    updateCart();
};

// Entrance Animations
function showCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

const originalRender = renderProducts;
renderProducts = function (productsToRender) {
    originalRender(productsToRender);
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
    });
    setTimeout(showCards, 100);
};

init();
