import CouponManagement from "../components/Admin/CouponManagement.tsx";
import ProductManagement from "../components/Admin/ProductManagement.tsx";
import { CouponManageProvider } from "../Providers/CouponManageProvider.tsx";
import { ProductManagementProvider } from "../Providers/ProductManagementProvider.tsx";

export const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManagementProvider>
          <ProductManagement />
        </ProductManagementProvider>
        <CouponManageProvider>
          <CouponManagement />
        </CouponManageProvider>
      </div>
    </div>
  );
};
