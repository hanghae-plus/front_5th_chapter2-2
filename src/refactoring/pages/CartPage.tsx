import { CartList } from "../components/features/cart/CartList.tsx";
import { ColumnLayout } from "../components/ui/layout/ColumnLayout.tsx";
import { CouponSelector } from "../components/features/coupon/CouponSelector.tsx";
import { OrderSummary } from "../components/features/cart/OrderSummary.tsx";
import { ProductList } from "../components/features/product/ProductList.tsx";

export const CartPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <ColumnLayout>
        <ProductList />
        <div>
          <CartList />
          <CouponSelector />
          <OrderSummary />
        </div>
      </ColumnLayout>
    </div>
  );
};
