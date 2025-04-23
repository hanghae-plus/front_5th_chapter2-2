import { useState } from 'react';
import { CartPage } from './Cart/CartPage.tsx';
import { AdminPage } from './Admin/AdminPage.tsx';
import { useCoupons, useProducts } from './_hooks/index.ts';
import Layout from './_ui/Layout.tsx';

const App = () => {
  const { products, updateProduct, addProduct } = useProducts();
  const { coupons, addCoupon } = useCoupons();
  const [isAdmin, setIsAdmin] = useState(false);

  // TODO : 너무 맘에 안든다
  const handleChangePage = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 레이아웃 */}
      <Layout isAdmin={isAdmin} onClickAdmin={handleChangePage} />

      {/* 콘텐츠 */}
      <main className="container mx-auto mt-6">
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
      </main>
    </div>
  );
};

export default App;
