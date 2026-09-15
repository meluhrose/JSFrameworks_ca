import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProduct } from "../../../features/products/services/productsAPI";

export default async function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let product;
    try {
        ({ data: product } = await fetchProduct(id));
    } catch {
        notFound();
    }

    const hasDiscount = product.discountedPrice !== undefined && product.discountedPrice < product.price;
    const discountPercentage = hasDiscount && product.discountedPrice !== undefined
        ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
        : 0;

    return (
        <main>
            <h1>{product.title}</h1>
            <div className="relative inline-block">
                {hasDiscount && (
                    <span className="absolute right-[12px] top-[12px] rounded-full bg-[#c48be6] px-[10px] py-[6px] text-[12px] font-bold text-black">
                        -{discountPercentage}%
                    </span>
                )}
                <img
                    src={typeof product.image === "string" ? product.image : product.image.url}
                    alt={typeof product.image === "string" ? product.title : product.image.alt}
                    className="h-auto max-w-full rounded-[5px]"
                />
            
            <div className="flex flex-col items-center gap-[10px] p-[10px]">
                <p className="font-bold">Rating: {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}</p>
                <p>{product.description}</p>
            </div>
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
            {product.tags && product.tags.length > 0 && (
                <div>
                    <h2>Tags</h2>
                    <ul>
                        {product.tags.map((tag: string) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button>Add to Cart</button>
            <Link href="/products" className="font-bold text-[var(--accent)] underline">Back to Products</Link>
            </div>
            <div>
                <h2>Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <ul>
                        {product.reviews.map((review: { id: string; username: string; rating: number; description: string }) => (
                            <li key={review.id}>
                                <p><strong>{review.username}</strong> - {review.rating}/5</p>
                                <p>{review.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </main>
    );
}