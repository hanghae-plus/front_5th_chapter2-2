import { Coupon, Product } from "../../types.ts";
import { CartList } from "../components/Cart/CartList.tsx";
import { ItemList } from "../components/Cart/ItemList.tsx";
import { useCart } from "../hooks/index.ts";

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
        <ItemList addToCart={addToCart} cart={cart} products={products} />
        <CartList
          cart={cart}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
