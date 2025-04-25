import { Coupon, Product } from '../../types.ts';
import ProductSection from '../components/AdminPage/Product/ManageProductSection.tsx';
import { EditProductProvider } from '../context/EditProductContext.tsx';
import CouponSection from '../components/AdminPage/Coupon/CouponSection.tsx';
import { CouponProvider } from '../context/CouponProvider.tsx';

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
  onCouponAdd
}: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EditProductProvider products={products} onProductUpdate={onProductUpdate}>
          <ProductSection products={products} onProductAdd={onProductAdd} />
        </EditProductProvider>
        <CouponProvider onCouponAdd={onCouponAdd}>
          <CouponSection coupons={coupons} />
        </CouponProvider>
      </div>
    </div>
  );
};
