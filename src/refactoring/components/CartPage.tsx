import CartList from "./cart/CartList.tsx";
import CouponSelector from "./cart/CouponSelector.tsx";
import OrderSummary from "./cart/OrderSummary.tsx";
import ProductList from "./cart/ProductList.tsx";

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
          <CouponSelector />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
