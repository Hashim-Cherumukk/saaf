import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import ShopClient from "@/app/(store)/shop/ShopClient";

export const dynamic = "force-dynamic";

// Secure Database Connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function ShopPage() {
  // Fetch ALL products from the database, newest first
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Pass the real database array to our interactive filter component
  return <ShopClient products={products} />;
}