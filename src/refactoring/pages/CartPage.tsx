import { Coupon, Product } from '../entities';
import { useCart } from '../hooks';
import { CartSection, ProductSection } from '../widgets';

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

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductSection
          products={products}
          getRemainingStock={getRemainingStock}
          addToCart={addToCart}
        />
        <CartSection
          cart={cart}
          coupons={coupons}
          calculateTotal={calculateTotal}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          applyCoupon={applyCoupon}
          selectedCoupon={selectedCoupon}
        />
      </div>
    </div>
  );
};
