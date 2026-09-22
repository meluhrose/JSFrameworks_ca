import type { Metadata } from "next";
import { Toaster } from "sonner"
import NavigationMenu from "../components/NavigationMenu";
import Footer from "../components/footer";
import { CartProvider } from "../features/cart/context/CartContext";
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
      <CartProvider>
        <header>
          <NavigationMenu />
        </header>
        <main>{children}</main>
        <Footer />
      </CartProvider>
      <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}