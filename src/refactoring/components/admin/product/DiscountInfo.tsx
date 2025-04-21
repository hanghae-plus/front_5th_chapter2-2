import type { Discount } from "../../../types";

interface DiscountInfoProps {
  discount: Discount;
}

export const DiscountInfo = ({ discount }: DiscountInfoProps) => {
  return (
    <div className="mb-2">
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
    </div>
  );
};
