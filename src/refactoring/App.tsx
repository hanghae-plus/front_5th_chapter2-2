import { useState } from 'react';
import { CartPage } from './components/CartPage.tsx';
import { AdminPage } from './components/AdminPage.tsx';
import { Coupon } from '../types.ts';
import { useCoupons } from './hooks';
import NavigationHeader from './components/NavigationHeader.tsx';
import { ProductProvider } from './contexts/productContext.tsx';
import { CouponProvider } from './contexts/couponContext.tsx';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ProductProvider>
      <CouponProvider>
        <div className="min-h-screen bg-gray-100">
          <NavigationHeader
            isAdmin={isAdmin}
            onSwitchPage={() => setIsAdmin(!isAdmin)}
          />
          <main className="container mx-auto mt-6">
            {isAdmin ? <AdminPage /> : <CartPage />}
          </main>
        </div>
      </CouponProvider>
    </ProductProvider>
  );
};

export default App;
