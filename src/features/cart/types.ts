import type { Product } from "../products/types";

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartContextValue {
    cart: CartItem[];
    itemCount: number;
    totalCost: number;
    addToCart: (product: Product) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}