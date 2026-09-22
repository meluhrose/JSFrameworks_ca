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
            <div className="flex w-full justify-center mb-[20px] flex-col">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
            />

            {search.trim() !== "" && (
                <div className="relative mb-[20px] py-[8px] flex w-full flex-col border-[2px] border-[var(--accent-main)] rounded-[10px] bg-[var(--bg)] p-[8px] shadow-[var(--shadow)]">
                    {filteredProducts.length > 0 ? (
                        <ul className="m-0 list-none p-0">
                            {filteredProducts.map((product) => (
                                <li key={product.id}>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="hover:bg-[var(--accent-secondary)] text-[var(--text-h)] block rounded-[10px] p-[10px]"
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