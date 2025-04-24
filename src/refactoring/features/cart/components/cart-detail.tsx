import { CartItem, Coupon } from '../../shared/types/entities.ts';
import { calculateCartTotal } from '../../../features/cart/models/cart.ts';
import { CartItemCard } from './cart-item-card.tsx';
import { CouponSelector } from './coupon-selector.tsx';
import { OrderSummary } from './order-summary.tsx';

interface CartDetailProps {
  cart: CartItem[];
  coupons: Coupon[];
  removeFromCart: (productId: string) => void;
  selectedCoupon: Coupon | null;
  updateQuantity: (productId: string, newQuantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => ReturnType<typeof calculateCartTotal>;
}

export const CartDetail = ({
  cart,
  removeFromCart,
  selectedCoupon,
  updateQuantity,
  applyCoupon,
  calculateTotal,
  coupons,
}: CartDetailProps) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div>
      {/* 장바구니 내역 */}
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {/* 장바구니 아이템 카드 */}
        {cart.map((item) => (
          <CartItemCard key={item.product.id} item={item} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
        ))}
      </div>
      {/* 쿠폰 선택 */}
      <CouponSelector coupons={coupons} selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />
      {/* 주문 요약 */}
      <OrderSummary
        totalBeforeDiscount={totalBeforeDiscount}
        totalDiscount={totalDiscount}
        totalAfterDiscount={totalAfterDiscount}
      />
    </div>
  );
};
