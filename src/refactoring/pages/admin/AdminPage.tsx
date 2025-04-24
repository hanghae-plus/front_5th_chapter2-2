import ProductManagement from "./_components/section01/ProductManagement";
import CouponForm from "./_components/section02/CouponForm";
import CouponList from "./_components/section02/CouponList";

export const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManagement />
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <CouponForm />
            <CouponList />
          </div>
        </div>
      </div>
    </div>
  );
};
