/**
 * 비율을 퍼센트로 변환 (0.1 → 10)
 */
export const rateToPercent = (rate: number): number => Math.round(rate * 100);

/**
 * 퍼센트를 비율로 변환 (10 → 0.1)
 */
export const percentToRate = (percent: number): number => percent / 100;
