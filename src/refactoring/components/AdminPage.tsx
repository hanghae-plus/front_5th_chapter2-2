import { CouponManageSection } from "../features/admin/coupon/coupon-manage-section.tsx";
import { ProductManageSection } from "../features/admin/product/product-manage-section.tsx";
import { Layout } from "./layout.tsx";

export const AdminPage = () => {
  return (
    <Layout title="관리자 페이지">
      <ProductManageSection />
      <CouponManageSection />
    </Layout>
  );
};
