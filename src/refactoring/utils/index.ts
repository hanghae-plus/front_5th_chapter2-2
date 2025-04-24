// className을 나열하거나, 조건적으로 포함할 때,
// `` 방식이 아닌, 문자열을 나열하여 유효한 값만 모아서 반환하는 유틸함수
export const $CN = (...className: string[]): string => className.filter(Boolean).join(" ");
