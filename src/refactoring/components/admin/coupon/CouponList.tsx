import type { CouponItem } from "../../../types";

interface CouponListProps {
  index: number;
  coupon: CouponItem;
}

export const CouponList = ({ index, coupon }: CouponListProps) => {
  return (
    <div
      data-testid={`coupon-${index + 1}`}
      className="bg-gray-100 p-2 rounded"
    >
      {coupon.name} ({coupon.code}):
      {coupon.discountType === "amount"
        ? `${coupon.discountValue}원`
        : `${coupon.discountValue}%`}{" "}
      할인
    </div>
  );
};
