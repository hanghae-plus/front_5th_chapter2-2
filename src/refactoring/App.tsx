import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { useAdmin, useCoupons, useProducts } from "./hooks";
import { initialProducts, initialCoupons } from "./constants";
import Nav from "./layout/Nav.tsx";
const App = () => {
  //액션, 계산, 데이터
  const { isAdmin, toggleIsAdmin } = useAdmin();

  const { products, updateProduct, addProduct } = useProducts(initialProducts);

  const { coupons, newCoupon, handleAddNewCoupon, setNewCoupon } =
    useCoupons(initialCoupons);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav isAdmin={isAdmin} toggleIsAdmin={toggleIsAdmin} />
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            newCoupon={newCoupon}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            setNewCoupon={setNewCoupon}
            handleAddNewCoupon={handleAddNewCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
