import { Coupon, Product } from '../../types.ts';
import ManageCoupon from '../components/admin/ManageCoupon.tsx';
import ManageProduct from '../components/admin/ManageProduct.tsx';
import { H1 } from '../components/shared';
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
    <div className="container mx-auto p-4">
      <H1>관리자 페이지</H1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ManageProduct
          products={products}
          onProductAdd={onProductAdd}
          onProductUpdate={onProductUpdate}
        />
        <ManageCoupon coupons={coupons} onAddCoupon={onCouponAdd} />
      </div>
    </div>
  );
};
