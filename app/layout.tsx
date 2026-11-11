import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const siteTitle = "Desi Bites | Pakistani Food Menu";
const siteDescription =
  "Explore Desi Bites' signature Pakistani dishes — Chicken Biryani, Chicken Karahi, Beef Nihari, Chapli Kebab, Seekh Kebab, and Beef Haleem.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    siteName: "Desi Bites",
    images: [
      {
        url: "/dishes/chicken-biryani.png",
        width: 1000,
        height: 1000,
        alt: "Chicken Biryani served on a round white plate at Desi Bites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/dishes/chicken-biryani.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
