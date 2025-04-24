import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { useAdmin, useCoupons } from "./hooks";
import { initialProducts, initialCoupons } from "./constants";
import Nav from "./layout/Nav.tsx";
import { CartProvider } from "./provider/CartProvider.tsx";
import { ProductProvider } from "./provider/ProductProvider.tsx";
import { CouponProvider } from "./provider/CouponProvider.tsx";
const App = () => {
  //액션, 계산, 데이터
  const { isAdmin, toggleIsAdmin } = useAdmin();

  return (
    <ProductProvider initialProducts={initialProducts}>
      <CouponProvider>
        <div className="min-h-screen bg-gray-100">
          <Nav isAdmin={isAdmin} toggleIsAdmin={toggleIsAdmin} />
          <main className="container mx-auto mt-6">
            {isAdmin ? (
              <AdminPage />
            ) : (
              <CartProvider>
                <CartPage />
              </CartProvider>
            )}
          </main>
        </div>
      </CouponProvider>
    </ProductProvider>
  );
};

export default App;
