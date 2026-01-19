"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function SuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
    </div>
  );
}
