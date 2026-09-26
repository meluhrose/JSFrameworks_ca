import { fetchProducts } from "../../features/products/services/productsAPI";
import SearchBar from "./components/SearchBar";
import ProductsGrid from "./components/ProductsGrid";
import Pagination from "../../components/Pagination";

interface ProductsPageProps {
    searchParams?: { page?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const page = searchParams?.page;
    const currentPage = Number(page) || 1;

    const { data: products, meta } = await fetchProducts(currentPage);


    return (
        <section>
            {/* Search bar for filtering products */}
            <SearchBar products={products} />
            {/* Sortable product grid */}
            <ProductsGrid products={products} />
            {/* Pagination component for navigating through product pages */}
            <Pagination
                currentPage={meta.currentPage}
                pageCount={meta.pageCount}
                previousPage={meta.previousPage}
                nextPage={meta.nextPage}
            />
        </section>
    );
}