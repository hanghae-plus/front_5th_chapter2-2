import { CartList } from "@r/components/cart-list";
import { CouponApplier } from "@r/components/coupon-applier";
import { OrderSummary } from "@r/components/order-summary";
import { ProductList } from "@r/components/product-list";

interface Props {}

export const CartPage: React.FC<Props> = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <CartList />
          <CouponApplier />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
