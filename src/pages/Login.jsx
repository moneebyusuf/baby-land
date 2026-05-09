function Login() {
  return (
    <section className="page">
      <h2>Login</h2>

      <form className="contact-form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="button">Login</button>
      </form>
    </section>
  )
}

export default Login