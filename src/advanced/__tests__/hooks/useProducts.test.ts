import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Product } from '@/types';
import { useProducts } from '@/hooks/useProduct';

const sampleProduct = (id: string, overrides?: Partial<Product>): Product => ({
  id,
  name: `상품 ${id}`,
  price: 10000,
  stock: 10,
  discounts: [],
  ...overrides,
});

describe('useProducts', () => {
  it('초기 상품 목록을 지정할 수 있어야 한다', () => {
    const defaultProducts = [sampleProduct('p1')];

    const { result } = renderHook(() => useProducts(defaultProducts));

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].id).toBe('p1');
  });

  it('새로운 상품을 추가할 수 있어야 한다', () => {
    const { result } = renderHook(() => useProducts([]));
    const newProduct = sampleProduct('p2');

    act(() => {
      result.current.addProduct(newProduct);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0]).toEqual(newProduct);
  });

  it('기존 상품의 정보를 수정할 수 있어야 한다', () => {
    const original = sampleProduct('p1', { name: '상품1', price: 10000 });
    const updated = sampleProduct('p1', { name: '변경된 상품1', price: 15000 });

    const { result } = renderHook(() => useProducts([original]));

    act(() => {
      result.current.updateProduct(updated);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0]).toEqual(updated);
  });
});
