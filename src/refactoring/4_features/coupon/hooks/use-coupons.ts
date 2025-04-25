import { useAtom } from "jotai";

import { couponsAtom } from "../../../5_entities/coupon/model/atoms";
import { Coupon } from "../../../6_shared/types";
import * as CouponModel from "../../../5_entities/coupon/lib";

// 관리자 페이지 - 쿠폰 관리
export const useCoupons = () => {
  const [coupons, setCoupons] = useAtom(couponsAtom);

  /**
   * 지금은 단순해서 CouponModel을 사용하는게 불필요해보이지만,
   * 중복 쿠폰 검사 등의 요구사항이 생길 수 있기 때문에 use-cart.ts 와 유사한 구조로 작성
   */
  const addCoupon = (coupon: Coupon) => {
    const updatedCoupons = CouponModel.addCoupon(coupons, coupon);
    setCoupons(updatedCoupons);
  };

  return {
    coupons,
    addCoupon,
  };
};
