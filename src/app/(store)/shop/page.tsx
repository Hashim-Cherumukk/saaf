import prisma from "@/lib/prisma";
import ShopClient from "@/app/(store)/shop/ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  // Fetch ALL products from the database, newest first
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Pass the real database array to our interactive filter component
  return <ShopClient products={products} />;
}