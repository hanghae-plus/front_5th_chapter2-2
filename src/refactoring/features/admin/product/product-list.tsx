import { useProductStore } from "../../../store/product-store";
import { ProductItem } from "./product-item";

export const ProductList = () => {
  const { products } = useProductStore();
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem product={product} index={index} />
      ))}
    </div>
  );
};
