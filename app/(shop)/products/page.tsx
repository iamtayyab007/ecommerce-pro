import Link from "next/link";
import { useCartStore } from "@/store/cart";

const getProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const result = await res.json();
  return result.productList;
};

const ProductPage = async () => {
  const { addItem, items } = useCartStore();

  const result = await getProducts();
  console.log(result);
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {result &&
        result.length > 0 &&
        result.map((item: any) => (
          <>
            <Link
              key={item._id}
              href={`/products/${item._id}`}
              className="border p-4 rounded hover:shadow"
            >
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
              disabled={items.some((i) => i._id === item._id) ? true : false}
            >
              {items.some((i: any) => i._id === item._id)
                ? "Already Added"
                : "Add To Cart"}
            </button>
          </>
        ))}
    </div>
  );
};

export default ProductPage;
