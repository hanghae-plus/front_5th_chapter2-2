import { useCoupons } from "@/refactoring/hooks";
import { Coupon } from "@/types";
import { createContext, ReactNode, useContext } from "react";

type CouponContextType = ReturnType<typeof useCoupons>;
const CouponContext = createContext<CouponContextType | null>(null);

export const CouponProvider = ({ initialCoupons, children }: { initialCoupons: Coupon[]; children: ReactNode }) => {
  const value = useCoupons(initialCoupons);
  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) throw new Error("context is null");
  return context;
};
