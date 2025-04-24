import { CartItem, Coupon } from "@/types";
import { useDiscount } from "../../hooks/useDiscount";
import { CartCard } from "./CartCard";
import { CartCoupon } from "./CartCoupon";
import { CartTotal } from "./CartTotal";

interface Props {
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
}

export const CartSection = ({
  cart,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  coupons,
  selectedCoupon,
}: Props) => {
  const { cartCalculations } = useDiscount(cart, selectedCoupon);

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = cartCalculations;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => (
          <CartCard
            key={item.product.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <CartCoupon
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
      />

      <CartTotal
        totalBeforeDiscount={totalBeforeDiscount}
        totalDiscount={totalDiscount}
        totalAfterDiscount={totalAfterDiscount}
      />
    </div>
  );
};
