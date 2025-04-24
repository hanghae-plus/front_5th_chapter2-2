import { Coupon, Product } from '../../../types.ts';
import { useCart } from '../../hooks/useCart.ts';
import { getMaxDiscount, getRemainingStock } from '../../models/cart.ts';
import { ProductListSection, CartSummarySection } from './components';

interface CartPageProps {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: CartPageProps) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">장바구니</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductListSection
            products={products}
            cart={cart}
            addToCart={addToCart}
            getRemainingStock={getRemainingStock}
            getMaxDiscount={getMaxDiscount}
          />
          <CartSummarySection
            cart={cart}
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            applyCoupon={applyCoupon}
            onCheckout={() => alert('주문 완료!')}
          />
        </div>
      </div>
    </>
  );
};
