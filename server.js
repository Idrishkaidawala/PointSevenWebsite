const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
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

// --- Email Configuration ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

    const mailOptions = {
        from: `"Point Seven Coffee" <${process.env.EMAIL_USER}>`,
        to: recipientEmail,
        subject: subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${recipientEmail}`);

        // Also notify admin
        const adminMailOptions = {
            from: `"Website System" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New ${type.toUpperCase()} alert: ${data.orderId || data.name}`,
            text: `New ${type} received from ${recipientEmail}. Check the database for details.`
        };
        await transporter.sendMail(adminMailOptions);

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

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
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
