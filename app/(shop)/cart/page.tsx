"use client";
import { useCartStore } from "@/store/cart";

const CartPage = () => {
  const { addItem, items } = useCartStore();
  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1>Cart is empty</h1>
      </div>
    );
  }
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
    </div>
  );
};

export default CartPage;
