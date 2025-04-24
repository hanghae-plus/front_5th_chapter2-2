import { Coupon } from "../../../../types.ts";
import { ChangeEvent } from "react";
import { Card } from "../../ui/Card.tsx";

type Props = {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
};

export const CouponSelectCard = ({
  coupons,
  selectedCoupon,
  applyCoupon,
}: Props) => {
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    applyCoupon(coupons[parseInt(e.target.value)]);
  };

  return (
    <Card size="lg">
      <Card.Header className="text-2xl font-semibold mb-2">
        쿠폰 적용
      </Card.Header>
      <Card.Content>
        <select
          onChange={handleChangeSelect}
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
      </Card.Content>
    </Card>
  );
};
