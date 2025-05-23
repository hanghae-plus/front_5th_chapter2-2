import { Coupon, Product } from "@/types";
import { ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { CouponProvider } from "./CouponProvider";
import { ProductProvider } from "./ProductProvider";

type Props = { products?: Product[]; coupons?: Coupon[]; children: ReactNode };

export const Providers = ({ products, coupons, children }: Props) => {
  return (
    <ProductProvider products={products}>
      <CouponProvider coupons={coupons}>
        <CartProvider>{children}</CartProvider>
      </CouponProvider>
    </ProductProvider>
  );
};

export { useCartContext } from "./CartProvider";
export { useCouponContext } from "./CouponProvider";
export { useProductContext } from "./ProductProvider";
