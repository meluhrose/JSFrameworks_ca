'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
    const router = useRouter();
    const [message, setMessage] = useState("");

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(message);
    router.push("/");
   };

   return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "20px 0", padding: "20px" }}>
    <div style={{ border: "2px solid #8e7aa1", padding: "20px", borderRadius: "5px" }}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Doe"
          required
        />
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Inquiry about services"
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jane.doe@example.com"
          required
        />
    
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px" }}
      ></textarea>

      <button type="submit">Send Message</button>
    </div>
    </form>
  );
}