import { useState } from "react";
import { describe, expect, test, beforeEach, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  within,
  renderHook,
} from "@testing-library/react";
import { CartPage } from "../../refactoring/pages/CartPage";
import { AdminPage } from "../../refactoring/pages/AdminPage";
import { Coupon, Product } from "../../types";
import { validateInput } from "../../refactoring/calculations";
import { useLocalStorage, useValidation } from "../../refactoring/hooks/common";

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
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
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

describe("advanced > ", () => {
  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(<CartPage products={mockProducts} coupons={mockCoupons} />);
      const product1 = screen.getByTestId("product-p1");
      const product2 = screen.getByTestId("product-p2");
      const product3 = screen.getByTestId("product-p3");
      const addToCartButtonsAtProduct1 =
        within(product1).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct2 =
        within(product2).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct3 =
        within(product3).getByText("장바구니에 추가");

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

      fireEvent.change(screen.getByLabelText("상품명"), {
        target: { value: "상품4" },
      });
      fireEvent.change(screen.getByLabelText("가격"), {
        target: { value: "15000" },
      });
      fireEvent.change(screen.getByLabelText("재고"), {
        target: { value: "30" },
      });

      fireEvent.click(screen.getByText("추가"));

      const $product4 = screen.getByTestId("product-4");

      expect($product4).toHaveTextContent("상품4");
      expect($product4).toHaveTextContent("15000원");
      expect($product4).toHaveTextContent("재고: 30");

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("toggle-button"));
      fireEvent.click(within($product1).getByTestId("modify-button"));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue("20"), {
          target: { value: "25" },
        });
        fireEvent.change(within($product1).getByDisplayValue("10000"), {
          target: { value: "12000" },
        });
        fireEvent.change(within($product1).getByDisplayValue("상품1"), {
          target: { value: "수정된 상품1" },
        });
      });

      fireEvent.click(within($product1).getByText("수정 완료"));

      expect($product1).toHaveTextContent("수정된 상품1");
      expect($product1).toHaveTextContent("12000원");
      expect($product1).toHaveTextContent("재고: 25");

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("modify-button"));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText("수량"), {
          target: { value: "5" },
        });
        fireEvent.change(screen.getByPlaceholderText("할인율 (%)"), {
          target: { value: "5" },
        });
      });
      fireEvent.click(screen.getByText("할인 추가"));

      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).toBeInTheDocument();

      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText("쿠폰 이름"), {
        target: { value: "새 쿠폰" },
      });
      fireEvent.change(screen.getByPlaceholderText("쿠폰 코드"), {
        target: { value: "NEW10" },
      });
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "percentage" },
      });
      fireEvent.change(screen.getByPlaceholderText("할인 값"), {
        target: { value: "10" },
      });

      fireEvent.click(screen.getByText("쿠폰 추가"));

      const $newCoupon = screen.getByTestId("coupon-3");

      expect($newCoupon).toHaveTextContent("새 쿠폰 (NEW10):10% 할인");
    });
  });

  describe("util 함수 테스트", () => {
    test("price 필드 validation 테스트", () => {
      // 유효한 가격
      expect(validateInput("price", 10000)).toEqual({ isValid: true });

      // 문자열로 된 유효한 가격
      expect(validateInput("price", "10000")).toEqual({ isValid: true });

      // 음수 가격
      expect(validateInput("price", -1000)).toEqual({
        isValid: false,
        message: "0 이상의 값을 입력해주세요.",
      });

      // 너무 큰 가격
      expect(validateInput("price", 2000000000)).toEqual({
        isValid: false,
        message: "10억 이하의 값을 입력해주세요.",
      });

      // 숫자가 아닌 입력
      expect(validateInput("price", "abc")).toEqual({
        isValid: false,
        message: "숫자를 입력해주세요.",
      });
    });

    test("stock 필드 validation 테스트", () => {
      // 유효한 재고
      expect(validateInput("stock", 100)).toEqual({ isValid: true });

      // 문자열로 된 유효한 재고
      expect(validateInput("stock", "100")).toEqual({ isValid: true });

      // 음수 재고
      expect(validateInput("stock", -10)).toEqual({
        isValid: false,
        message: "0 이상의 값을 입력해주세요.",
      });

      // 소수점 재고
      expect(validateInput("stock", 10.5)).toEqual({
        isValid: false,
        message: "정수를 입력해주세요.",
      });

      // 너무 큰 재고
      expect(validateInput("stock", 20000)).toEqual({
        isValid: false,
        message: "10000 이하의 값을 입력해주세요.",
      });
    });

    test("quantity 필드 validation 테스트", () => {
      // 유효한 수량
      expect(validateInput("quantity", 5)).toEqual({ isValid: true });

      // 0 또는 음수 수량
      expect(validateInput("quantity", 0)).toEqual({
        isValid: false,
        message: "1 이상의 값을 입력해주세요.",
      });

      // 소수점 수량
      expect(validateInput("quantity", 5.5)).toEqual({
        isValid: false,
        message: "정수를 입력해주세요.",
      });
    });

    test("rate 필드 validation 테스트", () => {
      // 유효한 할인율
      expect(validateInput("rate", 10)).toEqual({ isValid: true });

      // 0 이하 할인율
      expect(validateInput("rate", 0)).toEqual({
        isValid: false,
        message: "0보다 큰 값을 입력해주세요.",
      });

      // 100 초과 할인율
      expect(validateInput("rate", 150)).toEqual({
        isValid: false,
        message: "100 이하의 값을 입력해주세요.",
      });
    });
  });

  describe("custom hook 테스트", () => {
    describe("useValidation 테스트", () => {
      test("price 필드 validation", () => {
        const mockHandler = vi.fn();
        const { result } = renderHook(() => useValidation());
        const priceHandler = result.current.withValidation(
          "price",
          mockHandler
        );
        const mockAlert = vi
          .spyOn(window, "alert")
          .mockImplementation(() => {});

        // 유효한 가격
        priceHandler({ target: { value: "1000" } } as any);
        expect(mockHandler).toHaveBeenCalledWith("1000");

        // 음수 가격
        priceHandler({ target: { value: "-1000" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("0 이상의 값을 입력해주세요.");

        // 너무 큰 가격
        priceHandler({ target: { value: "2000000000" } } as any);
        expect(mockAlert).toHaveBeenCalledWith(
          "10억 이하의 값을 입력해주세요."
        );

        // 숫자가 아닌 입력
        priceHandler({ target: { value: "abc" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("숫자를 입력해주세요.");

        mockAlert.mockRestore();
      });

      test("stock 필드 validation", () => {
        const mockHandler = vi.fn();
        const { result } = renderHook(() => useValidation());
        const stockHandler = result.current.withValidation(
          "stock",
          mockHandler
        );
        const mockAlert = vi
          .spyOn(window, "alert")
          .mockImplementation(() => {});

        // 유효한 재고
        stockHandler({ target: { value: "100" } } as any);
        expect(mockHandler).toHaveBeenCalledWith("100");

        // 음수 재고
        stockHandler({ target: { value: "-10" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("0 이상의 값을 입력해주세요.");

        // 소수점 재고
        stockHandler({ target: { value: "10.5" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("정수를 입력해주세요.");

        // 너무 큰 재고
        stockHandler({ target: { value: "20000" } } as any);
        expect(mockAlert).toHaveBeenCalledWith(
          "10000 이하의 값을 입력해주세요."
        );

        mockAlert.mockRestore();
      });

      test("quantity 필드 validation", () => {
        const mockHandler = vi.fn();
        const { result } = renderHook(() => useValidation());
        const quantityHandler = result.current.withValidation(
          "quantity",
          mockHandler
        );
        const mockAlert = vi
          .spyOn(window, "alert")
          .mockImplementation(() => {});

        // 유효한 수량
        quantityHandler({ target: { value: "5" } } as any);
        expect(mockHandler).toHaveBeenCalledWith("5");

        // 0 수량
        quantityHandler({ target: { value: "0" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("1 이상의 값을 입력해주세요.");

        // 소수점 수량
        quantityHandler({ target: { value: "5.5" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("정수를 입력해주세요.");

        mockAlert.mockRestore();
      });

      test("rate 필드 validation", () => {
        const mockHandler = vi.fn();
        const { result } = renderHook(() => useValidation());
        const rateHandler = result.current.withValidation("rate", mockHandler);
        const mockAlert = vi
          .spyOn(window, "alert")
          .mockImplementation(() => {});

        // 유효한 할인율
        rateHandler({ target: { value: "10" } } as any);
        expect(mockHandler).toHaveBeenCalledWith("10");

        // 0 할인율
        rateHandler({ target: { value: "0" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("0보다 큰 값을 입력해주세요.");

        // 100 초과 할인율
        rateHandler({ target: { value: "150" } } as any);
        expect(mockAlert).toHaveBeenCalledWith("100 이하의 값을 입력해주세요.");

        mockAlert.mockRestore();
      });

      test("name 필드는 validation 없이 통과", () => {
        const mockHandler = vi.fn();
        const { result } = renderHook(() => useValidation());
        const nameHandler = result.current.withValidation("name", mockHandler);

        // 어떤 값이든 통과
        nameHandler({ target: { value: "테스트 상품" } } as any);
        expect(mockHandler).toHaveBeenCalledWith("테스트 상품");

        nameHandler({ target: { value: "" } } as any);
        expect(mockHandler).toHaveBeenCalledWith("");

        nameHandler({ target: { value: "123" } } as any);
        expect(mockHandler).toHaveBeenCalledWith("123");
      });
    });

    describe("useLocalStorage 테스트", () => {
      // 각 테스트 전에 localStorage 초기화
      beforeEach(() => {
        window.localStorage.clear();
      });

      test("초기값이 없을 때 기본값 설정", () => {
        const { result } = renderHook(() =>
          useLocalStorage("test-key", "default-value")
        );
        expect(result.current[0]).toBe("default-value");
      });

      test("localStorage에 저장된 값 불러오기", () => {
        // 먼저 localStorage에 값을 직접 설정
        localStorage.setItem("test-key", JSON.stringify("stored-value"));

        const { result } = renderHook(() =>
          useLocalStorage("test-key", "default-value")
        );
        expect(result.current[0]).toBe("stored-value");
      });

      test("setValue로 값 업데이트", () => {
        const { result } = renderHook(() =>
          useLocalStorage("test-key", "initial-value")
        );

        act(() => {
          result.current[1]("updated-value");
        });

        // 상태값 확인
        expect(result.current[0]).toBe("updated-value");
        // localStorage에 저장된 값 확인
        expect(JSON.parse(localStorage.getItem("test-key") || "")).toBe(
          "updated-value"
        );
      });

      test("객체 타입 데이터 저장 및 불러오기", () => {
        const testObject = { name: "test", value: 123 };
        const { result } = renderHook(() =>
          useLocalStorage("test-object", testObject)
        );

        expect(result.current[0]).toEqual(testObject);

        const newObject = { name: "updated", value: 456 };
        act(() => {
          result.current[1](newObject);
        });

        expect(result.current[0]).toEqual(newObject);
        expect(JSON.parse(localStorage.getItem("test-object") || "")).toEqual(
          newObject
        );
      });
    });
  });
});
