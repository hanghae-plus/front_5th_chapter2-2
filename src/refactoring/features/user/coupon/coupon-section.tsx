import { Coupon } from "@refactoring/entities";
import { useCoupons } from "@refactoring/hooks";
import { CardWithTitle } from "@refactoring/ui";

interface Props {
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}

export const CouponSection = (props: Props) => {
  const { selectedCoupon, applyCoupon } = props;
  const { coupons } = useCoupons();

  return (
    <CardWithTitle title="쿠폰 적용">
      <select
        onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} -{" "}
            {coupon.discountType === "amount"
              ? `${coupon.discountValue}원`
              : `${coupon.discountValue}%`}
          </option>
        ))}
      </select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{" "}
          할인)
        </p>
      )}
    </CardWithTitle>
  );
};
