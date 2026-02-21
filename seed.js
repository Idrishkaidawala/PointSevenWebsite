const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

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

const Product = mongoose.model('Product', productSchema);

const menuData = {
    signature: [
        {
            title: "Aseeda Fondant",
            description: "Our signature saffron-infused dessert with a molten center, celebrating Emirati heritage",
            description_long: "An innovative twist on the traditional Emirati Aseeda. This warm, molten cake is infused with premium saffron and cardamom, featuring a gooey center that pairs perfectly with a scoop of vanilla bean ice cream. A true celebration of heritage meets modern pastry art.",
            price: "AED 45",
            badge: "Signature",
            image: "img/Point7 Menu - Irresistible Tiramisu 1.jpg", // Using high-quality dessert photo
            calories: "450 kcal",
            prep_time: "15 mins",
            dietary: "Vegetarian",
            tags: ["Saffron", "Cardamom", "Molten", "Emirati Fusion"]
        },
        {
            title: "Arabic Coffee Tasting",
            description: "Traditional Emirati coffee served with dates and premium Arabic sweets",
            description_long: "Experience the essence of Emirati hospitality. Our Arabic coffee (Gahwa) is lightly roasted and brewed with cardamom and saffron. served in a traditional Dallah with a side of premium Medjool dates and a selection of hand-crafted Arabic sweets.",
            price: "AED 35",
            badge: "Traditional",
            image: "img/DSC05030.jpg",
            calories: "120 kcal",
            prep_time: "5 mins",
            dietary: "Vegan",
            tags: ["Traditional", "Dates", "Light Roast", "Sharing"]
        },
        {
            title: "Saffron Latte",
            description: "Artisanal espresso infused with premium saffron and steamed milk",
            description_long: "A luxurious take on the classic latte. We infuse our house-blend espresso with high-grade Iranian saffron threads and silky steamed milk, creating a golden-hued beverage with a floral aroma and sophisticated flavor profile.",
            price: "AED 28",
            badge: "Popular",
            image: "img/DSC05060.jpg",
            calories: "220 kcal",
            prep_time: "5 mins",
            dietary: "Gluten Free",
            tags: ["Saffron", "Espresso", "Creamy", "Floral"]
        },
        {
            title: "Rose Cardamom Cake",
            description: "Delicate cake with rose water and cardamom, topped with pistachios",
            description_long: "A fragrant and moist sponge cake delicately flavored with rose water and freshly ground cardamom. Topped with a glaze of rose petals and crushed pistachios, this cake is as beautiful as it is delicious.",
            price: "AED 38",
            badge: "Signature",
            image: "img/Point7 Menu - Creamy Coconut Cake 1.jpg",
            calories: "380 kcal",
            prep_time: "0 mins",
            dietary: "Vegetarian",
            tags: ["Rose", "Pistachio", "Floral", "Sweet"]
        }
    ],
    coffee: [
        { title: "Espresso", description: "Rich, bold espresso from our signature blend", price: "AED 15", image: "img/DSC05040.jpg" },
        { title: "Cappuccino", description: "Classic cappuccino with velvety microfoam", price: "AED 22", image: "img/DSC05056.jpg" },
        { title: "Flat White", description: "Smooth espresso with silky steamed milk", price: "AED 24", image: "img/DSC05094.jpg" },
        { title: "V60 Pour Over", description: "Single-origin coffee brewed to perfection", price: "AED 28", badge: "Specialty", image: "img/DSC05108.jpg" },
        { title: "Cold Brew", description: "Smooth, refreshing cold brew steeped for 18 hours", price: "AED 26", image: "img/DSC05128.jpg" },
        { title: "Turkish Coffee", description: "Traditional Turkish coffee with cardamom", price: "AED 18", image: "img/DSC05172.jpg" }
    ],
    beverages: [
        { title: "Mint Lemonade", description: "Fresh mint and lemon with a hint of rose water", price: "AED 18", image: "img/DSC05186.jpg" },
        { title: "Saffron Milk", description: "Warm milk infused with saffron and honey", price: "AED 22", image: "img/DSC05192.jpg" },
        { title: "Hibiscus Iced Tea", description: "Refreshing hibiscus tea served over ice", price: "AED 16", image: "img/DSC05201.jpg" },
        { title: "Date Smoothie", description: "Creamy smoothie with dates, banana, and almond milk", price: "AED 24", image: "img/DSC05214.jpg" }
    ],
    desserts: [
        { title: "Kunafa Cheesecake", description: "Fusion dessert combining traditional kunafa with creamy cheesecake", price: "AED 42", badge: "Popular", image: "img/Point7 Menu - Lotus Cheesecake 3.jpg" },
        { title: "Pistachio Baklava", description: "Layers of phyllo pastry with premium pistachios and honey", price: "AED 32", image: "img/Point7 Menu - Lotus Cheesecake 2.jpg" },
        { title: "Date Cake", description: "Moist cake made with Medjool dates and caramel sauce", price: "AED 35", image: "img/Point7 Menu - Irresistible Tiramisu 2.jpg" },
        { title: "Chocolate Halva Tart", description: "Rich chocolate tart with tahini halva swirl", price: "AED 38", image: "img/Point7 Menu - Mango Mania Cheesecake 1.jpg" }
    ],
    breakfast: [
        { title: "Shakshuka", description: "Poached eggs in spiced tomato sauce with fresh herbs", price: "AED 38", image: "img/DSC05030.jpg" },
        { title: "Labneh Bowl", description: "Creamy labneh with za'atar, olive oil, and fresh vegetables", price: "AED 32", image: "img/DSC04964.jpg" },
        { title: "Arabic Breakfast Platter", description: "Traditional breakfast with hummus, falafel, labneh, and fresh bread", price: "AED 48", badge: "Popular", image: "img/Point7 Menu - P7 Signature Pancake 1.jpg" },
        { title: "Avocado Toast", description: "Sourdough with smashed avocado, feta, and pomegranate", price: "AED 35", image: "img/Point7 Menu - Avocado Toast 2.jpg" }
    ]
};

const merchandiseData = [
    { title: "Point Seven Mug", description: "Premium ceramic mug with gold-embossed logo", price: "AED 65", image: "img/DSC05250.jpg", category: "merchandise" },
    { title: "Coffee Beans - House Blend", description: "Our signature blend, 250g", price: "AED 85", image: "img/DSC05276.jpg", category: "merchandise" },
    { title: "Branded Tote Bag", description: "Eco-friendly canvas tote with Point Seven branding", price: "AED 45", image: "img/DSC05278.jpg", category: "merchandise" },
    { title: "Travel Tumbler", description: "Insulated stainless steel tumbler, 500ml", price: "AED 95", image: "img/DSC05334.jpg", category: "merchandise" },
    { title: "T-Shirt", description: "Premium cotton t-shirt with Point Seven logo", price: "AED 120", image: "img/DSC05337.jpg", category: "merchandise" },
    { title: "Pour Over Set", description: "Complete pour over coffee set with branded dripper", price: "AED 185", image: "img/DSC08295.jpg", category: "merchandise" }
];

async function seedDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        const allProducts = [];

        // Add Menu Items
        for (const category in menuData) {
            menuData[category].forEach(item => {
                allProducts.push({ ...item, category });
            });
        }

        // Add Merchandise
        merchandiseData.forEach(item => {
            allProducts.push(item);
        });

        await Product.insertMany(allProducts);
        console.log('Successfully seeded database with products!');

        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
    }
}

seedDatabase();
