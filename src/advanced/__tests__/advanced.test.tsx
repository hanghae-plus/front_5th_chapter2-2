import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { CouponProvider } from "../../refactoring/src/apps/providers/coupon";
import { ProductsProvider } from "../../refactoring/src/apps/providers/products";
import { Coupon } from "../../refactoring/src/entities/coupon/types";
import { createProductStore } from "../../refactoring/src/entities/product/stores";
import { Product } from "../../refactoring/src/entities/product/types";
import { AdminPage } from "../../refactoring/src/pages/admin";
import { CartPage } from "../../refactoring/src/pages/cart";
import { useLocalStorage } from "../../refactoring/src/shared/hooks";
import { formatPriceWithDollar } from "../../refactoring/src/shared/utils";

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

describe("advanced > ", () => {
  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(
        <ProductsProvider initialProducts={mockProducts}>
          <CouponProvider initialCoupons={mockCoupons}>
            <CartPage />
          </CouponProvider>
        </ProductsProvider>,
      );
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
      render(
        <ProductsProvider initialProducts={mockProducts}>
          <CouponProvider initialCoupons={mockCoupons}>
            <AdminPage />
          </CouponProvider>
        </ProductsProvider>,
      );

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
        screen.queryByText("5개 이상 구매 시 5% 할인"),
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인"),
      ).toBeInTheDocument();

      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인"),
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

  describe("useLocalStorage", () => {
    const mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };

    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: mockLocalStorage,
        writable: true,
      });
    });

    test("초기값이 올바르게 설정된다.", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );

      expect(result.current[0]).toBe("initialValue");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("testKey");
    });

    test("localStorage에 저장된 값이 있으면 해당 값을 사용한다.", () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify("savedValue"));

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );

      expect(result.current[0]).toBe("savedValue");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("testKey");
    });

    test("값이 업데이트되면 localStorage도 업데이트된다.", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );

      act(() => {
        result.current[1]("newValue");
      });

      expect(result.current[0]).toBe("newValue");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "testKey",
        JSON.stringify("newValue"),
      );
    });

    test("업데이트시 값이 아닌 함수도 사용할 수 있어야 한다.", () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(5));

      const { result } = renderHook(() => useLocalStorage("countKey", 0));

      act(() => {
        result.current[1]((prevCount: number) => prevCount + 10);
      });

      expect(result.current[0]).toBe(15);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "countKey",
        JSON.stringify(15),
      );
    });

    test("JSON 파싱 오류가 발생하면 초기값을 사용한다.", () => {
      mockLocalStorage.getItem.mockReturnValue("잘못된 JSON 형식");

      console.warn = vi.fn();

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );

      expect(result.current[0]).toBe("initialValue");
      expect(console.warn).toHaveBeenCalled();
    });

    test("storage 이벤트가 발생하면 상태가 업데이트된다.", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );

      const storageEvent = new StorageEvent("storage", {
        key: "testKey",
        newValue: JSON.stringify("다른 탭에서 변경된 값"),
        url: window.location.href,
      });

      act(() => {
        window.dispatchEvent(storageEvent);
      });
      expect(result.current[0]).toBe("다른 탭에서 변경된 값");
    });
  });

  describe("formatUtils", () => {
    test("천 단위가 넘을 경우 ','를 사용하여 가격을 정상적으로 포맷팅한다.", () => {
      expect(formatPriceWithDollar(1000000)).toBe("₩1,000,000");
    });
    test("천 단위가 넘지 않을 경우 가격을 정상적으로 포맷팅한다.", () => {
      expect(formatPriceWithDollar(100)).toBe("₩100");
    });
  });

  describe("ProductStore", () => {
    const testProducts = [
      { id: "1", name: "테스트상품1", price: 1000, stock: 10, discounts: [] },
      { id: "2", name: "테스트상품2", price: 2000, stock: 20, discounts: [] },
    ];

    test("초기 상태가 올바르게 설정된다.", () => {
      const productStore = createProductStore(testProducts, "1");

      expect(productStore.products).toEqual(testProducts);
      expect(productStore.selectedProductId).toBe("1");
    });

    test("setSelectedProductId가 선택된 ID를 변경하고 새로운 스토어를 반환한다.", () => {
      const initialStore = createProductStore(testProducts);

      const updatedStore = initialStore.setSelectedProductId("2");

      expect(updatedStore.selectedProductId).toBe("2");
      expect(updatedStore).not.toBe(initialStore);
      expect(updatedStore.products).toEqual(testProducts);
    });

    test("addProduct가 새 상품을 추가하고 새로운 스토어를 반환한다.", () => {
      const initialStore = createProductStore(testProducts);

      const newProduct = {
        id: "3",
        name: "새상품",
        price: 3000,
        stock: 30,
        discounts: [],
      };
      const updatedStore = initialStore.addProduct(newProduct);

      expect(updatedStore.products.length).toBe(testProducts.length + 1);
      expect(updatedStore.products).toContainEqual(newProduct);
      expect(updatedStore).not.toBe(initialStore);
      expect(initialStore.products.length).toBe(testProducts.length);
    });

    test("updateProduct가 상품을 업데이트하고 새로운 스토어를 반환한다.", () => {
      const initialStore = createProductStore(testProducts);

      const updatedProduct = {
        ...testProducts[0],
        name: "수정된상품",
        price: 1500,
      };
      const updatedStore = initialStore.updateProduct(updatedProduct);

      expect(updatedStore.products.find((p: Product) => p.id === "1")).toEqual(
        updatedProduct,
      );
      expect(updatedStore).not.toBe(initialStore);
      expect(updatedStore.products.length).toBe(testProducts.length);
      expect(initialStore.products[0]).toEqual(testProducts[0]);
    });

    test("removeProduct가 상품을 제거하고 새로운 스토어를 반환한다.", () => {
      const initialStore = createProductStore(testProducts);

      const updatedStore = initialStore.removeProduct("1");

      expect(updatedStore.products.length).toBe(testProducts.length - 1);
      expect(
        updatedStore.products.find((p: Product) => p.id === "1"),
      ).toBeUndefined();
      expect(
        updatedStore.products.find((p: Product) => p.id === "2"),
      ).toBeDefined();
      expect(updatedStore).not.toBe(initialStore);
      expect(initialStore.products.length).toBe(testProducts.length);
    });
  });
});
