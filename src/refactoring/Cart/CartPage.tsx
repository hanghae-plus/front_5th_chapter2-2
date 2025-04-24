import { Coupon, Product } from '../../types.ts';
import useCouponSelect from './_hooks/useCouponSelect.tsx';
import CouponSelect from './_components/CouponSelect.tsx';
import ProductList from './_components/ProductList.tsx';
import CartList from './_components/CartList.tsx';
import Receipt from './_components/Receipt.tsx';
import { useCart } from './_hooks/useCart.ts';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const { applyCoupon, selectedCoupon } = useCouponSelect();
  const { cart, addToCart, removeFromCart, updateQuantity, calculateTotal } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 목록 */}
        <ProductList productList={products} cart={cart} addToCart={addToCart} />

        {/* 장바구니 내역 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          {/* 장바구니 리스트 */}
          <CartList cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />

          {/* 쿠폰 선택, 적용 쿠폰 안내 */}
          <CouponSelect
            applyCoupon={applyCoupon}
            coupons={coupons}
            selectedCoupon={selectedCoupon}
          />
          {/* 주문 요약 */}
          <Receipt selectedCoupon={selectedCoupon} calculateTotal={calculateTotal} />
        </div>
      </div>
    </div>
  );
};
