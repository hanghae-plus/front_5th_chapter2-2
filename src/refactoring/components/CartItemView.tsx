import React from "react";
import { CartItem } from "../../types";
import { getMaxApplicableDiscount } from "../models/cart";
import { formatPrice } from "../utils/stringUtils";
import Button from "./common/Button";

interface ICartItemViewProps {
  item: CartItem;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemove: (productId: string) => void;
}

const CartItemView: React.FC<ICartItemViewProps> = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}) => {
  const { product, quantity } = item;

  const appliedDiscount = getMaxApplicableDiscount(item);

  const discountPercentage =
    appliedDiscount > 0
      ? `(${(appliedDiscount * 100).toFixed(0)}% 할인 적용)`
      : "";

  // 재고 상태에 따른 스타일 적용
  const stockStyle =
    product.stock === 0
      ? "text-red-600"
      : product.stock < 5
      ? "text-orange-500"
      : "text-green-600";

  const originalPrice = product.price * quantity;
  const discountedPrice = originalPrice * (1 - appliedDiscount);

  const isOutOfStock = product.stock <= quantity;

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow mb-2">
      <div className="flex-grow">
        <span className="font-semibold">{product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {formatPrice(product.price)} x {quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">{discountPercentage}</span>
          )}
        </span>
        <br />
        <span className={`text-sm ${stockStyle}`}>
          재고: {Math.max(0, product.stock - quantity)}개
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onDecreaseQuantity(product.id)}
          aria-label="수량 감소"
        >
          -
        </Button>
        <span className="px-2">{quantity}</span>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onIncreaseQuantity(product.id)}
          disabled={isOutOfStock}
          aria-label="수량 증가"
        >
          +
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onRemove(product.id)}
          className="ml-2"
          aria-label="상품 삭제"
        >
          삭제
        </Button>
      </div>
      <div className="ml-4 text-right">
        <div className="font-bold">{formatPrice(discountedPrice)}</div>
        {appliedDiscount > 0 && (
          <div className="text-sm line-through text-gray-500">
            {formatPrice(originalPrice)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItemView;
