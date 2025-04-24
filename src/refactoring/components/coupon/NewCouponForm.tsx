import { ChangeEvent, useState } from 'react';
import { Button, Select } from '../ui';
import { validateFields } from '@/refactoring/utils';
import type { Coupon } from '@/types';

interface NewCouponFormProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}

const initialNewCoupon: Coupon = {
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
};

const couponOptions = [
  {
    key: 'coupon-amount',
    value: 'amount',
    content: '금액(원)',
  },
  {
    key: 'coupon-percentage',
    value: 'percentage',
    content: '할인율(%)',
  },
];

export const NewCouponForm = ({ onCouponAdd }: NewCouponFormProps) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(initialNewCoupon);

  const handleClick = () => {
    if (validateFields<Coupon>(newCoupon, '새 쿠폰 정보를 입력해주세요.'))
      return;

    onCouponAdd(newCoupon);
    setNewCoupon(initialNewCoupon);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setNewCoupon((prevNewCoupon) => {
      return {
        ...prevNewCoupon,
        [name]: type === 'number' ? parseInt(value) : value,
      };
    });
  };

  return (
    <div className='space-y-2 mb-4'>
      <input
        type='text'
        placeholder='쿠폰 이름'
        name='name'
        value={newCoupon.name}
        onChange={handleChange}
        className='w-full p-2 border rounded'
      />
      <input
        type='text'
        placeholder='쿠폰 코드'
        name='code'
        value={newCoupon.code}
        onChange={handleChange}
        className='w-full p-2 border rounded'
      />
      <div className='flex gap-2'>
        <Select
          name='discountType'
          onChange={handleChange}
          className='w-full p-2'
          options={couponOptions}
        ></Select>
        <input
          type='number'
          placeholder='할인 값'
          name='discountValue'
          value={newCoupon.discountValue}
          onChange={handleChange}
          className='w-full p-2 border rounded'
        />
      </div>
      <Button
        className='w-full p-2'
        variant='solid'
        color='green'
        onClick={handleClick}
      >
        쿠폰 추가
      </Button>
    </div>
  );
};
