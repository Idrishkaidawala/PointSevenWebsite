const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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


        res.status(201).json(savedInquiry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Serve static files
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, './')));

// Fallback to index.html for any other route (SPA-like or just to ensure root works)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Conditionally listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}

module.exports = app;
