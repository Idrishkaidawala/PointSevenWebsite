const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- Email Configuration (Resend) ---
// Sign up free at resend.com → API Keys → Create key → add to .env
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'Point Seven Coffee <orders@pointsevencoffee.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_FROM;

// Helper function to send emails
const sendConfirmationEmail = async (type, data) => {
    let subject, htmlContent, recipientEmail;

    if (type === 'order') {
        recipientEmail = data.customerInfo.email;
        subject = `Order Confirmed: ${data.orderId} - Point Seven Coffee`;

        const itemsList = data.items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.title} x${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price}</td>
            </tr>
        `).join('');

        htmlContent = `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: auto; border: 1px solid #EDE5CA; border-radius: 15px; overflow: hidden;">
                <div style="background-color: #BE2925; padding: 20px; text-align: center;">
                    <h1 style="color: #EDE5CA; margin: 0;">Order Confirmed!</h1>
                </div>
                <div style="padding: 30px; background-color: #ffffff;">
                    <p>Hello ${data.customerInfo.name},</p>
                    <p>Thank you for choosing <strong>Point Seven Coffee</strong>. We've received your order and are preparing it with care.</p>
                    
                    <div style="background-color: #FAF8F5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #BE2925;">Order Summary: ${data.orderId}</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            ${itemsList}
                            <tr>
                                <td style="padding: 10px; font-weight: bold;">Total</td>
                                <td style="padding: 10px; font-weight: bold; text-align: right;">AED ${data.total.toFixed(2)}</td>
                            </tr>
                        </table>
                    </div>

                    <p><strong>Delivery Address:</strong><br>${data.customerInfo.address}, ${data.customerInfo.city}</p>
                    
                    <p style="color: #4A4A4A; font-size: 0.9em;">If you have any questions, please reply to this email or call us at +971 55 498 9211.</p>
                </div>
                <div style="background-color: #EDE5CA; padding: 15px; text-align: center; color: #1A1A1A; font-size: 0.8em;">
                    &copy; 2026 Point Seven Coffee. All rights reserved.
                </div>
            </div>
        `;
    } else {
        recipientEmail = data.email;
        const inquiryType = data.type.charAt(0).toUpperCase() + data.type.slice(1);
        subject = `We've received your ${inquiryType} request - Point Seven Coffee`;

        htmlContent = `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: auto; border: 1px solid #EDE5CA; border-radius: 15px; overflow: hidden;">
                <div style="background-color: #BE2925; padding: 20px; text-align: center;">
                    <h1 style="color: #EDE5CA; margin: 0;">Thank You!</h1>
                </div>
                <div style="padding: 30px; background-color: #ffffff;">
                    <p>Hello ${data.name},</p>
                    <p>We've received your <strong>${inquiryType}</strong> request regarding "${data.subject || 'General Inquiry'}".</p>
                    <p>A member of our team will review your details and get back to you within 24 hours.</p>
                    
                    <div style="border-left: 4px solid #BE2925; padding-left: 15px; margin: 20px 0; color: #4A4A4A;">
                        <p><em>"${data.message || data.details || 'Request submitted successfully.'}"</em></p>
                    </div>

                    <p>Stay tuned for a response!</p>
                </div>
                <div style="background-color: #EDE5CA; padding: 15px; text-align: center; color: #1A1A1A; font-size: 0.8em;">
                    &copy; 2026 Point Seven Coffee. All rights reserved.
                </div>
            </div>
        `;
    }

    if (!RESEND_API_KEY) {
        console.log('Email skipped — add RESEND_API_KEY to .env to enable emails');
        return;
    }

    try {
        // Send customer confirmation
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: EMAIL_FROM,
                to: [recipientEmail],
                subject: subject,
                html: htmlContent
            })
        });
        console.log(`Confirmation email sent to ${recipientEmail}`);

        // Notify admin
        if (ADMIN_EMAIL) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: EMAIL_FROM,
                    to: [ADMIN_EMAIL],
                    subject: `New ${type.toUpperCase()} alert: ${data.orderId || data.name}`,
                    html: `<p>New ${type} received from <strong>${recipientEmail}</strong>.</p>`
                })
            });
        }
    } catch (err) {
        console.error('Email sending error:', err);
    }
};

// --- Schemas ---

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    description_long: String,
    price: String,
    category: String,
    badge: String,
    image: String,
    calories: String,
    prep_time: String,
    dietary: String,
    tags: [String]
});

