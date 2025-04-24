import {CartItem, Coupon} from "../../types.ts";
import {CartItemList} from "./CartItemList.tsx";
import {CouponSelector} from "./CouponSelector.tsx";
import {OrderSummary} from "./OrderSummary.tsx";

interface CartSummaryProps {
  cart: CartItem[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  getItemAppliedDiscount: (item: CartItem) => number;
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
}

export const CartSummary = ({
  cart,
  coupons,
  selectedCoupon,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  getItemAppliedDiscount,
  totalBeforeDiscount,
  totalAfterDiscount,
  totalDiscount,
}: CartSummaryProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <CartItemList
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getItemAppliedDiscount={getItemAppliedDiscount}
      />
      <CouponSelector
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
      />
      <OrderSummary
        totalBeforeDiscount={totalBeforeDiscount}
        totalAfterDiscount={totalAfterDiscount}
        totalDiscount={totalDiscount}
      />
    </div>
  );
}