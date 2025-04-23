import { useState } from 'react'

export default function CouponManage() {
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
    <div>CouponManage</div>
  )
}
