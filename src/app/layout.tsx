import type { Metadata } from "next";
import NavigationMenu from "../components/NavigationMenu";
import "./globals.css";

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
        <NavigationMenu />
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2026 Online Shop</p>
      </footer>
      </body>
    </html>
  );
}