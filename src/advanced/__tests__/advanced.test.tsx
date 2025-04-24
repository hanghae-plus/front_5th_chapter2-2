import Container from '../../refactoring/components/container/Container';
import ContainerTitle from '../../refactoring/components/container/ContainerTitle';
import CustomButton from '../../refactoring/components/button/CustomButton';
import CustomSelect from '../../refactoring/components/select/CustomSelect';
import CustomInput from '../../refactoring/components/input/CustomInput';

import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import { CartPage } from '../../refactoring/pages/CartPage';
import { AdminPage } from '../../refactoring/pages/AdminPage';
import { Coupon, Product } from '../../types';
import { useLocalStorage } from '../../refactoring/hooks/useLocalStorage';
import { formatComma } from '../../refactoring/utils/formatComma';
import { debounce } from '../../refactoring/utils/debounce';

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
    setProducts((prevProducts) => prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
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
      const addToCartButtonsAtProduct1 = within(product1).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct2 = within(product2).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct3 = within(product3).getByText('장바구니에 추가');

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

      fireEvent.change(screen.getByLabelText('상품명'), { target: { value: '상품4' } });
      fireEvent.change(screen.getByLabelText('가격'), { target: { value: '15000' } });
      fireEvent.change(screen.getByLabelText('재고'), { target: { value: '30' } });

      fireEvent.click(screen.getByText('추가'));

      const $product4 = screen.getByTestId('product-4');

      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15,000원');
      expect($product4).toHaveTextContent('재고: 30');

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), { target: { value: '25' } });
        fireEvent.change(within($product1).getByDisplayValue('10000'), { target: { value: '12000' } });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), { target: { value: '수정된 상품1' } });
      });

      fireEvent.click(within($product1).getByText('수정 완료'));

      expect($product1).toHaveTextContent('수정된 상품1');
      expect($product1).toHaveTextContent('12,000원');
      expect($product1).toHaveTextContent('재고: 25');

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), { target: { value: '5' } });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), { target: { value: '5' } });
      });
      fireEvent.click(screen.getByText('할인 추가'));

      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '새 쿠폰' } });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'NEW10' } });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'percentage' } });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), { target: { value: '10' } });

      fireEvent.click(screen.getByText('쿠폰 추가'));

      const $newCoupon = screen.getByTestId('coupon-3');

      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    });
  });

  describe('자유롭게 작성해보세요.', () => {
    test('새로운 유틸 함수를 만든 후에 테스트 코드를 작성해서 실행해보세요', () => {
      describe('formatComma 함수', () => {
        test('숫자에 천 단위 쉼표를 올바르게 추가한다', () => {
          expect(formatComma(1000)).toBe('1,000');
          expect(formatComma(10000)).toBe('10,000');
          expect(formatComma(1000000)).toBe('1,000,000');
          expect(formatComma(1234567890)).toBe('1,234,567,890');
        });

        test('0을 올바르게 처리한다', () => {
          expect(formatComma(0)).toBe('0');
        });

        test('음수를 올바르게 처리한다', () => {
          expect(formatComma(-1000)).toBe('-1,000');
          expect(formatComma(-1000000)).toBe('-1,000,000');
        });

        test('소수점이 있는 숫자를 올바르게 처리한다', () => {
          expect(formatComma(1000.5)).toBe('1,000.5');
          expect(formatComma(1000.55)).toBe('1,000.55');
          expect(formatComma(1000.555)).toBe('1,000.555');
        });
      });

      describe('debounce 함수', () => {
        beforeEach(() => {
          vi.useFakeTimers();
        });

        afterEach(() => {
          vi.restoreAllMocks();
        });

        test('지정된 지연 시간 후에 콜백 함수가 호출된다', () => {
          const callback = vi.fn();
          const debounced = debounce(callback, 500);

          debounced();
          expect(callback).not.toHaveBeenCalled();

          vi.advanceTimersByTime(500);
          expect(callback).toHaveBeenCalledTimes(1);
        });

        test('연속된 호출은 마지막 호출만 실행된다', () => {
          const callback = vi.fn();
          const debounced = debounce(callback, 500);

          debounced(1);
          debounced(2);
          debounced(3);

          expect(callback).not.toHaveBeenCalled();

          vi.advanceTimersByTime(500);
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(3);
        });

        test('지연 시간이 경과한 후의 호출은 새로운 타이머를 시작한다', () => {
          const callback = vi.fn();
          const debounced = debounce(callback, 500);

          debounced(1);
          vi.advanceTimersByTime(500);
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(1);

          callback.mockClear();

          debounced(2);
          expect(callback).not.toHaveBeenCalled();

          vi.advanceTimersByTime(500);
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback).toHaveBeenCalledWith(2);
        });

        test('기본 지연 시간은 300ms이다', () => {
          const callback = vi.fn();
          const debounced = debounce(callback); // 지연 시간 매개변수 생략

          debounced();
          expect(callback).not.toHaveBeenCalled();

          vi.advanceTimersByTime(299);
          expect(callback).not.toHaveBeenCalled();

          vi.advanceTimersByTime(1);
          expect(callback).toHaveBeenCalledTimes(1);
        });

        test('매개변수가 올바르게 전달된다', () => {
          const callback = vi.fn();
          const debounced = debounce(callback, 500);

          debounced('test', 123, { key: 'value' });
          vi.advanceTimersByTime(500);

          expect(callback).toHaveBeenCalledWith('test', 123, { key: 'value' });
        });
      });
    });

    describe('CustomButton', () => {
      test('label이 잘 렌더링되는지 확인', () => {
        render(<CustomButton label="버튼 텍스트" variant="bg-blue" />);
        expect(screen.getByRole('button')).toHaveTextContent('버튼 텍스트');
      });

      test('variant에 따라 클래스가 올바르게 적용되는지 확인', () => {
        render(<CustomButton label="테스트 버튼" variant="bg-green" />);
        expect(screen.getByRole('button').className).toContain('bg-green-500');
      });

      test('onClick 핸들러가 호출되는지 확인', () => {
        const handleClick = vi.fn();
        render(<CustomButton label="클릭 버튼" variant="bg-red" onClick={handleClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
      });
    });

    test('Container컴포넌트가 children을 잘 렌더링한다', () => {
      render(
        <Container testId="test-container">
          <span>hello</span>
        </Container>,
      );
      expect(screen.getByTestId('test-container')).toHaveTextContent('hello');
    });

    test('ContainerTitle에 title을 잘 렌더링한다', () => {
      render(<ContainerTitle title="컨테이너 타이틀" />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('컨테이너 타이틀');
    });

    describe('CustomSelect', () => {
      test('Select와 Option이 렌더링되는지 확인', () => {
        render(
          <CustomSelect.Root data-testid="custom-select">
            <CustomSelect.Option value="option1">옵션 1</CustomSelect.Option>
            <CustomSelect.Option value="option2">옵션 2</CustomSelect.Option>
          </CustomSelect.Root>,
        );

        const select = screen.getByTestId('custom-select');
        expect(select).toBeInTheDocument();
        expect(select).toHaveDisplayValue('옵션 1');
        expect(screen.getByText('옵션 2')).toBeInTheDocument();
      });

      test('옵션 선택 시 onChange 핸들러가 호출되는지 확인', () => {
        const handleChange = vi.fn();
        render(
          <CustomSelect.Root onChange={handleChange}>
            <CustomSelect.Option value="option1">옵션 1</CustomSelect.Option>
            <CustomSelect.Option value="option2">옵션 2</CustomSelect.Option>
          </CustomSelect.Root>,
        );

        fireEvent.change(screen.getByRole('combobox'), {
          target: { value: 'option2' },
        });

        expect(handleChange).toHaveBeenCalled();
      });

      test('선택한 값이 반영되는지 확인', () => {
        render(
          <CustomSelect.Root value="option2" onChange={() => {}}>
            <CustomSelect.Option value="option1">옵션 1</CustomSelect.Option>
            <CustomSelect.Option value="option2">옵션 2</CustomSelect.Option>
          </CustomSelect.Root>,
        );

        expect(screen.getByRole('combobox')).toHaveValue('option2');
      });
    });

    describe('CustomInput 컴포넌트', () => {
      test('렌더링 시 기본 input이 출력된다', () => {
        render(<CustomInput placeholder="이름을 입력하세요" />);
        const inputElement = screen.getByPlaceholderText('이름을 입력하세요');
        expect(inputElement).toBeInTheDocument();
      });

      test('입력한 값이 반영된다', () => {
        render(<CustomInput placeholder="이메일" />);
        const inputElement = screen.getByPlaceholderText('이메일') as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: 'test@example.com' } });

        expect(inputElement.value).toBe('test@example.com');
      });
    });

    test('새로운 hook 함수르 만든 후에 테스트 코드를 작성해서 실행해보세요', () => {
      describe('useLocalStorage 커스텀 훅', () => {
        beforeEach(() => {
          localStorage.clear();
        });

        test('초기값을 반환한다', () => {
          const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

          const [value] = result.current;
          expect(value).toBe('initial');
        });

        test('값을 설정하고 localStorage에 저장한다', () => {
          const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

          act(() => {
            const [, setValue] = result.current;
            setValue('updated');
          });

          const [updatedValue] = result.current;
          expect(updatedValue).toBe('updated');
          expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
        });

        test('localStorage에 기존 값이 있으면 초기값 대신 해당 값을 사용한다', () => {
          localStorage.setItem('test-key', JSON.stringify('stored-value'));

          const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

          const [value] = result.current;
          expect(value).toBe('stored-value');
        });

        test('setValue가 함수일 경우 이전 값을 기반으로 업데이트한다', () => {
          const { result } = renderHook(() => useLocalStorage('count', 0));

          act(() => {
            const [, setValue] = result.current;
            setValue((prev) => prev + 1);
          });

          const [value] = result.current;
          expect(value).toBe(1);
          expect(localStorage.getItem('count')).toBe('1');
        });
      });
    });
  });
});
