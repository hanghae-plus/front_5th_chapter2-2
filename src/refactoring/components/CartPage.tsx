import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import { ApplyCoupon } from "./cart/ApplyCoupon.tsx";
import { CartList } from "./cart/CartList.tsx";
import { OrderSummary } from "./cart/OrderSummary.tsx";
import { ProductList } from "./cart/ProductList.tsx";

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
        <ProductList products={products} cart={cart} addToCart={addToCart} />
        <div>
          <CartList
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />

          <ApplyCoupon
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
