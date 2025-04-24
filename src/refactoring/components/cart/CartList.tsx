import { Coupon, CartItem } from '../../types';
import { SectionTitle } from '../layout/SectionTitle.tsx';
import { CouponSelectBox } from './CouponSelectBox.tsx';
import { CartItemRow } from './CartItemRow.tsx';
import { CartSummary } from './CartSummary.tsx';

interface Props {
  coupons: Coupon[];
  cart: CartItem[];
  selectedCoupon: Coupon | null;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
}

export const CartList = ({
  coupons,
  cart,
  selectedCoupon,
  calculateTotal,
  removeFromCart,
  updateQuantity,
  applyCoupon,
}: Props) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div>
      <SectionTitle sectionTitle={'장바구니 내역'} />

      <div className="space-y-2">
        {cart.map(item => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onIncrease={() =>
              updateQuantity(item.product.id, item.quantity + 1)
            }
            onDecrease={() =>
              updateQuantity(item.product.id, item.quantity - 1)
            }
            onRemove={() => removeFromCart(item.product.id)}
          />
        ))}
      </div>

      <CouponSelectBox
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        onChange={applyCoupon}
      />

      <CartSummary
        totalBeforeDiscount={totalBeforeDiscount}
        totalDiscount={totalDiscount}
        totalAfterDiscount={totalAfterDiscount}
      />
    </div>
  );
};
