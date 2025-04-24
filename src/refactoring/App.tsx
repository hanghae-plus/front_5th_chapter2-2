import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { useAdmin, useCoupons, useProducts } from "./hooks";
import { initialProducts, initialCoupons } from "./constants";
import Nav from "./layout/Nav.tsx";
import { CartProvider } from "./provider/CartProvider.tsx";
import { ProductProvider } from "./provider/ProductProvider.tsx";
const App = () => {
  //액션, 계산, 데이터
  const { isAdmin, toggleIsAdmin } = useAdmin();

  const { products } = useProducts(initialProducts);

  const { coupons, newCoupon, handleAddNewCoupon, setNewCoupon } =
    useCoupons(initialCoupons);

  return (
    <ProductProvider initialProducts={initialProducts}>
      <div className="min-h-screen bg-gray-100">
        <Nav isAdmin={isAdmin} toggleIsAdmin={toggleIsAdmin} />
        <main className="container mx-auto mt-6">
          {isAdmin ? (
            <AdminPage
              coupons={coupons}
              newCoupon={newCoupon}
              setNewCoupon={setNewCoupon}
              handleAddNewCoupon={handleAddNewCoupon}
            />
          ) : (
            <CartProvider>
              <CartPage products={products} coupons={coupons} />
            </CartProvider>
          )}
        </main>
      </div>
    </ProductProvider>
  );
};

export default App;
