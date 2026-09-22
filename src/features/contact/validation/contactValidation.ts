import type { ContactFormData, ContactFormErrors } from "../types";

export function validateContactForm(data: ContactFormData): ContactFormErrors {
    const errors: ContactFormErrors = {};

    if (data.name.trim().length < 3) {
        errors.name = "Name must be at least 3 characters long";
    }
    
    if (data.subject.trim().length < 3) {
        errors.subject = "Subject must be at least 3 characters long";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email.trim())) {
        errors.email = "Email is invalid";
    }

    if (data.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters long";
    }

    return errors;
}