import { useState } from 'react';
import { Coupon } from '../../../types';

interface UseNewCouponProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}
const useNewCoupon = (props: UseNewCouponProps) => {
  const { onCouponAdd } = props;
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });

  // 필드 업데이트
  const updateCouponField = <K extends keyof Coupon>(filed: K, value: Coupon[K]) => {
    setNewCoupon((prevCoupon) => ({
      ...prevCoupon,
      [filed]: value,
    }));
  };

  // 쿠폰 추가 + 리셋 호출 (액션 함수)
  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    resetCoupon();
  };

  // 리셋
  const resetCoupon = () => {
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    });
  };

  return {
    newCoupon,
    updateCouponField,
    handleAddCoupon,
  };
};

export default useNewCoupon;
