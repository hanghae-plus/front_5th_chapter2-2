import type { Coupon, Product } from '../../types';
import { CartProvider, CouponProvider, ProductProvider, AdminProvider } from '../hooks';

export function AppProvider({
  children,
  products,
  coupons
}: {
  children: React.ReactNode;
  products?: Product[];
  coupons?: Coupon[];
}) {
  return (
    <CouponProvider value={coupons}>
      <ProductProvider value={products}>
        <CartProvider>
          <AdminProvider>{children}</AdminProvider>
        </CartProvider>
      </ProductProvider>
    </CouponProvider>
  );
}
