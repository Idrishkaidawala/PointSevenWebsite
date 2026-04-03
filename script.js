// Point Seven Coffee - JavaScript

// ===========================
// Data
// ===========================

// Backend API URL
const API_URL = 'http://localhost:5000/api';

let menuData = {
    signature: [],
    coffee: [],
    beverages: [],
    desserts: [],
    breakfast: []
};

let merchandiseData = [];

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products?t=${new Date().getTime()}`, { cache: "no-store" });
        const data = await response.json();

        // Structure the data back into categories
        menuData = {
            signature: data.filter(item => item.category === 'signature'),
            coffee: data.filter(item => item.category === 'coffee'),
            beverages: data.filter(item => item.category === 'beverages'),
            desserts: data.filter(item => item.category === 'desserts'),
            breakfast: data.filter(item => item.category === 'breakfast')
        };
        merchandiseData = data.filter(item => item.category === 'merchandise');

        // Re-render components with fresh data
        renderMenuItems(currentMenuCategory);
        renderMerchandise();
    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

const jobListings = [
    {
        title: "Barista",
        location: "Sharjah",
        type: "Full-time",
        description: "Passionate about coffee? Join our team and craft exceptional experiences for our guests."
    },
    {
        title: "Head Chef",
        location: "Fujairah",
        type: "Full-time",
        description: "Lead our culinary team in creating innovative dishes that celebrate regional flavors."
    },
    {
        title: "Store Manager",
        location: "Riyadh (Opening Soon)",
        type: "Full-time",
        description: "Experienced manager needed to lead our new Riyadh location opening."
    },
    {
        title: "Pastry Chef",
        location: "Sharjah",
        type: "Full-time",
        description: "Create stunning desserts and pastries that tell a story."
    },
    {
        title: "Marketing Coordinator",
        location: "Remote/Sharjah",
        type: "Full-time",
        description: "Drive our digital presence and brand storytelling across the region."
    }
];

// Helper to format image URL for CSS
function getBgImage(imagePath) {
    if (!imagePath) return null;
    // Use explicit backend url for images
    const baseUrl = 'http://localhost:5000';
    const encodedPath = imagePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
    return `url('${baseUrl}/${encodedPath}')`;
}

// Helper to toggle payment fields
function togglePaymentFields() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const cardForm = document.getElementById('cardDetailsForm');
    if (paymentMethod === 'card') {
        cardForm.style.display = 'block';
    } else {
        cardForm.style.display = 'none';
    }
}

// ===========================
// State Management
// ===========================
// State Management
let cart = JSON.parse(localStorage.getItem('p7_cart')) || [];
let currentMenuCategory = 'signature';

function saveCart() {
    localStorage.setItem('p7_cart', JSON.stringify(cart));
}

// ===========================
// Navigation
// ===========================

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('active');
        }
    });
});

// ===========================
// Menu Section
// ===========================

const menuTabs = document.querySelectorAll('.menu-tab');
const menuGrid = document.getElementById('menuGrid');

function renderMenuItems(category) {
    const items = menuData[category];

    const gradients = {
        'signature': 'linear-gradient(135deg, #4a3728, #B87333)',
        'coffee': 'linear-gradient(135deg, #2C2420, #4a3728)',
        'beverages': 'linear-gradient(135deg, #F4C430, #D4AF37)',
        'desserts': 'linear-gradient(135deg, #F5F1E8, #D4AF37)',
        'breakfast': 'linear-gradient(135deg, #B87333, #4a3728)'
    };

    menuGrid.innerHTML = items.map(item => {
        const imgUrl = getBgImage(item.image);

        const bgStyle = imgUrl
            ? `background: ${imgUrl} center/cover no-repeat !important;`
            : `background: ${gradients[category] || gradients['signature']} !important;`;

        return `
        <div class="menu-item" onclick="openProductModal('${category}', ${menuData[category].indexOf(item)})" style="cursor: pointer;">
            <div class="menu-item-image" style="${bgStyle}">
                ${item.badge ? `<div class="menu-item-badge">${item.badge}</div>` : ''}
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.title}</h3>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
            </div>
        </div>
    `}).join('');
}

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');
        currentMenuCategory = category;
        renderMenuItems(category);
    });
});

// Initial rendering with empty templates removed (fetchProducts will handle it)
// renderMenuItems('signature'); 


// ===========================
// Merchandise Section
// ===========================

const merchandiseGrid = document.getElementById('merchandiseGrid');

function renderMerchandise() {
    if (!merchandiseData || merchandiseData.length === 0) {
        merchandiseGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 6rem 2rem; background: linear-gradient(145deg, #ffffff, #FAF8F5); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); max-width: 600px; margin: 2rem auto; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, #B87333, #D4AF37, #B87333);"></div>
                <i class="fas fa-gift" style="font-size: 3rem; color: #D4AF37; margin-bottom: 1.5rem; opacity: 0.8;"></i>
                <h3 style="color: #2C2420; font-size: 2.5rem; margin-bottom: 1rem; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600;">Coming Soon</h3>
                <p style="color: #666; font-size: 1.1rem; line-height: 1.6; max-width: 400px; margin: 0 auto;">Our exclusive collection of artisanal merchandise is currently being crafted. We can't wait to share it with you!</p>
            </div>
        `;
        return;
    }

    merchandiseGrid.innerHTML = merchandiseData.map((item, index) => {
        const imgUrl = getBgImage(item.image);
        const bgStyle = imgUrl
            ? `background: ${imgUrl} center/cover no-repeat !important;`
            : `background: linear-gradient(135deg, #F5F1E8, #D4AF37) !important;`;

        return `
        <div class="merchandise-item">
            <div class="merchandise-image" style="${bgStyle}"></div>
            <div class="merchandise-content">
                <h3 class="merchandise-title">${item.title}</h3>
                <p class="merchandise-description">${item.description}</p>
                <div class="merchandise-footer">
                    <span class="merchandise-price">${item.price}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${index})">
                        <i class="fas fa-shopping-bag"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

// renderMerchandise();

// ===========================
// Product Modal Logic
// ===========================

let currentProduct = null;
let currentModalQuantity = 1;

function openProductModal(category, index) {
    const item = menuData[category][index];
    currentProduct = { ...item, category };
    currentModalQuantity = 1;

    // Populate Modal Content
    document.getElementById('productCategory').textContent = category;
    document.getElementById('productTitle').textContent = item.title;
    document.getElementById('productPrice').textContent = item.price;
    document.getElementById('productBadgeType').textContent = item.badge || 'New';
    document.getElementById('productBadgeType').style.display = item.badge ? 'block' : 'none';

    // Use long description if available, otherwise fallback
    document.getElementById('productDescription').textContent = item.description_long || item.description;

    // Populate Meta Info (with fallbacks for demo)
    document.getElementById('productCalories').textContent = item.calories || (Math.floor(Math.random() * 300 + 100) + ' kcal');
    document.getElementById('productPrepTime').textContent = item.prep_time || (Math.floor(Math.random() * 10 + 5) + ' mins');
    document.getElementById('productDietary').textContent = item.dietary || 'Standard';

    // Populate Tags
    const tagsContainer = document.getElementById('productTags');
    const tags = item.tags || ['Fresh', 'Handcrafted', 'Premium'];
    tagsContainer.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // Reset Quantity Display
    document.getElementById('modalQuantity').textContent = currentModalQuantity;

    // Set Image Background (matching existing style logic)
    const imgUrl = getBgImage(item.image);
    const bgStyle = imgUrl
        ? `${imgUrl} center/cover no-repeat`
        : (gradients[category] || gradients['signature']);

    document.getElementById('productImage').style.background = bgStyle;

    // Setup Add to Cart Button
    const btn = document.getElementById('modalAddToCartBtn');
    btn.onclick = () => {
        addToCartFromModal();
    };

    openModal('productModal');
}

function adjustModalQuantity(change) {
    currentModalQuantity += change;
    if (currentModalQuantity < 1) currentModalQuantity = 1;
    document.getElementById('modalQuantity').textContent = currentModalQuantity;
}

function addToCartFromModal() {
    if (!currentProduct) return;

    const existingItem = cart.find(cartItem => cartItem.title === currentProduct.title);

    if (existingItem) {
        existingItem.quantity += currentModalQuantity;
    } else {
        cart.push({ ...currentProduct, quantity: currentModalQuantity });
    }

    updateCart();
    closeModal('productModal');
    openCartDrawer();
    showNotification(`${currentModalQuantity}x ${currentProduct.title} added to order!`);
}


// ===========================
// Cart Drawer Functionality
// ===========================

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartCountHeader = document.getElementById('cartCountHeader');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

function openCartDrawer() {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartBackdrop) cartBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartBackdrop) cartBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addToCart(itemIndex) {
    const item = merchandiseData[itemIndex];
    // Add category for gradient logic if missing
    addItemToCart({ ...item, category: 'merchandise' });
}

function addItemToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.title === item.title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    openCartDrawer(); // Auto open drawer on add
    showNotification('Item added to bag');
}

function removeFromCart(itemIndex) {
    cart.splice(itemIndex, 1);
    updateCart();
}

function updateCartQuantity(itemIndex, change) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
        removeFromCart(itemIndex);
    } else {
        updateCart();
    }
}

function updateCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    if (cartCountHeader) cartCountHeader.textContent = totalCount;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart-state">
                <i class="fas fa-shopping-basket"></i>
                <p>Your bag is empty</p>
                <button class="btn btn-outline btn-sm" onclick="closeCartDrawer(); window.location.href='#menu'">Start Ordering</button>
            </div>
        `;
        cartTotal.textContent = 'AED 0.00';
        return;
    }

    // Gradient map for images
    const gradients = {
        'signature': 'linear-gradient(135deg, #4a3728, #B87333)',
        'coffee': 'linear-gradient(135deg, #2C2420, #4a3728)',
        'beverages': 'linear-gradient(135deg, #F4C430, #D4AF37)',
        'desserts': 'linear-gradient(135deg, #F5F1E8, #D4AF37)',
        'breakfast': 'linear-gradient(135deg, #B87333, #4a3728)',
        'merchandise': 'linear-gradient(135deg, #F5F1E8, #D4AF37)'
    };

    cartItems.innerHTML = cart.map((item, index) => {
        const category = item.category || 'merchandise';
        const gradient = gradients[category] || gradients['merchandise'];
        const imgUrl = getBgImage(item.image);
        const bgStyle = imgUrl
            ? `background: ${imgUrl} center/cover no-repeat;`
            : `background: ${gradient};`;

        return `
        <div class="cart-drawer-item">
            <div class="cart-item-image" style="background: ${bgStyle};"></div>
            <div class="cart-item-details">
                <div class="cart-item-title-row">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <span class="cart-item-price">${item.price}</span>
                </div>
                <div class="cart-item-controls">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                        <span class="cart-qty-display">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        </div>
    `}).join('');

    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('AED ', ''));
        return sum + (price * item.quantity);
    }, 0);

    cartTotal.textContent = `AED ${total.toFixed(2)}`;
    saveCart();
}

