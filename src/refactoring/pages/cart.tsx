import { Cart, ProductList } from "../components/cart";
import type { Product, CouponItem, CartItem } from "../types";
import { useCart } from "../hooks";
interface CartPageProps {
  products: Product[];
  coupons: CouponItem[];
}

const CartPage = ({ products, coupons }: CartPageProps) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    selectedCoupon,
    applyCoupon,
    calculateTotal,
  } = useCart();

  const { totalBeforeDiscount, totalDiscount, totalAfterDiscount } =
    calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} cart={cart} addToCart={addToCart} />
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
          totalBeforeDiscount={totalBeforeDiscount}
          totalDiscount={totalDiscount}
          totalAfterDiscount={totalAfterDiscount}
        />
      </div>
    </div>
  );
};

export default CartPage;
