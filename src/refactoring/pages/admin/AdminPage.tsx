import { Coupon, Product } from '@/types';
import { PageLayout } from '@/components';
import { CouponSection, ProductSection } from '@/features/admin/components';

interface Props {
  products: Product[];
  coupons: Coupon[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  addCoupon: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  updateProduct,
  addProduct,
  addCoupon,
}: Props) => {
  return (
    <PageLayout title="상품 관리">
      <ProductSection
        products={products}
        updateProduct={updateProduct}
        addProduct={addProduct}
      />
      <CouponSection addCoupon={addCoupon} coupons={coupons} />
    </PageLayout>
  );
};