cartBtn.addEventListener('click', () => {
    openCartDrawer();
});

checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    openCheckoutModal();
});

// ===========================
// Checkout Logic
// ===========================

function openCheckoutModal() {
    try {
        closeCartDrawer(); // Close cart drawer first

        // Render Order Summary
        const checkoutItemsList = document.getElementById('checkoutItemsList');
        if (!checkoutItemsList) return;

        // Gradient map for images (reusing existing logic)
        const gradients = {
            'signature': 'linear-gradient(135deg, #4a3728, #B87333)',
            'coffee': 'linear-gradient(135deg, #2C2420, #4a3728)',
            'beverages': 'linear-gradient(135deg, #F4C430, #D4AF37)',
            'desserts': 'linear-gradient(135deg, #F5F1E8, #D4AF37)',
            'breakfast': 'linear-gradient(135deg, #B87333, #4a3728)',
            'merchandise': 'linear-gradient(135deg, #F5F1E8, #D4AF37)'
        };

        checkoutItemsList.innerHTML = cart.map(item => {
            const category = item.category || 'merchandise';
            const gradient = gradients[category] || gradients['merchandise'];
            const imgUrl = getBgImage(item.image);
            const bgStyle = imgUrl
                ? `background: ${imgUrl} center/cover no-repeat;`
                : `background: ${gradient};`;

            const priceNum = parseFloat((item.price || '0').replace('AED ', '').replace(',', '')) || 0;

            return `
            <div class="checkout-item">
                <div style="width: 60px; height: 60px; border-radius: 8px; background: ${bgStyle}; flex-shrink: 0;"></div>
                <div class="checkout-item-details" style="flex-grow: 1;">
                    <h4>${item.title} <span style="font-size: 0.8rem; color: #888;">x${item.quantity}</span></h4>
                    <p>${item.price}</p>
                </div>
                <div style="font-weight: 600; color: var(--primary-gold);">
                    AED ${(priceNum * item.quantity).toFixed(2)}
                </div>
            </div>
        `}).join('');

        // Calculate Totals
        const subtotal = cart.reduce((sum, item) => {
            const priceNum = parseFloat((item.price || '0').replace('AED ', '').replace(',', '')) || 0;
            return sum + (priceNum * item.quantity);
        }, 0);

        const delivery = 15.00;
        const tax = subtotal * 0.05;
        const total = subtotal + delivery + tax;

        document.getElementById('checkoutSubtotal').textContent = `AED ${subtotal.toFixed(2)}`;
        document.getElementById('checkoutDelivery').textContent = `AED ${delivery.toFixed(2)}`;
        document.getElementById('checkoutTax').textContent = `AED ${tax.toFixed(2)}`;
        document.getElementById('checkoutFinalTotal').textContent = `AED ${total.toFixed(2)}`;
        document.getElementById('checkoutPayBtnAmount').textContent = `(AED ${total.toFixed(2)})`;

        // Reset Form State
        document.getElementById('checkoutFormStep').style.display = 'grid';
        document.getElementById('checkoutSuccess').style.display = 'none';

        openModal('checkoutModal');
        togglePaymentFields(); // Initialize visibility
    } catch (err) {
        console.error('Failed to open checkout:', err);
        showNotification('Something went wrong. Please refresh.', 'error');
    }
}

