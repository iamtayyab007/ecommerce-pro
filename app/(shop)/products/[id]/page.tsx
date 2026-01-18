import { useCartStore } from "@/store/cart";

const getProductById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  const result = await res.json();
  console.log("result 1", result);
  return result.productList;
};

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const addItems = useCartStore((state) => state.addItem);
  const { id } = await params;
  const result = await getProductById(id);
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{result.title}</h1>
      <p className="mt-2 text-gray-600">{result.description}</p>
      <p className="mt-4 font-semibold">${result.price}</p>
      <button
        onClick={() =>
          addItems({
            _id: result._id,
            title: result.title,
            price: result.price,
            quantity: 1,
          })
        }
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
