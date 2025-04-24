import { useState } from "react";
import { Coupon } from "../../../types";

interface UseCouponFormProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const useCouponForm = ({ onCouponAdd }: UseCouponFormProps) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const handleCouponChange = (coupon: Coupon) => {
    setNewCoupon(coupon);
  };

  return {
    newCoupon,
    handleAddCoupon,
    handleCouponChange,
  };
};