const checkoutForm = document.getElementById('checkoutForm');
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Mock Processing
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Payment Gateway Simulation
    btn.innerHTML = '<i class="fas fa-shield-alt"></i> Connecting to Secure Gateway...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying Payment...';
    }, 1000);

    setTimeout(async () => {
        try {
            const checkoutData = {
                orderId: 'P7-' + Math.floor(Math.random() * 10000),
                items: cart,
                subtotal: parseFloat(document.getElementById('checkoutSubtotal').textContent.replace('AED ', '')),
                deliveryFee: 15,
                tax: parseFloat(document.getElementById('checkoutTax').textContent.replace('AED ', '')),
                total: parseFloat(document.getElementById('checkoutFinalTotal').textContent.replace('AED ', '')),
                customerInfo: {
                    name: document.getElementById('checkoutName').value,
                    email: document.getElementById('checkoutEmail').value,
                    phone: document.getElementById('checkoutPhone').value,
                    address: document.getElementById('checkoutAddress').value,
                    city: document.getElementById('checkoutCity').value,
                    unit: document.getElementById('checkoutUnit').value
                },
                paymentMethod: document.querySelector('input[name="payment"]:checked').value
            };

            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(checkoutData)
            });

            if (!response.ok) throw new Error('Order submission failed');

            const order = await response.json();

            // Success State
            document.getElementById('orderRef').textContent = order.orderId;
            document.getElementById('confirmedEmail').textContent = order.customerInfo.email;

            document.getElementById('checkoutFormStep').style.display = 'none';
            document.getElementById('checkoutSuccess').style.display = 'flex';

            // Clear Cart
            cart = [];
            updateCart();
        } catch (err) {
            console.error('Checkout error:', err);
            showNotification('Checkout failed. Please try again.', 'error');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }, 1500);
});

