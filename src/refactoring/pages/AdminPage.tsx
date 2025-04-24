import { ColumnLayout } from "../components/ui/layout/ColumnLayout.tsx";
import { ProductManagement } from "../components/features/product/ProductManagement.tsx";
import { CouponManagement } from "../components/features/coupon/CouponManagement.tsx";

export const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <ColumnLayout>
        <ProductManagement />
        <CouponManagement />
      </ColumnLayout>
    </div>
  );
};
