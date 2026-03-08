import Hero from "@/sections/Hero";
import Featured from "@/sections/Featured";
import BestSellers from "@/sections/BestSellers";
import Reviews from "@/sections/Reviews";
import InstagramGallery from "@/sections/InstagramGallery";
import BrandStory from "@/sections/BrandStory";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

// Secure Database Connection for the Storefront
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function Home() {
  // Fetch products (Removed 'inStock: true' so Sold Out items show up with badges!)
  const bestSellers = await prisma.product.findMany({ 
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