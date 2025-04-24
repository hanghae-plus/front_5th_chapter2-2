import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { describe, it, expect, afterEach } from 'vitest';

describe('useLocalStorage', () => {
  const key = 'cart';

  afterEach(() => {
    localStorage.clear();
  });

  it('로컬 스토리지에 저장된 값이 없다면 기본값을 반환해야 한다', () => {
    const { result } = renderHook(() => useLocalStorage<string>(key, '기본값'));

    expect(result.current[0]).toBe('기본값');
  });

  it('로컬 스토리지에 저장된 값이 있으면 해당 값을 반환해야 한다', () => {
    localStorage.setItem(key, JSON.stringify('로컬에 저장된 값'));

    const { result } = renderHook(() => useLocalStorage<string>(key, '기본값'));

    expect(result.current[0]).toBe('로컬에 저장된 값');
  });

  it('값을 변경하면 로컬 스토리지에 그 값이 반영되어야 한다', () => {
    const { result } = renderHook(() => useLocalStorage<string>(key, '초기값'));

    act(() => {
      result.current[1]('업데이트!!');
    });

    expect(localStorage.getItem(key)).toBe(JSON.stringify('업데이트!!'));
  });

  it('object 타입의 값을 저장할 수 있어야 한다', () => {
    const obj = { a: 1, b: 'test' };

    renderHook(() => useLocalStorage<typeof obj>(key, obj));

    const parsed = JSON.parse(localStorage.getItem(key) || '{}');
    expect(parsed).toEqual({ a: 1, b: 'test' });
  });
});
