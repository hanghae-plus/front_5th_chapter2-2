import { useState } from 'react';
import { AdminPage } from './page/admin';
import { CartPage } from './page/cart';
import { useCoupons, useProducts } from './features/cart/hooks';
import { INITIAL_PRODUCTS } from './constants/initialProducts';
import { INITIAL_COUPONS } from './constants/initialCoupons';

const App = () => {
  // 상품 관리 훅 사용
  const { products, updateProduct, addProduct } = useProducts(INITIAL_PRODUCTS);
  // 쿠폰 관리 훅 사용
  const { coupons, newCoupon, setNewCoupon, handleAddCoupon } = useCoupons(INITIAL_COUPONS);
  // 관리자 페이지 표시 여부 상태 관리
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            {isAdmin ? '장바구니 페이지로' : '관리자 페이지로'}
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            //새로운 쿠폰
            newCoupon={newCoupon}
            setNewCoupon={setNewCoupon}
            handleAddCoupon={handleAddCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
