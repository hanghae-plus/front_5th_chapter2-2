import type { CartItem } from '../../../../types.ts';
import { useCart } from '../../../hooks';
import { getMaxApplicableDiscount } from '../../../models/Cart.ts';

export function CartCard({ item }: { item: CartItem }) {
  const appliedDiscount = getMaxApplicableDiscount(item);

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">({(appliedDiscount * 100).toFixed(0)}% 할인 적용)</span>
          )}
        </span>
      </div>

      <div>
        <DecreaseQuantityButton item={item} />

        <IncreaseQuantityButton item={item} />

        <RemoveFromCartButton item={item} />
      </div>
    </div>
  );
}

function RemoveFromCartButton({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();

  return (
    <button
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      onClick={() => removeFromCart(item.product.id)}
    >
      삭제
    </button>
  );
}

function IncreaseQuantityButton({ item }: { item: CartItem }) {
  const { updateQuantity } = useCart();

  return (
    <button
      className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
    >
      +
    </button>
  );
}

function DecreaseQuantityButton({ item }: { item: CartItem }) {
  const { updateQuantity } = useCart();

  return (
    <button
      className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
    >
      -
    </button>
  );
}
