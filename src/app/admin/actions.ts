"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  // 1. Extract the data from the form
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;

  // The main thumbnail
  const image = formData.get("image") as string;

  // NEW: Extract the array of extra images (the gallery)
  const gallery = formData.getAll("gallery") as string[];

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
      gallery, // <-- Saving the array to your Neon database
      sizes,
      isNewArrival: true,
    },
  });

  // 4. Refresh the Admin Dashboard to show the new product, then send the user back there
  revalidatePath("/", "layout");
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

  // NEW: Extract the array of extra images
  const gallery = formData.getAll("gallery") as string[];

  const sizes = formData.getAll("sizes") as string[];

  // 3. Handle the optional Sale Price (compareAtPrice)
  const compareAtPriceRaw = formData.get("compareAtPrice");
  const compareAtPrice = compareAtPriceRaw ? parseFloat(compareAtPriceRaw as string) : null;

  // 4. Handle the Storefront Toggles
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
      gallery, // <-- Updating the array in your Neon database
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

export async function updateStoreSettings(formData: FormData) {
  const announcementText = formData.get("announcementText") as string;
  const isAnnouncementOn = formData.get("isAnnouncementOn") === "on";

  // Safely parse the number, defaulting to 5000 if empty
  const freeShippingGoalRaw = formData.get("freeShippingGoal");
  const freeShippingGoal = freeShippingGoalRaw ? parseFloat(freeShippingGoalRaw as string) : 5000;

  // Upsert: If the settings row doesn't exist, create it. If it does, update it.
  await (prisma as any).storeSettings.upsert({
    where: { id: "saaf-settings" },
    update: { announcementText, isAnnouncementOn, freeShippingGoal },
    create: { id: "saaf-settings", announcementText, isAnnouncementOn, freeShippingGoal },
  });

  // Smash the cache so the storefront updates instantly!
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function getStoreSettings() {
  const settings = await (prisma as any).storeSettings.findUnique({
    where: { id: "saaf-settings" },
  });

  // If it doesn't exist yet, return the default fallbacks
  return settings || {
    announcementText: "Complimentary Global Shipping on Orders over ₹5000",
    isAnnouncementOn: true,
    freeShippingGoal: 5000
  };
}

export async function addInstaPost(formData: FormData) {
  const imageUrl = formData.get("imageUrl") as string;
  const link = formData.get("link") as string;

  // Using 'as any' to bypass the stubborn VS Code cache!
  await (prisma as any).instaPost.create({
    data: {
      imageUrl,
      link: link || "", // Fallback to empty string for safety
    },
  });

  revalidatePath("/", "layout");
}

export async function deleteInstaPost(formData: FormData) {
  const id = formData.get("id") as string;

  await (prisma as any).instaPost.delete({
    where: { id }
  });

  revalidatePath("/", "layout");
}

export async function toggleReviewPublish(formData: FormData) {
  const id = formData.get("id") as string;
  const currentStatus = formData.get("currentStatus") === "true"; // Reads the hidden input

  await (prisma as any).review.update({
    where: { id },
    data: { isPublished: !currentStatus }, // Flips it from true to false, or false to true
  });

  revalidatePath("/", "layout");
}

export async function deleteReview(formData: FormData) {
  const id = formData.get("id") as string;

  await (prisma as any).review.delete({
    where: { id }
  });

  revalidatePath("/", "layout");
}

export async function addReview(formData: FormData) {
  const name = formData.get("name") as string;
  const productName = formData.get("productName") as string; // We use this for Client Details now!
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;

  await (prisma as any).review.create({
    data: {
      name,
      productName: productName || "", // Fallback to empty string if left blank
      rating,
      comment,
      isPublished: true,
    },
  });

  revalidatePath("/", "layout");
}