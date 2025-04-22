import { useState } from "react";
import { Coupon } from "../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
    const [coupons, setCoupons] = useState(initialCoupons);

    // 쿠폰 추가 함수
    const addCoupon = (newCoupon: Coupon) => {
        setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
    };
    return { coupons, addCoupon };
};
