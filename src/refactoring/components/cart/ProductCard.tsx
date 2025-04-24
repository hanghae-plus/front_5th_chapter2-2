import { Product } from "../../../types";
import { Button, Text } from "../common";

interface ProductCardProps {
  product: Product;
  remainingStock: number;
  onAddToCart: (product: Product) => void;
  getMaxDiscount: (discounts: { quantity: number; rate: number }[]) => number;
}

export const ProductCard = ({
  product,
  remainingStock,
  onAddToCart,
  getMaxDiscount,
}: ProductCardProps) => {
  return (
    <div
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <Text weight="semibold">{product.name}</Text>
        <Text color="gray">{product.price.toLocaleString()}원</Text>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <Text weight="medium" color={remainingStock > 0 ? "green" : "red"}>
          재고: {remainingStock}개
        </Text>
        {product.discounts.length > 0 && (
          <Text weight="medium" color="blue" className="ml-2">
            최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
          </Text>
        )}
      </div>
      {product.discounts.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {product.discounts.map((discount, index) => (
            <li key={index}>
              {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}%
              할인
            </li>
          ))}
        </ul>
      )}
      <Button
        onClick={() => onAddToCart(product)}
        color={remainingStock > 0 ? "blue" : "gray"}
        className="w-full px-3 py-1"
        disabled={remainingStock <= 0}
      >
        {remainingStock > 0 ? "장바구니에 추가" : "품절"}
      </Button>
    </div>
  );
};
