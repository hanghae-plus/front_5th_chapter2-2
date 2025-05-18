import { CartItem } from "../../../types";
import { getAppliedDiscount } from "../../calculations/cart";
import { CartItemCard } from "./CartItemCard";

interface CartItemCardListProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const CartItemCardList = ({
  cart,
  updateQuantity,
  removeFromCart,
}: CartItemCardListProps) => {
  return (
    <div className="space-y-2">
      {cart.map((item) => {
        const appliedDiscount = getAppliedDiscount(item);
        return (
          <CartItemCard
            key={item.product.id}
            item={item}
            appliedDiscount={appliedDiscount}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
};
