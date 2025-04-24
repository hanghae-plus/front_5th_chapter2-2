import { Discount } from "../../../../types";

export const ItemDiscountDisplay = ({ discount }: { discount: Discount }) => {
  return (
    <li>
      {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
    </li>
  );
};
