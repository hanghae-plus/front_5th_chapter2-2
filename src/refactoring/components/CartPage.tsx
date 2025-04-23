import { CartSection } from "../features/user/cart/cart-section.tsx";
import { ProductSection } from "../features/user/product/product-section.tsx";
import { useCartStore } from "../store/cart-store.ts";
import { useProductStore } from "../store/product-store.ts";
import { Layout } from "./layout.tsx";

export const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();
  const { products } = useProductStore();

  return (
    <Layout title="장바구니">
      <ProductSection products={products} cart={cart} addToCart={addToCart} />
      <CartSection cart={cart} actions={{ updateQuantity, removeFromCart }} />
    </Layout>
  );
};
