import { useState } from "react";

/**
 * Set 기반의 토글 상태를 관리하는 커스텀 훅
 *
 * - 주로 아코디언, 멀티 셀렉트, 펼침/접힘 상태를 관리할 때 사용합니다.
 * - Set 자료구조를 사용하여 중복 없이 상태를 저장하고, 간단한 토글 인터페이스를 제공합니다.
 *
 * @template T - 토글 대상의 고유 식별자 타입 (string, number 등)
 * @param initialSet - 초기 상태로 사용할 Set (기본값: 빈 Set)
 */

export const useToggle = <T>(initialSet = new Set<T>()) => {
  const [openToggle, setOpenToggle] = useState<Set<T>>(initialSet);

  const handleToggleClick = (item: T) => {
    setOpenToggle((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  return {
    openToggle,
    handleToggleClick,
  };
};
