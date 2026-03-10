// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://saafcouture.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Saaf Couture | Premium Qamees & Luxury Perfumes",
    template: "%s | Saaf Couture",
  },

  description:
    "Saaf Couture offers premium Qamees and luxury perfumes crafted for modern elegance. Discover refined Islamic fashion and signature fragrances.",

  keywords: [
    "Saaf Couture",
    "Qamees",
    "Premium Qamees",
    "Islamic clothing",
    "Mens Qamees",
    "Luxury perfumes",
    "Oud perfume",
    "Arabic perfume",
    "Modest fashion",
    "Saaf brand",
  ],

  authors: [{ name: "Saaf Couture" }],
  creator: "Saaf Couture",
  publisher: "Saaf Couture",

  openGraph: {
    title: "Saaf Couture | Premium Qamees & Luxury Perfumes",
    description:
      "Discover premium Qamees and luxury fragrances designed for modern elegance.",
    url: siteUrl,
    siteName: "Saaf Couture",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Saaf Couture Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  category: "fashion",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/hero.webp" />
      </head>

      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}