import { CartSection } from "../features/cart/cart-section.tsx";
import { ProductList } from "../features/product/product-list.tsx";
import { useCartStore } from "../store/cart-store.ts";
import { useProductStore } from "../store/product-store.ts";

export const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCartStore();
  const { products } = useProductStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} cart={cart} addToCart={addToCart} />
        <CartSection cart={cart} actions={{ updateQuantity, removeFromCart }} />
      </div>
    </div>
  );
};
