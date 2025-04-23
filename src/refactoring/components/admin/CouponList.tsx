import { useAtom } from "jotai";
import { couponsAtom } from "../../store/coupons/atom.ts";

export const CouponList = () => {
  const [coupons] = useAtom(couponsAtom);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
      <div className="space-y-2">
        {coupons.length > 0 ? (
          coupons.map((coupon, index) => (
            <div
              key={index}
              data-testid={`coupon-${index + 1}`}
              className="bg-gray-100 p-2 rounded"
            >
              {coupon.name} ({coupon.code}):
              {coupon.discountType === "amount"
                ? `${coupon.discountValue}원`
                : `${coupon.discountValue}%`}{" "}
              할인
            </div>
          ))
        ) : (
          <div className="text-gray-500">등록된 쿠폰이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
