import { Coupon, Product } from "../../types.ts";
import { CartDetail } from "../components/CartDetail.tsx";
import { ItemList } from "../components/ItemList.tsx";
import { useCart } from "../hooks/useCart.ts";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ItemList products={products} cart={cart} addToCart={addToCart} />
        <CartDetail
          coupons={coupons}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          addToCart={addToCart}
          applyCoupon={applyCoupon}
          selectedCoupon={selectedCoupon}
        />
      </div>
    </div>
  );
};
