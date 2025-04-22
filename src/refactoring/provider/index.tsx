import { Coupon, Product } from "@/types";
import { ReactNode } from "react";
import { CouponProvider } from "./CouponProvider";
import { ProductProvider } from "./ProductProvider";

type Props = { products?: Product[]; coupons?: Coupon[]; children: ReactNode };

export const Providers = ({ products, coupons, children }: Props) => {
  return (
    <ProductProvider products={products}>
      <CouponProvider coupons={coupons}>{children}</CouponProvider>
    </ProductProvider>
  );
};

export { useCouponContext } from "./CouponProvider";
export { useProductContext } from "./ProductProvider";
