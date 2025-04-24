import Nav from "./components/common/Nav.tsx";
import Layout from "./components/common/Layout.tsx";
import { AdminPage } from "./components/AdminPage.tsx";
import { CartPage } from "./components/CartPage.tsx";
import { useCoupons, useProducts } from "./hooks";
import { initialProducts } from "./constants/initialProducts.ts";
import { initialCoupons } from "./constants/initialCoupons.ts";
import { useCallback, useState } from "react";

const App = () => {
  const { products, addProduct, updateProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  const [isAdmin, setIsAdmin] = useState(false);

  const onToggleAdmin = useCallback(() => {
    setIsAdmin((prev) => !prev);
  }, []);

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
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </Layout>
  );
};

export default App;
