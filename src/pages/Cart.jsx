function Cart({ cartItems, removeFromCart, setCartItems, user }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  async function handleCheckout() {
    if (cartItems.length === 0) {
      alert('Your cart is empty.')
      return
    }

    const orderItems = cartItems.map((item) => ({
      productId: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity
    }))

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
          items: orderItems,
          totalPrice: total
        })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Checkout failed')
        return
      }

      alert('Order placed successfully!')
      setCartItems([])
      localStorage.removeItem('cartItems')
    } catch (error) {
      alert('Cannot connect to server.')
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="page">
        <h2>Your Cart</h2>
        <p>Your cart is currently empty.</p>

        <div className="empty-cart">
          <span>🛒</span>
          <h3>No products added yet</h3>
          <p>Go to Products and choose your favorite baby items.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <strong>${item.price}</strong>
            </div>

            <button onClick={() => removeFromCart(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>

      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    </section>
  )
}

export default Cart