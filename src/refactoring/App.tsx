//provider
import { CartProvider } from "./provider/CartProvider.tsx";
import { ProductProvider } from "./provider/ProductProvider.tsx";
import { CouponProvider } from "./provider/CouponProvider.tsx";
//components
import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import Nav from "./layout/Nav.tsx";
//hooks
import { useAdmin } from "./hooks";
//constants
import { initialCoupons, initialProducts } from "./constants";

const App = () => {
  const { isAdmin, toggleIsAdmin } = useAdmin();

  return (
    <ProductProvider initialProducts={initialProducts}>
      <CouponProvider intialCoupons={initialCoupons}>
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
