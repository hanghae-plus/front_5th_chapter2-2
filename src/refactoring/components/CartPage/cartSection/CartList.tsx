import type { CartItem } from '@/types';
import { getAppliedDiscount } from '@/models/index.ts';

import CartListItem from './CartListItem.tsx';

interface CartListProps {
  cart: CartItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartList = (props: CartListProps) => {
  const { cart, onIncrease, onDecrease, onRemove } = props;

  return (
    <div className="space-y-2">
      {cart.map((item) => (
        <CartListItem
          key={item.product.id}
          item={item}
          appliedDiscount={getAppliedDiscount(item)}
          onIncrease={() => onIncrease(item.product.id)}
          onDecrease={() => onDecrease(item.product.id)}
          onRemove={() => onRemove(item.product.id)}
        />
      ))}
    </div>
  );
};

export default CartList;
