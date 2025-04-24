import { CouponList, NewCouponForm } from '../features/admin';

interface CouponManagerProps {}

export const CouponManager = ({}: CouponManagerProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <NewCouponForm />
        <CouponList />
      </div>
    </div>
  );
};
