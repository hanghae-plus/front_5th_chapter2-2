import { CartItem } from "../../types";
import { Button } from "./Button";

interface CartListProps {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
}

// 장바구니에 담긴 상품 목록
export const CartList = ({
  cart,
  removeFromCart,
  updateQuantity,
}: CartListProps) => {
  const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  const updateQuantityButtonClassName =
    "bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400";

  return (
    <div className="space-y-2">
      {cart.map((item) => {
        const appliedDiscount = getAppliedDiscount(item);
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
            <div>
              <Button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                className={updateQuantityButtonClassName}
                text={"-"}
              />
              <Button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                className={updateQuantityButtonClassName}
                text={"+"}
              />
              <Button
                onClick={() => removeFromCart(item.product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                text={"삭제"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
