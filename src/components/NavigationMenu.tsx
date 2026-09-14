"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { href: "/", label: "Home" },
    { href: "/contact-page", label: "Contact" },
];

    export default function NavigationMenu() {
    const pathname = usePathname();

    return (
        <nav>
            <ul style={{ display: "flex", gap: "20px", listStyle: "none", padding: "20px" }}>
                {menuItems.map((item) => (
                    <li key={item.href} style={{ display: "inline-block" }}>
                        <Link href={item.href} style={{
                  fontWeight: pathname === item.href ? "bold" : "normal",
                  textDecoration: pathname === item.href ? "underline" : "none",
                  color: pathname === item.href ? "var(--accent)" : "inherit",
                }}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
