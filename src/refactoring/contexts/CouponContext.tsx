import { createContext, ReactNode, useContext } from "react";
import { useCoupons } from "../hooks";
import { Coupon } from "../../types";

type CouponContextProps = ReturnType<typeof useCoupons>;

const CouponContext = createContext<CouponContextProps | null>(null);

export const CouponProvider = ({
  children,
  initialCoupons,
}: {
  children: ReactNode;
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
  if (!context) {
    throw new Error("useCouponContext must be used within a CouponProvider");
  }
  return context;
};
