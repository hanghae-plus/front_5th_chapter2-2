import { describe, it, expect } from 'vitest';
import { updateCartItemQuantity, updateCartWithProduct } from '@/models/cart';
import type { CartItem, Product } from '@/types';

const sampleProduct = (overrides?: Partial<Product>): Product => ({
  id: 'p1',
  name: '샘플상품',
  price: 10000,
  stock: 10,
  discounts: [],
  ...overrides,
});

describe('updateCartItemQuantity', () => {
  it('장바구니에 있는 상품의 수량을 변경할 수 있어야 한다', () => {
    const cart: CartItem[] = [{ product: sampleProduct(), quantity: 2 }];

    const result = updateCartItemQuantity(cart, 'p1', 5);

    expect(result).toEqual([{ product: sampleProduct(), quantity: 5 }]);
  });

  it('변경 수량이 0이면 해당 상품을 제거해야 한다', () => {
    const cart: CartItem[] = [{ product: sampleProduct(), quantity: 3 }];

    const result = updateCartItemQuantity(cart, 'p1', 0);

    expect(result).toEqual([]);
  });

  it('장바구니에 없는 상품이면 아무런 변화가 없어야 한다', () => {
    const cart: CartItem[] = [{ product: sampleProduct(), quantity: 2 }];

    const result = updateCartItemQuantity(cart, 'unknown-1', 5);

    expect(result).toEqual(cart);
  });

  it('수량이 재고를 초과하면 재고 수량으로 제한해야 한다', () => {
    const cart: CartItem[] = [
      { product: sampleProduct({ stock: 5 }), quantity: 2 },
    ];

    const result = updateCartItemQuantity(cart, 'p1', 10);

    expect(result[0].quantity).toBe(5);
  });
});

describe('updateCartWithProduct', () => {
  it('장바구니에 상품을 추가할 수 있어야 한다', () => {
    const product = sampleProduct();
    const cart: CartItem[] = [];

    const result = updateCartWithProduct(cart, product);

    expect(result).toEqual([{ product, quantity: 1 }]);
  });

  it('장바구니에 이미 있는 상품이면 수량을 증가시켜야 한다', () => {
    const product = sampleProduct({ stock: 10 });
    const cart: CartItem[] = [{ product, quantity: 3 }];

    const result = updateCartWithProduct(cart, product);

    expect(result[0].quantity).toBe(4);
  });

  it('상품 수량 증가 시 재고 수량을 초과하지 않도록 수량을 제한해야 한다', () => {
    const product = sampleProduct({ stock: 3 });
    const cart: CartItem[] = [{ product, quantity: 3 }];

    const result = updateCartWithProduct(cart, product);

    expect(result[0].quantity).toBe(3);
  });
});
