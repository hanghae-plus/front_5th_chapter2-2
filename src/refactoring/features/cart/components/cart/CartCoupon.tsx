import { Coupon } from "@/types";
import { CartCouponSelect } from "./CartCouponSelect";
import { CartSelectedCoupon } from "./CartSelectedCoupon";

interface Props {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}

export const CartCoupon = ({ coupons, selectedCoupon, applyCoupon }: Props) => {
  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <CartCouponSelect applyCoupon={applyCoupon} coupons={coupons} />
      {selectedCoupon && <CartSelectedCoupon selectedCoupon={selectedCoupon} />}
    </div>
  );
};
