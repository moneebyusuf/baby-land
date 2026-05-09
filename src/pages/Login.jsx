import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ login }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please enter username and password.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      localStorage.setItem('token', data.token)
      login(data.user)
      navigate('/')
    } catch (error) {
      setError('Cannot connect to server.')
    }
  }

  return (
    <section className="page">
      <h2>Login</h2>

      {error && <p className="error-message">{error}</p>}

      <form className="contact-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </section>
  )
}

export default Login