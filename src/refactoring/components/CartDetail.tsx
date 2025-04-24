import { Coupon } from "../../types";
import { useCart } from "../hooks";
import { CartList } from "./CartList";
import { CouponSelect } from "./CouponSelect";
import { OrderSummary } from "./OrderSummary";

interface Props {
  coupons: Coupon[];
}

// 오른쪽 '장바구니 내역' 영역
export const CartDetail = ({ coupons }: Props) => {
  const { cart, removeFromCart, updateQuantity, applyCoupon, selectedCoupon } =
    useCart();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartList
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <CouponSelect
        coupons={coupons}
        applyCoupon={applyCoupon}
        selectedCoupon={selectedCoupon}
      />
      <OrderSummary cart={cart} selectedCoupon={selectedCoupon} />
    </div>
  );
};
