import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ProductDetails({ addToCart, user }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Product not found')
          return
        }

        setProduct(data)
      } catch (error) {
        setError('Cannot connect to server.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <section className="page">
        <h2>Loading product...</h2>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="page">
        <h2>{error || 'Product Not Found'}</h2>
        <Link to="/products" className="btn">
          Back to Products
        </Link>
      </section>
    )
  }

  return (
    <section className="product-details">
      <img src={product.image} alt={product.name} className="details-image" />

      <div className="details-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <p>In Stock: {product.countInStock}</p>

        {user ? (
          <>
            <button className="add-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>

            <Link to="/cart" className="btn">
              Go to Cart
            </Link>
          </>
        ) : (
          <Link to="/login" className="btn">
            Login to Add to Cart
          </Link>
        )}
      </div>
    </section>
  )
}

export default ProductDetails