function Register() {
  return (
    <section className="page">
      <h2>Register</h2>

      <form className="contact-form">
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="button">Create Account</button>
      </form>
    </section>
  )
}

export default Register