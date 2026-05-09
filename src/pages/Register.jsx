import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register({ login }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleRegister(event) {
    event.preventDefault()
    setError('')

    if (!username || !email || !password) {
      setError('Please fill in all fields.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed')
        return
      }

      login(data.user)
      navigate('/')
    } catch (error) {
      setError('Cannot connect to server.')
    }
  }

  return (
    <section className="page">
      <h2>Create Account</h2>

      {error && <p className="error-message">{error}</p>}

      <form className="contact-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  )
}

export default Register