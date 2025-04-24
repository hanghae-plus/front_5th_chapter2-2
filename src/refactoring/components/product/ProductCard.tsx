import { ReactNode } from 'react';
import { getMaxDiscount } from '@/refactoring/models/cart';
import { Product } from '@/types';

interface ProductCardProps {
  remainingStock: number;
  product: Product;
  children: ReactNode;
}

export const ProductCard = ({
  remainingStock,
  product,
  children,
}: ProductCardProps) => {
  const { id, name, price, discounts } = product;

  return (
    <div
      data-testid={`product-${id}`}
      className='bg-white p-3 rounded shadow'
    >
      <div className='flex justify-between items-center mb-2'>
        <span className='font-semibold'>{name}</span>
        <span className='text-gray-600'>{price.toLocaleString()}원</span>
      </div>
      <div className='text-sm text-gray-500 mb-2'>
        <span
          className={`font-medium ${
            remainingStock > 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          재고: {remainingStock}개
        </span>
        {discounts.length > 0 && (
          <span className='ml-2 font-medium text-blue-600'>
            최대 {(getMaxDiscount(discounts) * 100).toFixed(0)}% 할인
          </span>
        )}
      </div>
      {discounts.length > 0 && (
        <ul className='list-disc list-inside text-sm text-gray-500 mb-2'>
          {discounts.map((discount, index) => (
            <li key={index}>
              {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}%
              할인
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
};
