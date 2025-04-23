import { memo } from 'react';
import type { CartItem } from '../../types';

interface CartListItemProps {
  item: CartItem;
  appliedDiscount: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItemRow = (props: CartListItemProps) => {
  const { item, appliedDiscount, onIncrease, onDecrease, onRemove } = props;

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
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
        <button onClick={onDecrease} className="btn-gray">
          -
        </button>
        <button onClick={onIncrease} className="btn-gray">
          +
        </button>
        <button onClick={onRemove} className="btn-red">
          삭제
        </button>
      </div>
    </div>
  );
};

export default memo(CartItemRow);
