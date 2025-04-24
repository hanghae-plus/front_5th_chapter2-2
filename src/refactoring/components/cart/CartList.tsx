import { CartItem } from "../../../types";
import { Button } from "../common/Button";

interface Props {
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const CartList = ({ cart, updateQuantity, removeFromCart }: Props) => {
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

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

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
                  title="-"
                  color="gray"
                  handler={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                />
                <Button
                  title="+"
                  color="gray"
                  handler={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                />
                <Button
                  title="삭제"
                  color="red"
                  handler={() => removeFromCart(item.product.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
