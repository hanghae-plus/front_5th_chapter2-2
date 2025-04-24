import { useState } from "react";
import { Coupon } from "../../../types";
import { SectionLayout } from "../common";
import { CouponForm } from "./CouponForm";
import { CouponItemList } from "./CouponItemList";

interface CouponManagementSectionProps {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManagementSection = ({
  coupons,
  onCouponAdd,
}: CouponManagementSectionProps) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const handleCouponChange = (coupon: Coupon) => {
    setNewCoupon(coupon);
  };

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
