import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1>Baby Land</h1>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-text">
          <h2>Everything Your Baby Needs</h2>
          <p>
            Welcome to Baby Land, your trusted place for baby clothes, toys,
            diapers, strollers, and newborn essentials.
          </p>
          <button>Shop Now</button>
        </div>

        <div className="hero-card">
          <span>👶</span>
          <h3>New Baby Collection</h3>
          <p>Soft, safe, and cute products for your little one.</p>
        </div>
      </section>

      <section className="products" id="products">
        <h2>Our Products</h2>

        <div className="product-grid">
          <div className="product-card">
            <span>🧸</span>
            <h3>Baby Toys</h3>
            <p>Fun and safe toys for babies.</p>
          </div>

          <div className="product-card">
            <span>👕</span>
            <h3>Baby Clothes</h3>
            <p>Comfortable outfits for newborns.</p>
          </div>

          <div className="product-card">
            <span>🍼</span>
            <h3>Feeding</h3>
            <p>Bottles and feeding essentials.</p>
          </div>

          <div className="product-card">
            <span>🛒</span>
            <h3>Strollers</h3>
            <p>Modern strollers for daily use.</p>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h2>About Baby Land</h2>
        <p>
          Baby Land is a simple online store designed to help parents find
          everything they need for their babies in one place.
        </p>
      </section>

      <footer className="footer" id="contact">
        <h2>Contact Us</h2>
        <p>Email: support@babyland.com</p>
        <p>© 2026 Baby Land. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App