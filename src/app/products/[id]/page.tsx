import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProduct } from "../../../features/products/services/productsAPI";
import type { Product } from "../../../features/products/types";
import AddToCartButton from "../../../components/AddToCartButton";

interface SingleProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleProductPage({
  params,
}: SingleProductPageProps) {
  const { id } = await params;

  let product: Product;

  try {
    ({ data: product } = await fetchProduct(id));
  } catch {
    notFound();
  }

  const hasDiscount =
    product.discountedPrice !== undefined &&
    product.discountedPrice < product.price;

  const discountPercentage =
    hasDiscount && product.discountedPrice !== undefined
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100,
        )
      : 0;

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Product information */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        
        <div className="relative">
  <img
    src={
      typeof product.image === "string"
        ? product.image
        : product.image.url
    }
    alt={
      typeof product.image === "string"
        ? product.title
        : product.image.alt
    }
    className="w-full rounded-lg object-cover"
  />

  {hasDiscount && (
    <span className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-secondary)] px-3 py-1 text-xs font-bold text-black">
      -{discountPercentage}%
    </span>
  )}
</div>

        {/* Right - Product information */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: string) => (
                <span
                  className="rounded-[50px] bg-[var(--accent-main)] text-[var(--text-background)] px-3 py-1 text-xs font-bold"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          <p className="font-bold">
            Rating: {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </p>

          {/* Description */}
          <p className="leading-relaxed">{product.description}</p>

          {/* Price */}
          {hasDiscount ? (
            <p className="text-xl">
              <span className="mr-3 line-through text-gray-500">
                ${product.price}
              </span>
              <strong>${product.discountedPrice}</strong>
            </p>
          ) : (
            <p className="text-xl font-bold">Price: ${product.price}</p>
          )}

          {/* Cart button */}
          <AddToCartButton product={product} />

          {/* Back link */}
          <Link
            href="/"
            className="rounded-[12px] px-[10px] py-[5px] text-center font-bold text-[var(--text)] hover:bg-[var(--accent-secondary)]"
          >
            Back to Products
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">Reviews</h2>

        {product.reviews && product.reviews.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {product.reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-lg border border-[var(--accent-main)] p-4"
              >
                <p className="font-bold">
                  {review.username} - {review.rating}/5
                </p>

                <p className="mt-2">{review.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>
    </main>
  );
}