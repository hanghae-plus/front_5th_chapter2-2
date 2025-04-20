import { Product, CouponItem } from "../types";
import { AdminProductList, AdminCouponList } from "../components";
interface AdminPageProps {
  products: Product[];
  coupons: CouponItem[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: CouponItem) => void;
}
const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: AdminPageProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminProductList
          products={products}
          onProductUpdate={onProductUpdate}
          onProductAdd={onProductAdd}
        />
        <AdminCouponList coupons={coupons} onCouponAdd={onCouponAdd} />
      </div>
    </div>
  );
};

export default AdminPage;
