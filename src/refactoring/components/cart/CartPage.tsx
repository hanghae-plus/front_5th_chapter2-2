import { Coupon, Product } from "../../../types.ts";
import { useCart } from "../../hooks";
import { ProductList } from "./product-list/ProductList.tsx";
import { CartOverview } from "./cart-item-list/CartOverview.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}

export const CartPage = ({
  products,
  coupons,
  selectedCoupon,
  applyCoupon,
}: Props) => {
  const {
    cart,
    addToCart,
    getCartItem,
    removeFromCart,
    updateQuantity,
    calculateTotal,
  } = useCart(selectedCoupon);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList
          products={products}
          addToCart={addToCart}
          getCartItem={getCartItem}
        />
        <CartOverview
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
