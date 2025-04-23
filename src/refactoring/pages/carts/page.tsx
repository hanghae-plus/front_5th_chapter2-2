import { Coupon, Product } from '../../../types.ts';
import PagesLayout from '../../components/layouts/PagesLayout.tsx';
import { useCart } from '../../hooks/useCart.ts';
import { getAppliedDiscount, getMaxDiscount, getRemainingStock } from '../../models/cart.ts';
import { ProductList, CartSummary } from './components';
import {} from './components/ProductList.tsx';

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
      <PagesLayout
        title={'장바구니'}
        mainSection={
          <ProductList
            products={products}
            cart={cart}
            addToCart={addToCart}
            getRemainingStock={getRemainingStock}
            getMaxDiscount={getMaxDiscount}
          />
        }
        sideSection={
          <CartSummary
            cart={cart}
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
            getAppliedDiscount={getAppliedDiscount}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            applyCoupon={applyCoupon}
          />
        }
      />
    </>
  );
};
