import { CartItem, Product } from '../../../../../types';
import { getRemainingStock, getMaxDiscount } from '../../../../models/cart';

export interface ProductItemProps {
  product: Product;
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const ProductItem = ({ product, cart, addToCart }: ProductItemProps) => {
  const remainingStock = getRemainingStock({ cart, product });

  const isSoldOut = remainingStock <= 0;
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
        {product.discounts.length > 0 && (
          <span className="ml-2 font-medium text-blue-600">
            최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
          </span>
        )}
      </div>
      <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
        {product.discounts.map((discount, index) => (
          <li key={index}>
            {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
          </li>
        ))}
      </ul>
      <button
        onClick={() => addToCart(product)}
        className={`w-full px-3 py-1 rounded ${
          isSoldOut
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        disabled={isSoldOut}>
        {isSoldOut ? '품절' : '장바구니에 추가'}
      </button>
    </div>
  );
};

const ProductList = () => {
  return <></>;
};
