import React, { createContext, useContext } from "react";
import { useCoupons } from "../hooks";
import { initialCoupons } from "../constants";
import { Coupon } from "../../types";

interface CouponContext {
  coupons: Coupon[];
  newCoupon: Coupon;
  addCoupon: (newCoupon: Coupon) => void;
  setNewCoupon: React.Dispatch<React.SetStateAction<Coupon>>;
  handleAddNewCoupon: () => void;
}

const CouponContext = createContext<CouponContext | null>(null);

export const CouponProvider = ({ children }: { children: React.ReactNode }) => {
  const { coupons, newCoupon, addCoupon, setNewCoupon, handleAddNewCoupon } =
    useCoupons(initialCoupons);

  return (
    <CouponContext.Provider
      value={{
        coupons,
        newCoupon,
        addCoupon,
        setNewCoupon,
        handleAddNewCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error(
      "useCouponContext 반드시 CouponProvider 위치하여야 합니다.",
    );
  }

  return context;
};
