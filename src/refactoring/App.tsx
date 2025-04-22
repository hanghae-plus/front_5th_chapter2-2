import { useCallback, useState } from "react";

import { CartPage } from "./pages/cart/CartPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { useCoupons, useProducts } from "./hooks";
import Nav from "./components/layouts/Nav";
import Layout from "./components/layouts/Layout";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const onToggleAdmin = useCallback(() => {
    setIsAdmin((prev) => !prev);
  }, []);

  const { products, updateProduct, addProduct } = useProducts();
  const { coupons, addCoupon } = useCoupons();

  return (
    <Layout>
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
          <CartPage />
        )}
      </main>
    </Layout>
  );
};

export default App;
