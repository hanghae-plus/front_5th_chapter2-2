import { CartItem as CartItemInfo } from "../../../../types.ts";
import { formatPrice } from "../../../utils/utils.ts";

interface CartItemProps {
  cartItem: CartItemInfo;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  getDiscountAppliedDisplay: (appliedDiscount: number) => string;
  getMaxApplicableDiscount: (item: CartItemInfo) => number;
}

const CartItem = ({
  cartItem,
  updateQuantity,
  removeFromCart,
  getDiscountAppliedDisplay,
  getMaxApplicableDiscount,
}: CartItemProps) => {
  const appliedDiscount = getMaxApplicableDiscount(cartItem);
  const discountDisplay = getDiscountAppliedDisplay(appliedDiscount);

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{cartItem.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {formatPrice(cartItem.product.price)} x {cartItem.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">{discountDisplay}</span>
          )}
        </span>
      </div>
      <div>
        <button
          onClick={() =>
            updateQuantity(cartItem.product.id, cartItem.quantity - 1)
          }
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
          disabled={cartItem.quantity <= 1}
        >
          -
        </button>
        <button
          onClick={() =>
            updateQuantity(cartItem.product.id, cartItem.quantity + 1)
          }
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(cartItem.product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
