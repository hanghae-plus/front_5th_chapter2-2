import React, { createContext, useContext } from "react";
import { Coupon } from "../../types";
import { DEFAULT_COUPONS } from "../constants/default";
import { useCoupons } from "../hooks";

interface CouponContextInterface {
    coupons: Coupon[];
    addCoupon: (coupon: Coupon) => void;
}

interface CouponProviderProps{
    children: React.ReactNode;
    initialCoupons?: Coupon[];
}

const CouponContext = createContext<CouponContextInterface | undefined>(undefined);

export const CouponProvider: React.FC<CouponProviderProps> = (props) => {
    const { children, initialCoupons = DEFAULT_COUPONS } = props;
    const { coupons, addCoupon } = useCoupons(initialCoupons);

    return (
        <CouponContext.Provider value = {{coupons, addCoupon}}>
            {children}
        </CouponContext.Provider>
    )
}

export const useCouponsContext = (): CouponContextInterface => {
    const context = useContext(CouponContext);
    if (!context) {
      throw new Error('useCouponsContext is not defined within a CouponProvider');
    }
    return context;
  };