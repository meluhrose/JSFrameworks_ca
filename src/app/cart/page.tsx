"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../features/cart/context/CartContext";

export default function CartPage() {
    const router = useRouter();
    const { cart, totalCost, removeFromCart, updateQuantity, clearCart } = useCart();

    const handleCheckout = () => {
        clearCart();
        router.push("/checkout-success");
    };

    if (cart.length === 0) {
        return (
            <section className="flex flex-col items-center gap-5">
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
                <Link href="/" className="font-bold text-[var(--accent-main)] underline">Continue Shopping</Link>
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center gap-5">
            <h1>Your Cart</h1>
            <ul className="flex flex-col w-full list-none border-2 border-[var(--accent-main)] p-[16px]">
                {cart.map(({ product, quantity }) => {
                    const price = product.discountedPrice ?? product.price;

                    return (
                        <li key={product.id} className="grid grid-cols-1 items-center gap-[16px] mb-[16px] sm:grid-cols-[2fr_1fr_auto_auto_auto]">
                            <h2 className="truncate">{product.title}</h2>
                            <p>Price: ${price.toFixed(2)}</p>
                            <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                            <input
                                id={`quantity-${product.id}`}
                                className="w-[120px]"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(event) => updateQuantity(product.id, Number(event.target.value))}
                            />
                            <button type="button" onClick={() => removeFromCart(product.id)}>Remove</button>
                        </li>
                    );
                })}
            </ul>
            <p className="font-bold">Total: ${totalCost.toFixed(2)}</p>
            <button type="button" onClick={handleCheckout}>Checkout</button>
        </section>
    );
}