// ===========================
// Careers Section
// ===========================

const jobList = document.getElementById('jobList');

function renderJobs() {
    jobList.innerHTML = jobListings.map(job => `
        <div class="job-card">
            <div class="job-info">
                <h4>${job.title}</h4>
                <div class="job-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                </div>
                <p class="job-description">${job.description}</p>
            </div>
            <button class="btn btn-outline" onclick="applyForJob('${job.title}')">Apply Now</button>
        </div>
    `).join('');
}

renderJobs();

function applyForJob(jobTitle) {
    showNotification(`Application form for ${jobTitle} will open here`, 'info');
    // In a real implementation, this would open an application form
}

// ===========================
// Forms
// ===========================

// Event Booking Form
const eventForm = document.getElementById('eventForm');
eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        type: 'event',
        name: document.getElementById('eventName').value,
        email: document.getElementById('eventEmail').value,
        phone: document.getElementById('eventPhone').value,
        date: document.getElementById('eventDate').value,
        location: document.getElementById('eventLocation').value,
        guests: document.getElementById('eventGuests').value,
        eventType: document.getElementById('eventType').value,
        details: document.getElementById('eventDetails').value
    };

    try {
        const response = await fetch(`${API_URL}/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Submission failed');
        showNotification('Event booking request submitted successfully!');
        eventForm.reset();
    } catch (err) {
        showNotification('Submission failed. Please try again.', 'error');
    }
});

// Catering Form
const cateringForm = document.getElementById('cateringForm');
cateringForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        type: 'catering',
        name: document.getElementById('cateringName').value,
        email: document.getElementById('cateringEmail').value,
        phone: document.getElementById('cateringPhone').value,
        date: document.getElementById('cateringDate').value,
        guests: document.getElementById('cateringGuests').value,
        details: document.getElementById('cateringDetails').value
    };

    try {
        const response = await fetch(`${API_URL}/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Submission failed');
        showNotification('Catering request submitted successfully!');
        closeModal('cateringModal');
        cateringForm.reset();
    } catch (err) {
        showNotification('Submission failed. Please try again.', 'error');
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        type: 'contact',
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    try {
        const response = await fetch(`${API_URL}/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Submission failed');
        showNotification('Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
    } catch (err) {
        showNotification('Submission failed. Please try again.', 'error');
    }
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    console.log('Newsletter Signup:', email);
    showNotification('Thank you for subscribing!');
    newsletterForm.reset();
});

// Notify Form
const notifyForm = document.getElementById('notifyForm');
notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('notifyEmail').value;
    const city = document.getElementById('notifyCity').textContent;
    console.log('Notify Request:', { email, city });
    showNotification(`We'll notify you when we open in ${city}!`);
    closeModal('notifyModal');
    notifyForm.reset();
});

// ===========================
// Modal Functions
// ===========================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openNotifyModal(city) {
    document.getElementById('notifyCity').textContent = city;
    openModal('notifyModal');
}

function openCateringModal() {
    openModal('cateringModal');
}

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// ===========================
// Notifications
// ===========================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Image Placeholders
// ===========================

// Generate placeholder images with gradients
function generatePlaceholderImage(elementId, gradient) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.background = gradient;
    }
}

