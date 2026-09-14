import { fetchProducts } from "../features/products/services/productsAPI";

export default async function HomePage() {
    const response = await fetchProducts();

    return (
        <main>
            <h1>Online Shop</h1>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", listStyle: "none", padding: "20px" }}>
                {response.data.map((product) => (
                    <li key={product.id} style={{ border: "2px solid #8e7aa1", padding: "20px", borderRadius: "50px", width: "80%", height: "auto" }}>
                        <h2 style={{ marginBottom: "10px", color: "#5d4574" }}>{product.title}</h2>
                        <img 
                            src={typeof product.image === "string" ? product.image : product.image.url}
                            alt={typeof product.image === "string" ? product.title : product.image.alt}
                            style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
                        />
                        <p>{product.description}</p>
                        <p style={{ fontWeight: "bold" }}>Price: ${product.price}</p>
                        <button>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <p>End of product list.</p>
        </main>
    );
}