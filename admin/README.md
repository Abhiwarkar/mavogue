# 🛍️ Mavogue - Full Stack E-commerce Platform


A modern, full-stack fashion e-commerce platform built with React.js, Redux Toolkit, Node.js, and MongoDB. Features include secure authentication, dual payment gateways, real-time order tracking, and comprehensive admin dashboard.

## 🚀 Live Demo

- **Frontend**:https://mavogue-frontend.vercel.app/
- **Admin Panel**:https://mavogue-admin.vercel.app/
-  **Backend**: https://mavogue-backend.vercel.app/



## ✨ Features

### 🛒 Customer Features
- **User Authentication**: Secure JWT-based login/register system
- **Product Catalog**: Browse products with categories, filters, and search
- **Shopping Cart**: Add/remove items with size selection and quantity management
- **Wishlist**: Save favorite products with Redux state management
- **Multiple Payments**: Stripe, Razorpay, and Cash on Delivery options
- **Order Tracking**: Real-time order status updates
- **Responsive Design**: Mobile-first approach with 98% compatibility

### 👨‍💼 Admin Features
- **Dashboard**: Comprehensive overview of orders, products, and analytics
- **Product Management**: CRUD operations with image upload via Cloudinary
- **Order Management**: Update order status and track fulfillment
- **User Management**: View and manage customer accounts
- **Inventory Control**: Track stock levels and manage product variants

### 🔧 Technical Features
- **Redux Toolkit**: Advanced state management for cart, wishlist, and user data
- **Debounced Search**: Optimized search reducing API calls by 75%
- **Image Optimization**: Automated image processing via Cloudinary
- **Security**: bcrypt password hashing and JWT token authentication
- **Performance**: Lazy loading, code splitting, and optimized bundle size

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Component-based UI framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload middleware
- **Cloudinary** - Image management service

### Payment Gateways
- **Stripe** - Credit card processing
- **Razorpay** - Indian payment gateway
- **Cash on Delivery** - COD option

### Development Tools
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/Abhiwarkar/mavogue
cd mavogue
```

### Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install

# Install admin dependencies
cd admin
npm install
```



### Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run server

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Admin
cd admin
npm run dev
```

## 🔧 Installation

### Detailed Setup Instructions

#### 1. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=4000
ADMIN_EMAIL=abhi@123.com
ADMIN_PASSWORD=abhi123


Start backend server:
```bash
npm run dev
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Start frontend server:
```bash
npm run dev
```

#### 3. Admin Setup
```bash
cd admin
npm install
```

Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Start admin server:
```bash
npm run dev
```


### Authentication Endpoints
```http
POST /api/user/register        # User registration
POST /api/user/login           # User login
POST /api/user/admin           # Admin login
```

### Product Endpoints
```http
GET    /api/product/list       # Get all products
POST   /api/product/add        # Add new product (Admin)
POST   /api/product/remove     # Remove product (Admin)
POST   /api/product/single     # Get single product
```

### Order Endpoints
```http
POST /api/order/place          # Place order (COD)
POST /api/order/stripe         # Place order (Stripe)
POST /api/order/razorpay       # Place order (Razorpay)
POST /api/order/list           # Get all orders (Admin)
POST /api/order/userorders     # Get user orders
POST /api/order/status         # Update order status (Admin)
POST /api/order/verifyStripe   # Verify Stripe payment
POST /api/order/verifyRazorpay # Verify Razorpay payment
```

### Cart Endpoints
```http
POST /api/cart/get             # Get user cart
POST /api/cart/add             # Add to cart
POST /api/cart/update          # Update cart quantity
```



## 🔍 Testing

### Manual Testing Checklist
-  User registration and login
-  Product browsing and search
-  Add to cart functionality
-  Wishlist operations
-  Checkout process (all payment methods)
-  Order tracking
-  Admin product management
-  Admin order management



## 🎯 Performance Optimizations

- **Debounced Search**: Reduces API calls by 75%
- **Image Optimization**: Cloudinary automatic optimization
- **Code Splitting**: React lazy loading for routes
- **Bundle Optimization**: Vite tree-shaking and minification
- **Caching**: Redux state persistence with localStorage

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin setup
- **Environment Variables**: Sensitive data protection


  Made with ❤️ by Abhishek Hiwarkar
