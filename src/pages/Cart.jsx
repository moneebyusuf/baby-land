import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

function Cart({ cartItems, removeFromCart, setCartItems, user }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  async function saveOrderToDatabase() {
    const orderItems = cartItems.map((item) => ({
      productId: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity
    }))

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
      throw new Error(data.message || 'Order could not be saved')
    }

    return data
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

      <div className="paypal-container">
        <PayPalScriptProvider
          options={{
            clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: 'USD',
            intent: 'capture',
            components: 'buttons',
            disableFunding: 'card'
          }}
        >
          <PayPalButtons
            style={{
              layout: 'vertical',
              color: 'blue',
              shape: 'pill',
              label: 'paypal'
            }}
            createOrder={async () => {
              const response = await fetch(
                'http://localhost:5000/api/paypal/create-order',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    total: total.toFixed(2)
                  })
                }
              )

              const order = await response.json()

              if (!response.ok) {
                throw new Error(order.message || 'Could not create PayPal order')
              }

              return order.id
            }}
            onApprove={async (data) => {
              try {
                const response = await fetch(
                  `http://localhost:5000/api/paypal/capture-order/${data.orderID}`,
                  {
                    method: 'POST'
                  }
                )

                const details = await response.json()

                if (!response.ok) {
                  alert(details.message || 'Payment capture failed.')
                  return
                }

                if (details.status !== 'COMPLETED') {
                  alert('Payment was not completed.')
                  return
                }

                await saveOrderToDatabase()

                alert('Payment completed and order saved successfully!')
                setCartItems([])
                localStorage.removeItem('cartItems')
              } catch (error) {
                alert(error.message || 'Something went wrong.')
              }
            }}
            onError={(error) => {
              console.log(error)
              alert('PayPal payment failed.')
            }}
          />
        </PayPalScriptProvider>
      </div>
    </section>
  )
}

export default Cart