import { Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import { calculateCartTotal } from "../models/cart.ts";
import CartList from "./cart/CartList.tsx";
import CouponSelector from "./cart/CouponSelector.tsx";
import OrderSummary from "./cart/OrderSummary.tsx";
import ProductList from "./cart/ProductList.tsx";

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
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateCartTotal(cart, selectedCoupon);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProductList products={products} cart={cart} addToCart={addToCart} />
        </div>
        <div>
          <CartList
            cartItems={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            applyCoupon={applyCoupon}
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
