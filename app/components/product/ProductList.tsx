"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

const ProductList = ({ products }: { products: any[] }) => {
  const { addItem, items } = useCartStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((item) => {
        const isAdded = items.some((i) => i._id === item._id);

        return (
          <div key={item._id} className="border p-4 rounded hover:shadow">
            <Link href={`/products/${item._id}`}>
              <h2 className="font-semibold text-black">{item.title}</h2>
              <p className="text-sm text-gray-500">${item.price}</p>
            </Link>

            <button
              onClick={() =>
                addItem({
                  _id: item._id,
                  title: item.title,
                  price: item.price,
                  quantity: 1,
                })
              }
              disabled={isAdded}
              className="mt-2 px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              {isAdded ? "Already Added" : "Add To Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
