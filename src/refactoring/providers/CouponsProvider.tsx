import { createContext, useEffect, useState } from "react";
import type { ICoupon } from "#src/types";
import useLocalStorage from "#src/refactoring/hooks/useLocalStorage";

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

export const CouponsContext = createContext<{
  coupons: ICoupon[];
  setCoupons: React.Dispatch<React.SetStateAction<ICoupon[]>>;
}>({
  coupons: [],
  setCoupons: () => {},
});

const CouponsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [localStorageCoupons, setCouponsToLocalStorage] = useLocalStorage<ICoupon[]>("coupons");
  const [coupons, setCoupons] = useState<ICoupon[]>(localStorageCoupons ?? initialCoupons);

  useEffect(() => {
    setCouponsToLocalStorage(coupons);
  }, [coupons, setCouponsToLocalStorage]);

  return <CouponsContext.Provider value={{ coupons, setCoupons }}>{children}</CouponsContext.Provider>;
};

export default CouponsProvider;
