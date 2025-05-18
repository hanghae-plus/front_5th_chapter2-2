import { Coupon, Product } from "../../types.ts";
import { PageLayout } from "../components/common";
import {
  ProductManagementSection,
  CouponManagementSection,
} from "../components/admin";
interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  return (
    <PageLayout title="관리자 페이지">
      <ProductManagementSection
        products={products}
        onProductUpdate={onProductUpdate}
        onProductAdd={onProductAdd}
      />
      <CouponManagementSection coupons={coupons} onCouponAdd={onCouponAdd} />
    </PageLayout>
  );
};
