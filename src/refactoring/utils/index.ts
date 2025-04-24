// 백분율 => 소수 (22% => 0.22)
export const percentageToDecimal = (percentage: number): number => {
  if (isNegative(percentage)) {
    throw new Error('0보다 작은 값은 백분율로 변환할 수 없습니다.');
  }

  return percentage / 100;
};

// 값의 음수 여부 확인
export const isNegative = (val: number): boolean => val < 0;
