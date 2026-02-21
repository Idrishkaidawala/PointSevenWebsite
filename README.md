# Point Seven Coffee ☕

[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Where Culture Meets Coffee.** A premium digital experience for Point Seven Coffee, blending the rich heritage of Emirati hospitality with modern specialty coffee culture.

---

## ✨ Overview

Point Seven Coffee is more than just a café; it's a sanctuary for storytelling and community. This project serves as the official web platform, providing an immersive, high-end experience that allows users to explore artisanal menus, shop for exclusive merchandise, and locate our growing number of branches across the GCC.

## 🚀 Features

### Immersive Frontend
- **Dynamic Menu:** Explore our curated selection of coffees and signature dishes with real-time updates from the database.
- **Premium E-commerce:** A sleek, right-side sliding cart drawer for a seamless merchandise shopping experience.
- **Global Store Locator:** Interactive Leaflet maps integration to find our branches in Dubai, Abu Dhabi, Doha, Riyadh, and beyond.
- **Aesthetic Design:** GSAP-powered animations, glassmorphism UI elements, and a custom-built preloader.
- **Responsive Web Design:** Fully optimized for mobile, tablet, and desktop viewing.

### Powerful Backend
- **Express API:** Robust RESTful API handling product management, order processing, and contact requests.
- **MongoDB Integration:** Persistent storage for menus, merchandise, and customer inquiries.
- **Admin Dashboard:** A secured management interface for updating the café's offerings and monitoring business growth.
- **Email Notifications:** Automated email handling via Nodemailer for catering and event inquiries.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+), [Leaflet.js](https://leafletjs.org/), [AOS](https://michalsnik.github.io/aos/)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB via Mongoose
- **Tooling:** Dotenv, Axios, CORS, Nodemailer, Nodemon

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Idrishkaidawala/PointSevenWebsite.git
   cd PointSevenWebsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your configurations:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Seed the Database (Optional):**
   ```bash
   node seed.js
   ```

5. **Start the application:**
   - **Development mode:** `npm run dev`
   - **Production mode:** `npm start`

## 📁 Project Structure

```text
pointsevencoffee/
├── img/                # Assets and brand imagery
├── admin.html          # Management interface
├── index.html          # Main landing page
├── package.json        # Dependencies and scripts
├── script.js           # Frontend logic & API integration
├── seed.js             # Database initialization script
├── server.js           # Express server & API endpoints
├── styles.css        # Premium design system & typography
└── .env                # Sensitive configurations
```

---

## 🎨 Design Philosophy

Inspired by the concept of "Artisanal Grace," the design uses a curated palette of **Deep Espresso**, **Desert Sand**, and **Gold accents**. Every interaction is designed to feel as smooth as a freshly brewed cup of coffee, prioritizing whitespace and elegant typography to reflect the brand's premium status.

## 📄 License

This project is licensed under the ISC License.

---

Developed with ❤️ by the Point Seven Team.
