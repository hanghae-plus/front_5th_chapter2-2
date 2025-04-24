import { Coupon, Product } from '../../types.ts';
import ProductAdmin from './admin/product/index.tsx';
import CouponAdmin from './admin/coupon/index.tsx';

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({ products, coupons, onProductUpdate, onProductAdd, onCouponAdd }: Props) => {

  //만약 AdminPage에서 CartList를 사용하고 싶다면
  // CartList에 필요한 props를 어떻게 관리해야하는가? 여기서 다시 useCart 사용??? 그러면 Cartpage에서 쓰는 데이터와 달라지지만 다른 페이지이기에 상관없나?

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <CartList /> */}
        <ProductAdmin onProductAdd={onProductAdd} onProductUpdate={onProductUpdate} products={products} />
        <CouponAdmin onCouponAdd={onCouponAdd} coupons={coupons} />
      </div>
    </div>
  );
};
