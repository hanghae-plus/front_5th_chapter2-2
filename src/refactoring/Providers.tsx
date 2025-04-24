import { ReactNode } from "react";
import { ProductProvider } from "./contexts/ProductContext";
import { CouponProvider } from "./contexts/CouponContext";
import { CartProvider } from "./contexts/CartContext";
import { initialProducts } from "./mocks/initialProducts";
import { initialCoupons } from "./mocks/initialCoupons";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProductProvider initialProducts={initialProducts}>
      <CouponProvider initialCoupons={initialCoupons}>
        <CartProvider>{children}</CartProvider>
      </CouponProvider>
    </ProductProvider>
  );
};
