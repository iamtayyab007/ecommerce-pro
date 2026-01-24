"use client";

import { useCartStore } from "@/store/cart";

const Checkout = () => {
  const items = useCartStore((state) => state.items);
  console.log(items);
  const fetchFn = async () => {
    const response = await fetch("/api/checkout-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      }),
    });
    const data = await response.json();
    window.location.href = data.url;
  };

  return (
    <div>
      <button onClick={fetchFn}>checkout</button>
    </div>
  );
};

export default Checkout;
