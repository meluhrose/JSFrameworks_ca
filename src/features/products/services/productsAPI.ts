import type { ProductsResponse, ProductResponse } from "../types";

const API_URL = "https://v2.api.noroff.dev/online-shop";

export async function fetchProducts(): Promise<ProductsResponse> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

export async function fetchProduct(
    id: string
): Promise<ProductResponse> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    return response.json();
}