export const formatDiscountRate = (rate: number): string => {
  return `${(rate * 100).toFixed(0)}%`;
};
