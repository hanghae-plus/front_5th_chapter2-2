import { createContext, useState } from "react";
import type { ICoupon } from "#src/types";

const initialCoupons: ICoupon[] = [
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

export const CouponContext = createContext<{
  coupons: ICoupon[];
  setCoupons: React.Dispatch<React.SetStateAction<ICoupon[]>>;
}>({
  coupons: [],
  setCoupons: () => {},
});

const CouponProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [coupons, setCoupons] = useState<ICoupon[]>(initialCoupons);

  return <CouponContext.Provider value={{ coupons, setCoupons }}>{children}</CouponContext.Provider>;
};

export default CouponProvider;
