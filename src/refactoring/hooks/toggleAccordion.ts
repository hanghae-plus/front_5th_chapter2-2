import { Dispatch, SetStateAction, useCallback } from 'react';

export const useSetToggle = <T>(set: Dispatch<SetStateAction<Set<T>>>) => {
  return useCallback((item: T) => {
    set(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  }, [set]);
};