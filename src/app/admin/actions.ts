"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Secure Database Connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function createProduct(formData: FormData) {
  // 1. Extract the data from the form
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const image = formData.get("image") as string; // This will be the Cloudinary URL

  // 2. Extract sizes (if multiple are selected)
  const sizes = formData.getAll("sizes") as string[];

  // 3. Save to Neon Database
  await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      image,
      sizes,
      isNewArrival: true, // Automatically tag new products as New Arrivals
    },
  });

  // 4. Refresh the Admin Dashboard to show the new product, then send the user back there
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(formData: FormData) {
  // 1. Get the unique ID of the product we are editing
  const id = formData.get("id") as string;
  
  // 2. Extract the standard fields
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const sizes = formData.getAll("sizes") as string[];

  // 3. Handle the optional Sale Price (compareAtPrice)
  const compareAtPriceRaw = formData.get("compareAtPrice");
  const compareAtPrice = compareAtPriceRaw ? parseFloat(compareAtPriceRaw as string) : null;

  // 4. Handle the Storefront Toggles (Checkboxes send "on" if checked)
  const inStock = formData.get("inStock") === "on";
  const isFeatured = formData.get("isFeatured") === "on";
  const isBestSeller = formData.get("isBestSeller") === "on";

  // 5. Update the specific row in Neon
  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      compareAtPrice,
      category,
      image,
      sizes,
      inStock,
      isFeatured,
      isBestSeller,
    },
  });

  // 6. Refresh the dashboard and redirect
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  // Permanently remove from Neon
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin");
  redirect("/admin");
}