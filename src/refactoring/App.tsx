import { useState } from 'react';
import { CartPage } from './pages/carts/page.tsx';
import { AdminPage } from './pages/admin/page.tsx';
import { initialCoupons, initialProducts, useCoupons, useProducts } from './hooks';
import Layout from './components/layouts/Layout.tsx';

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Layout setIsAdmin={setIsAdmin} isAdmin={isAdmin}>
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
    </Layout>
  );
};

export default App;
