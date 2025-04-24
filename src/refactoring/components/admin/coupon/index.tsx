import { Coupon } from "../../../../types";
import AddCoupon from "./add-coupon";
import CouponList from "./coupon-list";

interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

const CouponAdmin = ({ coupons, onCouponAdd }:Props) => {

    return (
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <AddCoupon onCouponAdd={onCouponAdd} />
            <CouponList coupons={coupons} />
          </div>
        </div>
    )
}

export default CouponAdmin;