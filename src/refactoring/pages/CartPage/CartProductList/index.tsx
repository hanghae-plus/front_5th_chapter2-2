import { ListContainer } from "@/refactoring/components";
import { useProductContext } from "@/refactoring/provider";
import CartDiscountList from "./CartDiscountList";
import CartProductItem from "./CartProductItem";

export const CartProductList = () => {
  const { products } = useProductContext();

  return (
    <ListContainer>
      {products.map((product) => {
        return (
          <CartProductItem key={product.id} product={product}>
            <CartDiscountList product={product} />
          </CartProductItem>
        );
      })}
    </ListContainer>
  );
};
