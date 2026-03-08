"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function getMenuFeaturedProducts() {
  // Grab exactly the 4 newest featured products
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 4
  });
  
  return products;
}

export async function getPublishedReviews() {
  const reviews = await (prisma as any).review.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' }
  });
  return reviews;
}