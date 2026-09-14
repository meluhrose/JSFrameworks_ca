

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>If you have any questions, feel free to reach out to us at contact@onlineshop.com.</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}