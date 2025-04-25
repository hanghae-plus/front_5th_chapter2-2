// import { useState } from "react";
import { describe, expect, test, beforeEach, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { CartPage } from "../../refactoring/2_pages/cart";
import { AdminPage } from "../../refactoring/2_pages/admin";
import { Coupon, Product } from "../../refactoring/6_shared/types";

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

// localStorage 모킹
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
};

describe("advanced > ", () => {
  beforeEach(() => {
    // localStorage 모킹 설정
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    // mock data를 localStorage에 설정
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      if (key === "products") {
        return JSON.stringify(mockProducts);
      }
      if (key === "coupons") {
        return JSON.stringify(mockCoupons);
      }
      return null;
    });
  });

  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(<CartPage />);

      // 1. 상품 정보 표시 확인
      const product1 = screen.getByTestId("product-p1");
      const product2 = screen.getByTestId("product-p2");
      const product3 = screen.getByTestId("product-p3");

      expect(product1).toHaveTextContent("상품1");
      expect(product1).toHaveTextContent("10,000원");
      expect(product1).toHaveTextContent("재고: 20개");
      expect(product2).toHaveTextContent("상품2");
      expect(product2).toHaveTextContent("20,000원");
      expect(product2).toHaveTextContent("재고: 20개");
      expect(product3).toHaveTextContent("상품3");
      expect(product3).toHaveTextContent("30,000원");
      expect(product3).toHaveTextContent("재고: 20개");

      // 2. 할인 정보 표시 확인
      expect(screen.getByText("10개 이상: 10% 할인")).toBeInTheDocument();

      // 3. 상품 추가 및 장바구니 확인
      const addToCartButtonsAtProduct1 =
        within(product1).getByText("장바구니에 추가");
      fireEvent.click(addToCartButtonsAtProduct1);

      // 4. 초기 할인 계산 확인
      expect(screen.getByText("상품 금액: 10,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 0원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 10,000원")).toBeInTheDocument();

      // 5. 품절 상태 테스트
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      expect(product1).toHaveTextContent("재고: 0개");
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent("재고: 0개");

      // 6. 할인 적용 확인
      const orderSummary = screen.getByTestId("order-summary");
      expect(within(orderSummary).getByText(/상품 금액:/)).toHaveTextContent(
        "상품 금액: 200,000원"
      );
      expect(within(orderSummary).getByText(/할인 금액:/)).toHaveTextContent(
        "할인 금액: 20,000원"
      );
      expect(
        within(orderSummary).getByText(/최종 결제 금액:/)
      ).toHaveTextContent("최종 결제 금액: 180,000원");

      // 7. 여러 상품 추가 및 할인 확인
      const addToCartButtonsAtProduct2 =
        within(product2).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct3 =
        within(product3).getByText("장바구니에 추가");

      fireEvent.click(addToCartButtonsAtProduct2);
      fireEvent.click(addToCartButtonsAtProduct3);

      const increaseButtons = screen.getAllByText("+");
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 장바구니 내역 확인
      //const cartList = screen.getByTestId("cart-list");
      //const cartItems = within(cartList).getAllByTestId(/cart-item-/);

      // 8. 할인 계산 확인
      expect(within(orderSummary).getByText(/상품 금액:/)).toHaveTextContent(
        "상품 금액: 700,000원"
      );
      expect(within(orderSummary).getByText(/할인 금액:/)).toHaveTextContent(
        "할인 금액: 110,000원"
      );
      expect(
        within(orderSummary).getByText(/최종 결제 금액:/)
      ).toHaveTextContent("최종 결제 금액: 590,000원");

      // 9. 쿠폰 적용 테스트
      const couponSelect = screen.getByTestId("coupon-select");
      await act(async () => {
        fireEvent.change(couponSelect, { target: { value: "1" } });
      });

      // 10. 쿠폰 할인 확인
      expect(within(orderSummary).getByText(/상품 금액:/)).toHaveTextContent(
        "상품 금액: 700,000원"
      );

      expect(within(orderSummary).getByText(/할인 금액:/)).toHaveTextContent(
        "할인 금액: 169,000원"
      );
      expect(
        within(orderSummary).getByText(/최종 결제 금액:/)
      ).toHaveTextContent("최종 결제 금액: 531,000원");

      // 11. 다른 쿠폰 적용 테스트
      await act(async () => {
        fireEvent.change(couponSelect, { target: { value: "0" } });
      });

      expect(within(orderSummary).getByText(/상품 금액:/)).toHaveTextContent(
        "상품 금액: 700,000원"
      );
      expect(within(orderSummary).getByText(/할인 금액:/)).toHaveTextContent(
        "할인 금액: 115,000원"
      );
      expect(
        within(orderSummary).getByText(/최종 결제 금액:/)
      ).toHaveTextContent("최종 결제 금액: 585,000원");
    });

    test("관리자 페이지 테스트 > ", async () => {
      render(<AdminPage />);

      // 1. 새로운 상품 추가
      await act(async () => {
        fireEvent.click(screen.getByText("새 상품 추가"));
      });

      const nameInput = screen.getByTestId("product-name-input");
      const priceInput = screen.getByTestId("product-price-input");
      const stockInput = screen.getByTestId("product-stock-input");

      await act(async () => {
        fireEvent.change(nameInput, { target: { value: "상품4" } });
        fireEvent.change(priceInput, { target: { value: "15000" } });
        fireEvent.change(stockInput, { target: { value: "30" } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText("추가"));
      });

      const newProduct = screen.getByTestId("product-4");
      expect(newProduct).toHaveTextContent("상품4");
      expect(newProduct).toHaveTextContent("15000원");
      expect(newProduct).toHaveTextContent("재고: 30");

      // 2. 상품 수정
      const product1 = screen.getByTestId("product-1");

      await act(async () => {
        fireEvent.click(within(product1).getByTestId("toggle-button"));
      });

      await act(async () => {
        fireEvent.click(within(product1).getByTestId("modify-button"));
      });

      const editNameInput = screen.getByTestId("edit-product-name-input");
      const editPriceInput = screen.getByTestId("edit-product-price-input");
      const editStockInput = screen.getByTestId("edit-product-stock-input");

      await act(async () => {
        fireEvent.change(editNameInput, { target: { value: "수정된 상품1" } });
        fireEvent.change(editPriceInput, { target: { value: "12000" } });
        fireEvent.change(editStockInput, { target: { value: "25" } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText("수정 완료"));
      });

      expect(product1).toHaveTextContent("수정된 상품1");
      expect(product1).toHaveTextContent("12000원");
      expect(product1).toHaveTextContent("재고: 25");

      // 3. 쿠폰 추가
      const couponNameInput = screen.getByTestId("coupon-name-input");
      const couponCodeInput = screen.getByTestId("coupon-code-input");
      const couponTypeSelect = screen.getByTestId("coupon-type-select");
      const couponValueInput = screen.getByTestId("coupon-value-input");

      await act(async () => {
        fireEvent.change(couponNameInput, { target: { value: "새 쿠폰" } });
        fireEvent.change(couponCodeInput, { target: { value: "NEW10" } });
        fireEvent.change(couponTypeSelect, { target: { value: "percentage" } });
        fireEvent.change(couponValueInput, { target: { value: "10" } });
      });

      await act(async () => {
        fireEvent.click(screen.getByText("쿠폰 추가"));
      });

      const newCoupon = screen.getByTestId("coupon-3");
      expect(newCoupon).toHaveTextContent("새 쿠폰 (NEW10):10% 할인");
    });
  });
});
