import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

function Products() {
  return (
    <section className="products">
      <h2>Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  )
}

export default Products