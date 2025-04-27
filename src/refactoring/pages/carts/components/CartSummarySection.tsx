import { CheckoutButton, CouponSelector, OrderSummary } from '.';
import { CartItem, Coupon } from '../../../../types';
import { CartList } from '../../../components/cart/CartList';
import { EmptyCartMessage } from './empty/EmptyCartMessage';

type CartSummarySectionProps = {
  cart: CartItem[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
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
  updateQuantity,
  removeFromCart,
  applyCoupon,
  onCheckout,
}: CartSummarySectionProps) => {
  const isCartEmpty = cart.length === 0;

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
