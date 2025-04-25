import { useProducts } from "../../../4_features/product/hooks";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const { products } = useProducts();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
