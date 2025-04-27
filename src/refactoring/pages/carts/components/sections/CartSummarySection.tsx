import { CouponSelector } from '..';
import { CartItem, Coupon } from '../../../../../types';
import { CartList } from '../../../../components/cart/CartList';
import { calculateCartTotal } from '../../../../models/cart';
import { EmptyCartMessage } from '../empty/EmptyCartMessage';

type CartSummarySectionProps = {
  cart: CartItem[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  applyCoupon: (coupon: Coupon) => void;
  onCheckout: () => void;
};

const CartSummarySection = ({
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

interface CheckoutButtonProps {
  onCheckout: () => void;
  disabled?: boolean;
}

const CheckoutButton = ({ onCheckout, disabled = false }: CheckoutButtonProps) => (
  <button
    onClick={onCheckout}
    disabled={disabled}
    className={`w-full mt-6 py-2 text-white text-lg font-semibold rounded ${
      disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
    }`}>
    주문하기
  </button>
);

interface OrderSummaryProps {
  totalBeforeDiscount: number;
  totalDiscount: number;
  totalAfterDiscount: number;
}

const OrderSummary = ({
  totalBeforeDiscount,
  totalDiscount,
  totalAfterDiscount,
}: OrderSummaryProps) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
      <div className="space-y-1">
        <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
        <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
        <p className="text-xl font-bold">최종 결제 금액: {totalAfterDiscount.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default CartSummarySection;
