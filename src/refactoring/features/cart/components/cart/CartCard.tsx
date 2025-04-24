import { CartItem } from "@/types";
import { CartItemQuantityControls } from "./CartItemQuantityControls";
import { useCartItem } from "../../hooks";
interface Props {
  item: CartItem;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const CartCard = ({ item, updateQuantity, removeFromCart }: Props) => {
  const {
    productId,
    productName,
    quantity,
    formattedPrice,
    formattedDiscount,
    hasDiscount
  } = useCartItem(item);

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{productName}</span>
        <br />
        <span className="text-sm text-gray-600">
          {formattedPrice} x {quantity}
          {hasDiscount && (
            <span className="text-green-600 ml-1">
              ({formattedDiscount} 할인 적용)
            </span>
          )}
        </span>
      </div>
      <CartItemQuantityControls
        productId={productId}
        quantity={quantity}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};
