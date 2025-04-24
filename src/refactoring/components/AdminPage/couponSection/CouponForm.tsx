import { useState, ChangeEvent } from 'react';

import type { Coupon } from '@/types';
import { DEFAULT_COUPON } from '@/constants';

interface CouponFormProps {
  onSubmit: (coupon: Coupon) => void;
}

export default function CouponForm({ onSubmit }: CouponFormProps) {
  const [coupon, setCoupon] = useState<Coupon>(DEFAULT_COUPON);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCoupon((prev) => {
      const isNumeric = name === 'discountValue' || name === 'price';
      const newValue = isNumeric ? Number(value) : value;

      return { ...prev, [name]: newValue };
    });
  };

  const handleSubmit = () => {
    if (!coupon.name || !coupon.code) return;

    onSubmit(coupon);
    setCoupon(DEFAULT_COUPON);
  };

  return (
    <div className="space-y-2">
      <input
        name="name"
        className="w-full p-2 border rounded"
        placeholder="쿠폰 이름"
        value={coupon.name}
        onChange={handleChange}
      />

      <input
        name="code"
        className="w-full p-2 border rounded"
        placeholder="쿠폰 코드"
        value={coupon.code}
        onChange={handleChange}
      />

      <div className="flex gap-2">
        <select
          name="discountType"
          aria-label="discount-type"
          className="w-full p-2 border rounded"
          value={coupon.discountType}
          onChange={handleChange}
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>

        <input
          name="discountValue"
          className="w-full p-2 border rounded"
          type="number"
          placeholder="할인 값"
          value={coupon.discountValue}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
}
