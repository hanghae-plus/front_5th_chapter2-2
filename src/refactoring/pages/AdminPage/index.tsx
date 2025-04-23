import { CouponList } from "@/refactoring/pages/AdminPage/CouponList";
import { NewCoupon } from "@/refactoring/pages/AdminPage/NewCoupon";
import { NewProductForm } from "@/refactoring/pages/AdminPage/NewProductForm";
import { ProductList } from "@/refactoring/pages/AdminPage/ProductList";
import { useState } from "react";

export const AdminPage = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button onClick={() => setShowNewProductForm(!showNewProductForm)} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {showNewProductForm && <NewProductForm setShowNewProductForm={setShowNewProductForm} />}
          <ProductList />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <NewCoupon />
            <CouponList />
          </div>
        </div>
      </div>
    </div>
  );
};
