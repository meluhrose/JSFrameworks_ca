"use client";

import { useState } from "react";
import { toast } from "sonner"
import { useCart } from "../features/cart/context/CartContext";
import type { Product } from "../features/products/types";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const handleToast = () => {
        toast.success("Product added to cart!");
        setTimeout(() => {
            toast.dismiss();
        }, 3000);
    };
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        handleToast();
    };

    return (
        <button type="button" onClick={handleAddToCart}>
            {added ? "Added to Cart" : "Add to Cart"}
        </button>
    );
}