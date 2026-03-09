import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const reviews = await (prisma as any).review.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(reviews);
}