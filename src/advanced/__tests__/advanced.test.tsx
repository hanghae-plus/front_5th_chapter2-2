import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from '@testing-library/react';
import { CartPage } from '../../refactoring/pages/CartPage';
import { AdminPage } from '../../refactoring/pages/AdminPage';
import { Coupon, Discount, Product } from '../../types';
import { useCart } from '../../refactoring/hooks';
import { useDiscount } from '../../refactoring/hooks/useDiscount';

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }],
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];
const mockCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p,
      ),
    );
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleCouponAdd = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return (
    <AdminPage
      products={products}
      coupons={coupons}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

describe('advanced > ', () => {
  describe('시나리오 테스트 > ', () => {
    test('장바구니 페이지 테스트 > ', async () => {
      render(<CartPage products={mockProducts} coupons={mockCoupons} />);
      const product1 = screen.getByTestId('product-p1');
      const product2 = screen.getByTestId('product-p2');
      const product3 = screen.getByTestId('product-p3');
      const addToCartButtonsAtProduct1 =
        within(product1).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct2 =
        within(product2).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct3 =
        within(product3).getByText('장바구니에 추가');

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent('상품1');
      expect(product1).toHaveTextContent('10,000원');
      expect(product1).toHaveTextContent('재고: 20개');
      expect(product2).toHaveTextContent('상품2');
      expect(product2).toHaveTextContent('20,000원');
      expect(product2).toHaveTextContent('재고: 20개');
      expect(product3).toHaveTextContent('상품3');
      expect(product3).toHaveTextContent('30,000원');
      expect(product3).toHaveTextContent('재고: 20개');

      // 2. 할인 정보 표시
      expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText('상품 금액: 10,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 0원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 10,000원')).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent('재고: 0개');
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent('재고: 0개');

      // 7. 할인율 계산
      expect(screen.getByText('상품 금액: 200,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 20,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 180,000원')).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText('+');
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 110,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 590,000원')).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole('combobox');
      fireEvent.change(couponSelect, { target: { value: '1' } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 169,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 531,000원')).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: '0' } }); // 5000원 할인 쿠폰
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 115,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 585,000원')).toBeInTheDocument();
    });

    test('관리자 페이지 테스트 > ', async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId('product-1');

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText('새 상품 추가'));

      fireEvent.change(screen.getByLabelText('상품명'), {
        target: { value: '상품4' },
      });
      fireEvent.change(screen.getByLabelText('가격'), {
        target: { value: '15000' },
      });
      fireEvent.change(screen.getByLabelText('재고'), {
        target: { value: '30' },
      });

      fireEvent.click(screen.getByText('추가'));

      const $product4 = screen.getByTestId('product-4');

      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15000원');
      expect($product4).toHaveTextContent('재고: 30');

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), {
          target: { value: '25' },
        });
        fireEvent.change(within($product1).getByDisplayValue('10000'), {
          target: { value: '12000' },
        });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), {
          target: { value: '수정된 상품1' },
        });
      });

      fireEvent.click(within($product1).getByText('수정 완료'));

      expect($product1).toHaveTextContent('수정된 상품1');
      expect($product1).toHaveTextContent('12000원');
      expect($product1).toHaveTextContent('재고: 25');

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), {
          target: { value: '5' },
        });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
          target: { value: '5' },
        });
      });
      fireEvent.click(screen.getByText('할인 추가'));

      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인'),
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인'),
      ).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(
        screen.queryByText('10개 이상 구매 시 10% 할인'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('5개 이상 구매 시 5% 할인'),
      ).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), {
        target: { value: '새 쿠폰' },
      });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), {
        target: { value: 'NEW10' },
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'percentage' },
      });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), {
        target: { value: '10' },
      });

      fireEvent.click(screen.getByText('쿠폰 추가'));

      const $newCoupon = screen.getByTestId('coupon-3');

      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    });
  });

  describe('자유롭게 작성해보세요.', () => {
    test('새로운 유틸 함수를 만든 후에 테스트 코드를 작성해서 실행해보세요', () => {
      expect(true).toBe(false);
    });
  });

  describe('커스텀 훅 > ', () => {
    describe('useCart > ', () => {
      const productA: Product = {
        id: 'p1',
        name: 'Product A',
        price: 10000,
        stock: 10,
        discounts: [],
      };

      const productB: Product = {
        id: 'p2',
        name: 'Product B',
        price: 20000,
        stock: 10,
        discounts: [],
      };

      const coupon: Coupon = {
        name: '10% 할인 쿠폰',
        code: 'TENPERCENT',
        discountType: 'percentage',
        discountValue: 10,
      };

      test('상품을 장바구니에 추가하면 cart에 반영되어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA);
        });
        expect(result.current.cart.length).toBe(1);
        expect(result.current.cart[0].product).toEqual(productA);
      });

      test('같은 상품을 두 번 추가하면 수량이 증가해야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA);
          result.current.addToCart(productA);
        });
        expect(result.current.cart.length).toBe(1);
        expect(result.current.cart[0].quantity).toBe(2);
      });

      test('서로 다른 상품을 추가하면 각각 장바구니에 있어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA);
          result.current.addToCart(productB);
        });
        expect(result.current.cart.length).toBe(2);
      });

      test('상품의 수량을 변경할 수 있어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA);
          result.current.updateQuantity(productA.id, 5);
        });
        expect(result.current.cart[0].quantity).toBe(5);
      });

      test('상품을 장바구니에서 제거할 수 있어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA);
          result.current.removeFromCart(productA.id);
        });
        expect(result.current.cart).toEqual([]);
      });

      test('쿠폰을 적용할 수 있어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.applyCoupon(coupon);
        });
        expect(result.current.selectedCoupon).toEqual(coupon);
      });

      test('장바구니에 아무 상품도 없으면 기본 총액을 반환해야 한다', () => {
        const { result } = renderHook(() => useCart());
        const total = result.current.calculateTotal();
        expect(total.totalAfterDiscount).toBe(0); // getDefaultCartTotal이 0을 반환한다고 가정
      });

      test('쿠폰이 적용된 경우 총액은 할인된 가격으로 계산되어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA); // 10000
          result.current.updateQuantity(productA.id, 2); // 20000
          result.current.applyCoupon(coupon); // 10% 할인 → 18000
        });
        const total = result.current.calculateTotal();
        expect(total.totalAfterDiscount).toBe(18000);
      });

      test('존재하지 않는 상품을 제거해도 에러가 나지 않아야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.removeFromCart('invalid-id');
        });
        expect(result.current.cart).toEqual([]);
      });

      test('존재하지 않는 상품의 수량을 변경해도 에러가 나지 않아야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.updateQuantity('invalid-id', 5);
        });
        expect(result.current.cart).toEqual([]);
      });

      test('상품 수량을 0으로 변경하면 장바구니에서 제거되어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA);
          result.current.updateQuantity(productA.id, 0);
        });
        expect(result.current.cart).toEqual([]);
      });

      test('상품 수량을 음수로 변경해도 장바구니에서 제거되어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(productA);
          result.current.updateQuantity(productA.id, -5);
        });
        expect(result.current.cart).toEqual([]);
      });

      test('잘못된 쿠폰(할인율이 0 이하)을 적용해도 에러가 나지 않아야 한다', () => {
        const invalidCoupon: Coupon = {
          name: '무효 쿠폰',
          code: 'ZERO',
          discountType: 'percentage',
          discountValue: 0,
        };

        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.applyCoupon(invalidCoupon);
        });
        expect(result.current.selectedCoupon).toEqual(invalidCoupon);
        const total = result.current.calculateTotal();
        expect(total.totalAfterDiscount).toBe(0); // 장바구니가 비어 있으므로 총액은 0
      });

      test('중복된 쿠폰을 여러 번 적용해도 마지막 값만 유지되어야 한다', () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.applyCoupon(coupon);
          result.current.applyCoupon(coupon); // 같은 쿠폰 다시 적용
        });
        expect(result.current.selectedCoupon).toEqual(coupon);
      });
    });

    describe('useDiscount > ', () => {
      const productA: Product = {
        id: 'p1',
        name: '상품 A',
        price: 10000,
        stock: 10,
        discounts: [],
      };

      const discount: Discount = {
        quantity: 5,
        rate: 0.1,
      };

      test('editingProduct가 없으면 할인을 추가하지 않아야 한다', () => {
        const products = [productA];
        const mockSetEditing = vi.fn();
        const mockOnUpdate = vi.fn();

        const { result } = renderHook(() =>
          useDiscount(products, null, mockSetEditing, mockOnUpdate),
        );

        act(() => {
          result.current.setNewDiscount(discount);
          result.current.handleAddDiscount('p1');
        });

        expect(mockOnUpdate).not.toHaveBeenCalled();
        expect(mockSetEditing).not.toHaveBeenCalled();
      });

      test('할인을 제거하면 해당 인덱스가 삭제되어야 한다', () => {
        const productWithDiscount: Product = {
          ...productA,
          discounts: [
            { quantity: 1, rate: 0.05 },
            { quantity: 5, rate: 0.1 },
          ],
        };

        const products = [productWithDiscount];
        const mockSetEditing = vi.fn();
        const mockOnUpdate = vi.fn();

        const { result } = renderHook(() =>
          useDiscount(
            products,
            productWithDiscount,
            mockSetEditing,
            mockOnUpdate,
          ),
        );

        act(() => {
          result.current.handleRemoveDiscount('p1', 0);
        });

        expect(mockOnUpdate).toHaveBeenCalled();
        const updated = mockOnUpdate.mock.calls[0][0];
        expect(updated.discounts.length).toBe(1);
        expect(updated.discounts[0]).toEqual({ quantity: 5, rate: 0.1 });
      });

      test('없는 상품 ID로 할인 제거를 시도하면 아무 일도 일어나지 않아야 한다', () => {
        const products = [productA];
        const mockSetEditing = vi.fn();
        const mockOnUpdate = vi.fn();

        const { result } = renderHook(() =>
          useDiscount(products, productA, mockSetEditing, mockOnUpdate),
        );

        act(() => {
          result.current.handleRemoveDiscount('invalid-id', 0);
        });

        expect(mockOnUpdate).not.toHaveBeenCalled();
        expect(mockSetEditing).not.toHaveBeenCalled();
      });
    });
  });
});
