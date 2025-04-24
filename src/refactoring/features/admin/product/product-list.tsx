import { useProductStore } from "@refactoring/store/product-store";
import { ListWrapper } from "@refactoring/ui";
import { ProductItem } from "./product-item";

export const ProductList = () => {
  const { products } = useProductStore();
  return (
    <ListWrapper>
      {products.map((product, index) => (
        <ProductItem key={product.id} product={product} index={index} />
      ))}
    </ListWrapper>
  );
};
