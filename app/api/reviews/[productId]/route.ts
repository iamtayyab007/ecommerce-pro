import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { Review } from "@/models/Review";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) => {
  await connectDB();
  const reviews = await Review.find({
    productId: (await params).productId,
  }).populate("userId", "email");
  return NextResponse.json(reviews);
};
