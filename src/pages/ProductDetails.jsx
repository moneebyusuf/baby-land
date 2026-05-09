import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

function ProductDetails() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <section className="page">
        <h2>Product Not Found</h2>
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
        <button className="add-btn">Add to Cart</button>
      </div>
    </section>
  )
}

export default ProductDetails