const orderSchema = new mongoose.Schema({
    orderId: String,
    items: Array,
    subtotal: Number,
    deliveryFee: Number,
    tax: Number,
    total: Number,
    customerStatus: String,
    customerInfo: {
        name: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        unit: String
    },
    paymentMethod: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const inquirySchema = new mongoose.Schema({
    type: String,
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    date: Date,
    location: String,
    guests: Number,
    eventType: String,
    details: String,
    city: String,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- API Routes ---

// --- Fallback Data (Comprehensive backup for all categories) ---
const FALLBACK_PRODUCTS = [
    // Signature
    { title: "Signature Aseeda Fondant", description: "Our signature saffron-infused dessert with a molten center.", price: "AED 45", category: "signature", badge: "Signature", image: "img/Point7 Menu - Aseeda.png" },
    { title: "Signature Sandwich", description: "Gourmet toasted brioche with avocado, beef/bacon, and eggs.", price: "AED 48", category: "signature", badge: "New", image: "img/Point7 Menu - Signature Sandwich.jpg" },
    { title: "Hot Chocolate", description: "Rich cocoa with velvety whipped cream and chocolate shavings.", price: "AED 28", category: "signature", badge: "Winter Exclusive", image: "img/Point7 Menu - Hot Chocolate.jpg" },
    { title: "Kunafa Milkcake", description: "Signature sponge cake soaked in sweet milk and topped with crispy kunafa.", price: "AED 38", category: "signature", badge: "New", image: "img/Point7 Menu - Kunafa Milkcake.jpg" },
    
    // Coffee
    { title: "Espresso", description: "Rich, bold espresso from our signature blend.", price: "AED 15", category: "coffee", image: "img/Point7 Menu - Espresso.jpg" },
    { title: "Cappuccino", description: "Classic cappuccino with velvety microfoam.", price: "AED 22", category: "coffee", image: "img/Point7 Menu - Cappuccino.jpg" },
    { title: "Flat White", description: "Smooth espresso with silky steamed milk.", price: "AED 24", category: "coffee", image: "img/Point7 Menu - Flat White.jpg" },
    { title: "V60 Pour Over", description: "Single-origin coffee brewed with professional technique.", price: "AED 28", category: "coffee", badge: "Specialty", image: "img/Point7 Menu - V60 Pour.jpg" },
    { title: "Cold Brew", description: "Smooth cold brew steeped for 18 hours.", price: "AED 26", category: "coffee", image: "img/Point7 Menu - Cold Brew.jpg" },
    
    // Beverages
    { title: "Mint Lemonade", description: "Fresh mint and lemon with a hint of rose water.", price: "AED 18", category: "beverages", image: "img/Point7 Menu - Mint Lemonade.jpg" },
    { title: "Strawberry Mojito", description: "Vibrant mojito with fresh strawberries and mint.", price: "AED 22", category: "beverages", image: "img/Point7 Menu - Strawberry Mojito.jpg" },
    { title: "Mango Smoothie", description: "Creamy mango smoothie topped with sweet cream.", price: "AED 24", category: "beverages", image: "img/Point7 Menu - Mango Smoothie.jpg" },
    { title: "Date Smoothie", description: "Creamy smoothie with Medjool dates and banana.", price: "AED 24", category: "beverages", image: "img/Point7 Menu - Date Smoothie.jpg" },
    
    // Desserts
    { title: "Creamy Coconut Cake", description: "Soft sponge cake topped with cream and shredded coconut.", price: "AED 38", category: "desserts", badge: "Popular", image: "img/Point7 Menu - Creamy Coconut Cake 2.jpg" },
    { title: "Lotus Milkcake", description: "Sponge cake with Lotus Biscoff spread and crumbs.", price: "AED 38", category: "desserts", image: "img/Point7 Menu - Lotus Milkcake.jpg" },
    { title: "Irresistible Tiramisu", description: "Decadent Tiramisu featuring espresso-soaked layers.", price: "AED 40", category: "desserts", image: "img/Point7 Menu - Irresistible Tiramisu 2.jpg" },
    { title: "Salted Caramel French Toast", description: "Golden brioche sticks drizzled with salted caramel.", price: "AED 45", category: "desserts", image: "img/Point7 Menu - P7 Salted Caramel French Toast 1.jpg" },
    
    // Breakfast
    { title: "Shakshuka", description: "Poached eggs in spiced tomato sauce with fresh herbs.", price: "AED 38", category: "breakfast", image: "img/DSC05030.jpg" },
    { title: "Signature Sandwich", description: "Gourmet brioche with layered avocado and eggs.", price: "AED 48", category: "breakfast", badge: "New", image: "img/Point7 Menu - Signature Sandwich.jpg" },
    { title: "Sunset Toast", description: "Sourdough with tomato pesto sauce and creamy feta.", price: "AED 35", category: "breakfast", image: "img/AKS06006.jpg" },
    { title: "Creamy Avocado Toast", description: "Sourdough glazed with creamy cheese and scrambled eggs.", price: "AED 42", category: "breakfast", image: "img/AKS06017.jpg" }
];

app.get('/api/products', (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.set('Pragma', 'no-cache');
    console.log('Serving full menu from fallback storage');
    res.json(FALLBACK_PRODUCTS);
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();

        // Trigger Email (async)
        sendConfirmationEmail('order', savedOrder);

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/inquiries', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        const savedInquiry = await newInquiry.save();

        // Trigger Email (async)
        sendConfirmationEmail('inquiry', savedInquiry);

        res.status(201).json(savedInquiry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Serve static files
app.use('/img', express.static('img'));
app.use(express.static('./'));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
