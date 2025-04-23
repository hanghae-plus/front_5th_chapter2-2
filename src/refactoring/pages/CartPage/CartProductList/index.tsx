import { useProductContext } from "@/refactoring/provider";
import CartDiscountList from "./CartDiscountList";
import CartProductItem from "./CartProductItem";

export const CartProductList = () => {
  const { products } = useProductContext();

  return (
    <div className="space-y-2">
      {products.map((product) => {
        return (
          <CartProductItem key={product.id} product={product}>
            <CartDiscountList product={product} />
          </CartProductItem>
        );
      })}
    </div>
  );
};
