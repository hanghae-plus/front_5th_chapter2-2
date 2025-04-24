import { CartItem as CartItemInfo } from "../../../types";
import { CartItemAction } from "./CartItemAction";

export const CartItem = ({
  item,
  appliedDiscount,
  updateQuantity,
  removeFromCart,
}: {
  item: CartItemInfo;
  appliedDiscount: number;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}) => {
  return (
    <div
      key={item.product.id}
      className="flex justify-between items-center bg-white p-3 rounded shadow"
    >
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <CartItemAction
        item={item}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};