// About section image
generatePlaceholderImage('aboutImage', 'linear-gradient(135deg, #4a3728, #B87333)');

// ===========================
// Map & Locations Logic
// ===========================

const locationsData = [
    {
        id: 'sharjah',
        title: "Sharjah Flagship",
        address: "8FHC+VH7 - Muwaileh Commercial, Sharjah, UAE",
        coords: [25.3126, 55.4665], // Approx Muwaileh coordinates
        status: "open",
        phone: "+971 55 498 9211",
        hours: "7:00 AM - 11:00 PM"
    },
    {
        id: 'fujairah',
        title: "Fujairah Corniche",
        address: "Fujairah, UAE",
        coords: [25.1288, 56.3265],
        status: "open",
        phone: "+971 55 498 9211",
        hours: "7:00 AM - 12:00 AM"
    },
    {
        id: 'riyadh',
        title: "Riyadh Park",
        address: "Riyadh, Saudi Arabia",
        coords: [24.7136, 46.6753],
        status: "soon",
        desc: "Opening Summer 2026"
    },
    {
        id: 'doha',
        title: "Doha West Bay",
        address: "Doha, Qatar",
        coords: [25.2854, 51.5310],
        status: "soon",
        desc: "Opening Late 2026"
    },
    {
        id: 'abudhabi',
        title: "Abu Dhabi Yas Mall",
        address: "Abu Dhabi, UAE",
        coords: [24.4881, 54.6083],
        status: "soon",
        desc: "Opening 2027"
    },
    {
        id: 'muscat',
        title: "Muscat Opera",
        address: "Muscat, Oman",
        coords: [23.5880, 58.3829],
        status: "soon",
        desc: "Opening 2027"
    }
];

