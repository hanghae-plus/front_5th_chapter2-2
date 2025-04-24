import {CartItemView} from "./CartItem.tsx";
import {CartItem} from "../../types.ts";

interface CartItemListProps {
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  getItemAppliedDiscount: (item: CartItem) => number;
}

export const CartItemList = ({cart, updateQuantity, removeFromCart, getItemAppliedDiscount}: CartItemListProps) => {
  if (cart.length === 0) {
    return <p className="text-gray-500">장바구니가 비어있습니다.</p>;
  }

  return (
    <div className="space-y-2">
      {cart.map(item => (
        <CartItemView
          key={item.product.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          appliedDiscount={getItemAppliedDiscount(item)}
        />
      ))}
    </div>
  );
};
