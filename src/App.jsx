import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      return parsedUser
    }

    return null
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  function login(userData) {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cartItems')
    setUser(null)
    setCartItems([])
  }

  function addToCart(product) {
    if (!user) {
      alert('Please login first to add products to cart.')
      return
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item._id === product._id
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== productId)
    )
  }

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        logout={logout}
        cartCount={cartItems.length}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} user={user} />}
        />

        <Route
          path="/cart"
          element={
            user ? (
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                setCartItems={setCartItems}
                user={user}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login login={login} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register login={login} />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App