// components/ProductCard.tsx
import { Product, CartItem } from '../../shared/types/entities';
import { getRemainingStock, getMaxDiscount } from '../../shared/utils/cartUtils';
import { Button } from '../../../ui/Button';

interface Props {
  product: Product;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, cart, onAddToCart }: Props) => {
  const remainingStock = getRemainingStock(product, cart);
  const hasDiscount = product.discounts.length > 0;

  return (
    <div data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{product.price.toLocaleString()}원</span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <span className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          재고: {remainingStock}개
        </span>
        {hasDiscount && (
          <span className="ml-2 font-medium text-blue-600">
            최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
          </span>
        )}
      </div>
      {hasDiscount && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {product.discounts.map((d, i) => (
            <li key={i}>
              {d.quantity}개 이상: {(d.rate * 100).toFixed(0)}% 할인
            </li>
          ))}
        </ul>
      )}
      <Button
        role={remainingStock > 0 ? 'add' : 'disabled'}
        disabled={remainingStock <= 0}
        onClick={() => onAddToCart(product)}
      >
        {remainingStock > 0 ? '장바구니에 추가' : '품절'}
      </Button>
    </div>
  );
};
