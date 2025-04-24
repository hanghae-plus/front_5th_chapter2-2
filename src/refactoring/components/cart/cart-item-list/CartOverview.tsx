import { CartItem, Coupon } from "../../../../types.ts";
import { CartItemCard } from "./CartItemCard.tsx";
import { CouponSelectCard } from "./CouponSelectCard.tsx";
import { OrderSummaryCard } from "./OrderSummaryCard.tsx";

interface Props {
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}

export const CartOverview = ({
  cart,
  updateQuantity,
  removeFromCart,
  coupons,
  selectedCoupon,
  applyCoupon,
  calculateTotal,
}: Props) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => (
          <CartItemCard
            key={item.product.id}
            cartItem={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <CouponSelectCard
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
      />
      <OrderSummaryCard
        price={totalBeforeDiscount}
        discountPrice={totalDiscount}
        totalPrice={totalAfterDiscount}
      />
    </div>
  );
};
