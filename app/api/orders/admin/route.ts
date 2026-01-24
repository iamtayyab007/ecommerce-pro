import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.role) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ message: "forbidden" }, { status: 403 });
  }

  //const userId = session.user.id;
  await connectDB();
  const OrderHistory = await Order.find()
    .populate("userId", "email")
    .sort({ createdAt: -1 });
  return NextResponse.json(
    {
      message: "order History for admin dashboard fetched succesfully",
      OrderHistory,
    },
    { status: 200 },
  );
};
