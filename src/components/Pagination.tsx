import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    pageCount: number;
    previousPage: number | null;
    nextPage: number | null;
}

export default function Pagination({
    currentPage,
    pageCount,
    previousPage,
    nextPage,
}: PaginationProps) {
    return (
        <div className="mt-4 flex items-center justify-between gap-4">
            {previousPage ? (
                <Link
                    href={`/products?page=${previousPage}`}
                    className="rounded-full bg-[var(--accent-main)] px-4 py-2 text-[var(--text-background)] hover:bg-[var(--accent-secondary)] hover:text-[var(--text)]"
                >
                    Previous
                </Link>
            ) : (
                <span className="rounded-full bg-[var(--accent-main)] px-4 py-2 text-[var(--text-background)] opacity-50">Previous</span>
            )}
            <span>
                Page {currentPage} of {pageCount}
            </span>
            {nextPage ? (
                <Link
                    href={`/products?page=${nextPage}`}
                    className="rounded-full bg-[var(--accent-main)] px-4 py-2 text-[var(--text-background)] hover:bg-[var(--accent-secondary)] hover:text-[var(--text)]"
                >
                    Next
                </Link>
            ) : (
                <span className="rounded-full bg-[var(--accent-main)] px-4 py-2 text-[var(--text-background)] opacity-50">Next</span>
            )}
        </div>
    );
}