let map;
let markers = {};

function initMap() {
    const locationsList = document.getElementById('locationsList');
    if (!locationsList) return;

    // specialized marker icon
    const coffeeIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Initialize Map centered on UAE
    map = L.map('map').setView([25.0, 55.0], 6);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Render List and Markers
    locationsList.innerHTML = locationsData.map((loc, index) => `
        <div class="location-list-item ${index === 0 ? 'active' : ''}" onclick="focusLocation('${loc.id}')" id="loc-item-${loc.id}">
            <div class="location-item-header">
                ${loc.status === 'open'
            ? `<span class="location-status status-open">Now Open</span>`
            : `<span class="location-status status-soon">Coming Soon</span>`}
            </div>
            <h3 class="location-item-title">${loc.title}</h3>
            <p class="location-item-address"><i class="fas fa-map-marker-alt" style="margin-top:3px"></i> ${loc.address}</p>
            ${loc.status === 'open' ? `
                <div class="location-item-actions">
                    <button class="btn btn-outline btn-xs">Directions</button>
                    <button class="btn btn-outline btn-xs">Call</button>
                </div>
            ` : `
                <div class="location-item-actions">
                    <button class="btn btn-outline btn-xs" onclick="openNotifyModal('${loc.title}')">Notify Me</button>
                </div>
            `}
        </div>
    `).join('');

    // Add Markers
    locationsData.forEach(loc => {
        const marker = L.marker(loc.coords, { icon: coffeeIcon }).addTo(map);

        const popupContent = `
            <div class="map-popup-header">
                <h3>${loc.title}</h3>
            </div>
            <div class="map-popup-body">
                <p>${loc.address}</p>
                ${loc.hours ? `<p><strong>Hours:</strong> ${loc.hours}</p>` : `<p>${loc.desc}</p>`}
            </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => {
            setActiveLocationItem(loc.id);
        });

        markers[loc.id] = marker;
    });
}

function focusLocation(id) {
    const loc = locationsData.find(l => l.id === id);
    if (!loc) return;

    map.flyTo(loc.coords, 12, {
        duration: 1.5
    });

    markers[id].openPopup();
    setActiveLocationItem(id);
}

function setActiveLocationItem(id) {
    document.querySelectorAll('.location-list-item').forEach(item => item.classList.remove('active'));
    const activeItem = document.getElementById(`loc-item-${id}`);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloaderBar');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 90) progress = 90;
        if (preloaderBar) preloaderBar.style.width = `${progress}%`;
    }, 200);

    try {
        // Initial data fetch
        await fetchProducts();
        updateCart(); // Restore cart UI from localStorage
    } catch (err) {
        console.error('Core loading failed:', err);
    } finally {
        // Complete progress
        if (preloaderBar) preloaderBar.style.width = '100%';
        clearInterval(interval);

        // Hide preloader
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }
        }, 500);
    }

    // Small delay to ensure container size is calculated for map
    setTimeout(initMap, 500);
});

// About section image
generatePlaceholderImage('aboutImage', 'linear-gradient(135deg, #4a3728, #B87333)');

// Catering image
generatePlaceholderImage('cateringImage', 'linear-gradient(135deg, #4a3728, #B87333)');

// ===========================
// Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Safety fallback: Show everything if animations fail or take too long
setTimeout(() => {
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
}, 3000);

// ===========================
// Initialize
// ===========================

console.log('Point Seven Coffee website loaded successfully!');


