import { useAtom } from "jotai";

import { selectedCouponAtom } from "../../../5_entities/coupon/model/atoms";

// 장바구니 페이지 - 장바구니 내역 - 쿠폰 적용
export const useCoupon = () => {
  const [selectedCoupon, setSelectedCoupon] = useAtom(selectedCouponAtom);

  return {
    selectedCoupon,
    applyCoupon: setSelectedCoupon,
  };
};
