"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLiveSearchResults(query: string) {
  if (!query || query.trim().length === 0) return [];
  
  // Split the search into individual words so order doesn't matter
  const searchWords = query.trim().split(" ");
  
  // Look for products that match EVERY word in either the name, description, or category
  const conditions = searchWords.map(word => ({
    OR: [
      { name: { contains: word, mode: "insensitive" } },
      { description: { contains: word, mode: "insensitive" } },
      { category: { contains: word, mode: "insensitive" } },
    ]
  }));

  try {
    const products = await prisma.product.findMany({
      where: { AND: conditions as any },
      take: 5, // Only show the top 5 results in the popup
    });
    return products;
  } catch (error) {
    return [];
  }
}