# Baby Land

Baby Land is a full-stack e-commerce web application for baby products.

The application allows users to browse baby products, view product details, register, login, add products to a protected cart, complete a PayPal Sandbox checkout, and view their previous orders.

This project was built from scratch using React, Node.js, Express, MongoDB Atlas, and PayPal Sandbox.

---

## Project Overview

Baby Land is designed as an online baby store where parents can find baby essentials such as:

- Baby toys
- Baby clothes
- Feeding products
- Diapers
- Strollers
- Baby blankets
- Newborn essentials

The project includes both frontend and backend functionality and uses a real database connection with MongoDB Atlas.

---

## Main Features

### Frontend Features

- Responsive React UI
- Multi-page navigation using React Router
- Home page
- Products page
- Product details page
- Register page
- Login page
- Protected cart page
- My Orders page
- About page
- Contact page
- Product cards with real images
- Cart item display
- PayPal Sandbox payment buttons
- Error messages for login/register/API issues
- Local storage for keeping the user logged in after refresh
- Local storage for keeping cart items after refresh

### Backend Features

- Node.js and Express server
- MongoDB Atlas connection
- Mongoose models
- User registration API
- User login API
- Password hashing with bcryptjs
- JWT token generation
- Product API
- Order API
- PayPal backend checkout integration
- PayPal order creation
- PayPal order capture
- Sample product seeding script

---

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- PayPal React SDK
- CSS
- LocalStorage

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- nodemon
- PayPal Checkout API

---

## Project Structure

```txt
baby-land/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── MyOrders.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── paypalRoutes.js
│   │
│   ├── index.js
│   ├── seedProducts.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
---

## Application Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page for Baby Land |
| `/products` | Products | Displays all products from MongoDB |
| `/products/:id` | Product Details | Displays details for a selected product |
| `/cart` | Cart | Protected cart page, only for logged-in users |
| `/orders` | My Orders | Displays previous orders for the logged-in user |
| `/login` | Login | User login page |
| `/register` | Register | User registration page |
| `/about` | About | Information about Baby Land |
| `/contact` | Contact | Contact form page |

---

## Authentication Flow

Users can register with:

- Username
- Email
- Password

When a user registers or logs in:

1. The backend checks the user data.
2. The password is hashed using bcryptjs.
3. A JWT token is generated during login.
4. User data is saved in localStorage.
5. The user stays logged in after page refresh.
6. Protected pages like Cart and My Orders become available.

---

## Cart Flow

The cart is available only for logged-in users.

Cart functionality includes:

- Add product to cart
- Increase quantity if the same product is added again
- Remove product from cart
- Save cart items in localStorage
- Keep cart after refresh
- Clear cart after successful PayPal payment

---

## Checkout Flow

This project uses PayPal Sandbox checkout.

The checkout flow works like this:

1. User logs in.
2. User adds products to cart.
3. User opens the cart page.
4. User clicks PayPal checkout button.
5. Frontend sends the total amount to the backend.
6. Backend creates a PayPal order.
7. User approves the payment through PayPal Sandbox.
8. Backend captures the PayPal order.
9. The order is saved in MongoDB.
10. The cart is cleared.
11. The order appears in the My Orders page.

---

## Database Models

### User Model

```js
{
  username: String,
  email: String,
  password: String,
  timestamps: true
}
```

### Product Model

```js
{
  name: String,
  category: String,
  price: Number,
  image: String,
  description: String,
  countInStock: Number,
  timestamps: true
}
```

### Order Model

```js
{
  userId: String,
  username: String,
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: String,
  timestamps: true
}
```

---

## Backend API Routes

### Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Product Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Add a product |

### Order Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Save a new order |
| GET | `/api/orders/:userId` | Get orders for a user |

### PayPal Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/paypal/create-order` | Create PayPal Sandbox order |
| POST | `/api/paypal/capture-order/:orderId` | Capture PayPal Sandbox order |

---

## Environment Variables

This project uses environment variables for sensitive data.

### Frontend `.env`

Create a `.env` file in the root folder:

```env
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Backend `server/.env`

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
```

Important:

```txt
.env
server/.env
```

These files must not be pushed to GitHub.

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/moneebyusuf/baby-land.git
cd baby-land
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Create environment files

Create the frontend `.env` file in the root folder.

Create the backend `.env` file inside the `server` folder.

### 5. Start backend server

Inside the `server` folder:

```bash
npm run dev
```

Backend URL:

```txt
http://localhost:5000
```

### 6. Start frontend server

Open a new terminal in the root project folder:

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

## Seed Sample Products

To insert sample products into MongoDB, run this command inside the `server` folder:

```bash
node seedProducts.js
```

This will add sample baby products to the database.

---

## PayPal Sandbox Testing

This project uses PayPal Sandbox, not real payments.

To test PayPal checkout:

1. Create a PayPal Developer account.
2. Create a Sandbox app.
3. Copy the Sandbox Client ID.
4. Copy the Sandbox Secret.
5. Add them to the environment files.
6. Create or use a Sandbox Personal buyer account.
7. Use the Sandbox Personal account to complete the test checkout.

Do not use real PayPal payments while testing.

---

## Security Notes

- Passwords are hashed before saving.
- JWT is used for login response.
- MongoDB credentials are stored in environment variables.
- PayPal Secret is stored only in backend environment variables.
- `.env` files are ignored by Git.
- PayPal Client ID can be used on the frontend.
- PayPal Secret must never be exposed on the frontend.

---

## Current Status

Completed:

- Frontend pages
- Backend API
- MongoDB connection
- Register
- Login
- Products from database
- Product details
- Protected cart
- PayPal Sandbox checkout
- Orders saved in MongoDB
- My Orders page

---

## Future Improvements

Possible future features:

- Admin dashboard
- Add/edit/delete products from admin panel
- Product search
- Product filtering by category
- Quantity buttons in cart
- Order status management
- Real deployment
- Better form validation
- Profile page
- Product reviews
- Image upload for products

---

## Author

Created by Moneeb Yusuf.

GitHub: https://github.com/moneebyusuf