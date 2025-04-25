import { Coupon, CartItem as CartItemType } from '../../../../types';
import CouponSelect from '../Coupon/CouponSelect';
import OrderSummary from '../OrderSummary/OrderSummary';
import CartItem from './CartItem';

export default function CartSection({
  cart,
  selectedCoupon,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  coupons,
  calculateTotal
}: {
  cart: CartItemType[];
  selectedCoupon: Coupon | null;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  coupons: Coupon[];
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

      <div className="space-y-2">
        {cart.map(item => {
          return (
            <CartItem
              key={item.product.id}
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          );
        })}
      </div>
      <CouponSelect coupons={coupons} selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />
      <OrderSummary calculateTotal={calculateTotal} />
    </div>
  );
}
