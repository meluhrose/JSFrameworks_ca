"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../features/cart/context/CartContext";

interface MenuItem {
    href: string;
    label: string;
}

const menuItems: MenuItem[] = [
    { href: "/", label: "Home" },
    { href: "/contact-page", label: "Contact" },
];

    export default function NavigationMenu() {
    const pathname = usePathname();
        const { itemCount } = useCart();

    return (
        <nav className="border-b-2 border-[var(--border)] bg-[var(--bg)] text-[var(--text)]">
            <ul className="flex flex-wrap justify-center gap-5 list-none p-5 font-sans">
                {menuItems.map((item) => (
                    <li key={item.href} className="text-xl">
                        <Link href={item.href} className={`${
                            pathname === item.href ? "font-bold underline text-[var(--accent-main)]" : "text-inherit"
                        }`}>
                            {item.label}
                        </Link>
                    </li>
                ))}
                <li className="text-xl">
                    <Link href="/cart" className={pathname === "/cart" ? "font-bold underline text-[var(--accent-main)]" : "text-inherit"}>
                        Cart ({itemCount})
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
