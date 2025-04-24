import { Coupon, Product } from '../../types.ts';
import ProductList from '../../refactoring/components/ProductList.tsx';
import CartItemList from '../../refactoring/components/CartItemList.tsx';
import CouponSelector from '../../refactoring/components/CouponSelector.tsx';
import OrderSummary from '../../refactoring/components/OrderSummary.tsx';
import { useCart } from '../../refactoring/hooks/useCart.ts';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          cart={cart}
          addToCart={addToCart}
        />
        <div>
          <CartItemList
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            applyCoupon={applyCoupon}
          />
          <OrderSummary calculateTotal={calculateTotal} />
        </div>
      </div>
    </div>
  );
};
