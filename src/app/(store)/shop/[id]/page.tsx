import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "@/app/(store)/shop/[id]/ProductDetails";

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  // Await the URL parameters safely
  const { id } = await params;

  // Fetch the specific product from the database
  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  // Show a 404 page if the product doesn't exist
  if (!product) {
    return notFound();
  }

  // Pass the real database object to our interactive client UI
  return <ProductDetails product={product} />;
}