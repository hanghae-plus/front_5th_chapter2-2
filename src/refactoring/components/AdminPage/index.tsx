import { useState } from 'react';
import { useProductContext } from '@/contexts/productContext';
import { useCouponsContext } from '@/contexts/couponContext';

import ProductList from './productSection/ProductList';
import NewProductForm from './productSection/NewProductForm';

import CouponForm from './couponSection/CouponForm';
import CouponList from './couponSection/CouponList';

export const AdminPage = () => {
  const { products, updateProduct, addProduct } = useProductContext();
  const { coupons, addCoupon } = useCouponsContext();

  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">관리자 페이지</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={() => setShowNewProductForm((prev) => !prev)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? '취소' : '새 상품 추가'}
          </button>
          {showNewProductForm && <NewProductForm onSubmit={addProduct} />}
          <ProductList products={products} onUpdate={updateProduct} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow space-y-4">
            <CouponForm onSubmit={addCoupon} />
            <CouponList coupons={coupons} />
          </div>
        </section>
      </div>
    </div>
  );
};
