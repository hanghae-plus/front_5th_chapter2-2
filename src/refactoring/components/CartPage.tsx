import { Coupon, Product } from '../../types.ts';
import { useCart } from "../hooks/index.ts";
import ItemList from './cart/item-list/index.tsx';
import CartList from './cart/cart-list/index.tsx';
import UsingCoupon from './cart/using-coupon/index.tsx';
import OrderSummary from './cart/order-summary/index.tsx';
import { LocalStorageProvider } from '../context/index.tsx';

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
    <LocalStorageProvider>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ItemList addToCart={addToCart} cart={cart} products={products} />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <CartList removeFromCart={removeFromCart} updateQuantity={updateQuantity} cart={cart} />
          <UsingCoupon coupons={coupons} selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />
          <OrderSummary cart={cart} totalBeforeDiscount={totalBeforeDiscount} totalAfterDiscount={totalAfterDiscount} totalDiscount={totalDiscount} />
        </div>
      </div>
    </div>
    </LocalStorageProvider>
  );
};
