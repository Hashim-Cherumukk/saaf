import type { Metadata } from "next";

import Hero from "@/sections/Hero";
import Featured from "@/sections/Featured";
import BestSellers from "@/sections/BestSellers";
import Reviews from "@/sections/Reviews";
import InstagramGallery from "@/sections/InstagramGallery";
import BrandStory from "@/sections/BrandStory";
import prisma from "@/lib/prisma";


export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Saaf Couture | Premium Qamees & Luxury Perfumes",
  description:
    "Discover Saaf Couture's premium Qamees and luxury perfumes. Designed for modern elegance and timeless modest fashion.",

  openGraph: {
    title: "Saaf Couture | Premium Qamees & Luxury Perfumes",
    description:
      "Explore premium Qamees and signature fragrances crafted for elegance.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Saaf Couture Collection",
      },
    ],
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default async function Home() {
  // Fetch products (Removed 'inStock: true' so Sold Out items show up with badges!)
  const bestSellers = await (prisma as any).product.findMany({
    where: { isBestSeller: true },
    orderBy: { updatedAt: 'desc' } // Newest first
  });

  const newArrivals = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />

      {/* Only show these sections if you have actually tagged products in the Admin panel! */}
      {newArrivals.length > 0 && <Featured products={newArrivals} />}
      {bestSellers.length > 0 && <BestSellers products={bestSellers} />}

      <Reviews />
      <InstagramGallery />
      <BrandStory />
    </main>
  );
}