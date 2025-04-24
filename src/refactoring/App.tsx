import { useState } from 'react';
import { AdminPage, CartPage } from './pages';
import { Coupon } from '../types.ts';
import { useCoupons } from './hooks';
import { Navbar } from './widgets/Navbar.tsx';
import { ProductProvider } from './shared';

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

  const toggleAdmin = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={isAdmin} toggleAdmin={toggleAdmin} />
      <ProductProvider>
        <main className="container mx-auto mt-6">
          {isAdmin ? (
            <AdminPage coupons={coupons} onCouponAdd={addCoupon} />
          ) : (
            <CartPage coupons={coupons} />
          )}
        </main>
      </ProductProvider>
    </div>
  );
};

export default App;
