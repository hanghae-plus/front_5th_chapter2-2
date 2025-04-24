import { Coupon } from "../../../../types";
import { SectionLayout } from "../../common";
import { CouponForm } from "./CouponForm";
import { CouponItemList } from "./CouponItemList";
import { useCouponForm } from "../../../hooks";

interface CouponManagementSectionProps {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManagementSection = ({
  coupons,
  onCouponAdd,
}: CouponManagementSectionProps) => {
  const { newCoupon, handleAddCoupon, handleCouponChange } = useCouponForm({
    onCouponAdd,
  });

  return (
    <SectionLayout title="쿠폰 관리">
      <div className="bg-white p-4 rounded shadow">
        <CouponForm
          coupon={newCoupon}
          onChange={handleCouponChange}
          onSubmit={handleAddCoupon}
        />
        <CouponItemList coupons={coupons} />
      </div>
    </SectionLayout>
  );
};
