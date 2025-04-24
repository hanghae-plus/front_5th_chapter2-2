import { Product, CartItem as CartItemInfo } from "../../../../types.ts";
import { formatPrice } from "../../../utils/utils.ts";
import {
  getRemainingStock,
  getMaxDiscountDisplay,
} from "../../../models/cart.ts";

interface ProductItemProps {
  product: Product;
  cart: CartItemInfo[];
  addToCart: (product: Product) => void;
}

const ProductItem = ({ product, cart, addToCart }: ProductItemProps) => {
  const remainingStock = getRemainingStock(product, cart);

  const getStockStatusClass = (stock: number) =>
    stock > 0 ? "text-green-600" : "text-red-600";

  const getAddToCartButtonClass = (stock: number) =>
    stock > 0
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <div
      key={product.id}
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{formatPrice(product.price)}</span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <span
          className={`font-medium ${getStockStatusClass(remainingStock)}`} // 재고 상태에 따른 색상 적용
        >
          재고: {remainingStock}개
        </span>
        {product.discounts.length > 0 && (
          <span className="ml-2 font-medium text-blue-600">
            {getMaxDiscountDisplay(product)}
          </span>
        )}
      </div>
      {product.discounts.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {product.discounts.map((discount, index) => (
            <li key={index}>
              {`${discount.quantity}개 이상: ${(discount.rate * 100).toFixed(
                0
              )}% 할인`}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => addToCart(product)}
        className={`w-full px-3 py-1 rounded ${getAddToCartButtonClass(
          remainingStock
        )}`}
        disabled={remainingStock <= 0}
      >
        {remainingStock > 0 ? "장바구니에 추가" : "품절"}
      </button>
    </div>
  );
};

export default ProductItem;
