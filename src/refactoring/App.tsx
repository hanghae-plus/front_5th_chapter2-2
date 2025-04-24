import { useState } from "react";
import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { useCoupons, useProducts } from "./hooks";
import { Nav } from "./components/nav";
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from "./consts";

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(INITIAL_PRODUCTS);
  const { coupons, addCoupon } = useCoupons(INITIAL_COUPONS);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
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
