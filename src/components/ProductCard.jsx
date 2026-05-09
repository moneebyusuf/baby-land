import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price}</strong>

      <Link to={`/products/${product._id}`} className="add-btn">
        View Details
      </Link>
    </div>
  )
}

export default ProductCard