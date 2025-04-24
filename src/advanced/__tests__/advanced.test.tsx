import { useState } from "react";
import { describe, expect, test } from "vitest";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import { CartPage } from "../../refactoring/components/CartPage";
import { AdminPage } from "../../refactoring/components/AdminPage";
import { CartItem, Coupon, Product } from "../../types";
import { useCart } from "@/refactoring/hooks";
import { useNewProduct } from "@/refactoring/hooks/useNewProduct";
import {
  calculateCartTotal,
  calculateItemTotal,
  getAppliedDiscount,
  getMaxApplicableDiscount,
  getMaxDiscount,
  getRemainingStock,
  updateCartItemQuantity,
} from "@/refactoring/models/cart";

const mockProduct1: Product = {
  id: "1",
  name: "Product 1",
  price: 100,
  stock: 10,
  discounts: [
    { quantity: 2, rate: 10 },
    { quantity: 5, rate: 20 },
  ],
};
const mockProduct2: Product = {
  id: "2",
  name: "Product 2",
  price: 200,
  stock: 5,
  discounts: [{ quantity: 3, rate: 15 }],
};

const mockCoupon: Coupon = {
  name: "Amount Coupon",
  code: "AMT50",
  discountType: "amount",
  discountValue: 50,
};

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

const mockCart: CartItem[] = [
  { product: mockProduct1, quantity: 2 },
  { product: mockProduct2, quantity: 1 },
];
const mockAmountCoupon: Coupon = {
  name: "Amount Coupon",
  code: "AMT50",
  discountType: "amount",
  discountValue: 50,
};
const mockPercentageCoupon: Coupon = {
  name: "Percentage Coupon",
  code: "PER10",
  discountType: "percentage",
  discountValue: 10,
};

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

  describe("비즈니스 로직 테스트", () => {
    describe("getMaxApplicableDiscount", () => {
      test("적용 가능한 최대 할인율 반환", () => {
        const item: CartItem = { product: mockProduct1, quantity: 3 };
        const maxDiscount = getMaxApplicableDiscount(item);
        expect(maxDiscount).toBe(10); // 수량 3일 때 10% 할인 적용 가능
      });

      test("수량이 충분하지 않으면 할인율 0 반환", () => {
        const item: CartItem = { product: mockProduct1, quantity: 1 };
        const maxDiscount = getMaxApplicableDiscount(item);
        expect(maxDiscount).toBe(0);
      });

      test("가장 높은 할인율 반환", () => {
        const item: CartItem = { product: mockProduct1, quantity: 5 };
        const maxDiscount = getMaxApplicableDiscount(item);
        expect(maxDiscount).toBe(20); // 수량 5일 때 20% 할인 적용 가능
      });
    });

    describe("calculateItemTotal", () => {
      test("할인 적용된 항목 총액 계산", () => {
        const item: CartItem = { product: mockProduct1, quantity: 2 };
        const total = calculateItemTotal(item);
        expect(total).toBe(180); // 100 * 2 * (1 - 10/100)
      });

      test("할인 없는 경우 원래 가격 반환", () => {
        const item: CartItem = { product: mockProduct2, quantity: 1 };
        const total = calculateItemTotal(item);
        expect(total).toBe(200); // 200 * 1 (할인 없음)
      });
    });

    describe("calculateCartTotal", () => {
      test("쿠폰 없이 총액 계산 (할인 적용 포함)", () => {
        const result = calculateCartTotal(mockCart, null);
        expect(result.totalBeforeDiscount).toBe(400); // (100 * 2) + (200 * 1)
        expect(result.totalAfterDiscount).toBe(380); // (180) + (200)
        expect(result.totalDiscount).toBe(20); // 400 - 380
      });

      test("금액 할인 쿠폰 적용", () => {
        const result = calculateCartTotal(mockCart, mockAmountCoupon);
        expect(result.totalBeforeDiscount).toBe(400);
        expect(result.totalAfterDiscount).toBe(330); // 380 - 50
        expect(result.totalDiscount).toBe(70); // 400 - 330
      });

      test("퍼센트 할인 쿠폰 적용", () => {
        const result = calculateCartTotal(mockCart, mockPercentageCoupon);
        expect(result.totalBeforeDiscount).toBe(400);
        expect(result.totalAfterDiscount).toBe(342); // 380 * (1 - 0.1)
        expect(result.totalDiscount).toBe(58); // 400 - 342
      });

      test("금액 할인 쿠폰으로 총액이 0 미만이 되지 않음", () => {
        const smallCart: CartItem[] = [{ product: mockProduct1, quantity: 1 }];
        const largeDiscountCoupon: Coupon = {
          name: "Large Discount",
          code: "AMT200",
          discountType: "amount",
          discountValue: 200,
        };
        const result = calculateCartTotal(smallCart, largeDiscountCoupon);
        expect(result.totalBeforeDiscount).toBe(100);
        expect(result.totalAfterDiscount).toBe(0);
        expect(result.totalDiscount).toBe(100);
      });

      test("추가 목 데이터로 총액 계산 (mockProducts 및 mockCoupons 사용)", () => {
        const testCart: CartItem[] = [
          { product: mockProducts[0], quantity: 12 }, // 10000 * 12, 10% 할인
          { product: mockProducts[1], quantity: 5 }, // 20000 * 5, 할인 없음
        ];
        const result = calculateCartTotal(testCart, mockCoupons[1]); // 10% 쿠폰 적용
        expect(result.totalBeforeDiscount).toBe(220000); // (10000 * 12) + (20000 * 5)
        const discountedTotal = 10000 * 12 * 0.9 + 20000 * 5; // 108000 + 100000 = 208000
        expect(result.totalAfterDiscount).toBe(
          Math.round(discountedTotal * 0.9)
        ); // 208000 * 0.9
        expect(result.totalDiscount).toBe(
          Math.round(220000 - discountedTotal * 0.9)
        );
      });
    });

    describe("updateCartItemQuantity", () => {
      test("장바구니 항목 수량 업데이트", () => {
        const updatedCart = updateCartItemQuantity(mockCart, "1", 3);
        expect(updatedCart[0].quantity).toBe(3);
        expect(updatedCart).toHaveLength(2);
      });

      test("수량이 재고를 초과하지 않음", () => {
        const updatedCart = updateCartItemQuantity(mockCart, "1", 15);
        expect(updatedCart[0].quantity).toBe(10); // 재고 10으로 제한
      });

      test("수량이 0 이하로 설정되면 항목 제거", () => {
        const updatedCart = updateCartItemQuantity(mockCart, "1", 0);
        expect(updatedCart).toHaveLength(1);
        expect(updatedCart[0].product.id).toBe("2");
      });
    });

    describe("getRemainingStock", () => {
      test("남은 재고 계산", () => {
        const remainingStock = getRemainingStock(mockProduct1, mockCart);
        expect(remainingStock).toBe(8); // 10 - 2
      });

      test("장바구니에 없는 제품의 남은 재고 계산", () => {
        const newProduct: Product = {
          id: "3",
          name: "Product 3",
          price: 300,
          stock: 5,
          discounts: [],
        };
        const remainingStock = getRemainingStock(newProduct, mockCart);
        expect(remainingStock).toBe(5); // 5 - 0
      });

      test("mockProducts로 남은 재고 계산", () => {
        const testCart: CartItem[] = [
          { product: mockProducts[0], quantity: 5 },
        ];
        const remainingStock = getRemainingStock(mockProducts[0], testCart);
        expect(remainingStock).toBe(15); // 20 - 5
      });
    });

    describe("getMaxDiscount", () => {
      test("최대 할인율 반환", () => {
        const discounts = mockProduct1.discounts;
        const maxDiscount = getMaxDiscount(discounts);
        expect(maxDiscount).toBe(20); // 20%가 최대 할인율
      });

      test("빈 배열일 경우 0 반환", () => {
        const maxDiscount = getMaxDiscount([]);
        expect(maxDiscount).toBe(0);
      });

      test("mockProducts로 최대 할인율 확인", () => {
        const maxDiscount = getMaxDiscount(mockProducts[2].discounts);
        expect(maxDiscount).toBe(0.2); // 20%가 최대 할인율
      });
    });

    describe("getAppliedDiscount", () => {
      test("적용된 할인율 반환", () => {
        const item: CartItem = { product: mockProduct1, quantity: 3 };
        const appliedDiscount = getAppliedDiscount(item);
        expect(appliedDiscount).toBe(10); // 수량 3일 때 10% 할인 적용
      });

      test("수량이 충분하지 않으면 할인율 0 반환", () => {
        const item: CartItem = { product: mockProduct1, quantity: 1 };
        const appliedDiscount = getAppliedDiscount(item);
        expect(appliedDiscount).toBe(0);
      });

      test("가장 높은 적용 가능한 할인율 반환", () => {
        const item: CartItem = { product: mockProduct1, quantity: 6 };
        const appliedDiscount = getAppliedDiscount(item);
        expect(appliedDiscount).toBe(20); // 수량 6일 때 20% 할인 적용
      });

      test("mockProducts로 적용된 할인율 확인", () => {
        const item: CartItem = { product: mockProducts[0], quantity: 12 };
        const appliedDiscount = getAppliedDiscount(item);
        expect(appliedDiscount).toBe(0.1); // 수량 12일 때 10% 할인 적용
      });
    });

    describe("useNewProduct Hook", () => {
      test("초기 상태 확인", () => {
        const { result } = renderHook(() => useNewProduct());

        expect(result.current.showNewProductForm).toBe(false);
        expect(result.current.newProduct).toEqual({
          name: "",
          price: 0,
          stock: 0,
          discounts: [],
        });
      });

      test("toggleNewProductForm으로 폼 표시 여부 토글", () => {
        const { result } = renderHook(() => useNewProduct());

        act(() => {
          result.current.toggleNewProductForm();
        });

        expect(result.current.showNewProductForm).toBe(true);

        act(() => {
          result.current.toggleNewProductForm();
        });

        expect(result.current.showNewProductForm).toBe(false);
      });

      test("updateNewProduct으로 제품 필드 업데이트", () => {
        const { result } = renderHook(() => useNewProduct());

        act(() => {
          result.current.updateNewProduct("name", "New Item");
          result.current.updateNewProduct("price", 99.99);
          result.current.updateNewProduct("stock", 50);
          result.current.updateNewProduct("discounts", [
            { quantity: 2, rate: 10 },
          ]);
        });

        expect(result.current.newProduct).toEqual({
          name: "New Item",
          price: 99.99,
          stock: 50,
          discounts: [{ quantity: 2, rate: 10 }],
        });
      });

      test("resetNewProduct으로 제품 정보 초기화 및 폼 닫기", () => {
        const { result } = renderHook(() => useNewProduct());

        act(() => {
          result.current.updateNewProduct("name", "Test Product");
          result.current.updateNewProduct("price", 100);
          result.current.toggleNewProductForm(); // 폼 열기
          result.current.resetNewProduct();
        });

        expect(result.current.newProduct).toEqual({
          name: "",
          price: 0,
          stock: 0,
          discounts: [],
        });
        expect(result.current.showNewProductForm).toBe(false);
      });

      test("getNewProductWithId로 고유 ID가 포함된 제품 반환", () => {
        const { result } = renderHook(() => useNewProduct());

        act(() => {
          result.current.updateNewProduct("name", "Test Product");
          result.current.updateNewProduct("price", 100);
          result.current.updateNewProduct("stock", 10);
        });

        const newProductWithId = result.current.getNewProductWithId();
        expect(newProductWithId).toMatchObject({
          name: "Test Product",
          price: 100,
          stock: 10,
          discounts: [],
        });
        expect(newProductWithId.id).toBeDefined();
        expect(typeof newProductWithId.id).toBe("string");
      });

      test("getNewProductWithId 호출 시 원본 newProduct는 ID 없이 유지", () => {
        const { result } = renderHook(() => useNewProduct());

        act(() => {
          result.current.updateNewProduct("name", "Test Product");
          result.current.getNewProductWithId();
        });

        expect(result.current.newProduct).not.toHaveProperty("id");
        expect(result.current.newProduct.name).toBe("Test Product");
      });
    });
    describe("useCart Hook", () => {
      test("장바구니에 제품 추가", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProduct1);
        });

        expect(result.current.cart).toHaveLength(1);
        expect(result.current.cart[0].product.id).toBe("1");
        expect(result.current.cart[0].quantity).toBe(1);
      });

      test("재고가 없는 경우 제품 추가 불가", () => {
        const outOfStockProduct: Product = {
          id: "3",
          name: "Out of Stock",
          price: 100,
          stock: 0,
          discounts: [],
        };
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(outOfStockProduct);
        });

        expect(result.current.cart).toHaveLength(0);
      });

      test("장바구니에서 제품 제거", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProduct1);
          result.current.removeFromCart("1");
        });

        expect(result.current.cart).toHaveLength(0);
      });

      test("수량 업데이트", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProduct1);
          result.current.updateQuantity("1", 3);
        });

        expect(result.current.cart[0].quantity).toBe(3);
      });

      test("수량이 재고를 초과하지 않음", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProduct1);
          result.current.updateQuantity("1", 15); // 재고 10 초과
        });

        expect(result.current.cart[0].quantity).toBe(10);
      });

      test("수량이 0 이하로 설정되면 항목 제거", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProduct1);
          result.current.updateQuantity("1", 0);
        });

        expect(result.current.cart).toHaveLength(0);
      });

      test("쿠폰 적용", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.applyCoupon(mockCoupon);
        });

        expect(result.current.selectedCoupon).toBe(mockCoupon);
      });

      test("총액 계산", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProduct1);
          result.current.updateQuantity("1", 2);
          result.current.addToCart(mockProduct2);
          result.current.applyCoupon(mockCoupon);
        });

        const total = result.current.calculateTotal();
        expect(total.totalBeforeDiscount).toBe(400);
      });

      test("남은 재고 계산", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProduct1);
        });

        const remainingStock = result.current.getRemainingStock(mockProduct1);
        expect(remainingStock).toBe(9); // 10 - 1
      });
    });
  });
});
