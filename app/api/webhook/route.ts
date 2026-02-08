import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sendNodemailerEmail } from "@/lib/nodemailer/nodemailer";

export const POST = async (req: Request) => {
  const body = await req.text();

  const sig = (await headers()).get("stripe-signature")!;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      console.log("session", session);
      const userId = session.metadata.userId;
      const email = session.customer_details.email;
      const items = JSON.parse(session.metadata.cart);
      await connectDB();
      await Order.create({
        userId,
        items,
        stripeSessionId: session.id,
        totalAmount: session.amount_total / 100,
        paymentStatus: "paid",
        paymentIntentId:session.payment_intent
      });
      sendNodemailerEmail({ email }).catch(console.error);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
};
