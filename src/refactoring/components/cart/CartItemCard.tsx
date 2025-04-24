import { MouseEvent } from 'react';
import { Button } from '../ui';
import { getAppliedDiscountRate } from '@/refactoring/models/cart';
import type { CartItem } from '@/types';

interface CartItemCardProps {
  item: CartItem;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const CartItemCard = ({
  item,
  updateQuantity,
  removeFromCart,
}: CartItemCardProps) => {
  const { product, quantity } = item;
  const { id, name, price } = product;

  const appliedDiscountRate = getAppliedDiscountRate(item);

  const handleClickQuantity = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const change = target.dataset.change;

    if (change) {
      updateQuantity(id, quantity + Number(change));
    }
  };

  const handleClickDelete = () => {
    removeFromCart(id);
  };

  return (
    <div
      key={item.product.id}
      className='flex justify-between items-center bg-white p-3 rounded shadow'
    >
      <div>
        <span className='font-semibold'>{name}</span>
        <br />
        <span className='text-sm text-gray-600'>
          {price}원 x {quantity}
          {appliedDiscountRate > 0 && (
            <span className='text-green-600 ml-1'>
              ({(appliedDiscountRate * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <div>
        <Button
          className='px-2 py-1 mr-1'
          variant='solid'
          color='gray'
          data-change='-1'
          onClick={handleClickQuantity}
        >
          -
        </Button>
        <Button
          className='px-2 py-1 mr-1'
          variant='solid'
          color='gray'
          data-change='1'
          onClick={handleClickQuantity}
        >
          +
        </Button>
        <Button
          className='px-2 py-1'
          variant='solid'
          color='red'
          onClick={handleClickDelete}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};
