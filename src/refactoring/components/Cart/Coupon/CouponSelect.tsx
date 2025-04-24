import { Coupon } from "../../../../types";

export const CouponSelect = ({
  coupon,
  couponIndex,
}: {
  coupon: Coupon;
  couponIndex: number;
}) => {
  return (
    <option key={coupon.code} value={couponIndex}>
      {coupon.name} -{" "}
      {coupon.discountType === "amount"
        ? `${coupon.discountValue}원`
        : `${coupon.discountValue}%`}
    </option>
  );
};
