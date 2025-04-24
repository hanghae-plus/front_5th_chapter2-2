import { Discount } from '@/types';
import { getMaxDiscount } from '@/features/cart/utils';

import { formatDiscountRate } from '@/features/cart/utils';

export const ProductMaxDiscountRate = ({ discounts }: { discounts: Discount[] }) => {
  // if 문을 컴포넌트 내부로 두어서 재사용시 외부에서 조건 설정 안해줘도 된다. -> 이게 좋나?
  if (discounts.length === 0) return null;

  return (
    <span className="ml-2 font-medium text-blue-600">
      최대 {formatDiscountRate(getMaxDiscount(discounts))} 할인
    </span>
  );
};
