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
            title: "Signature Aseeda Fondant",
            description: "Our signature saffron-infused dessert with a molten center, celebrating Emirati heritage",
            description_long: "An innovative twist on the traditional Emirati Aseeda. This warm, molten cake is infused with premium saffron and cardamom, featuring a gooey center that pairs perfectly with a scoop of vanilla bean ice cream. A true celebration of heritage meets modern pastry art.",
            price: "AED 45",
            badge: "Signature",
            image: "img/Point7 Menu - Aseeda.png",
            calories: "450 kcal",
            prep_time: "15 mins",
            dietary: "Vegetarian",
            tags: ["Saffron", "Cardamom", "Molten", "Emirati Fusion"]
        },
        {
            title: "Signature Sandwich",
            description: "Gourmet toasted brioche sandwich with layered avocado, savory local beef/bacon, and premium fried eggs",
            description_long: "Our flagship breakfast sandwich. We layer freshly sliced avocado, savory grilled local beef or crispy bacon, and perfectly fried premium eggs between two slices of golden-toasted artisanal brioche. A hearty, flavorful start to your day.",
            price: "AED 48",
            badge: "New",
            image: "img/Point7 Menu - Signature Sandwich.jpg",
            calories: "620 kcal",
            prep_time: "12 mins",
            dietary: "Contains Meat",
            tags: ["Brioche", "Avocado", "Hearty", "Signature"]
        },
        {
            title: "Hot Chocolate",
            description: "Rich and creamy hot chocolate topped with velvety whipped cream and chocolate shavings",
            description_long: "A winter exclusive masterpiece. Our signature blend of premium cocoa and steamed milk, topped with a thick layer of house-made whipped cream and artisanal chocolate shavings. The ultimate comfort drink for those cozy moments.",
            price: "AED 28",
            badge: "Winter Exclusive",
            image: "img/Point7 Menu - Hot Chocolate.jpg",
            calories: "320 kcal",
            prep_time: "5 mins",
            dietary: "Vegetarian",
            tags: ["Comfort", "Chocolate", "Creamy", "Signature"]
        },
        {
            title: "Kunafa Milkcake",
            description: "Signature sponge cake soaked in sweet milk and topped with crispy kunafa pastry",
            description_long: "A beautiful fusion of East and West. Our delicate sponge cake is drenched in a unique sweet milk blend, topped with a luscious cream layer and finished with a golden, crispy crown of traditional kunafa pastry. Served with a side of extra milk drizzle.",
            price: "AED 38",
            badge: "New",
            image: "img/Point7 Menu - Kunafa Milkcake.jpg",
            calories: "410 kcal",
            prep_time: "0 mins",
            dietary: "Vegetarian",
            tags: ["Fusion", "Kunafa", "Sweet", "Creamy"]
        }
    ],
    coffee: [
        { title: "Espresso", description: "Rich, bold espresso from our signature blend", price: "AED 15", image: "img/Point7 Menu - Espresso.jpg" },
        { title: "Cappuccino", description: "Classic cappuccino with velvety microfoam, paired perfectly with our artisanal pastries", price: "AED 22", image: "img/Point7 Menu - Cappuccino.jpg" },
        { title: "Flat White", description: "Smooth espresso with silky steamed milk in our signature cup", price: "AED 24", image: "img/Point7 Menu - Flat White.jpg" },
        { title: "V60 Pour Over", description: "Single-origin coffee brewed to perfection with professional pour-over technique", price: "AED 28", badge: "Specialty", image: "img/Point7 Menu - V60 Pour.jpg" },
        { title: "Cold Brew", description: "Smooth, refreshing cold brew steeped for 18 hours and served chilled", price: "AED 26", image: "img/Point7 Menu - Cold Brew.jpg" }
    ],
    beverages: [
        { title: "Mint Lemonade", description: "Fresh mint and lemon with a hint of rose water", price: "AED 18", image: "img/Point7 Menu - Mint Lemonade.jpg" },
        { title: "Strawberry Mojito", description: "Vibrant and refreshing mojito with fresh strawberries, mint, and a splash of lime", price: "AED 22", image: "img/Point7 Menu - Strawberry Mojito.jpg" },
        { title: "Mango Smoothie", description: "Creamy, refreshing mango smoothie topped with sweet cream and fresh mango chunks", price: "AED 24", image: "img/Point7 Menu - Mango Smoothie.jpg" },
        { title: "Date Smoothie", description: "Creamy smoothie with Medjool dates, banana, and almond milk, topped with rich cream and date pieces", price: "AED 24", image: "img/Point7 Menu - Date Smoothie.jpg" }
    ],
    desserts: [
        { title: "Creamy Coconut Cake", description: "Soft, milk-soaked sponge cake generously topped with sweet cream and fresh shredded coconut", price: "AED 38", badge: "Popular", image: "img/Point7 Menu - Creamy Coconut Cake 2.jpg" },
        { title: "Lotus Milkcake", description: "Soft sponge cake drenched in sweet milk and topped with rich Lotus Biscoff spread and biscuit crumbs", price: "AED 38", image: "img/Point7 Menu - Lotus Milkcake.jpg" },
        { title: "Irresistible Tiramisu", description: "A decadent pull-me-up style tiramisu featuring espresso-soaked layers, rich mascarpone cream, and premium cocoa powder", price: "AED 40", image: "img/Point7 Menu - Irresistible Tiramisu 2.jpg" },
        { title: "Salted Caramel French Toast", description: "Golden brioche french toast sticks drizzled with salted caramel, covered in lotus crumbs, and served on a sweet cream base", price: "AED 45", image: "img/Point7 Menu - P7 Salted Caramel French Toast 1.jpg" }
    ],
    breakfast: [
        { title: "Shakshuka", description: "Traditional poached eggs in spiced tomato sauce with fresh herbs", price: "AED 38", image: "img/DSC05030.jpg" },
        { title: "Signature Sandwich", description: "Gourmet toasted brioche sandwich with layered avocado, savory local beef/bacon, and premium fried eggs", price: "AED 48", badge: "New", image: "img/Point7 Menu - Signature Sandwich.jpg" },
        { title: "Sunset Toast", description: "Sourdough bread with in house sundried tomato pesto sauce spread, creamy feta topped with pistachio garnish", price: "AED 35", image: "img/AKS06006.jpg" },
        { title: "Creamy Avocado Toast", description: "Sourdough bread glazed with creamy cheese topped with our signature scrambled eggs", price: "AED 42", image: "img/AKS06017.jpg" }
    ]
};

const merchandiseData = [];

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
