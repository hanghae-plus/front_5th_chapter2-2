import { Coupon, CartTotal } from "../../../6_shared/types";

const percentageToRate = (percentage: number) => percentage / 100;

// 장바구니 페이지 - 주문 요약 - 쿠폰 적용 계산
export const calculateCouponAppliedTotal = (
  cartTotal: CartTotal,
  coupon: Coupon | null
): CartTotal => {
  if (!coupon) return cartTotal;

  const couponAppliedCartTotal = { ...cartTotal };

  switch (coupon.discountType) {
    case "amount": {
      couponAppliedCartTotal.totalAfterDiscount = Math.max(
        0,
        couponAppliedCartTotal.totalAfterDiscount - coupon.discountValue
      );
      couponAppliedCartTotal.totalDiscount =
        couponAppliedCartTotal.totalBeforeDiscount -
        couponAppliedCartTotal.totalAfterDiscount;
      break;
    }
    case "percentage": {
      couponAppliedCartTotal.totalAfterDiscount *=
        1 - percentageToRate(coupon.discountValue);
      couponAppliedCartTotal.totalDiscount =
        couponAppliedCartTotal.totalBeforeDiscount -
        couponAppliedCartTotal.totalAfterDiscount;
      break;
    }
    default:
      throw new Error("존재하지 않는 discountType 입니다.");
  }

  return couponAppliedCartTotal;
};
