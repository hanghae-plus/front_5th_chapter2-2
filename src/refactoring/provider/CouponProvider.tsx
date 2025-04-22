import { useCoupons } from "@/refactoring/hooks";
import { Coupon } from "@/types";
import { createContext, ReactNode, useContext } from "react";

type CouponContextType = ReturnType<typeof useCoupons>;
const CouponContext = createContext<CouponContextType | null>(null);

export const CouponProvider = ({ coupons = initialCoupons, children }: { coupons?: Coupon[]; children: ReactNode }) => {
  const value = useCoupons(coupons);
  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) throw new Error("context is null");
  return context;
};

const initialCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];
