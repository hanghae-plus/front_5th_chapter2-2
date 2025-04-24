import { Product } from '@/types';
import { formatCurrency } from '@/features/cart/utils';

export const ProductCardHeader = ({ product }: { product: Product }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="font-semibold">{product.name}</span>
    <span className="text-gray-600">{formatCurrency(product.price)}</span>
  </div>
);
