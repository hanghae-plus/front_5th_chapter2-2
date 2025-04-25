import { CartItemProps } from "../types";
import { QuantityControl } from "./quantity-control";
import { useCart } from "../../../4_features/cart/hooks";

export const CartItem = ({ cartItem }: CartItemProps) => {
  const { updateQuantity, removeFromCart, getAppliedDiscount } = useCart();

  const appliedDiscount = getAppliedDiscount(cartItem);

  const handleDecreaseClick = () => {
    updateQuantity(cartItem.product, cartItem.quantity - 1);
  };

  const handleIncreaseClick = () => {
    updateQuantity(cartItem.product, cartItem.quantity + 1);
  };

  const handleRemoveClick = () => {
    removeFromCart(cartItem.product);
  };

  return (
    <div
      className="flex justify-between items-center bg-white p-3 rounded shadow"
      data-testid={`cart-item-${cartItem.product.id}`}
    >
      <div>
        <span className="font-semibold">{cartItem.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {cartItem.product.price.toLocaleString()}원 x {cartItem.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <QuantityControl
        onDecreaseClick={handleDecreaseClick}
        onIncreaseClick={handleIncreaseClick}
        onRemoveClick={handleRemoveClick}
      />
    </div>
  );
};
