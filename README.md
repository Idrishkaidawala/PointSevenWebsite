# Point Seven Coffee ☕

[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-white?style=for-the-badge&logo=vercel)](https://vercel.com/)

> **"Where Culture Meets Coffee."** A premium digital destination for Point Seven Coffee, blending the rich heritage of Emirati hospitality with modern specialty coffee culture and global culinary artistry.

---

## ✨ Overview

Point Seven Coffee is more than just a café; it's a sanctuary for storytelling and community connection. Rooted in the warmth of the UAE, we provide an immersive, high-end experience that allows guests to explore artisanal menus, shop for exclusive merchandise, and locate our flagship and upcoming branches across the Middle East.

## 🚀 Key Features

### 🍽️ Immersive Gastronomy
-   **Dynamic Menu Exploration:** Real-time categorized menu (Signatures, Coffee, Beverages, Desserts, Breakfast) pulled directly from the MongoDB Cloud.
-   **Signature Innovation:** Interactive spotlight on brand-defining dishes like the **Saffron-infused Aseeda Fondant**, **Kunafa Milkcake**, and our signature **Signature Sandwich**.
-   **Seasonal Exclusives:** Dynamic badges for "Winter Exclusives" (e.g., Premium Hot Chocolate) and "New" items.

### 🛍️ Premium E-commerce & Logistics
-   **Sliding Cart Experience:** A sleek, glassmorphic right-side drawer for seamless order management without leaving the page.
-   **Secure Checkout:** Fully integrated checkout flow including Contact Info, Delivery Address, and multiple Payment Methods (Credit Card, Apple Pay, Cash).
-   **Store Locator:** Interactive maps powered by **Leaflet.js** to navigate our locations in Sharjah and Fujairah, with "Coming Soon" notifications for regional hubs.

### 💼 Professional Services
-   **Catering & Pop-Ups:** Dedicated request portal for bringing the Point Seven experience to private locations with custom menu planning.
-   **Private Events:** immersive booking system for birthdays, corporate gatherings, and milestone celebrations.
-   **Careers Portal:** Real-time job listings across different regions to join our growing team.

### 🛠️ Admin Ecosystem
-   **Dedicated Dashboard:** A secure `/admin.html` interface for real-time monitoring of business performance.
-   **Order Tracking:** Detailed oversight of customer purchases, revenue stats, and delivery status.
-   **Inquiry Management:** Centralized hub for processing Catering, Event, and General Contact requests.

---

## 🛠️ Technology Stack

-   **Frontend:** Semantic HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+), [Leaflet.js](https://leafletjs.org/) for Maps.
-   **Backend:** Node.js & Express.js REST API.
-   **Database:** MongoDB via Mongoose (Atlas Cloud Hosting).
-   **Branding:** Premium Typography (Bricolage Grotesque, Inter), Font Awesome Icons.
-   **Infrastructure:** Dotenv for security, CORS, Nodemon for development, Nodemailer for automated notifications.

---

## 📦 Installation & Local Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Idrishkaidawala/PointSevenWebsite.git
    cd PointSevenWebsite
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_atlas_connection_string
    EMAIL_USER=your_smtp_email
    EMAIL_PASS=your_smtp_password
    ```

4.  **Initialize Database:**
    ```bash
    node seed.js
    ```

5.  **Launch Platform:**
    ```bash
    npm run dev
    ```
    *Access the main site at `http://localhost:5000` and the admin panel at `http://localhost:5000/admin.html`.*

---

## 🗺️ Regional Expansion Roadmap

We are rapidly expanding our footprint across the GCC to bring Point Seven culture to:
-   📍 **Riyadh, KSA** (Opening Soon)
-   📍 **Doha, Qatar**
-   📍 **Abu Dhabi, UAE**
-   📍 **Muscat, Oman**

---

## 🎨 Design Philosophy

Inspired by **"Artisanal Grace,"** our design system utilizes a curated palette of:
-   **Deep Espresso** (#1A1410) & **Rich Brown** (#4A3728)
-   **Sunset Gold** (#D4AF37)
-   **Desert Sand** (#FAF8F5)

We prioritize whitespace, elegant typography, and subtle micro-animations to reflect the premium status of the Point Seven brand.

---

## 📄 License

This project is licensed under the ISC License.

---

Developed with ❤️ by the Point Seven Team.
