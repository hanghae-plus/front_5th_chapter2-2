import { CartItem } from "@refactoring/entities";
import { CouponSection } from "@refactoring/features/user/coupon/coupon-section";
import { useSelectedCoupon } from "@refactoring/hooks";
import { Section } from "@refactoring/ui";

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
  const { selectedCoupon, applyCoupon } = useSelectedCoupon();

  return (
    <Section title="장바구니 내역">
      <CartList cart={cart} actions={{ updateQuantity, removeFromCart }} />
      <CouponSection selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />
      <CartPriceSummary cart={cart} selectedCoupon={selectedCoupon} />
    </Section>
  );
};
