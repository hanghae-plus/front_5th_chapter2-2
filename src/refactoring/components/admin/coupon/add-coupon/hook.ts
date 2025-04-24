import { useState } from "react";
import { Coupon } from "../../../../../types";

type Props ={
    onCouponAdd: (newCoupon: Coupon) => void;
}

export const useAddCoupon = ({ onCouponAdd }:Props) => {
    
    const [newCoupon, setNewCoupon] = useState<Coupon>({
        name: '',
        code: '',
        discountType: 'percentage',
        discountValue: 0
      });

      const handleAddCoupon = () => {
        onCouponAdd(newCoupon);
        setNewCoupon({
          name: '',
          code: '',
          discountType: 'percentage',
          discountValue: 0
        });
      };
    return {
        newCoupon,
        setNewCoupon,
        handleAddCoupon
    }
}