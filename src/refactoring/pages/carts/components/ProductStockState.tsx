import { Product } from '../../../../types';

type ProductInfoProps = {
  product: Product;
  remainingStock: number;
  getMaxDiscount: (discounts: { quantity: number; rate: number }[]) => number;
};

export const ProductStockState = ({
  product,
  remainingStock,
  getMaxDiscount,
}: ProductInfoProps) => {
  return (
    <div className="text-sm text-gray-500 mb-2">
      <span className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        재고: {remainingStock}개
      </span>
      {product.discounts.length > 0 && (
        <span className="ml-2 font-medium text-blue-600">
          최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
        </span>
      )}
    </div>
  );
};
