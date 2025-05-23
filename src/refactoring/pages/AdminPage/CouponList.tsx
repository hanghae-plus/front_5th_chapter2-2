import { ListContainer } from "@/refactoring/components";
import { useCouponContext } from "@/refactoring/provider";

export const CouponList = () => {
  const { coupons } = useCouponContext();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
      <ListContainer>
        {coupons.map((coupon, index) => (
          <div key={index} data-testid={`coupon-${index + 1}`} className="bg-gray-100 p-2 rounded">
            {coupon.name} ({coupon.code}):
            {coupon.discountType === "amount" ? `${coupon.discountValue}원` : `${coupon.discountValue}%`} 할인
          </div>
        ))}
      </ListContainer>
    </div>
  );
};
