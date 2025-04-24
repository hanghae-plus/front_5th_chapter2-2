import { Coupon } from "../../../../types"
import { AdminCouponItem } from "./AdminCouponItem"

interface Props {
    coupons: Coupon[];
}

export const AdminCouponList = ({coupons}: Props) => {
    return (
        <div className="space-y-2">
            {coupons.map((coupon, index) => (
                <AdminCouponItem key={index} coupon={coupon} index={index} />
            ))}
        </div>
    )
}