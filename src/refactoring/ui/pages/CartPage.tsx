import { Product, Coupon } from '../../../types';
import { useCart } from '../../hooks/useCart';
import { ProductList } from '../components/product/ProductList';
import { CartList } from '../components/cart/CartList';
import { CouponSelect } from '../components/coupon/CouponSelect';
import { OrderSummary } from '../components/cart/OrderSummary';

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
    selectedCoupon
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList 
          products={products}
          cart={cart}
          onAddToCart={addToCart}
        />
        <div>
          <CartList
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
          <CouponSelect
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            onCouponSelect={applyCoupon}
          />
          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};
