import Product from "#src/refactoring/pages/cart/_components/Product";
import CouponSection from "#src/refactoring/pages/cart/_components/CouponSection";
import CartSummarySection from "#src/refactoring/pages/cart/_components/CartSummarySection";
import { useProducts } from "#src/refactoring/hooks";
import CartProvider from "./providers/CartProvider";
import CartProducts from "./_components/CartProducts";

export const CartPage: React.FC = () => {
  const { products } = useProducts();

  return (
    <CartProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">장바구니</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
            <ul className="space-y-2">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

            <CartProducts />

            <CouponSection />

            <CartSummarySection />
          </div>
        </div>
      </div>
    </CartProvider>
  );
};
