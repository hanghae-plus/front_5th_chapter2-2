import { useContext } from "react";
import React from "react";
import { useCouponManage } from "../hooks/useCouponManage.ts";


const CouponManageContext = React.createContext<ReturnType<typeof useCouponManage> | undefined>(
  undefined,
);

export const useCouponManageContext = () => {
  const context = useContext(CouponManageContext);
  if (!context)
    throw new Error("useCouponManageContext must be used within CouponManageProvider");
  return context;
};

export const CouponManageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const cartHelper = useCouponManage();

  return (
    <CouponManageContext.Provider value={cartHelper}>{children}</CouponManageContext.Provider>
  );
};
