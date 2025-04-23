import { CartItem } from "../../../types";
import { getAppliedDiscount } from "../../models/cart";

interface CartItemListProps {
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartList = ({
  cartItems,
  updateQuantity,
  removeFromCart,
}: CartItemListProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
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
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white p-3 rounded shadow text-center text-gray-500">
            장바구니가 비어있습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default CartList;
