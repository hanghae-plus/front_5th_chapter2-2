import { CommonContainer } from "../../shared/ui";
import { CouponManagementContainer } from "../../widgets/coupon/ui";
import { ProductManagementContainer } from "../../widgets/products/ui";

export const AdminPage = () => {
  return (
    <CommonContainer title="관리자 페이지">
      <ProductManagementContainer />

      <CouponManagementContainer />
    </CommonContainer>
  );
};
