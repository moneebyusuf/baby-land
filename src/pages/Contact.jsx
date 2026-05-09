function Contact() {
  return (
    <section className="page">
      <h2>Contact Us</h2>

      <form className="contact-form">
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Your email" />
        <textarea placeholder="Your message"></textarea>
        <button type="button">Send Message</button>
      </form>
    </section>
  )
}

export default Contact