import type { Product } from '../../../../../types.ts';

export function ProductDiscountView({ product }: { product: Product }) {
  return (
    <>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
        </div>
      ))}
    </>
  );
}
