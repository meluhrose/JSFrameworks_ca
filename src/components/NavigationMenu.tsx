"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

    return (
        <nav className="bg-[var(--accent-bg)] border-b-2 border-[var(--border)]">
            <ul className="flex justify-center gap-[20px] list-none p-[20px]">
                {menuItems.map((item) => (
                    <li key={item.href} className="text-xxl">
                        <Link href={item.href} className={`${
                            pathname === item.href ? "font-bold underline text-[var(--accent)]" : "text-inherit"
                        }`}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
