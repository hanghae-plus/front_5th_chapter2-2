import { Product } from "../../../types.ts";
import { getMaxDiscount } from "../../utils/cart.ts";
import { Button } from "../ui/Button.tsx";
import { Card } from "../ui/Card.tsx";

export const ProductCard = ({
                              product,
                              remainingStock,
                              onAddToCart,
                            }: {
  product: Product;
  remainingStock: number;
  onAddToCart: () => void;
}) => {
  return (
    <Card data-testid={`product-${product.id}`}>
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
      <Button onClick={onAddToCart} disabled={remainingStock <= 0} className="w-full">
        {remainingStock > 0 ? '장바구니에 추가' : '품절'}
      </Button>
    </Card>
  );
};