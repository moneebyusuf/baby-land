function Cart() {
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

export default Cart