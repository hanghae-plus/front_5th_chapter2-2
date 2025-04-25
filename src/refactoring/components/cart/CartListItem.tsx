import { CartItem as CartItemType } from '../../models/cart/types';
import { getQuantityDiscount } from '../../models/cart/lib';

interface Props {
  cart: CartItemType;
  onChangeQuantity: (productId: string, quantity: number) => void;
  onClickRemove: (productId: string) => void;
}

function CartListItem({ cart, onChangeQuantity, onClickRemove }: Props) {
  const appliedDiscount = getQuantityDiscount(cart);

  return (
    <div
      key={cart.product.id}
      className='flex justify-between items-center bg-white p-3 rounded shadow'>
      <div>
        <span className='font-semibold'>{cart.product.name}</span>
        <br />
        <span className='text-sm text-gray-600'>
          {cart.product.price}원 x {cart.quantity}
          {appliedDiscount > 0 && (
            <span className='text-green-600 ml-1'>
              {(appliedDiscount * 100).toFixed(0)}% 할인 적용
            </span>
          )}
        </span>
      </div>

      <div>
        <button
          className='bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400'
          onClick={() => onChangeQuantity(cart.product.id, cart.quantity - 1)}>
          -
        </button>
        <button
          className='bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400'
          onClick={() => onChangeQuantity(cart.product.id, cart.quantity + 1)}>
          +
        </button>
        <button
          onClick={() => onClickRemove(cart.product.id)}
          className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
          삭제
        </button>
      </div>
    </div>
  );
}

export default CartListItem;
