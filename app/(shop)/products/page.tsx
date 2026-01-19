import ProductList from "@/app/components/product/ProductList";

const getProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const result = await res.json();
  return result.productList;
};

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <div className="p-8">
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
