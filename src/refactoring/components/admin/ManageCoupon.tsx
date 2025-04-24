import { Coupon } from '../../../types';
import AddCouponForm from './AddCouponForm';
import CouponList from './CouponList';
import { H2, Card } from '../shared';

interface ManageCouponProps {
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
}
/**
 * 쿠폰 관리 페이지
 * @param coupons 쿠폰 목록
 * @param onAddCoupon 쿠폰 추가 함수
 * @returns 쿠폰 관리 페이지
 */
const ManageCoupon = ({ coupons, onAddCoupon }: ManageCouponProps) => {
  // 쿠폰 추가 함수
  const handleAddCoupon = (newCoupon: Coupon) => {
    onAddCoupon(newCoupon);
  };

  return (
    <div>
      <H2>쿠폰 관리</H2>
      <Card>
        <AddCouponForm onAddCoupon={handleAddCoupon} />
        <CouponList coupons={coupons} />
      </Card>
    </div>
  );
};

export default ManageCoupon;
