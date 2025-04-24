import { useState } from 'react';
import { Coupon } from '../../types';
import { SectionTitle } from '../layout/SectionTitle.tsx';
import { CardBox } from '../layout/CardBox.tsx';
import { CouponForm } from './CouponForm.tsx';
import { CouponList } from './CouponList.tsx';

interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManager = ({ coupons, onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    });
  };
  return (
    <div>
      <SectionTitle sectionTitle={'쿠폰 관리'} />
      <CardBox>
        <CouponForm
          newCoupon={newCoupon}
          setNewCoupon={setNewCoupon}
          onSubmit={handleAddCoupon}
        />
        <CouponList coupons={coupons} />
      </CardBox>
    </div>
  );
};
