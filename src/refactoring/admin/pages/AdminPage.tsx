import { Coupon, Product } from "../../../types.ts";
import AdminProductPanel from "../components/AdminProductPanel.tsx";
import AdminCouponPanel from "../components/AdminCouponPanel.tsx";

interface AdminPageProps {
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
  onCouponAdd
}: AdminPageProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminProductPanel
          products={products}
          onProductUpdate={onProductUpdate}
          onProductAdd={onProductAdd}
        />
        <AdminCouponPanel onCouponAdd={onCouponAdd} coupons={coupons} />
      </div>
    </div>
  );
};
