import { Coupon } from "../../../../types";

// 쿠폰 할인 적용
// 순수(coupon)
export const getApplyCouponDiscount = (
    totalAmount: number,
    coupon: Coupon | null
) => {
    if (!coupon) return totalAmount;
    let discountedTotal = totalAmount;

    if (coupon.discountType === "amount") {
        discountedTotal = Math.max(0, discountedTotal - coupon.discountValue);
    } else if (coupon.discountType === "percentage") {
        discountedTotal = discountedTotal * (1 - coupon.discountValue / 100);
    }

    return discountedTotal;
};
