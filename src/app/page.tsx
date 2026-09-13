import { fetchProducts } from "../features/products/services/productsAPI";

export default async function HomePage() {
    const response = await fetchProducts();

    return (
        <main>
            <h1>Online Shop</h1>
            <ul>
                {response.data.map((product) => (
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <img
                            src={typeof product.image === "string" ? product.image : product.image.url}
                            alt={typeof product.image === "string" ? product.title : product.image.alt}
                        />
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
            <p>End of product list.</p>
        </main>
    );
}