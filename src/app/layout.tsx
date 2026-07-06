import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/ui/CartSidebar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VBB — Crafted for Excellence",
  description:
    "Premium school uniforms designed for comfort, built for confidence. A storytelling experience.",
  keywords: ["school uniform", "premium", "uniforms", "exhibition", "VBB"],
  openGraph: {
    title: "VBB — Crafted for Excellence",
    description:
      "Premium school uniforms designed for comfort, built for confidence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
