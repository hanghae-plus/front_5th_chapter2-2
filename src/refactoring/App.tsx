import { useState } from 'react';
import { AdminPage, CartPage } from './pages';
import { Navbar } from './widgets/Navbar.tsx';
import { CouponProvider, ProductProvider } from './shared';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={isAdmin} toggleAdmin={toggleAdmin} />
      <ProductProvider>
        <CouponProvider>
          <main className="container mx-auto mt-6">
            {isAdmin ? <AdminPage /> : <CartPage />}
          </main>
        </CouponProvider>
      </ProductProvider>
    </div>
  );
};

export default App;
