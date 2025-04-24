import { ProductContainer } from "../components/Cart/ProductContainer.tsx";
import { useProductContext } from "../Providers/ProductProvider.tsx";
import TotalContainer from "../components/Cart/TotalContainer.tsx";
import CouponContainer from "../components/Cart/CouponContainer.tsx";
import CartContainer from "../components/Cart/CartContainer.tsx";
import { CartProvider } from "../Providers/CartContext.tsx";

export const CartPage = () => {
  const { products } = useProductContext();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CartProvider>
          <ProductContainer products={products} />
          <div>
            <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
            <CartContainer />
            <CouponContainer />
            <TotalContainer />
          </div>
        </CartProvider>
      </div>
    </div>
  );
};
