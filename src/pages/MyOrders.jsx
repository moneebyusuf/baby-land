import { useEffect, useState } from 'react'

function MyOrders({ user }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${user.id}`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to load orders')
          return
        }

        setOrders(data)
      } catch (error) {
        setError('Cannot connect to server.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user.id])

  if (loading) {
    return (
      <section className="page">
        <h2>Loading orders...</h2>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page">
        <h2>{error}</h2>
      </section>
    )
  }

  if (orders.length === 0) {
    return (
      <section className="page">
        <h2>My Orders</h2>
        <p>You do not have any orders yet.</p>
      </section>
    )
  }

  return (
    <section className="page">
      <h2>My Orders</h2>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <h3>Order #{order._id.slice(-6)}</h3>
              <span>{order.status}</span>
            </div>

            <p>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <div className="order-items">
              {order.items.map((item) => (
                <div className="order-item" key={item.productId}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="cart-total">
              Total: ${order.totalPrice.toFixed(2)}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MyOrders