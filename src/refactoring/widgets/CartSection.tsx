import { CartItemList, CouponSection, OrderSummary } from '../features/cart';

interface CartSectionProps {}

export const CartSection = ({}: CartSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartItemList />
      <CouponSection />
      <OrderSummary />
    </div>
  );
};
