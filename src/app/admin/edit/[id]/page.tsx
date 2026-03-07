import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";

// Secure Database Connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// 1. Update the type to expect a Promise for Next.js 16
export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 2. Await the params before trying to read the ID
  const { id } = await params;

  // 3. Fetch the specific product from Neon using the awaited ID
  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  // If someone types a random ID that doesn't exist, show a 404
  if (!product) {
    return notFound();
  }

  // Pass the data to our interactive client form
  return <EditForm product={product} />;
}