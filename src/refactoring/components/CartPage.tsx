import { Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks';
import { Products } from './Cart/components/Products';
import { CartDisplay } from './Cart/components/CartDisplay';
import { ApplyCouponToCart } from './Cart/components/ApplyCouponToCart/CartPage.tsx';
import { Summary } from './Cart/components/Summary';

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
    getRemainingStock,
  } = useCart();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>장바구니</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Products
          products={products}
          addToCart={addToCart}
          getRemainingStock={getRemainingStock}
        />
        <div id={'장바구니 내역'}>
          <CartDisplay
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          <ApplyCouponToCart
            coupons={coupons}
            applyCoupon={applyCoupon}
            selectedCoupon={selectedCoupon}
          />

          <Summary calculateTotal={calculateTotal} />
        </div>
      </div>
    </div>
  );
};
