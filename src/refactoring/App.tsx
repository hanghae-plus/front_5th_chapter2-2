import { useState } from "react";
import { useCoupons, useProducts } from "./hooks";
import { Layout } from "./components";
import CartPage from "./pages/cart";
import AdminPage from "./pages/admin";
import { Provider } from "jotai";
import { initialCoupons, initialProducts } from "./mock";
const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Provider>
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin}>
        {isAdmin ? (
          <AdminPage
            // products={products}
            coupons={coupons}
            // onProductUpdate={updateProduct}
            // onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </Layout>
    </Provider>
  );
};

export default App;
