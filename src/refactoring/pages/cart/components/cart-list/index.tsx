import { useCartContext } from "@r/model/cart/cart-context";
import { CartItem } from "./cart-item";

interface CartListProps {}

export const CartList: React.FC<CartListProps> = () => {
  const { cart: cartList } = useCartContext();

  return (
    <div className="space-y-2">
      {cartList.map((item) => (
        <CartItem key={item.product.id} item={item} />
      ))}
    </div>
  );
};
