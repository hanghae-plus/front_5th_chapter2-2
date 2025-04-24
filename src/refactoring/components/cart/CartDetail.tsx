import { CartItemCard, CartSummary } from '.';
import { CouponSelect } from '../coupon';
import { CartItem, Coupon, TotalPrice } from '@/types';

interface CartDetailProps {
  cart: CartItem[];
  coupons: Coupon[];
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => TotalPrice;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  selectedCoupon: Coupon | null;
}

export const CartDetail = ({
  cart,
  coupons,
  applyCoupon,
  calculateTotal,
  updateQuantity,
  removeFromCart,
  selectedCoupon,
}: CartDetailProps) => {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>장바구니 내역</h2>

      <div className='space-y-2'>
        {cart.map((item) => (
          <CartItemCard
            key={`cart-item-card-${item.product.id}`}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <CouponSelect
        coupons={coupons}
        applyCoupon={applyCoupon}
        selectedCoupon={selectedCoupon}
      />
      <CartSummary calculateTotal={calculateTotal} />
    </div>
  );
};
