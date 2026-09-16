import Link from "next/link";
import { fetchProducts } from "../../features/products/services/productsAPI";
import SearchBar from "./components/SearchBar";


export default async function ProductsPage() {
    const { data: products } = await fetchProducts();

    return (
        <main>
            <SearchBar products={products} />
            <ul className="grid grid-cols-3 list-none gap-[20px] p-[20px]">
                {products.map((product) => {
                    const hasDiscount = product.discountedPrice !== undefined && product.discountedPrice < product.price;
                    const discountPercentage = hasDiscount && product.discountedPrice !== undefined
                        ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
                        : 0;

                    return (
                        <li key={product.id} className="relative h-auto w-[80%] rounded-[30px] border-2 border-[var(--border)] p-[20px]">
                            {hasDiscount && (
                                <span className="absolute right-[12px] top-[12px] rounded-full bg-[#c48be6] px-[10px] py-[6px] text-[12px] font-bold text-black">
                                    -{discountPercentage}%
                                </span>
                            )}

                            <h2 className="mb-[10px] text-[var(--text-h)]">{product.title}</h2>
                            <img
                                src={typeof product.image === "string" ? product.image : product.image.url}
                                alt={typeof product.image === "string" ? product.title : product.image.alt}
                                className="h-auto max-w-full rounded-[5px]"
                            />
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
                                <Link href={`/products/${product.id}`} className="text-center font-bold text-[var(--accent)] underline">
                                    View Details
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
            
        </main>
    );
}