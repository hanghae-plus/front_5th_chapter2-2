import { CheckoutButton, CouponSelector, OrderSummary } from '.';
import { CartItem, Coupon } from '../../../../types';
import { CartList } from '../../../components/cart/CartList';
import { calculateCartTotal } from '../../../models/cart';
import { EmptyCartMessage } from './empty/EmptyCartMessage';

type CartSummarySectionProps = {
  cart: CartItem[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  onCheckout: () => void;
};

export const CartSummarySection = ({
  cart,
  coupons,
  selectedCoupon,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  onCheckout,
}: CartSummarySectionProps) => {
  const isCartEmpty = cart.length === 0;
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(
    cart,
    selectedCoupon
  );

  if (isCartEmpty) return <EmptyCartMessage />;

  return (
    <div>
      <CartList carts={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
      <CouponSelector coupons={coupons} selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />
      <OrderSummary
        totalBeforeDiscount={totalBeforeDiscount}
        totalDiscount={totalDiscount}
        totalAfterDiscount={totalAfterDiscount}
      />
      <CheckoutButton onCheckout={onCheckout} disabled={isCartEmpty} />
    </div>
  );
};
