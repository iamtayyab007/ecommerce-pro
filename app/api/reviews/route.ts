import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { Review } from "@/models/Review";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { productId, rating, comment } = await req.json();
  await connectDB();
  const hasBought = await Order.exists({
    userId,
    paymentStatus: "paid",
    "items.productId": productId,
  });
  if (!hasBought) {
    return NextResponse.json(
      { message: "you must pruchase before reviewing" },
      { status: 403 },
    );
  }

  const review = Review.create({
    userId,
    productId,
    rating,
    comment,
  });
  return NextResponse.json(review);
};
