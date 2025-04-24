import { useState } from "react";
import { Coupon } from "../../types";
import { useCouponContext } from "../Providers/CouponProvider";

export const useCouponManage = () => {
  const { addCoupon } = useCouponContext();

  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    addCoupon(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };
  return {
    newCoupon,
    setNewCoupon,
    handleAddCoupon
  }
}