import React from 'react';
import { Coupon } from '../../types';

/**
 * CouponList 컴포넌트 Props 타입
 */
interface CouponListProps {
  coupons: Coupon[];
}

/**
 * 쿠폰 목록을 렌더링하는 컴포넌트입니다.
 */
export const CouponList: React.FC<CouponListProps> = ({ coupons }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
      <div className="space-y-2">
        {coupons.length === 0 && (
          <p className="text-gray-500">등록된 쿠폰이 없습니다.</p>
        )}
        {coupons.map((coupon, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <span className="font-medium">{coupon.name}</span>
            <span className="ml-2 text-sm text-gray-600">
              ({coupon.code}):{' '}
              {coupon.discountType === 'amount'
                ? `${coupon.discountValue.toLocaleString()}원`
                : `${coupon.discountValue}%`} 할인
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};