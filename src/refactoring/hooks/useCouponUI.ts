import { useState } from "react";
import { Coupon } from "../../types.ts";

export const useCouponUI = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const updateNewCoupon = (field: keyof Coupon, value: any) => {
    setNewCoupon((prev) => ({ ...prev, [field]: value }));
  };

  const resetNewCoupon = () => {
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  return {
    newCoupon,
    updateNewCoupon,
    resetNewCoupon,
  };
};
