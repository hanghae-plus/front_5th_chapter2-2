import { Button } from "../../ui/Button.tsx";
import { Product } from "../../../../types.ts";
import { Card } from "../../ui/Card.tsx";

type Props = {
  product: Product;
  addToCart: (item: Product) => void;
  remainingStock: number;
};

export const ProductItemCard = ({
  product,
  addToCart,
  remainingStock,
}: Props) => {
  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const handleClickAddToCart = () => addToCart(product);

  return (
    <Card data-testid={`product-${product.id}`}>
      <Card.Header className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">
          {product.price.toLocaleString()}원
        </span>
      </Card.Header>
      <Card.Content>
        <div className="text-sm text-gray-500 mb-2">
          <span
            className={`font-medium ${remainingStock > 0 ? "text-green-600" : "text-red-600"}`}
          >
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
                {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}%
                할인
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
      <Card.Footer>
        <Button
          onClick={handleClickAddToCart}
          variant={remainingStock > 0 ? "primary" : "default"}
          disabled={remainingStock <= 0}
          fullWidth
        >
          {remainingStock > 0 ? "장바구니에 추가" : "품절"}
        </Button>
      </Card.Footer>
    </Card>
  );
};
