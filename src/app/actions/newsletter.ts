"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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