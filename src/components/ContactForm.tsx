'use client';

import { useState } from "react";
import { toast } from "sonner";
import { validateContactForm } from "../features/contact/validation/contactValidation";
import { useRouter } from "next/navigation";
import type { ContactFormData, ContactFormErrors } from "@/features/contact/types";

export default function ContactForm() {
    const router = useRouter();

    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        subject: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState<ContactFormErrors>({});

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form data before submitting
    const validationErrors: ContactFormErrors = validateContactForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        console.log(formData.message);
        toast.success("Message sent successfully!");
        router.push("/");
    }
   };

   return (
    <form onSubmit={handleSubmit} noValidate className="flex justify-center items-center my-[40px] px-[20px]">
    <div className="w-[80%] border-2 border-[var(--accent-main)] p-[20px] rounded-[12px]">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
          className="w-4/5 mx-auto"
        />
        {errors.name && <p id="name-error" className="text-red-500 p-2 text-left">{errors.name}</p>}
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Inquiry about services"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          required
          className="w-4/5 mx-auto"
        />
        {errors.subject && <p id="subject-error" className="text-red-500 p-2 text-left">{errors.subject}</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jane.doe@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
          className="w-4/5 mx-auto"
        />
        {errors.email && <p id="email-error" className="text-red-500 p-2 text-left">{errors.email}</p>}
    
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        aria-invalid={Boolean(errors.message)}
        aria-describedby={errors.message ? "message-error" : undefined}
        required
        className="w-4/5 mb-2.5 p-2 border-2 border-[var(--accent-main)] rounded-[12px]"
      ></textarea>
      {errors.message && <p id="message-error" className="text-red-500 p-2 text-left">{errors.message}</p>}

      <button type="submit">Send Message</button>
    </div>
    </form>
  );
}