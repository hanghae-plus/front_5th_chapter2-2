import { useCartContext } from "../../../contexts/CartContext";
import { getAppliedDiscount } from "../../../models/product";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { cart } = useCartContext();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => {
          const appliedDiscount = getAppliedDiscount(item);

          return (
            <CartItem
              item={item}
              appliedDiscount={appliedDiscount}
              key={item.product.id}
            />
          );
        })}
      </div>
    </>
  );
};
