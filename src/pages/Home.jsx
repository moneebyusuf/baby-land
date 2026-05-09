import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h2>Everything Your Baby Needs</h2>
          <p>
            Welcome to Baby Land, your trusted online store for baby clothes,
            toys, diapers, strollers, and newborn essentials.
          </p>

          <Link to="/products" className="btn">
            Shop Now
          </Link>
        </div>

        <div className="hero-card">
          <span>👶</span>
          <h3>New Baby Collection</h3>
          <p>Soft, safe, and cute products for your little one.</p>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Baby Land?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>🚚</span>
            <h3>Fast Delivery</h3>
            <p>Quick delivery for baby essentials.</p>
          </div>

          <div className="feature-card">
            <span>🛡️</span>
            <h3>Safe Products</h3>
            <p>Carefully selected products for babies.</p>
          </div>

          <div className="feature-card">
            <span>💗</span>
            <h3>Made with Care</h3>
            <p>Everything parents need in one place.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home