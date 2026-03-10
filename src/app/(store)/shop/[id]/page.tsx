import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "@/app/(store)/shop/[id]/ProductDetails";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saafcouture.vercel.app";

  return {
    title: `${product.name} | Saaf Couture`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Saaf Couture`,
      description: product.description,
      url: `${siteUrl}/shop/${product.id}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/shop/${product.id}`,
    },
  };
}

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