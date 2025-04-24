import { Coupon } from "@/types";
import CouponForm from "./CouponForm";
import CouponList from "./CouponList";
import { useCouponUI } from "@/refactoring/hooks/useCouponUI";

interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

const CouponSection = ({ coupons, onCouponAdd }: Props) => {
  const { newCoupon, updateNewCoupon, resetNewCoupon } = useCouponUI();

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    resetNewCoupon();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm
          newCoupon={newCoupon}
          updateNewCoupon={updateNewCoupon}
          onAddCoupon={handleAddCoupon}
        />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};

export default CouponSection;
