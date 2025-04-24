import { useState } from 'react';
import { CartPage, AdminPage } from './pages';
import { useCoupons, useProduct } from '@/features/shared/hooks';
import { Navigation } from './components';
import { COUPONS, NAVIGATION_TEXT, PRODUCTS } from './constants';

const App = () => {
  const { products, updateProduct, addProduct } = useProduct(PRODUCTS);
  const { coupons, addCoupon } = useCoupons(COUPONS);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
        title={NAVIGATION_TEXT.TITLE}
        toCartText={NAVIGATION_TEXT.BUTTON.TO_CART}
        toAdminText={NAVIGATION_TEXT.BUTTON.TO_ADMIN}
      />
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            updateProduct={updateProduct}
            addProduct={addProduct}
            addCoupon={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
