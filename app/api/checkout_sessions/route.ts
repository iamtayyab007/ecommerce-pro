import { stripe } from "@/lib/Stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { items } = req.json();

    const session = await stripe.checkout.sessions.create({
      line_items: items.map((i: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: i.title,
          },
          unit_amount: Math.round(i.price * 100),
        },
        quantity: i.quantity,
      })),

      mode: "payment",
      ui_mode: "custom",
      // The URL of your payment completion page
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    NextResponse.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
