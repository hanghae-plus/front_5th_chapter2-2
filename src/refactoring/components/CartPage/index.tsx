import { useCart } from '@/hooks';
import { useProductContext } from '@/contexts/productContext.tsx';
import { useCouponsContext } from '@/contexts/couponContext.tsx';

import ProductList from './productSection/ProductList.tsx';
import OrderSummary from './cartSection/OrderSummary.tsx';
import CartList from './cartSection/CartList.tsx';
import CouponSelector from './cartSection/CouponSelector.tsx';

export const CartPage = () => {
  const { products } = useProductContext();
  const { coupons } = useCouponsContext();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    getRemainingStock,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const handleIncrease = (id: string) =>
    updateQuantity(id, getQuantityById(id) + 1);

  const handleDecrease = (id: string) =>
    updateQuantity(id, getQuantityById(id) - 1);

  const getQuantityById = (id: string) => {
    return cart.find((info) => info.product.id === id)?.quantity ?? 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <ProductList
            products={products}
            onAddToCart={addToCart}
            getRemainingStock={getRemainingStock}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <CartList
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={removeFromCart}
          />
          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            onSelect={applyCoupon}
          />
          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />
        </div>
      </div>
    </div>
  );
};
