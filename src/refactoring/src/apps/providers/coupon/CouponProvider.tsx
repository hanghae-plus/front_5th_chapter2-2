import { useState } from "react";
import { CouponStoreContext } from "../../../entities/coupon/stores";
import { Coupon } from "../../../entities/coupon/types";
import { INITIAL_COUPONS } from "./coupon.constant";

export const CouponProvider = ({
  initialCoupons = INITIAL_COUPONS,
  children,
}: {
  initialCoupons?: Coupon[];
  children: React.ReactNode;
}) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const store = {
    coupons,
    addCoupon: (newCoupon: Coupon) => {
      setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
    },
  };
  return (
    <CouponStoreContext.Provider value={store}>
      {children}
    </CouponStoreContext.Provider>
  );
};
