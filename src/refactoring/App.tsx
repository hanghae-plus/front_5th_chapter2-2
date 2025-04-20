import { useCallback, useState } from "react";
import { CartPage } from "./cart/_components/page/CartPage";
import { AdminPage } from "./admin/_components/page/AdminPage";
import { useCoupons, useProducts } from "./hooks";
import Nav from "./components/layouts/Nav";
import { initialProducts, initialCoupons } from "./constants";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const onToggleAdmin = useCallback(() => {
    setIsAdmin((prev) => !prev);
  }, []);

  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  return (
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
  );
};

export default App;
