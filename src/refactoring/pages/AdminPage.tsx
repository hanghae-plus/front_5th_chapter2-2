import { Coupon } from "../../types.ts";
import ProductManage from "../components/admin/ProductManage.tsx";
import CouponManage from "../components/admin/CouponManage.tsx";

interface Props {
  coupons: Coupon[];
  newCoupon: Coupon;
  setNewCoupon: React.Dispatch<React.SetStateAction<Coupon>>;
  handleAddNewCoupon: () => void;
}

export const AdminPage = ({
  coupons,
  newCoupon,
  setNewCoupon,
  handleAddNewCoupon,
}: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManage />
        <CouponManage
          coupons={coupons}
          newCoupon={newCoupon}
          setNewCoupon={setNewCoupon}
          handleAddNewCoupon={handleAddNewCoupon}
        />
      </div>
    </div>
  );
};
