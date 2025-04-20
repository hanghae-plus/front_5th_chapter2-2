import { CartItem, CouponItem } from "../../types";
import { CartList } from "./CartList";
import { Coupon } from "./Coupon";
import { Order } from "./Order";
interface CartProps {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  coupons: CouponItem[];
  selectedCoupon: CouponItem | null;
  applyCoupon: (coupon: CouponItem) => void;
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
}

export const Cart = ({
  cart,
  removeFromCart,
  updateQuantity,
  coupons,
  selectedCoupon,
  applyCoupon,
  totalBeforeDiscount,
  totalDiscount,
  totalAfterDiscount,
}: CartProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartList
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <Coupon
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
      />
      <Order
        totalBeforeDiscount={totalBeforeDiscount}
        totalDiscount={totalDiscount}
        totalAfterDiscount={totalAfterDiscount}
      />
    </div>
  );
};
