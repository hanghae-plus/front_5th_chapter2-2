import { HTMLAttributes } from "react";
import { Discount } from "../../types";

interface DiscountListViewProps extends HTMLAttributes<HTMLUListElement> {
  discounts: Discount[];
}

export const DiscountListView = ({
  discounts,
  ...props
}: DiscountListViewProps) => {
  if (!discounts.length) return null;
  return (
    <ul className="list-disc list-inside text-sm text-gray-500 mb-2" {...props}>
      {discounts.map((discount, index) => (
        <li key={index}>
          {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
        </li>
      ))}
    </ul>
  );
};
