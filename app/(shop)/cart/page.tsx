"use client";

import Checkout from "@/app/components/cart/checkout/CheckoutButton";
import { useCartStore } from "@/store/cart";

const CartPage = () => {
  const {
    addItem,
    items,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    totalPrice,
  } = useCartStore();
  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1>Cart is empty</h1>
      </div>
    );
  }
  return (
    <>
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {items.map((i) => (
          <div
            key={i._id}
            className="flex justify-between items-center mb-4 border-b pb-2"
          >
            <div>
              <h2>{i.title}</h2>
              <p>{i.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => decreaseQuantity(i._id)}>-</button>
              <span>{i.quantity}</span>
              <button onClick={() => increaseQuantity(i._id)}>+</button>
            </div>

            <button onClick={() => removeItem(i._id)}>Remove</button>
          </div>
        ))}
        <div className="mt-6 font-semibold">Total: ${totalPrice()}</div>
      </div>

      <div className="flex justify-center items-center p-5 bg-green-400 w-[screen]">
        <Checkout />
      </div>
    </>
  );
};

export default CartPage;
