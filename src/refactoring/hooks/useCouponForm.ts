import { useState } from "react";
import { Coupon } from "../../types";

interface useCouponFormProps {
    
    onCouponAdd: (coupon: Coupon) => void;
}
export const useCouponForm = ({ onCouponAdd }: useCouponFormProps) => {
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
  
    return { newCoupon, setNewCoupon, handleAddCoupon };
  };