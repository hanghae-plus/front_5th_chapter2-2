import { Coupon } from "../../../../types";
import { CouponItem } from "./CouponItem";
import { Typography } from "../../common";

interface CouponItemListProps {
  coupons: Coupon[];
}

export const CouponItemList = ({ coupons }: CouponItemListProps) => {
  return (
    <div>
      <Typography variant="h3">현재 쿠폰 목록</Typography>
      <div className="space-y-2">
        {coupons.map((coupon, index) => (
          <CouponItem key={index} coupon={coupon} index={index} />
        ))}
      </div>
    </div>
  );
};
