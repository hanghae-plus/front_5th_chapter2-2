/**
 * 특정 요소를 Set에서 토글(추가/삭제)하는 함수입니다.
 * 이미 존재하면 제거하고, 존재하지 않으면 추가합니다.
 *
 * @template T - Set의 요소 타입
 * @param set - 원본 Set
 * @param item - 토글할 요소
 * @returns 새로운 Set 인스턴스 (원본은 불변)
 *
 * @example
 * const original = new Set([1, 2]);
 * const toggled = toggleSetItem(original, 2); // => Set { 1 }
 * const toggled2 = toggleSetItem(original, 3); // => Set { 1, 2, 3 }
 */
export const toggleSetItem = <T>(set: Set<T>, item: T): Set<T> => {
    const newSet = new Set(set);
    newSet.has(item) ? newSet.delete(item) : newSet.add(item);
    return newSet;
  };