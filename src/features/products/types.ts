export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountedPrice?: number;
    image: ProductImage | string;
    rating: number;
    tags?: string[];
    reviews?: Review[];
}

export interface Review {
    id: string;
    username: string;
    rating: number;
    description: string;
}

export interface ProductImage {
    url: string;
    alt: string;
}

export interface PaginationMeta {
        isFirstPage: boolean;
        isLastPage: boolean;
        currentPage: number;
        previousPage: number | null;
        nextPage: number | null;
        pageCount: number;
        totalCount: number;
}

export interface ProductsResponse {
        data: Product[];
        meta: PaginationMeta;
}

export interface ProductResponse {
        data: Product;
        meta: Record<string, never>;
}