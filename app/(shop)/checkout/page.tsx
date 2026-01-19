"use client";
import CheckoutForm from "@/app/components/stripe/CheckoutForm";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51SrCxt0xWlQoalV9GsQM0y3osR2pfqcgnAtxoVfWT2Fq38ggx4yBK2fbTLNcmWeig49wo4h2m5jvi0lJigp6o1Qo00eODGLnqP",
);

export default function App() {
  const promise = useMemo(async () => {
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: promise }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  );
}
