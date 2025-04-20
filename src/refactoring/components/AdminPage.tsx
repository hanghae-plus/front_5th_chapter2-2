import { Coupon, Product } from '../../types.ts';
import { Admin } from './Admin';

export interface AdminPageProps {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = (props: AdminPageProps) => {
  return <Admin {...props} />;
};
