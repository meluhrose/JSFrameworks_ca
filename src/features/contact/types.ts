export interface ContactFormData {
    name: string;
    subject: string;
    email: string;
    message: string;
}

export interface ContactFormErrors {
    name?: string;
    subject?: string;
    email?: string;
    message?: string;
}