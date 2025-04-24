import { Coupon, Product } from '../types';
import { useCart } from '../hooks';
import { ProductList } from '../components/cart/ProductList.tsx';
import { CartList } from '../components/cart/CartList.tsx';
import { MainLayout } from '../components/layout/MainLayout.tsx';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  return (
    <MainLayout title={'장바구니'}>
      <ProductList
        products={products}
        cart={cart}
        addToCart={addToCart}
      ></ProductList>
      <CartList
        coupons={coupons}
        cart={cart}
        selectedCoupon={selectedCoupon}
        calculateTotal={calculateTotal}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        applyCoupon={applyCoupon}
      ></CartList>
    </MainLayout>
  );
};
