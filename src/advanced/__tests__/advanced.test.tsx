import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMemo, useState } from "react";
import { afterEach, describe, expect, test } from "vitest";

import { AdminPage } from "../../refactoring/components/AdminPage";
import { ProductList } from "../../refactoring/components/cart/ProductList";
import { CartPage } from "../../refactoring/components/CartPage";
import AdminProvider, {
  AdminActionContext,
  AdminStateContext,
} from "../../refactoring/context/AdminProvider";
import { useCart } from "../../refactoring/hooks";
import {
  calculateCartTotal,
  calculateItemTotal,
  getAddedToCart,
  getCouponDiscount,
} from "../../refactoring/models/cart";
import { Coupon, Product } from "../../types";

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

const AdminProviderWithInitialAdmin = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAdmin, setIsAdmin] = useState(true); // 기본값을 true로 설정

  const actionValue = useMemo(
    () => ({
      setIsAdmin,
    }),
    []
  );

  const stateValue = useMemo(
    () => ({
      isAdmin,
    }),
    [isAdmin]
  );

  return (
    <AdminActionContext.Provider value={actionValue}>
      <AdminStateContext.Provider value={stateValue}>
        {children}
      </AdminStateContext.Provider>
    </AdminActionContext.Provider>
  );
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
    describe("카트 페이지 테스트", () => {
      test("상품 정보 표시, 할인 정보 표시  ", () => {
        const { result } = renderHook(() => useCart());
        const { cart, addToCart } = result.current;

        render(
          <AdminProvider>
            <ProductList
              products={mockProducts}
              cart={cart}
              addToCart={addToCart}
            />
          </AdminProvider>
        );

        // 1. 상품 정보 표시
        expect(screen.getByText("상품1")).toBeDefined();
        expect(screen.getByText("상품2")).toBeDefined();
        expect(screen.getByText("상품3")).toBeDefined();

        // 2. 할인 정보 표시
        expect(screen.getByText("10개 이상: 10% 할인")).toBeDefined();
        expect(screen.getByText("10개 이상: 15% 할인")).toBeDefined();
        expect(screen.getByText("10개 이상: 20% 할인")).toBeDefined();
      });

      // 3. 상품1 장바구니에 상품 추가
      test("상품1 장바구니에 상품 추가 테스트", () => {
        const { result } = renderHook(() => useCart());
        act(() => {
          result.current.addToCart(mockProducts[0]);
        });

        expect(result.current.cart).toStrictEqual([
          {
            product: mockProducts[0],
            quantity: 1,
          },
        ]);
      });

      // 4. 할인율 계산
      test("할인율 계산", () => {
        render(
          <AdminProvider>
            <CartPage coupons={mockCoupons} products={mockProducts} />
          </AdminProvider>
        );

        const product1 = screen.getByTestId("product-p1");
        const addToCartBtnAtP1 = within(product1).getByText("장바구니에 추가");

        for (let index = 0; index < 10; index++) {
          fireEvent.click(addToCartBtnAtP1);
        }

        expect(screen.getByText("(10% 할인 적용)")).toBeInTheDocument();
      });

      // 5. 상품 품절 상태로 만들기
      test("상품 품절 상태로 만들기", () => {
        render(
          <AdminProvider>
            <CartPage coupons={mockCoupons} products={mockProducts} />
          </AdminProvider>
        );

        const product1 = screen.getByTestId("product-p1");
        const addToCartBtnAtP1 = within(product1).getByText("장바구니에 추가");

        for (let index = 0; index < 20; index++) {
          fireEvent.click(addToCartBtnAtP1);
        }

        expect(screen.getByText("품절")).toBeInTheDocument();
      });

      test("통합 테스트 6~12", () => {
        render(
          <AdminProvider>
            <CartPage coupons={mockCoupons} products={mockProducts} />
          </AdminProvider>
        );
        // 6. 품절일 때 상품 추가 안 되는지 확인하기
        const product1 = screen.getByTestId("product-p1");
        const addToCartBtnAtP1 = within(product1).getByRole("button");

        for (let i = 0; i < 20; i++) {
          fireEvent.click(addToCartBtnAtP1);
        }
        expect(screen.getByText("10000원 x 20")).toBeInTheDocument();
        fireEvent.click(addToCartBtnAtP1);
        expect(screen.getByText("10000원 x 20")).toBeInTheDocument();

        // 7. 할인율 계산
        expect(screen.getByText("(10% 할인 적용)")).toBeInTheDocument();

        // 8. 상품을 각각 10개씩 추가하기

        const product2 = screen.getByTestId("product-p2");
        const product3 = screen.getByTestId("product-p3");
        const addToCartBtnAtP2 = within(product2).getByRole("button");
        const addToCartBtnAtP3 = within(product3).getByRole("button");
        for (let i = 0; i < 10; i++) {
          fireEvent.click(addToCartBtnAtP2);
          fireEvent.click(addToCartBtnAtP3);
        }

        expect(screen.getByText("20000원 x 10")).toBeInTheDocument();
        expect(screen.getByText("30000원 x 10")).toBeInTheDocument();

        // 9. 할인율 계산
        expect(screen.getByText("(15% 할인 적용)")).toBeInTheDocument();
        expect(screen.getByText("(20% 할인 적용)")).toBeInTheDocument();

        // 10. 쿠폰 적용하기
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "1" } });

        // 11. 할인율 계산

        // 12. 다른 할인 쿠폰 적용하기
      });
    });

    test("관리자 페이지 테스트 > ", async () => {
      render(
        <AdminProviderWithInitialAdmin>
          <TestAdminPage />
        </AdminProviderWithInitialAdmin>
      );

      // 0. 관리자 렌더링 확인
      expect(screen.getByText("상품 관리")).toBeInTheDocument();

      // 1. 새로운 상품 추가
      const addProductButton = screen.getByText("새 상품 추가");
      fireEvent.click(addProductButton); // 새 상품 추가 버튼 클릭

      const $inputName = screen.getByLabelText("상품명");
      const $inputPrice = screen.getByLabelText("가격");
      const $inputStock = screen.getByLabelText("재고");

      const user = userEvent.setup();
      await user.type($inputName, "새상품");
      await user.type($inputPrice, "10000");
      await user.type($inputStock, "20");

      const addSubmitBtn = screen.getByText("추가");
      fireEvent.click(addSubmitBtn); // 추가 버튼 클릭
      expect(
        screen.getByText("새상품 - 10000원 (재고: 20)")
      ).toBeInTheDocument(); // 새 상품이 추가되었는지 확인

      // 2. 상품 선택 및 수정
      const $p1 = screen.getByTestId("product-1"); // 상품1 선택
      fireEvent.click($p1); // 상품1 클릭
      fireEvent.click(within($p1).getByTestId("toggle-button"));
      fireEvent.click(within($p1).getByTestId("modify-button")); // 수정 버튼 확인

      const $updateInput = within($p1).getByDisplayValue("상품1");
      user.clear($updateInput); // 상품명 초기화
      await user.type($updateInput, "수정된 상품1"); // 상품명 수정

      fireEvent.click(within($p1).getByText("수정 완료")); // 수정 버튼 확인
      expect(
        screen.getByText("수정된 상품1 - 10000원 (재고: 20)")
      ).toBeInTheDocument(); // 수정된 상품명 확인

      // 3. 상품 할인율 추가 및 삭제

      // 할인 추가

      // 할인 삭제

      // 4. 쿠폰 추가
    });
  });

  describe("단위 테스트", () => {
    test("getAddedToCart_cart에 item을 담아 return 하는 함수", () => {
      const input = mockProducts[0];
      const output = [{ product: input, quantity: 1 }];

      expect(getAddedToCart([], input)).toEqual(output);

      // 이미 있는 상품일때
      const output2 = [{ product: input, quantity: 2 }];
      expect(getAddedToCart(output, input)).toEqual(output2);
    });

    test("getCouponDiscount_쿠폰의 할인 금액을 return 하는 함수", () => {
      const input = mockCoupons[0];
      expect(getCouponDiscount(input, 10000)).toBe(5000);

      const input2 = mockCoupons[1];
      expect(getCouponDiscount(input2, 10000)).toBe(1000);
    });

    test("calculateItemTotal_장바구니 특정 item의 total 금액을 계산하는 함수_bulk 할인이 적용된다", () => {
      const input = { product: mockProducts[0], quantity: 10 };
      const output = 90000; // 10 * 10000 * (1 - 0.1) 10 개 이상 사면 10% 할인 적용
      expect(calculateItemTotal(input)).toBe(output);
    });

    test("calculateCartTotal_장바구니를 계산해 [할인 전 금액, 할인 후 금액, 할인 금액] 을 return 하는 함수", () => {
      const inputCart = [{ product: mockProducts[0], quantity: 10 }];
      const inputCoupon = mockCoupons[0];

      const output = {
        totalBeforeDiscount: 100000,
        totalAfterDiscount: 85000,
        totalDiscount: 15000,
      };
      expect(calculateCartTotal(inputCart, inputCoupon)).toEqual(output);
    });
  });
});
