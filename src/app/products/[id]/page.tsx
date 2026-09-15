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

    return (
        <main>
            <h1>{product.title}</h1>
            <img
                src={typeof product.image === "string" ? product.image : product.image.url}
                alt={typeof product.image === "string" ? product.title : product.image.alt}
                style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
            />
            <p>{product.description}</p>
            {product.discountedPrice !== undefined && product.discountedPrice < product.price ? (
                <p>
                    <span style={{ textDecoration: "line-through", marginRight: "10px" }}>
                        ${product.price}
                    </span>
                    <strong>${product.discountedPrice}</strong>
                </p>
            ) : (
                <p style={{ fontWeight: "bold" }}>Price: ${product.price}</p>
            )}
            <button>Add to Cart</button>
            <Link href="/products" style={{ color: "var(--accent)", textDecoration: "underline", fontWeight: "bold" }}>Back to Products</Link>
            <div>
                <h2>Reviews</h2>
                <p>No reviews yet.</p>
            </div>
        </main>
    );
}