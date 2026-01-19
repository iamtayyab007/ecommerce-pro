"use client";

import { useCartStore } from "@/store/cart";

export default function CheckoutButton() {
  const items = useCartStore((state) => state.items);

  const checkout = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={checkout}
      className="mt-4 w-full bg-green-600 text-white py-2 rounded"
    >
      Checkout
    </button>
  );
}
