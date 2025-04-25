import { CartItem } from "./cart-item";
import { useCart } from "../../../4_features/cart/hooks";

export const CartList = () => {
  const { cart } = useCart();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2" data-testid="cart-list">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.product.id} cartItem={cartItem} />
        ))}
      </div>
    </>
  );
};
