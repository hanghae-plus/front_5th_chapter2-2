import { Coupon, Product } from '../types';
import { ProductManager } from '../components/admin/ProductManager.tsx';
import { CouponManager } from '../components/admin/CouponManager.tsx';
import { MainLayout } from '../components/layout/MainLayout.tsx';

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
    <MainLayout title={'관리자 페이지'}>
      <ProductManager
        products={products}
        onProductUpdate={onProductUpdate}
        onProductAdd={onProductAdd}
      ></ProductManager>
      <CouponManager
        coupons={coupons}
        onCouponAdd={onCouponAdd}
      ></CouponManager>
    </MainLayout>
  );
};
