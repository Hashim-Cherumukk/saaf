"use server";

import prisma from "@/lib/prisma";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please provide a valid email." };
  }

  try {
    await (prisma as any).newsletter.create({
      data: { email: email.toLowerCase() },
    });
    return { success: true };
  } catch (error: any) {
    // P2002 is the Prisma code for "This email already exists in the database"
    if (error.code === 'P2002') {
      return { error: "You are already on the list!" };
    }
    return { error: "Something went wrong. Please try again." };
  }
}