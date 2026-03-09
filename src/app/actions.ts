"use server";

import prisma from "@/lib/prisma";

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