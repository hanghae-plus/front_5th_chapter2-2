import React, { useMemo } from "react";
import type { ICartItem } from "#src/types";
import { useCart } from "#src/refactoring/pages/cart/_hooks/useCart";

interface IProps {
  cartItem: ICartItem;
}

const CartProduct: React.FC<IProps> = ({ cartItem }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const appliedDiscount = useMemo(() => {
    const { quantity } = cartItem;
    const { discounts } = cartItem.product;

    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }

    return appliedDiscount;
  }, [cartItem]);

  return (
    <li className="flex justify-between carts-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{cartItem.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {cartItem.product.price}원 x {cartItem.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">({(appliedDiscount * 100).toFixed(0)}% 할인 적용)</span>
          )}
        </span>
      </div>
      <div>
        <button
          onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity - 1)}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity + 1)}
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
    </li>
  );
};

export default React.memo(CartProduct);
