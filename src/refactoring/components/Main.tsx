import { useState } from 'react';

import NavigationHeader from './common/NavigationHeader.tsx';
import { CartPage } from './CartPage';
import { AdminPage } from './AdminPage';

const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader
        isAdmin={isAdmin}
        onSwitchPage={() => setIsAdmin(!isAdmin)}
      />
      <main className="container mx-auto mt-6">
        {isAdmin ? <AdminPage /> : <CartPage />}
      </main>
    </div>
  );
};

export default Main;
