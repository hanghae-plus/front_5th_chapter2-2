import { useState } from "react";
import { Coupon } from "../../../types";
import { createDefaultCoupon, updateCoupon } from "../../models/couponForm";

interface Props {
  onCouponAdd: (newCoupon: Coupon) => void;
}

const initialCoupon = createDefaultCoupon();

export const useAdminCouponForm = ({ onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(initialCoupon);

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon(initialCoupon);
  };

  const handleChangeNewCoupon = (key: keyof Coupon, value: Coupon[keyof Coupon]) => {
    setNewCoupon(prev => updateCoupon(prev, { key, value }));
  }
  return {
    newCoupon,
    handleChangeNewCoupon,
    handleAddCoupon,
  }
}
