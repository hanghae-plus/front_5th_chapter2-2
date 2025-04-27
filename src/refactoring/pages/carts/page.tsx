import { Coupon, Product } from '../../../types.ts';
import CartSummarySection from './components/sections/CartSummarySection.tsx';
import { SectionTitle } from '../../components';
import { useCart } from '../../hooks/useCart.ts';
import { ProductListSection } from './components/sections/ProductListSection.tsx';

interface CartPageProps {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: CartPageProps) => {
  const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, selectedCoupon } =
    useCart();

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">장바구니</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <SectionTitle>상품 목록</SectionTitle>
            <ProductListSection products={products} cart={cart} addToCart={addToCart} />
          </div>
          <div>
            <SectionTitle>장바구니 내역</SectionTitle>
            <CartSummarySection
              cart={cart}
              coupons={coupons}
              selectedCoupon={selectedCoupon}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              applyCoupon={applyCoupon}
              onCheckout={() => alert('주문 완료!')}
            />
          </div>
        </div>
      </div>
    </>
  );
};
