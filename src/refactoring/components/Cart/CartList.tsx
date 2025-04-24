import { CartItem as CartItemType, Coupon } from "../../../types";
import { getAppliedDiscount } from "../../models/cart";
import { CartItem } from "./CartItem";
import { CartTotalPrice } from "./CartTotalPrice";
import { CouponSection } from "./Coupon";

export const CartList = ({
  cart,
  coupons,
  selectedCoupon,
  applyCoupon,
  updateQuantity,
  removeFromCart,
  calculateTotal,
}: {
  cart: CartItemType[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  calculateTotal: () => Record<string, number>;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => {
          return (
            <CartItem
              key={item.product.id}
              item={item}
              appliedDiscount={getAppliedDiscount(item)}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>

      <CouponSection
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
      />

      <CartTotalPrice calculateTotal={calculateTotal} />
    </div>
  );
};
