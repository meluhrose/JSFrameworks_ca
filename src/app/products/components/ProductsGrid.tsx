"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "../../../features/products/types";

interface ProductsGridProps {
    products: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";

export default function ProductsGrid({ products }: ProductsGridProps) {
    const [sortOption, setSortOption] = useState<SortOption>("default");

    const sortedProducts = [...products].sort((firstProduct, secondProduct) => {
        const firstPrice = firstProduct.discountedPrice ?? firstProduct.price;
        const secondPrice = secondProduct.discountedPrice ?? secondProduct.price;

        switch (sortOption) {
            case "price-asc":
                return firstPrice - secondPrice;
            case "price-desc":
                return secondPrice - firstPrice;
            case "rating-desc":
                return secondProduct.rating - firstProduct.rating;
            default:
                return 0;
        }
    });

    return (
        <>
            <div className="mb-[20px] flex justify-start">
                <label htmlFor="sort-products" className="sr-only">Sort products</label>
                <select
                    id="sort-products"
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value as SortOption)}
                    className="rounded-[8px] border-2 border-[var(--accent-main)] p-[8px]"
                >
                    <option value="default" className="hover:bg-[var(--accent-main)]">Sort by: Default</option>
                    <option value="price-asc" className="hover:bg-[var(--accent-main)]">Price: Low to High</option>
                    <option value="price-desc" className="hover:bg-[var(--accent-main)]">Price: High to Low</option>
                    <option value="rating-desc" className="hover:bg-[var(--accent-main)]">Rating: High to Low</option>
                </select>
            </div>

            <ul className="grid list-none grid-cols-1 gap-8 p-5 md:grid-cols-2 lg:grid-cols-3">
                {/*Discount badge for products with a discount */}
                {sortedProducts.map((product) => {
                    const hasDiscount = product.discountedPrice !== undefined && product.discountedPrice < product.price;
                    const discountPercentage = hasDiscount && product.discountedPrice !== undefined
                        ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
                        : 0;

                    return (
                        <li key={product.id} className="h-auto rounded-3xl border-2 border-[var(--accent-main)] p-5">
                            <div className="mb-[10px] flex items-start justify-between gap-[10px]">
                                <h2 className="min-w-0 flex-1 break-words text-[18px] text-[var(--text-h)]">{product.title}</h2>
                                {hasDiscount && (
                                    <span className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-[10px] font-bold text-black">
                                        -{discountPercentage}%
                                    </span>
                                )}
                            </div>
                            {/* Product image */}
                            <img
                                src={typeof product.image === "string" ? product.image : product.image.url}
                                alt={typeof product.image === "string" ? product.title : product.image.alt}
                                className="h-auto max-w-full rounded-[5px]"
                                width={500}
                                height={500}
                            />
                            {/* Product details such as rating, description, and price */}
                            <div className="mt-[12px] flex flex-col gap-[10px]">
                                <p className="font-bold">Rating: {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</p>
                                <p>{product.description.slice(0, 100)}...</p>
                                {hasDiscount ? (
                                    <p>
                                        <span className="mr-[10px] line-through">
                                            ${product.price}
                                        </span>
                                        <strong>${product.discountedPrice}</strong>
                                    </p>
                                ) : (
                                    <p className="font-bold">Price: ${product.price}</p>
                                )}
                                {/* Link to view product details */}
                                <Link href={`/products/${product.id}`} className="rounded-[12px] px-[10px] py-[5px] text-center font-bold text-[var(--text)] hover:bg-[var(--accent-secondary)]">
                                    View Details
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}