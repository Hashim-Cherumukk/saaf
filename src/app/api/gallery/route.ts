import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await (prisma as any).instaPost.findMany();
  return NextResponse.json(posts);
}