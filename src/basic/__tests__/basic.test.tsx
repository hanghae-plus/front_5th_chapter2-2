import { useState } from "react";
import { describe, expect, test } from "vitest";
import { act, fireEvent, render, renderHook, screen, within } from "@testing-library/react";
import { CartPage } from "#src/refactoring/pages/cart/CartPage";
import { AdminPage } from "#src/refactoring/pages/admin/AdminPage";
import type { ICartItem, ICoupon, IProduct } from "#src/types";
import { useCart } from "#src/refactoring/pages/cart/_hooks/useCart";
import { useCoupons, useProducts } from "#src/refactoring/hooks";
import * as cartUtils from "#src/refactoring/pages/cart/_libs/cart";
import { ProductsContext } from "#src/refactoring/providers/ProductsProvider";
import { CouponsContext } from "#src/refactoring/providers/CouponsProvider";
import { CartContext } from "#src/refactoring/pages/cart/providers/CartProvider";

const mockProducts: IProduct[] = [
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
const mockCoupons: ICoupon[] = [
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

// 테스트 환경에서 사용할 Product ContextAPI Provider
const MockProductProvider: React.FC<{
  children: React.ReactNode;
  initialTestProducts: IProduct[];
}> = ({ children, initialTestProducts }) => {
  const [products, setProducts] = useState<IProduct[]>(initialTestProducts);

  return <ProductsContext.Provider value={{ products, setProducts }}>{children}</ProductsContext.Provider>;
};
// 테스트 환경에서 사용할 Coupon ContextAPI Provider
const MockCouponProvider: React.FC<{
  children: React.ReactNode;
  initialTestCoupons: ICoupon[];
}> = ({ children, initialTestCoupons }) => {
  const [coupons, setCoupons] = useState<ICoupon[]>(initialTestCoupons);

  return <CouponsContext.Provider value={{ coupons, setCoupons }}>{children}</CouponsContext.Provider>;
};
// 테스트 환경에서 사용할 Cart ContextAPI Provider
const MockCartProvider: React.FC<{
  children: React.ReactNode;
  initialTestCart: ICartItem[];
}> = ({ children, initialTestCart }) => {
  const [cart, setCart] = useState<ICartItem[]>(initialTestCart);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

  return (
    <CartContext.Provider value={{ cart, setCart, selectedCoupon, setSelectedCoupon }}>{children}</CartContext.Provider>
  );
};

const TestAdminPage = () => {
  return (
    <MockProductProvider initialTestProducts={mockProducts}>
      <MockCouponProvider initialTestCoupons={mockCoupons}>
        <AdminPage />
      </MockCouponProvider>
    </MockProductProvider>
  );
};

describe("basic > ", () => {
  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(
        <MockProductProvider initialTestProducts={mockProducts}>
          <MockCouponProvider initialTestCoupons={mockCoupons}>
            <MockCartProvider initialTestCart={[]}>
              <CartPage />
            </MockCartProvider>
          </MockCouponProvider>
        </MockProductProvider>,
      );
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

      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(screen.queryByText("10개 이상 구매 시 10% 할인")).not.toBeInTheDocument();
      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).toBeInTheDocument();

      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(screen.queryByText("10개 이상 구매 시 10% 할인")).not.toBeInTheDocument();
      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).not.toBeInTheDocument();

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

  describe("useProducts > ", () => {
    const initialProducts: IProduct[] = [{ id: "1", name: "Product 1", price: 100, stock: 10, discounts: [] }];

    test("특정 제품으로 초기화할 수 있다.", () => {
      const { result } = renderHook(() => useProducts(), {
        wrapper: ({ children }) => (
          <MockProductProvider initialTestProducts={initialProducts}>{children}</MockProductProvider>
        ),
      });
      expect(result.current.products).toEqual(initialProducts);
    });

    test("제품을 업데이트할 수 있다.", () => {
      const { result } = renderHook(() => useProducts(), {
        wrapper: ({ children }) => (
          <MockProductProvider initialTestProducts={initialProducts}>{children}</MockProductProvider>
        ),
      });
      const updatedProduct = { ...initialProducts[0], name: "Updated Product" };

      act(() => {
        result.current.updateProduct(updatedProduct);
      });

      expect(result.current.products[0]).toEqual({
        discounts: [],
        id: "1",
        name: "Updated Product",
        price: 100,
        stock: 10,
      });
    });

    test("새로운 제품을 추가할 수 있다.", () => {
      const { result } = renderHook(() => useProducts(), {
        wrapper: ({ children }) => (
          <MockProductProvider initialTestProducts={initialProducts}>{children}</MockProductProvider>
        ),
      });
      const newProduct: IProduct = {
        id: "2",
        name: "New Product",
        price: 200,
        stock: 5,
        discounts: [],
      };

      act(() => {
        result.current.addProduct(newProduct);
      });

      expect(result.current.products).toHaveLength(2);
      expect(result.current.products[1]).toEqual(newProduct);
    });
  });

  describe("useCoupons > ", () => {
    test("쿠폰을 초기화할 수 있다.", () => {
      const { result } = renderHook(() => useCoupons(), {
        wrapper: ({ children }) => <MockCouponProvider initialTestCoupons={mockCoupons}>{children}</MockCouponProvider>,
      });
      expect(result.current.coupons).toEqual(mockCoupons);
    });

    test("쿠폰을 추가할 수 있다", () => {
      const { result } = renderHook(() => useCoupons(), {
        wrapper: ({ children }) => <MockCouponProvider initialTestCoupons={mockCoupons}>{children}</MockCouponProvider>,
      });
      const newCoupon: ICoupon = {
        name: "New Coupon",
        code: "NEWCODE",
        discountType: "amount",
        discountValue: 5000,
      };

      act(() => {
        result.current.addCoupon(newCoupon);
      });

      expect(result.current.coupons).toHaveLength(3);
      expect(result.current.coupons[2]).toEqual(newCoupon);
    });
  });

  describe("cartUtils", () => {
    const testProduct: IProduct = {
      id: "1",
      name: "Test Product",
      price: 100,
      stock: 10,
      discounts: [
        { quantity: 2, rate: 0.1 },
        { quantity: 5, rate: 0.2 },
      ],
    };

    describe("calculateItemTotal", () => {
      test("할인 없이 총액을 계산해야 합니다.", () => {
        const item: ICartItem = { product: testProduct, quantity: 1 };
        expect(cartUtils.calculateItemTotal(item)).toBe(100);
      });

      test("수량에 따라 올바른 할인을 적용해야 합니다.", () => {
        const item: ICartItem = { product: testProduct, quantity: 5 };
        expect(cartUtils.calculateItemTotal(item)).toBe(400); // 500 * 0.8
      });
    });

    describe("getMaxApplicableDiscount", () => {
      test("할인이 적용되지 않으면 0을 반환해야 합니다.", () => {
        const item: ICartItem = { product: testProduct, quantity: 1 };
        expect(cartUtils.getMaxApplicableDiscount(item)).toBe(0);
      });

      test("적용 가능한 가장 높은 할인율을 반환해야 합니다.", () => {
        const item: ICartItem = { product: testProduct, quantity: 5 };
        expect(cartUtils.getMaxApplicableDiscount(item)).toBe(0.2);
      });
    });

    describe("calculateCartTotal", () => {
      const cart: ICartItem[] = [
        { product: testProduct, quantity: 2 },
        { product: { ...testProduct, id: "2", price: 200 }, quantity: 1 },
      ];

      test("쿠폰 없이 총액을 올바르게 계산해야 합니다.", () => {
        const result = cartUtils.calculateCartTotal(cart, null);
        expect(result.totalBeforeDiscount).toBe(400);
        expect(result.totalAfterDiscount).toBe(380);
        expect(result.totalDiscount).toBe(20);
      });

      test("금액쿠폰을 올바르게 적용해야 합니다.", () => {
        const coupon: ICoupon = {
          name: "Test Coupon",
          code: "TEST",
          discountType: "amount",
          discountValue: 50,
        };
        const result = cartUtils.calculateCartTotal(cart, coupon);
        expect(result.totalAfterDiscount).toBe(330);
        expect(result.totalDiscount).toBe(70);
      });

      test("퍼센트 쿠폰을 올바르게 적용해야 합니다", () => {
        const coupon: ICoupon = {
          name: "Test Coupon",
          code: "TEST",
          discountType: "percentage",
          discountValue: 10,
        };
        const result = cartUtils.calculateCartTotal(cart, coupon);
        expect(result.totalAfterDiscount).toBe(342);
        expect(result.totalDiscount).toBe(58);
      });
    });

    describe("updateCartItemQuantity", () => {
      const cart: ICartItem[] = [
        { product: testProduct, quantity: 2 },
        { product: { ...testProduct, id: "2" }, quantity: 1 },
      ];

      test("수량을 올바르게 업데이트해야 합니다", () => {
        const updatedCart = cartUtils.updateCartItemQuantity(cart, "1", 5);
        expect(updatedCart[0].quantity).toBe(5);
        expect(updatedCart[1].quantity).toBe(1);
      });

      test("수량이 0으로 설정된 경우 항목을 제거해야 합니다.", () => {
        const updatedCart = cartUtils.updateCartItemQuantity(cart, "1", 0);
        expect(updatedCart.length).toBe(1);
        expect(updatedCart[0].product.id).toBe("2");
      });

      test("재고 한도를 초과해서는 안 됩니다.", () => {
        const updatedCart = cartUtils.updateCartItemQuantity(cart, "1", 15);
        expect(updatedCart[0].quantity).toBe(10); // max stock is 10
      });
    });
  });

  describe("useCart > ", () => {
    const testProduct: IProduct = {
      id: "1",
      name: "Test Product",
      price: 100,
      stock: 10,
      discounts: [],
    };
    const testCoupon: ICoupon = {
      name: "Test Coupon",
      code: "TEST",
      discountType: "percentage",
      discountValue: 10,
    };

    test("장바구니에 제품을 추가해야 합니다", () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <MockCartProvider initialTestCart={[]}>{children}</MockCartProvider>,
      });

      act(() => {
        result.current.addToCart(testProduct);
      });

      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0]).toEqual({
        product: testProduct,
        quantity: 1,
      });
    });

    test("장바구니에서 제품을 제거해야 합니다", () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <MockCartProvider initialTestCart={[]}>{children}</MockCartProvider>,
      });

      act(() => {
        result.current.addToCart(testProduct);
        result.current.removeFromCart(testProduct.id);
      });

      expect(result.current.cart).toHaveLength(0);
    });

    test("제품 수량을 업데이트해야 합니다", () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <MockCartProvider initialTestCart={[]}>{children}</MockCartProvider>,
      });

      act(() => {
        result.current.addToCart(testProduct);
        result.current.updateQuantity(testProduct.id, 5);
      });

      expect(result.current.cart[0].quantity).toBe(5);
    });

    test("쿠폰을 적용해야지", () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <MockCartProvider initialTestCart={[]}>{children}</MockCartProvider>,
      });

      act(() => {
        result.current.applyCoupon(testCoupon);
      });

      expect(result.current.selectedCoupon).toEqual(testCoupon);
    });

    test("합계를 정확하게 계산해야 합니다", () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: ({ children }) => <MockCartProvider initialTestCart={[]}>{children}</MockCartProvider>,
      });

      act(() => {
        result.current.addToCart(testProduct);
        result.current.updateQuantity(testProduct.id, 2);
        result.current.applyCoupon(testCoupon);
      });

      const total = result.current.calculateTotal();
      expect(total.totalBeforeDiscount).toBe(200);
      expect(total.totalAfterDiscount).toBe(180);
      expect(total.totalDiscount).toBe(20);
    });
  });
});
