import { CartItem as CartItemInfo } from "../../../../types";
import CartItem from "./CartItem";
interface CartListProps {
  cart: CartItemInfo[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  getDiscountAppliedDisplay: (appliedDiscount: number) => string;

  getMaxApplicableDiscount: (item: CartItemInfo) => number;
}

const CartList = ({
  cart,
  updateQuantity,
  removeFromCart,
  getDiscountAppliedDisplay,
  getMaxApplicableDiscount,
}: CartListProps) => {
  return (
    <>
      <div className="space-y-2">
        {cart.map((cartItem) => (
          <CartItem
            key={cartItem.product.id}
            cartItem={cartItem}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            getDiscountAppliedDisplay={getDiscountAppliedDisplay}
            getMaxApplicableDiscount={getMaxApplicableDiscount}
          />
        ))}
      </div>
    </>
  );
};

export default CartList;
