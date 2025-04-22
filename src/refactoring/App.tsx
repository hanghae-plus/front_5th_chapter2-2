import { useCallback, useState } from "react";
import { CartPage } from "./pages/cart/CartPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { useCoupons, useProducts } from "./hooks";
import Nav from "./components/layouts/Nav";
import { initialCoupons } from "./constants";
import ProductProvider from "./providers/ProductProvider";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const onToggleAdmin = useCallback(() => {
    setIsAdmin((prev) => !prev);
  }, []);

  const { products, updateProduct, addProduct } = useProducts();
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-100">
        <Nav isAdmin={isAdmin} onToggleAdmin={onToggleAdmin} />

        <main className="container mx-auto mt-6">
          {isAdmin ? (
            <AdminPage
              products={products}
              coupons={coupons}
              onProductUpdate={updateProduct}
              onProductAdd={addProduct}
              onCouponAdd={addCoupon}
            />
          ) : (
            <CartPage products={products} coupons={coupons} />
          )}
        </main>
      </div>
    </ProductProvider>
  );
};

export default App;
