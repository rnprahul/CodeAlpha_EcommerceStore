# QuickKart — Full-Stack E-Commerce Platform

> **Tagline**: *Shop Quick. Shop Smart.*  
> CodeAlpha Full-Stack Internship — Task 1

QuickKart is a complete, production-grade e-commerce marketplace featuring an interactive React + Vite frontend and a modular Node.js + Express.js + MongoDB backend.

---

## 🚀 Technology Stack

### **Frontend**
- **Core**: React 18/19, JavaScript (ES6+), Vite
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design Tokens (Teal `#0d9488` Brand Palette, Responsive Grids, Micro-animations)
- **State Management**: React Context API (`CartContext`, `WishlistContext`, `AuthContext`, `ToastContext`) with `localStorage` persistence.

### **Backend**
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas prepared via Mongoose
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **Security**: Helmet, CORS, Error sanitization
- **Logging**: Morgan HTTP logger

---

## 📁 Project Architecture

```
CodeAlpha_EcommerceStore/
├── index.html
├── package.json
├── README.md
├── .gitignore
├── src/                          # React Frontend
│   ├── assets/
│   ├── components/               # Navbar, Footer, ProductCard, FilterSidebar, QuickViewModal, etc.
│   ├── context/                  # CartContext, WishlistContext, AuthContext, ToastContext
│   ├── data/                     # products.js (30 items), categories.js, mockOrders.js
│   ├── pages/                    # Home, Shop, ProductDetails, CategoryPage, Cart, Checkout, Login, Register, Account, Orders, Wishlist, NotFound
│   ├── services/                 # api.js, authService.js, productService.js, cartService.js, orderService.js
│   └── styles/                   # index.css Design System
│
└── server/                       # Node.js + Express Backend
    ├── config/                   # db.js (MongoDB Atlas connection module)
    ├── controllers/              # authController, productController, cartController, orderController, userController
    ├── middleware/               # authMiddleware, adminMiddleware, errorMiddleware, notFoundMiddleware
    ├── models/                   # User.js, Product.js, Cart.js, Order.js
    ├── routes/                   # authRoutes, productRoutes, cartRoutes, orderRoutes, userRoutes
    ├── seeders/                  # seedProducts.js (MongoDB database populator)
    ├── utils/                    # generateToken.js, apiResponse.js
    ├── .env.example              # Sample environment configuration
    ├── package.json
    └── server.js                 # Express Entry Point
```

---

## 🛠️ Installation & Setup

### **1. Clone & Install Dependencies**

#### Install Frontend Dependencies:
```bash
npm install
```

#### Install Backend Dependencies:
```bash
cd server
npm install
cd ..
```

---

### **2. Environment Configuration**

Create a `.env` file inside `server/`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=quickkart_jwt_secret_key_2026
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

---

### **3. Database Seeding (MongoDB Atlas)**

Populate your MongoDB Atlas database with the 30 QuickKart products:
```bash
cd server
npm run seed
```

---

### **4. Running the Project**

#### Run Express Backend (Port 5000):
```bash
cd server
npm run dev
```

#### Run React Frontend (Port 5173):
```bash
npm run dev
```

---

## 📡 API Reference (`/api/v1`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Public | System status health check |
| `POST` | `/api/v1/auth/register` | Public | Register new user account |
| `POST` | `/api/v1/auth/login` | Public | User login & receive JWT token |
| `GET` | `/api/v1/auth/me` | Private | Get authenticated user profile |
| `POST` | `/api/v1/auth/logout` | Public | Clear auth session |
| `GET` | `/api/v1/products` | Public | List products (Supports `category`, `search`, `minPrice`, `maxPrice`, `rating`, `sort`, `page`, `limit`) |
| `GET` | `/api/v1/products/:id` | Public | Get single product details |
| `POST` | `/api/v1/products` | Admin | Create new product |
| `PUT` | `/api/v1/products/:id` | Admin | Update product |
| `DELETE` | `/api/v1/products/:id` | Admin | Delete product |
| `GET` | `/api/v1/cart` | Private | Get user cart items & subtotal |
| `POST` | `/api/v1/cart` | Private | Add item to cart (Validates stock & DB price) |
| `PUT` | `/api/v1/cart/:itemId` | Private | Update item quantity |
| `DELETE` | `/api/v1/cart/:itemId` | Private | Remove item from cart |
| `DELETE` | `/api/v1/cart` | Private | Clear user cart |
| `POST` | `/api/v1/orders` | Private | Create order (Server-authoritative price & stock reduction) |
| `GET` | `/api/v1/orders` | Private | Get user order history |
| `GET` | `/api/v1/orders/:id` | Private | Get single order details |
| `POST` | `/api/v1/orders/:id/cancel` | Private | Cancel processing order & restore stock |
| `GET` | `/api/v1/users/me` | Private | Get profile details |
| `PUT` | `/api/v1/users/me` | Private | Update profile info & address |
| `GET` | `/api/v1/users/me/wishlist` | Private | Get user saved wishlist |
| `POST` | `/api/v1/users/me/wishlist/:id`| Private | Save product to wishlist |
| `DELETE`| `/api/v1/users/me/wishlist/:id`| Private | Remove product from wishlist |
