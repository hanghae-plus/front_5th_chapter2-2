import { CartItem } from "../../../entities";
import { CouponSection } from "../coupon/coupon-section";
import { CartList } from "./cart-list";
import { CartPriceSummary } from "./cart-price-summary";

type CartSectionProps = {
  cart: CartItem[];
  actions: {
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
  };
};

export const CartSection = (props: CartSectionProps) => {
  const { cart, actions } = props;
  const { updateQuantity, removeFromCart } = actions;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartList cart={cart} actions={{ updateQuantity, removeFromCart }} />
      <CouponSection />
      <CartPriceSummary cart={cart} />
    </div>
  );
};
