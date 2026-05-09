import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to load products')
          return
        }

        setProducts(data)
      } catch (error) {
        setError('Cannot connect to server.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="page">
        <h2>Loading products...</h2>
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

  return (
    <section className="products">
      <h2>Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  )
}

export default Products