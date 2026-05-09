import { Link } from 'react-router-dom'

function Navbar({ user, logout, cartCount }) {
  return (
    <nav className="navbar">
      <h1>Baby Land</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {user && <Link to="/cart">Cart ({cartCount})</Link>}
        {user && <Link to="/orders">My Orders</Link>}
        
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {user ? (
          <>
            <span className="username">Hi, {user.username}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar