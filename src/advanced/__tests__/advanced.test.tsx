import { describe, expect, test, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";

import { AdminPage, CartPage } from "@r/pages";
import { Product } from "@r/model/product/types";
import { Coupon } from "@r/model/coupon/types";
import { ProductProvider } from "@r/model/product/product-context";
import { CouponProvider } from "@r/model/coupon/coupon-context";
import { CartProvider } from "@r/model/cart/cart-context";
import { ViewToggle } from "@r/shared/ui/view-toggle";
import { useForm } from "@r/shared/hooks/use-form";

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
  return (
    <ProductProvider initialProducts={mockProducts}>
      <CouponProvider initialCoupons={mockCoupons}>
        <CartProvider>
          <AdminPage />
        </CartProvider>
      </CouponProvider>
    </ProductProvider>
  );
};

const TestCartPage = () => {
  return (
    <ProductProvider initialProducts={mockProducts}>
      <CouponProvider initialCoupons={mockCoupons}>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </CouponProvider>
    </ProductProvider>
  );
};

describe("advanced > ", () => {
  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(<TestCartPage />);
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

  describe("useForm", () => {
    const initialValues = {
      name: "",
      price: 0,
    };

    test("초기값을 잘 설정해야 한다", () => {
      const { result } = renderHook(() => useForm(initialValues));

      expect(result.current.formValues).toEqual(initialValues);
    });

    test("handleFormChange로 값이 업데이트되어야 한다", () => {
      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.handleFormChange({
          target: { name: "name", value: "상품명" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.formValues.name).toBe("상품명");
    });

    test("handleFormChange는 string 외 값도 다룰 수 있어야 한다", () => {
      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.handleFormChange({
          target: { name: "price", value: "1000" }, // HTMLInputElement의 value는 string이므로
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.formValues.price).toBe("1000"); // ← 이건 string이 됨
    });

    test("handleFormReset으로 초기값으로 돌아가야 한다", () => {
      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.handleFormChange({
          target: { name: "name", value: "변경됨" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.formValues.name).toBe("변경됨");

      act(() => {
        result.current.handleFormReset();
      });

      expect(result.current.formValues).toEqual(initialValues);
    });
  });

  describe("ViewToggle", () => {
    test("초기에는 OnHide 콘텐츠만 보여야 함", () => {
      render(
        <ViewToggle>
          <ViewToggle.OnShow>보임</ViewToggle.OnShow>
          <ViewToggle.OnHide>숨김</ViewToggle.OnHide>
        </ViewToggle>
      );

      expect(screen.queryByText("보임")).not.toBeInTheDocument();
      expect(screen.getByText("숨김")).toBeInTheDocument();
    });

    test("Trigger를 클릭하면 OnShow가 표시되고 OnHide는 숨겨짐", () => {
      render(
        <ViewToggle>
          <ViewToggle.Trigger>토글</ViewToggle.Trigger>
          <ViewToggle.OnShow>보임</ViewToggle.OnShow>
          <ViewToggle.OnHide>숨김</ViewToggle.OnHide>
        </ViewToggle>
      );

      const button = screen.getByRole("button", { name: "토글" });

      fireEvent.click(button);

      expect(screen.getByText("보임")).toBeInTheDocument();
      expect(screen.queryByText("숨김")).not.toBeInTheDocument();
    });

    test("Trigger의 children이 함수형이면 isShow에 따라 동적으로 바뀜", () => {
      render(
        <ViewToggle>
          <ViewToggle.Trigger>
            {(isShow) => (isShow ? "숨기기" : "보이기")}
          </ViewToggle.Trigger>
        </ViewToggle>
      );

      const button = screen.getByRole("button", { name: "보이기" });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      // 버튼 텍스트가 바뀌었는지 확인
      expect(
        screen.getByRole("button", { name: "숨기기" })
      ).toBeInTheDocument();
    });

    test("Trigger의 handleClick도 실행됨", () => {
      const handleClick = vi.fn(); // jest.fn() or vi.fn()

      render(
        <ViewToggle>
          <ViewToggle.Trigger handleClick={handleClick}>
            토글
          </ViewToggle.Trigger>
        </ViewToggle>
      );

      fireEvent.click(screen.getByRole("button", { name: "토글" }));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
