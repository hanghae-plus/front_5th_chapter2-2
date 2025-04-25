import type { Product } from '../../../../types.ts';
import { useCart } from '../../../hooks';
import { getMaxDiscount, getRemainingStock } from '../../../models/Product.ts';

export function ProductCard({ product }: { product: Product }) {
  const { cart } = useCart();
  const remainingStock = getRemainingStock(product, cart);

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

      {product.discounts.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {product.discounts.map((discount, index) => (
            <li key={index}>
              {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
            </li>
          ))}
        </ul>
      )}

      <AddToCartButton product={product} />
    </div>
  );
}

function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, cart } = useCart();
  const remainingStock = getRemainingStock(product, cart);

  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <button
      className={`w-full px-3 py-1 rounded ${
        remainingStock > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      disabled={remainingStock <= 0}
      onClick={handleAddToCart}
    >
      {remainingStock > 0 ? '장바구니에 추가' : '품절'}
    </button>
  );
}
