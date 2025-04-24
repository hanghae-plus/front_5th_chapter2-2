import React from 'react';
import type { Coupon } from '../../../../types';

import CouponListItem from './CouponListItem';

interface CouponListProps {
  coupons: Coupon[];
}

const CouponList = React.memo(({ coupons }: CouponListProps) => (
  <div className="space-y-2">
    {coupons.map((coupon, i) => (
      <CouponListItem coupon={coupon} index={i} key={i} />
    ))}
  </div>
));
export default CouponList;
