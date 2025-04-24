import { CartItem } from '../../../types';
import CartListItem from './CartListItem';

interface Props {
  cart: CartItem[];
  handleChangeQuantity: (productId: string, quantity: number) => void;
  handleClickRemove: (productId: string) => void;
}

function CartList({ cart, handleChangeQuantity, handleClickRemove }: Props) {
  return (
    <div>
      {' '}
      <h2 className='text-2xl font-semibold mb-4'>장바구니 내역</h2>
      <div className='space-y-2'>
        {cart.map((item) => (
          <CartListItem
            key={item.product.id}
            cart={item}
            onChangeQuantity={handleChangeQuantity}
            onClickRemove={handleClickRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default CartList;
