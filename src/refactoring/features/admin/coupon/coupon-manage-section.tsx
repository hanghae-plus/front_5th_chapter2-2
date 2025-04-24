import { CouponInputForm } from "@refactoring/entities/coupon/coupon-input-form";
import { useCoupons } from "@refactoring/hooks";

import { ListWrapper, Section } from "@refactoring/ui";
import { formatCurrency, formatPercent } from "@refactoring/utils/formatter";

export const CouponManageSection = () => {
  const { coupons, newCoupon, updateNewCoupon, handleAddCoupon } = useCoupons();
  return (
    <Section title="쿠폰 관리">
      <div className="bg-white p-4 rounded shadow">
        <CouponInputForm coupon={newCoupon} onChange={updateNewCoupon} onSubmit={handleAddCoupon} />
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <ListWrapper>
            {coupons.map((coupon, index) => (
              <div
                key={index}
                data-testid={`coupon-${index + 1}`}
                className="bg-gray-100 p-2 rounded"
              >
                {coupon.name} ({coupon.code}):
                {coupon.discountType === "amount"
                  ? formatCurrency(coupon.discountValue)
                  : formatPercent(coupon.discountValue)}
                {""} 할인
              </div>
            ))}
          </ListWrapper>
        </div>
      </div>
    </Section>
  );
};
