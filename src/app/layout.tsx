import type { Metadata } from "next";
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
            <li><a href="/">Home</a></li>
            <li><a href="/contact-page">Contact</a></li>
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