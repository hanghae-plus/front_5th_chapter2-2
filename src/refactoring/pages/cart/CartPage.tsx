import { Coupon, Product } from "@/types";
import { PageLayout } from "@/components";
import { useCart } from "@/features/cart/hooks";
import { CartSection, ProductListSection } from "@/features/cart/components";
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
    selectedCoupon
  } = useCart();

  return (
    <PageLayout title="장바구니">
      <ProductListSection cart={cart} products={products} addToCart={addToCart} />
      <CartSection
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        applyCoupon={applyCoupon}
        coupons={coupons}
        selectedCoupon={selectedCoupon}
      />
    </PageLayout>
  );
};
