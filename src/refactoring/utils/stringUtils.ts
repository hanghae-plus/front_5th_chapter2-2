/**
 * 문자열의 첫 글자를 대문자로 변환하는 순수 함수
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 숫자에 콤마를 추가하여 가격 형식으로 변환하는 순수 함수
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString() + "원";
};

/**
 * 문자열 길이가 최대 길이를 초과하면 잘라내고 ... 을 추가하는 순수 함수
 */
export const truncate = (str: string, maxLength: number): string => {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
};

/**
 * 쿠폰 할인 타입을 한글로 변환하는 순수 함수
 */
export const formatDiscountType = (
  discountType: "amount" | "percentage"
): string => {
  return discountType === "amount" ? "금액" : "비율";
};

/**
 * 할인율을 백분율 문자열로 변환하는 순수 함수
 */
export const formatDiscountRate = (rate: number): string => {
  return (rate * 100).toFixed(0) + "%";
};
