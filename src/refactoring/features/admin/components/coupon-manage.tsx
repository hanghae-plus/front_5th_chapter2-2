import { Coupon } from '../../shared/types/entities';
import { CouponForm } from './coupon-form';
import { CouponList } from './coupon-list';

interface CouponManageProps {
  coupons: Coupon[];
  newCoupon: Coupon;
  setNewCoupon: React.Dispatch<React.SetStateAction<Coupon>>;
  handleAddCoupon: () => void;
}

// 쿠폰 관리 컴포넌트
export const CouponManage = ({ coupons, newCoupon, setNewCoupon, handleAddCoupon }: CouponManageProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm newCoupon={newCoupon} setNewCoupon={setNewCoupon} onAddCoupon={handleAddCoupon} />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};
