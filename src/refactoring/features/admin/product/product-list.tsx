import { useProductStore } from "../../../store/product-store";
import { ListWrapper } from "../../../ui/list-wrapper";
import { ProductItem } from "./product-item";

export const ProductList = () => {
  const { products } = useProductStore();
  return (
    <ListWrapper>
      {products.map((product, index) => (
        <ProductItem product={product} index={index} />
      ))}
    </ListWrapper>
  );
};
