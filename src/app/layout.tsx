import type { Metadata } from "next";
import Link from "next/link";
import "../index.css";

export const metadata: Metadata = {
  title: "Online Shop",
  description: "My online shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <header>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/contact-page">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Online Shop</p>
      </footer>
      </body>
    </html>
  );
}