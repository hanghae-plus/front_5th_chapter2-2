import {
  getMaxApplicableDiscount,
  formatCouponDisplay,
} from "../models/cart.ts";
import { Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks/useCart.ts";
import CartList from "../components/Cart/ui/CartList.tsx";
import CartSummary from "../components/Cart/ui/CartSummary.tsx";
import CouponApply from "../components/Cart/ui/CouponApply.tsx";
import ProductList from "../components/Cart/ui/ProductList.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const getDiscountAppliedDisplay = (appliedDiscount: number) =>
    appliedDiscount > 0
      ? `(${(appliedDiscount * 100).toFixed(0)}% 할인 적용)`
      : "";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <ProductList products={products} cart={cart} addToCart={addToCart} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <CartList
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            getDiscountAppliedDisplay={getDiscountAppliedDisplay}
            getMaxApplicableDiscount={getMaxApplicableDiscount}
          />

          <CouponApply
            coupons={coupons}
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
            formatCouponDisplay={formatCouponDisplay}
          />
          <CartSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};
