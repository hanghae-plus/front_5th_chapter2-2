import { ProductList } from "../../3_widgets/product-list";
import { CartList } from "../../3_widgets/cart-list";
import { CouponSection } from "../../3_widgets/coupon-section";
import { OrderSummary } from "../../3_widgets/order-summary";

export const CartPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProductList />
        </div>
        <div>
          <CartList />
          <CouponSection />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
