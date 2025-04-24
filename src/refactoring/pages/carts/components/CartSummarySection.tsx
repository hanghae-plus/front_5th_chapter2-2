import { CartItemList, CheckoutButton, CouponSelector, EmptyCartMessage, OrderSummary } from '.';
import { CartItem, Coupon } from '../../../../types';
import { SectionTitle } from '../../../components';

type CartSummarySectionProps = {
  cart: CartItem[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
  getAppliedDiscount: (item: CartItem) => number;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  onCheckout: () => void;
};

export const CartSummarySection = ({
  cart,
  coupons,
  selectedCoupon,
  totalBeforeDiscount,
  totalDiscount,
  totalAfterDiscount,
  getAppliedDiscount,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  onCheckout,
}: CartSummarySectionProps) => {
  const isCartEmpty = cart.length === 0;

  return (
    <div>
      <SectionTitle>장바구니 내역</SectionTitle>

      {isCartEmpty ? (
        <EmptyCartMessage />
      ) : (
        <>
          <CartItemList
            cart={cart}
            getAppliedDiscount={getAppliedDiscount}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            applyCoupon={applyCoupon}
          />

          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />

          <CheckoutButton onCheckout={onCheckout} disabled={isCartEmpty} />
        </>
      )}
    </div>
  );
};
