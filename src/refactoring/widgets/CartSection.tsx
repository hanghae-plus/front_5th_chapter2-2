import { CartItem, Coupon } from '../entities';
import { CartItemList, CouponSection, OrderSummary } from '../features/cart';

interface CartSectionProps {
  cart: CartItem[];
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  selectedCoupon: Coupon | null;
}

export const CartSection = ({
  cart,
  calculateTotal,
  removeFromCart,
  updateQuantity,
  selectedCoupon,

  applyCoupon,
}: CartSectionProps) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartItemList
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
      <CouponSection
        applyCoupon={applyCoupon}
        selectedCoupon={selectedCoupon}
      />
      <OrderSummary
        totalAfterDiscount={totalAfterDiscount}
        totalBeforeDiscount={totalBeforeDiscount}
        totalDiscount={totalDiscount}
      />
    </div>
  );
};
