import { act, fireEvent, render, renderHook, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Coupon, Product } from "../../refactoring/entities";
import { useCoupons, useToggle } from "../../refactoring/hooks";
import { useDiscountCalculator } from "../../refactoring/hooks/discount/useDiscountCalculator";
import { AdminPage } from "../../refactoring/pages/AdminPage";
import { CartPage } from "../../refactoring/pages/CartPage";
import { useProductStore } from "../../refactoring/store/product-store";
import { Button } from "../../refactoring/ui/button";
import { formatCurrency, formatPercent } from "../../refactoring/utils/formatter";
import { percentToRate, rateToPercent } from "../../refactoring/utils/percentUtils";
import { CartItem } from "../../types";

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];
const mockCart: CartItem[] = [
  {
    quantity: 1,
    product: {
      id: "p1",
      name: "상품1",
      price: 10000,
      stock: 20,
      discounts: [{ quantity: 10, rate: 0.1 }],
    },
  },
];
const mockCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  return <AdminPage />;
};

describe("advanced > ", () => {
  describe("시나리오 테스트 > ", () => {
    beforeEach(() => {
      const store = useProductStore.getState();
      store.initializeProducts(mockProducts);

      const { result } = renderHook(() => useCoupons());
      act(() => {
        result.current.initializeCoupons(mockCoupons);
      });
    });
    test("장바구니 페이지 테스트 > ", async () => {
      render(<CartPage />);
      const product1 = screen.getByTestId("product-p1");
      const product2 = screen.getByTestId("product-p2");
      const product3 = screen.getByTestId("product-p3");
      const addToCartButtonsAtProduct1 = within(product1).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct2 = within(product2).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct3 = within(product3).getByText("장바구니에 추가");

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent("상품1");
      expect(product1).toHaveTextContent("10,000원");
      expect(product1).toHaveTextContent("재고: 20개");
      expect(product2).toHaveTextContent("상품2");
      expect(product2).toHaveTextContent("20,000원");
      expect(product2).toHaveTextContent("재고: 20개");
      expect(product3).toHaveTextContent("상품3");
      expect(product3).toHaveTextContent("30,000원");
      expect(product3).toHaveTextContent("재고: 20개");

      // 2. 할인 정보 표시
      expect(screen.getByText("10개 이상: 10% 할인")).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText("상품 금액: 10,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 0원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 10,000원")).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent("재고: 0개");
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent("재고: 0개");

      // 7. 할인율 계산
      expect(screen.getByText("상품 금액: 200,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 20,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 180,000원")).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText("+");
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 110,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 590,000원")).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole("combobox");
      fireEvent.change(couponSelect, { target: { value: "1" } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 169,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 531,000원")).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: "0" } }); // 5000원 할인 쿠폰
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 115,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 585,000원")).toBeInTheDocument();
    });

    test("관리자 페이지 테스트 > ", async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId("product-1");

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText("새 상품 추가"));

      fireEvent.change(screen.getByLabelText("상품명"), { target: { value: "상품4" } });
      fireEvent.change(screen.getByLabelText("가격"), { target: { value: "15000" } });
      fireEvent.change(screen.getByLabelText("재고"), { target: { value: "30" } });

      fireEvent.click(screen.getByText("추가"));

      const $product4 = screen.getByTestId("product-4");

      expect($product4).toHaveTextContent("상품4");
      expect($product4).toHaveTextContent("15,000원");
      expect($product4).toHaveTextContent("재고: 30");

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("toggle-button"));
      fireEvent.click(within($product1).getByTestId("modify-button"));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue("20"), { target: { value: "25" } });
        fireEvent.change(within($product1).getByDisplayValue("10000"), {
          target: { value: "12000" },
        });
        fireEvent.change(within($product1).getByDisplayValue("상품1"), {
          target: { value: "수정된 상품1" },
        });
      });

      fireEvent.click(within($product1).getByText("수정 완료"));

      expect($product1).toHaveTextContent("수정된 상품1");
      expect($product1).toHaveTextContent("12,000원");
      expect($product1).toHaveTextContent("재고: 25");

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("modify-button"));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText("수량"), { target: { value: "5" } });
        fireEvent.change(screen.getByPlaceholderText("할인율 (%)"), { target: { value: "5" } });
      });
      fireEvent.click(screen.getByText("할인 추가"));

      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(screen.queryByText("10개 이상 구매 시 10% 할인")).not.toBeInTheDocument();
      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).toBeInTheDocument();

      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(screen.queryByText("10개 이상 구매 시 10% 할인")).not.toBeInTheDocument();
      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText("쿠폰 이름"), { target: { value: "새 쿠폰" } });
      fireEvent.change(screen.getByPlaceholderText("쿠폰 코드"), { target: { value: "NEW10" } });
      fireEvent.change(screen.getByRole("combobox"), { target: { value: "percentage" } });
      fireEvent.change(screen.getByPlaceholderText("할인 값"), { target: { value: "10" } });

      fireEvent.click(screen.getByText("쿠폰 추가"));

      const $newCoupon = screen.getByTestId("coupon-3");

      expect($newCoupon).toHaveTextContent("새 쿠폰 (NEW10):10% 할인");
    });
  });

  describe("자유롭게 작성해본 테스트 코드", () => {
    /** 유틸 함수 테스트 */
    test("formatCurrency는 숫자를 한국 통화 형식으로 변환한다", () => {
      expect(formatCurrency(1000000)).toBe("1,000,000원");
    });

    test("formatCurrency는 단위를 지정할 수 있다", () => {
      expect(formatCurrency(100, "달러")).toBe("100달러");
    });

    test("formatPercent는 숫자 뒤에 %를 붙인다", () => {
      expect(formatPercent(10)).toBe("10%");
      expect(formatPercent(3.14)).toBe("3.14%");
    });

    test("0.1을 10으로 변환한다", () => {
      expect(rateToPercent(0.1)).toBe(10);
    });
    test("0을 0으로 변환한다", () => {
      expect(rateToPercent(0)).toBe(0);
    });

    test("10을 0.1로 변환한다", () => {
      expect(percentToRate(10)).toBeCloseTo(0.1);
    });

    test("15을 0.15으로 변환한다", () => {
      expect(percentToRate(15)).toBeCloseTo(0.15);
    });
    /** 커스텀 훅 테스트*/
    test("선택된 쿠폰과 카트에 따라 계산 결과가 바뀐다", () => {
      const { result } = renderHook(() => useDiscountCalculator(mockCart, mockCoupons[0]));

      const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = result.current;

      expect(totalBeforeDiscount).toBe(10000);
      expect(totalAfterDiscount).toBe(5000);
      expect(totalDiscount).toBe(5000);
    });

    test("초기값이 비어있는 Set일 때, 아이템을 토글하면 추가된다", () => {
      const { result } = renderHook(() => useToggle<string>());

      act(() => {
        result.current.handleToggleClick("item1");
      });

      expect(result.current.openToggle.has("item1")).toBe(true);
    });

    test("이미 있는 아이템을 다시 토글하면 제거된다", () => {
      const { result } = renderHook(() => useToggle<string>(new Set(["item1"])));

      act(() => {
        result.current.handleToggleClick("item1");
      });

      expect(result.current.openToggle.has("item1")).toBe(false);
    });

    test("여러 개의 아이템을 토글할 수 있다", () => {
      const { result } = renderHook(() => useToggle<string>());

      act(() => {
        result.current.handleToggleClick("item1");
        result.current.handleToggleClick("item2");
      });

      expect(result.current.openToggle.has("item1")).toBe(true);
      expect(result.current.openToggle.has("item2")).toBe(true);
    });
    /**Button 공통 컴포넌트 테스트  */
    test("Button 공통 컴포넌트에서 children으로 전달된 텍스트가 렌더링된다", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    test("Button 공통 컴포넌트에서 onClick 핸들러가 호출된다", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      fireEvent.click(screen.getByText("Click"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("disabled가 true일 경우 클릭해도 onClick이 호출되지 않는다", () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      );
      fireEvent.click(screen.getByText("Disabled"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    test("className이 제대로 적용된다", () => {
      render(<Button className="bg-red-500">Styled</Button>);
      expect(screen.getByText("Styled")).toHaveClass("bg-red-500");
    });
  });
});
