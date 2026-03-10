import prisma from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://saafcouture.vercel.app";

  const products = await prisma.product.findMany({
    select: { id: true, updatedAt: true }
  });

  const productUrls = products.map((product) => ({
    url: `${siteUrl}/shop/${product.id}`,
    lastModified: product.updatedAt,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}