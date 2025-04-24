import { CartItem, Coupon, Product } from "../../types";
import { CartCouponSelect } from "./CartCouponSelect";
import { CartList } from "./CartList";
import { CartOrderSummary } from "./CartOrderSummary";

interface Props {
  coupons: Coupon[];
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  addToCart: (product: Product) => void;
  applyCoupon: (coupon: Coupon) => void;
  selectedCoupon: Coupon | null;
}

// 오른쪽 '장바구니 내역' 영역
export const CartDetail = ({
  coupons,
  cart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  selectedCoupon,
}: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartList
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <CartCouponSelect
        coupons={coupons}
        applyCoupon={applyCoupon}
        selectedCoupon={selectedCoupon}
      />
      <CartOrderSummary cart={cart} selectedCoupon={selectedCoupon} />
    </div>
  );
};
