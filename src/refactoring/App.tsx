import { useState } from 'react';
import { CartPage } from './components/CartPage.tsx';
import { AdminPage } from './components/AdminPage.tsx';
import { Coupon } from '../types.ts';
import { useCoupons } from './hooks';
import NavigationHeader from './components/NavigationHeader.tsx';
import { ProductProvider } from './contexts/productContext.tsx';

const initialCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
];

const App = () => {
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-100">
        <NavigationHeader
          isAdmin={isAdmin}
          onSwitchPage={() => setIsAdmin(!isAdmin)}
        />
        <main className="container mx-auto mt-6">
          {isAdmin ? (
            <AdminPage coupons={coupons} onCouponAdd={addCoupon} />
          ) : (
            <CartPage coupons={coupons} />
          )}
        </main>
      </div>
    </ProductProvider>
  );
};

export default App;
