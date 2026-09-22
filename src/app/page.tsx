import ProductsPage from "./products/page";

export default async function HomePage() {

    return (
        <main>
            <h1 className="text-center text-[var(--text-h)] mb-[20px]">My Online Shop</h1>
            <ProductsPage />
        </main>
    );
}