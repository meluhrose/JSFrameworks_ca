import Link from "next/link";
import { fetchProducts } from "../../features/products/services/productsAPI";

export default async function ProductsPage() {
    const { data: products } = await fetchProducts();

    return (
        <main>
            <h1>Products</h1>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", listStyle: "none", padding: "20px" }}>
                {products.map((product) => (
                    <li key={product.id} style={{ border: "2px solid var(--border)", padding: "20px", borderRadius: "50px", width: "80%", height: "auto" }}>
                        <h2 style={{ marginBottom: "10px", color: "var(--text-h)" }}>{product.title}</h2>
                        <img
                            src={typeof product.image === "string" ? product.image : product.image.url}
                            alt={typeof product.image === "string" ? product.title : product.image.alt}
                            style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
                        />
                        <p>{product.description.slice(0,100)}...</p>
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
                        <Link href={`/products/${product.id}`} style={{ color: "var(--accent)", textDecoration: "underline", fontWeight: "bold", textAlign: "center" }}>View Details</Link>
                    </li>
                ))}
            </ul>
            <p>End of product list.</p>
        </main>
    );
}