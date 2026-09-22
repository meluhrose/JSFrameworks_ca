import Link from "next/link";

export default function CheckoutSuccessPage() {
    return (
        <section className="flex flex-col items-center gap-5 w-full">
            <h1>Checkout Successful</h1>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            <Link href="/" className="font-bold text-[var(--accent-main)] underline">Continue Shopping</Link>
        </section>
    );
}