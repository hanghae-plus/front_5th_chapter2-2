import { CouponManageSection } from "../features/admin/coupon/coupon-manage-section.tsx";
import { ProductManageSection } from "../features/admin/product/product-manage-section.tsx";

export const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManageSection />
        <CouponManageSection />
      </div>
    </div>
  );
};
