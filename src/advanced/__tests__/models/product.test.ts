import { describe, it, expect } from 'vitest';
import { updateProductList } from '@/models/product';
import type { Product } from '@/types';

const sampleProduct = (id: string, name: string): Product => ({
  id,
  name,
  price: 10000,
  stock: 10,
  discounts: [],
});

describe('updateProductList', () => {
  it('특정 id에 해당하는 상품의 정보를 업데이트할 수 있어야 한다', () => {
    const products: Product[] = [
      sampleProduct('p1', '상품1'),
      sampleProduct('p2', '상품2'),
    ];
    const updatedProduct = {
      ...sampleProduct('p2', '상품2-업데이트'),
      price: 15000,
    };
    const result = updateProductList(products, updatedProduct);

    expect(result).toEqual([
      sampleProduct('p1', '상품1'),
      { ...updatedProduct },
    ]);
  });

  it('해당하는 id가 없으면 상품 원본 정보을 반환해야 한다', () => {
    const products: Product[] = [sampleProduct('p1', '상품1')];
    const updatedProduct = sampleProduct('p999', '없는상품이랍니당');

    const result = updateProductList(products, updatedProduct);

    expect(result).toEqual(products);
  });
});
