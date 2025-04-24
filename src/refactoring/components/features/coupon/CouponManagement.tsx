import { CouponList } from "./CouponList";
import { CouponForm } from "./CouponForm";

export const CouponManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm />
        <CouponList />
      </div>
    </div>
  );
};
