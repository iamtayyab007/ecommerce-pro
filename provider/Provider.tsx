"use client";
import { SessionProvider } from "next-auth/react";
import React, { useMemo } from "react";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const promise = useMemo(() => {
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <div>
      <CheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: promise }}
      >
        <SessionProvider>{children}</SessionProvider>
      </CheckoutProvider>
    </div>
  );
};

export default Provider;
