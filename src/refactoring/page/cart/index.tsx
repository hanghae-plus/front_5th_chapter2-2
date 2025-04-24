import { Coupon, Product } from '../../features/shared/types/entities.ts';
import { CartDetail, ProductList } from '../../../refactoring/features/cart/components';
import { useCart } from '../../features/cart/hooks';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const { cart, addToCart, removeFromCart, updateQuantity, applyCoupon, calculateTotal, selectedCoupon } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} cart={cart} addToCart={addToCart} />
        <CartDetail
          coupons={coupons}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          applyCoupon={applyCoupon}
          selectedCoupon={selectedCoupon}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
