import { useCart } from "../../features/cart/hooks";
import { CommonContainer } from "../../shared/ui";
import { CartContainer } from "../../widgets/cart/ui";
import { ProductList } from "../../widgets/products/ui";

export const CartPage = () => {
  // * Context API 사용으로 빼는게 나을듯..
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    selectedCoupon,
    calculateTotal,
  } = useCart();

  return (
    <CommonContainer title="장바구니">
      <ProductList cart={cart} addToCart={addToCart} />
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
