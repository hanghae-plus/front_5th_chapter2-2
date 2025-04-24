import { Coupon, Product } from '../../types.ts';
import CartSection from '../components/CartPage/Cart/CartSection.tsx';
import { ProductSection } from '../components/CartPage/Product/ProductSection.tsx';
import { useCart } from '../hooks/index.ts';

type Props = {
  products: Product[];
  coupons: Coupon[];
};

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    selectedCoupon,
    calculateTotal
  } = useCart();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductSection addToCart={addToCart} cart={cart} products={products} />
        <CartSection
          cart={cart}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          applyCoupon={applyCoupon}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
