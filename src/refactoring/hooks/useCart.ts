import { useState } from "react";

import {
  calculateTotalAfterDiscount,
  calculateTotalBeforeDiscount,
} from "../calculations/cart/calc-total-discount";
import { applyCouponDiscount } from "../calculations/coupon/apply-coupon";

import { Coupon } from "../entities";
import { useCartStore } from "../store/cart-store";

export const useCart = () => {
  const { cart } = useCartStore();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount(cart);
    const totalAfterDiscount = calculateTotalAfterDiscount(cart);
    const totalAfterCoupon = applyCouponDiscount(totalAfterDiscount, selectedCoupon!);
    const totalDiscount = totalBeforeDiscount - totalAfterCoupon;

    return {
      totalBeforeDiscount: Math.round(totalBeforeDiscount),
      totalAfterDiscount: Math.round(totalAfterCoupon),
      totalDiscount: Math.round(totalDiscount),
    };
  };

  return {
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
