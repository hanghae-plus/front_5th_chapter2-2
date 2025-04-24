import { HTMLAttributes } from "react";
import { Discount } from "../../types";

interface DiscountViewProps extends HTMLAttributes<HTMLDivElement> {
  discount: Discount;
}

export const DiscountView = ({ discount, ...props }: DiscountViewProps) => {
  return (
    <div className="mb-2" {...props}>
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
    </div>
  );
};
