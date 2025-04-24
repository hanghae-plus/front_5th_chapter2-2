import { Coupon } from "../../types.ts";
import { useContext, useState } from "react";
import React from "react";
import { INITIAL_COUPONS } from "../utils/constants.ts";

interface ICouponContextType {
  coupons: Coupon[];
  addCoupon: (newCoupon: Coupon) => void;
}

const CouponContext = React.createContext<ICouponContextType | undefined>(
  undefined,
);

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context)
    throw new Error("useCouponContext must be used within CouponProvider");
  return context;
};

export const CouponProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return (
    <CouponContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};
