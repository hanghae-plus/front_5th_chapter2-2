import { useCart } from '../../../hooks';
import { CouponSelector } from './CouponSelector.tsx';
import { CartCard } from './CartCard.tsx';
import { OrderSummary } from './OrderSummary.tsx';

export function CartList() {
  const { cart } = useCart();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

      <div className="space-y-2">
        {cart.map((item) => (
          <CartCard item={item} key={item.product.id} />
        ))}
      </div>

      <CouponSelector />

      <OrderSummary />
    </div>
  );
}
