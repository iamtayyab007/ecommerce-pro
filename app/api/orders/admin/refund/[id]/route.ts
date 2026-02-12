import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "access forbidden" },
        { status: 403 },
      );
    }
    await connectDB();
    const id = (await params).id;
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json("order not found", { status: 404 });
    }
    if (order.paymentStatus === "refunded") {
      return NextResponse.json("already refunded", { status: 400 });
    }
    await stripe.refunds.create({
      payment_intent: order.paymentIntentId,
    });
    order.paymentStatus = "refunded";
    order.orderStatus = "cancelled";
    await order.save();
    return Response.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
