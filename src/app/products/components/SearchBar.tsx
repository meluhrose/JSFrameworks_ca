"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "../../../features/products/types";

interface SearchBarProps {
    products: Product[];
}

export default function SearchBar({ products }: SearchBarProps) {
    const [search, setSearch] = useState<string>("");
    const searchTerm = search.trim().toLowerCase();
    const filteredProducts = products
        .filter((product) => {
            const matchesTitle = product.title.toLowerCase().includes(searchTerm);
            const matchesTag = product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ?? false;

            return matchesTitle || matchesTag;
        })
        .sort((firstProduct, secondProduct) => {
            const firstTitleMatch = firstProduct.title.toLowerCase().includes(searchTerm);
            const secondTitleMatch = secondProduct.title.toLowerCase().includes(searchTerm);

            return Number(secondTitleMatch) - Number(firstTitleMatch);
        });

    return (
        <div className="relative mb-[20px] w-full max-w-[600px]">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
                className="w-full rounded-[10px] border-2 border-[var(--border)] p-[10px]"
            />

            {search.trim() !== "" && (
                <div className="absolute left-0 right-0 top-full z-10 mt-[4px] rounded-[10px] border-2 border-[var(--border)] bg-[var(--bg)] p-[8px] shadow-[var(--shadow)]">
                    {filteredProducts.length > 0 ? (
                        <ul className="m-0 list-none p-0">
                            {filteredProducts.map((product) => (
                                <li key={product.id}>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="block rounded-[6px] p-[10px] text-[var(--text-h)] hover:bg-[var(--accent-bg)]"
                                    >
                                        {product.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-[10px]">No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
}