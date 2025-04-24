import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from './App';
import { useCart } from './features/cart/hooks/useCart';
import { CartPage } from './page/cart';
import { AdminPage } from './page/admin';
import { INITIAL_PRODUCTS } from './constants/initialProducts';
import { INITIAL_COUPONS } from './constants/initialCoupons';
import { calculateCartTotal, getMaxApplicableDiscount } from './features/cart/models/cart';
import { CartItem, Coupon, Product } from './features/shared/types/entities';

// 모의 함수와 데이터 설정
const mockUpdateProduct = vi.fn();
const mockAddProduct = vi.fn();
const mockSetNewCoupon = vi.fn();
const mockHandleAddCoupon = vi.fn();

// useCart 훅 모킹
vi.mock('./features/cart/hooks/useCart', () => ({
  useCart: vi.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('초기에는 장바구니 페이지가 표시되어야 함', () => {
    (useCart as any).mockReturnValue({
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      applyCoupon: vi.fn(),
      calculateTotal: vi.fn(() => ({ totalBeforeDiscount: 0, totalAfterDiscount: 0, totalDiscount: 0 })),
      selectedCoupon: null,
    });

    render(<App />);
    expect(screen.getByText('장바구니')).toBeInTheDocument();
    expect(screen.getByText('관리자 페이지로')).toBeInTheDocument();
  });

  test('관리자 페이지 버튼을 클릭하면 관리자 페이지로 전환됨', () => {
    (useCart as any).mockReturnValue({
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      applyCoupon: vi.fn(),
      calculateTotal: vi.fn(() => ({ totalBeforeDiscount: 0, totalAfterDiscount: 0, totalDiscount: 0 })),
      selectedCoupon: null,
    });

    render(<App />);

    // 관리자 페이지 버튼 클릭
    const adminButton = screen.getByText('관리자 페이지로');
    fireEvent.click(adminButton);

    // 관리자 페이지로 전환되었는지 확인
    expect(screen.getByText('관리자 페이지')).toBeInTheDocument();
    expect(screen.getByText('장바구니 페이지로')).toBeInTheDocument();
  });
});

describe('CartPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useCart as any).mockReturnValue({
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      applyCoupon: vi.fn(),
      calculateTotal: vi.fn(() => ({ totalBeforeDiscount: 0, totalAfterDiscount: 0, totalDiscount: 0 })),
      selectedCoupon: null,
    });
  });

  test('상품 목록과 장바구니가 렌더링되어야 함', () => {
    render(<CartPage products={INITIAL_PRODUCTS} coupons={INITIAL_COUPONS} />);

    expect(screen.getByText('장바구니')).toBeInTheDocument();

    // 상품 목록에서 상품들이 렌더링되었는지 확인
    INITIAL_PRODUCTS.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});

describe('AdminPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('상품 관리 및 쿠폰 관리 섹션이 렌더링되어야 함', () => {
    const mockNewCoupon: Coupon = {
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    };

    render(
      <AdminPage
        products={INITIAL_PRODUCTS}
        coupons={INITIAL_COUPONS}
        onProductUpdate={mockUpdateProduct}
        onProductAdd={mockAddProduct}
        newCoupon={mockNewCoupon}
        setNewCoupon={mockSetNewCoupon}
        handleAddCoupon={mockHandleAddCoupon}
      />,
    );

    expect(screen.getByText('관리자 페이지')).toBeInTheDocument();

    // 상품 관리 섹션이 렌더링되었는지 확인
    INITIAL_PRODUCTS.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });

    // 쿠폰 관리 섹션이 렌더링되었는지 확인
    INITIAL_COUPONS.forEach((coupon) => {
      expect(screen.getByText(coupon.name)).toBeInTheDocument();
    });
  });
});

describe('Cart Models (Pure Functions)', () => {
  test('getMaxApplicableDiscount은 올바른 최대 할인율을 반환해야 함', () => {
    const product: Product = {
      id: 'test1',
      name: 'Test Product',
      price: 10000,
      stock: 50,
      discounts: [
        { quantity: 10, rate: 0.1 },
        { quantity: 20, rate: 0.2 },
      ],
    };

    // 수량이 할인 기준에 못 미치는 경우
    const cartItem1: CartItem = { product, quantity: 5 };
    expect(getMaxApplicableDiscount(cartItem1)).toBe(0);

    // 수량이 첫 번째 할인 기준만 충족하는 경우
    const cartItem2: CartItem = { product, quantity: 15 };
    expect(getMaxApplicableDiscount(cartItem2)).toBe(0.1);

    // 수량이 두 번째 할인 기준도 충족하는 경우
    const cartItem3: CartItem = { product, quantity: 25 };
    expect(getMaxApplicableDiscount(cartItem3)).toBe(0.2);
  });

  test('calculateCartTotal은 올바른 총액 정보를 계산해야 함', () => {
    const product: Product = {
      id: 'test1',
      name: 'Test Product',
      price: 10000,
      stock: 50,
      discounts: [
        { quantity: 10, rate: 0.1 }, // 10개 이상 구매 시 10% 할인
      ],
    };

    // 할인 적용되는 상황
    const cart: CartItem[] = [
      { product, quantity: 10 }, // 10개 => 10% 할인 적용 => 90,000원
    ];

    // 쿠폰 없는 경우
    const totalWithoutCoupon = calculateCartTotal(cart, null);
    expect(totalWithoutCoupon.totalBeforeDiscount).toBe(100000);
    expect(totalWithoutCoupon.totalAfterDiscount).toBe(90000);
    expect(totalWithoutCoupon.totalDiscount).toBe(10000);

    // 금액 쿠폰 적용 (5,000원 할인)
    const amountCoupon: Coupon = {
      name: '5000원 할인',
      code: 'AMOUNT5000',
      discountType: 'amount',
      discountValue: 5000,
    };

    const totalWithAmountCoupon = calculateCartTotal(cart, amountCoupon);
    expect(totalWithAmountCoupon.totalBeforeDiscount).toBe(100000);
    expect(totalWithAmountCoupon.totalAfterDiscount).toBe(85000);
    expect(totalWithAmountCoupon.totalDiscount).toBe(15000);

    // 비율 쿠폰 적용 (10% 할인)
    const percentageCoupon: Coupon = {
      name: '10% 할인',
      code: 'PERCENT10',
      discountType: 'percentage',
      discountValue: 10,
    };

    const totalWithPercentageCoupon = calculateCartTotal(cart, percentageCoupon);
    expect(totalWithPercentageCoupon.totalBeforeDiscount).toBe(100000);
    expect(totalWithPercentageCoupon.totalAfterDiscount).toBe(81000); // 90,000 - (90,000 * 0.1)
    expect(totalWithPercentageCoupon.totalDiscount).toBe(19000);
  });
});
