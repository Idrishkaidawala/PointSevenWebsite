const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('Connection successful!');
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
}

testConnection();
