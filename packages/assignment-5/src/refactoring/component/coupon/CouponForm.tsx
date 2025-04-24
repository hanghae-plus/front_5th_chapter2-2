import React from 'react';
import { Coupon } from '../../types';
import { InputField } from '../common/InputField';
import { SelectField } from '../common/SelectField';
import { Button } from '../common/Button';

interface CouponFormProps {
  coupon: Coupon;
  onChange: (updated: Coupon) => void;
  onSubmit: () => void;
}

export const CouponForm: React.FC<CouponFormProps> = ({ coupon, onChange, onSubmit }) => {
  const handleChange = (key: keyof Coupon, value: string | number) => {
    onChange({ ...coupon, [key]: value });
  };

  return (
    <div className="space-y-2 mb-4">
      <InputField
        label="쿠폰 이름"
        type="text"
        value={coupon.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <InputField
        label="쿠폰 코드"
        type="text"
        value={coupon.code}
        onChange={(e) => handleChange('code', e.target.value)}
      />
      <div className="flex gap-2">
        <SelectField
          label="할인 타입"
          value={coupon.discountType}
          onChange={(value) => handleChange('discountType', value)}
          options={[
            { label: '금액(원)', value: 'amount' },
            { label: '할인율(%)', value: 'percentage' },
          ]}
        />
        <InputField
          label="할인 값"
          type="number"
          value={coupon.discountValue}
          onChange={(e) => handleChange('discountValue', parseInt(e.target.value) || 0)}
        />
      </div>
      <Button onClick={onSubmit}>쿠폰 추가</Button>
    </div>
  );
};

