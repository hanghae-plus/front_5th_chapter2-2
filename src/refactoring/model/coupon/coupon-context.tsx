import { Coupon } from "@r/model/coupon/types";
import { useCoupons } from "@r/model/coupon/use-coupon";
import { createContext, useContext } from "react";

const CouponContext = createContext<ReturnType<typeof useCoupons> | null>(null);

export const CouponProvider = ({
  children,
  initialCoupons,
}: {
  children: React.ReactNode;
  initialCoupons: Coupon[];
}) => {
  const couponState = useCoupons(initialCoupons);
  return (
    <CouponContext.Provider value={couponState}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context)
    throw new Error("useCouponContext must be used within CouponProvider");
  return context;
};
