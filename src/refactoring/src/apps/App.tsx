import { useState } from "react";
import { AdminPage } from "../pages/admin";
import { CartPage } from "../pages/cart";
import { MainLayout } from "./layout/main";
import { CouponProvider } from "./providers/coupon";
import { ProductsProvider } from "./providers/products";

const App = () => {
  const [isRenderAdmin, setIsRenderAdmin] = useState(false);

  return (
    <ProductsProvider>
      <CouponProvider>
        <MainLayout
          isAdmin={isRenderAdmin}
          handleToggle={() => setIsRenderAdmin((prev) => !prev)}
        >
          <main className="container mx-auto mt-6">
            {isRenderAdmin ? <AdminPage /> : <CartPage />}
          </main>
        </MainLayout>
      </CouponProvider>
    </ProductsProvider>
  );
};

export default App;
