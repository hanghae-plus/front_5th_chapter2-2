import { useState } from "react";
import type { CouponItem } from "../../types";
import { useSetAtom } from "jotai";
import { addCouponAtom } from "../../state";

export const useCouponForm = () => {
  const onCouponAdd = useSetAtom(addCouponAtom);

  const [newCoupon, setNewCoupon] = useState<CouponItem>({
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

  return {
    newCoupon,
    setNewCoupon,
    handleAddCoupon,
  };
};
