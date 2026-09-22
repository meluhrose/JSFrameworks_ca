"use client";

import { createContext, useContext, useState } from "react";
import type { CartContextValue, CartItem } from "../types";
import type { Product } from "@/features/products/types";

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find((item) => item.product.id === product.id);
            if (existingItem) {
                return currentCart.map((item) =>
                    item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
                ); 
            }
            return [...currentCart, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (!cart.find(item => item.product.id === productId)) {
            return;
        }
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.product.id !== productId)
        );
    };
    const clearCart = () => {
        setCart([]);
    };

    const value: CartContextValue = {
        cart,
        itemCount: cart.reduce((count, item) => count + item.quantity, 0),
        totalCost: cart.reduce((total, item) => {
            const price = item.product.discountedPrice ?? item.product.price;
            return total + price * item.quantity;
        }, 0),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}