import { useCart } from "../../features/cart/hooks";
import { useProducts } from "../../features/products/hooks";
import { CommonContainer } from "../../shared/ui";
import { CartContainer } from "../../widgets/cart/ui";
import { ProductList } from "../../widgets/products/ui";

export const CartPage = () => {
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    selectedCoupon,
    calculateTotal,
  } = useCart();
  const { products } = useProducts();

  return (
    <CommonContainer title="장바구니">
      <ProductList products={products} cart={cart} addToCart={addToCart} />
      <CartContainer
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        applyCoupon={applyCoupon}
        selectedCoupon={selectedCoupon}
        calculateTotal={calculateTotal}
      />
    </CommonContainer>
  );
};
