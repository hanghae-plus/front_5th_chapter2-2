## 배포

- refactoring: https://anveloper.github.io/front_5th_chapter2-2/index.refactoring.html
- origin: https://anveloper.github.io/front_5th_chapter2-2/index.origin.html

## 과제의 핵심취지

- React의 hook 이해하기
- 함수형 프로그래밍에 대한 이해
- 액션과 순수함수의 분리

## 과제에서 꼭 알아가길 바라는 점

- 엔티티를 다루는 상태와 그렇지 않은 상태 - cart, isCartFull vs isShowPopup
- 엔티티를 다루는 컴포넌트와 훅 - CartItemView, useCart(), useProduct()
- 엔티티를 다루지 않는 컴포넌트와 훅 - Button, useRoute, useEvent 등
- 엔티티를 다루는 함수와 그렇지 않은 함수 - calculateCartTotal(cart) vs capaitalize(str)

### 기본과제

- Component에서 비즈니스 로직을 분리하기
- 비즈니스 로직에서 특정 엔티티만 다루는 계산을 분리하기
- 뷰데이터와 엔티티데이터의 분리에 대한 이해
- entities -> features -> UI 계층에 대한 이해

기본과제 체크포인트
- [x] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [x] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [x] 계산함수는 순수함수로 작성이 되었나요?
- [x] 특정 Entitiy만 다루는 함수는 분리되어 있나요?
- [x] 특정 Entitiy만 다루는 Component와 UI를 다루는 Component는 분리되어 있나요?
- [x] 데이터 흐름에 맞는 계층구조를 이루고 의존성이 맞게 작성이 되었나요?

### 심화과제

- 재사용 가능한 Custom UI 컴포넌트를 만들어 보기
- 재사용 가능한 Custom 라이브러리 Hook을 만들어 보기
- 재사용 가능한 Custom 유틸 함수를 만들어 보기
- 그래서 엔티티와는 어떤 다른 계층적 특징을 가지는지 이해하기

심화과제 체크포인트
- [x] UI 컴포넌트 계층과 엔티티 컴포넌트의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 Hook과 라이브러리 훅과의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 순수함수와 유틸리티 함수의 계층의 성격이 다르다는 것을 이해하고 적용했는가?

## 과제 셀프회고

### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?

1. 기본과제 정상 동작 및 테스트 코드 통과
  - 주입되는 인자와 리턴값을 확인하여 해당 함수가 어떤 역할을 하는 지 먼저 파악을 하고, 훅에서 어떻게 사용되는 지를 먼저 분석하였습니다. 또한 테스트 코드를 통해, 기대되는 동작을 확인하고 실제 컴포넌트의 동작과 함께 훅과 순수함수를 구현하였습니다.
  - 제시된 `models` 폴더 내에서 계산만 하는 순수 함수와 배열을 재생성하는 헬퍼 함수를 함께 배치하여, import 하는 곳을 흐름에 맞게 배치해보려고 하였습니다.

<details><summary><strong>cart.ts</strong></summary>

```typescript
import { CartItem, Coupon, DISCOUNT_TYPE, Product } from "@/types";

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const total = product.price * quantity;
  const applicableDiscount = getMaxApplicableDiscount(item);
  if (!applicableDiscount || applicableDiscount >= 1) {
    return total;
  }
  return total * (1 - applicableDiscount);
};

// 컴포넌트에서 최대 할인 금액 표기 UI
export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getMaxApplicableDiscount = ({ quantity, product: { discounts } }: CartItem) => {
  // 상품 수량과 제한 기준에 따른 적용가능한 할인율
  return discounts.reduce((acc, { quantity: limit, rate }) => {
    return quantity >= limit ? Math.max(acc, rate) : acc;
  }, 0);
};

// 수량에 따른 할인금액 계산 내부함수
const _calculateCartTotalWithoutCoupon = (cart: CartItem[]) => {
  return cart.reduce(
    ({ totalBeforeDiscount, quantityDiscount: totalDiscount }, item) => {
      const itemTotal = item.product.price * item.quantity;
      return {
        totalBeforeDiscount: totalBeforeDiscount + itemTotal,
        quantityDiscount: totalDiscount + itemTotal * getMaxApplicableDiscount(item),
      };
    },
    { totalBeforeDiscount: 0, quantityDiscount: 0 }
  );
};

// 쿠폰 유무, 타입에 따른 할인액 계산 내부함수
const _calculateCouponDiscountValue = (
  selectedCoupon: Coupon | null,
  totalBeforeDiscount: number,
  totalDiscount: number
) => {
  if (!selectedCoupon) return 0;
  else if (selectedCoupon.discountType === DISCOUNT_TYPE.AMOUNT) return selectedCoupon.discountValue;
  else return (totalBeforeDiscount - totalDiscount) * (selectedCoupon.discountValue / 100); // DISCOUNT_TYPE.PERCENTAGE
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  // 빈 장바구니 예외처리 -> 할인 쿠폰이 음수값이 적용 가능함
  if (!cart.length) return { totalBeforeDiscount: 0, totalAfterDiscount: 0, totalDiscount: 0 };

  // 쿠폰 적용 전 할인된 총액, 기본 할인 액
  const { totalBeforeDiscount, quantityDiscount } = _calculateCartTotalWithoutCoupon(cart);

  // 쿠폰 적용 후 할인된 총액
  const couponDiscountValue = _calculateCouponDiscountValue(selectedCoupon, totalBeforeDiscount, quantityDiscount);

  // 최종 할인 금액, 쿠폰 적용 할인 금액
  const totalDiscount = quantityDiscount + couponDiscountValue;
  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;
  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  // 0이면 제거해야한다.
  if (newQuantity === 0) {
    return cart.filter(({ product }) => product.id !== productId);
  }

  // 재고가 충분히 있다면 새로운 수량으로 변경
  return cart.map((item) => {
    if (item.product.id !== productId) return item;

    const quantity = item.product.stock >= newQuantity ? newQuantity : item.product.stock;
    return { ...item, quantity };
  });
};

// 장바구니에 추가할때 새배열 함수, 재고 확인 로직 포함
export const addToCartCheckStock = (cart: CartItem[], product: Product) => {
  const newCart = [...cart];
  const idx = newCart.findIndex((item) => item.product.id === product.id);

  // 있는 경우 재고 확인 후 추가
  if (idx !== -1) {
    const item = newCart[idx];
    const quantity = Math.min(item.quantity + 1, product.stock);
    newCart[idx] = { ...item, quantity };
    return newCart;
  }

  return [...newCart, { product, quantity: 1 }];
};
```
</details>

<details><summary><strong>useCart.ts</strong></summary>

```typescript
// useCart.ts
import { useLocalStorage } from "@/refactoring/hooks";
import { addToCartCheckStock, calculateCartTotal, updateCartItemQuantity } from "@/refactoring/models";
import { CartItem, Coupon, LOCAL_STORAGE_KEY, Product } from "@/types";
import { useCallback, useState } from "react";

export const useCart = () => {
  // const [cart, setCart] = useState<CartItem[]>([]);
  const [cart, setCart] = useLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART, []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => addToCartCheckStock(prev, product));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, 0));
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, newQuantity));
  }, []);

  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  const getRemainingStock = useCallback(
    (product: Product) => {
      const cartItem = cart.find((item) => item.product.id === product.id);
      return product.stock - (cartItem?.quantity || 0);
    },
    [cart]
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    getRemainingStock,
  };
};
```
</details>

2. 심화과제 중 재사용 가능한 커스텀 훅 `useLocalStorage` 구현
  - 로컬 스토리지에 저장하거나, 꺼내올 수 있는 재사용 가능한 커스텀 훅을 구현했습니다.
  - useState와 동작이 갖도록 튜플로 반환하는 타입을 명시하여 사용하는 쪽에서도 접근이 용이하게 구현했습니다.
  - 코드량이 많지 않고, 훅을 제외하곤, 외부에서 사용하지 않는 값들이라 한 파일에서 관리하도록 구현했습니다.

<details><summary><strong>useLocalStorage.ts</strong></summary>

```typescript
import { LocalStorageKeyType } from "@/types";
import { useState } from "react";

// 내부함수
const setLocalStorage = <T>(key: LocalStorageKeyType, newValue: T): T => {
  localStorage.setItem(key, JSON.stringify(newValue));
  return newValue;
};
const getLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): T => {
  // JSON.parse 에러 가드
  try {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item) as T;
  } catch (error) {}

  // 없거나 에러인 경우 초기값으로 로컬 변경
  setLocalStorage(key, initialValue);
  return initialValue;
};

// type
type Updater<T> = (prev: T) => T; // 타입가드와 함께 활용하여 함수를 확실히 식별시킬 수 있음
type Storage<T> = [item: T, setItem: (prev: T | Updater<T>) => void]; // 튜플 인자 이름을 인식시킬 수 있음 [item, setItem]

// type guard
const isUpdater = <T>(updater: unknown): updater is Updater<T> => {
  return typeof updater === "function";
};

// 유틸함수? 헬퍼함수?
const setStateWithLocalStorage = <T>(key: LocalStorageKeyType, prev: T, updater: T | Updater<T>) => {
  const newValue = isUpdater<T>(updater) ? updater(prev) : updater;
  setLocalStorage(key, newValue);
  return newValue;
};

// hook 재사용이 가능한 custom hook, 현재 useCart에만 적용
export const useLocalStorage = <T>(key: LocalStorageKeyType, initialValue: T): Storage<T> => {
  const [storedItem, setStoredItem] = useState<T>(() => getLocalStorage(key, initialValue));

  const setItem = (updater: T | Updater<T>) => {
    setStoredItem((prev) => setStateWithLocalStorage(key, prev, updater));
  };
  return [storedItem, setItem];
};
```
</details>

3.  재사용 가능한 커스텀 훅
  - 기본 커스텀훅을 없애지 않고, Context API의 인자로 활용하여, 같은 모델을 다루지만 지역적으로도, 전역에서도 사용할 수 있도록 context를 구현했습니다.
  - Provider 를 사용할 때도, barrel을 적용하여 한 곳에서 훅과 함께 사용할 수 있도록 코드를 구성하였습니다.
  - 테스트 코드에서는 훅에 별도의 초기값을 주입하고 있어 Context API에서도 동일하게 동작하도록 구현했습니다.

<details><summary><strong>useProduct.ts</strong></summary>

```typescript 
import { updateProductInList } from "@/refactoring/models";
import { Product } from "@/types";
import { useCallback, useState } from "react";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => updateProductInList(prev, product));
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  return { products, updateProduct, addProduct };
};

```
</details>

<details><summary><strong>ProductProvider.tsx</strong></summary>

```typescript
import { useProducts } from "@/refactoring/hooks";
import { Product } from "@/types";
import { createContext, ReactNode, useContext } from "react";

type ProductContextType = ReturnType<typeof useProducts>;
const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  products = initialProducts,
  children,
}: {
  products?: Product[];
  children: ReactNode;
}) => {
  const value = useProducts(products);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("context is null");
  return context;
};

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
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

```
</details>

<details><summary><strong>provider/index.tsx</strong></summary>

```typescript
import { Coupon, Product } from "@/types";
import { ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { CouponProvider } from "./CouponProvider";
import { ProductProvider } from "./ProductProvider";

type Props = { products?: Product[]; coupons?: Coupon[]; children: ReactNode };

export const Providers = ({ products, coupons, children }: Props) => {
  return (
    <ProductProvider products={products}>
      <CouponProvider coupons={coupons}>
        <CartProvider>{children}</CartProvider>
      </CouponProvider>
    </ProductProvider>
  );
};

export { useCartContext } from "./CartProvider";
export { useCouponContext } from "./CouponProvider";
export { useProductContext } from "./ProductProvider";
```
</details>


4. 재사용 가능한 컴포넌트
  - 기존에 `components` 폴더에 있던 Page들을 pages로 이동 시키고, 공통으로 사용할 컴포넌트를 뽑아 순수 컴포넌트로 사용했습니다.
  - tailwind를 활용한 컴포넌트 스타일을  유지할 수 있었습니다.
  - 다만, `Buttons.tsx`를 구현하면서, 그냥 tailwind 클래스를 작성하는거나 별반 차이가 없을 것 같은 부분도 확인하였습니다.
  - 컴포넌트의 기본 속성을 최대한 활용하여 구현하였습니다.

<details><summary><strong>Input.tsx / LabelInput.tsx</strong></summary>

```typescript
// Input.tsx
import { $CN } from "@/refactoring/utils";
import { DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ className = "", ...rest }: Props) => {
  return <input className={$CN("w-full p-2 border rounded", className)} {...rest} />;
};

// LabelInput.tsx
import { Input } from "./Input";

type Props = {
  id: string;
  type?: "text" | "number";
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

// 재사용 가능한 컴포넌트
export const LabelInput = ({ id, type = "text", label, value, onChange }: Props) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
};

```
</details>


<details><summary><strong>Button.tsx</strong> - 미사용</summary>

```typescript
// Button.tsx - 미사용
import { $CN } from "@/refactoring/utils";
import { DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  isFullWidth?: boolean;
  isRounded?: boolean;
  hover?: string | string[];
};

export const Button = ({
  isFullWidth = false,
  isRounded = false,
  className = "",
  hover = "",
  children,
  ...rest
}: Props) => {
  const classList = [
    // tailwind와 작성하는 코드량의 차이가 없다...
    isFullWidth ? "w-full" : "",
    className,
    isRounded ? "rounded" : "",
    ...(Array.isArray(hover) ? hover.map((h) => `hover:${h}`) : [hover ? `hover:${hover}` : ""]),
  ];
  return (
    <button className={$CN(...classList)} {...rest}>
      {children}
    </button>
  );
};

```
</details>

5. 재사용 가능한 유틸함수
  - 순수하게 활용할 수 있는 유틸함수가 어떤것이 있을까 고민하다가, 자주 `className`을 여러개 적용할 때 사용하는 유틸함수를 구현했습니다.
  - *.module.css를 자주 사용하는데, 기존에도 백틱방식을 사용하지 않고, 나열하여 join(" ") 하는 방식으로 주로 사용했었습니다.
  - 다만 tailwindcss 가 축약어로 되어있다보니, 그렇게 가독성을 해치지 않아 공통 컴포넌트 쪽만 적용하였습니다.
  - Buttons.tsx를 만들어 본 것도 유틸함수를 활용해보려고 만들었는데, tailwind css보다 더 많이 작성하게 되는 부분이 있었습니다.

<details><summary><strong>utils/index.ts</strong></summary>

```typescript
// className을 나열하거나, 조건적으로 포함할 때,
// `` 방식이 아닌, 문자열을 나열하여 유효한 값만 모아서 반환하는 유틸함수
export const $CN = (...className: string[]): string => className.filter(Boolean).join(" ");
```
</details>

### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?
- 과제에서 가장 중요했던 부분이 순수함수와 액션함수, 데이터를 구분하는데 있어서 함수를 직관적으로 구분하진 못한 것 같습니다. 
- 정리하고 보니 순수 함수 인줄 알았던 코드 내에서 참조중인 다른 함수로 인해 순수하지 않게 되는 부분들도 있었습니다.
- 다음 번에 만약 순수함수를 분리하게 된다면 조금 더 깔끔하게 코드를 분리해보도록 하겠습니다.

### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)
- 이번에도 디렉토리 구조를 변경하면서 페이지와 컴포넌트 폴더를 어떻게 구분할까 고민을 많이 했습니다.
- 현업에서는 Next.js App router 방식을 가장 많이 사용하다 보니 page.tsx라는 고유한 컴포넌트에서 다른 부수적인 컴포넌트를 바로 하위에서 가져오는 방식을 자주 사용하고 있습니다.

- 이번에 pages를 구분하면서 해당 페이지에 속한 컴포넌트는 동일한 레벨에서 import하고, 
- 하위 컴포넌트가 복잡한 형태면 다시한번 폴더를 나누어 동일하게 배치하는 방식으로 구조를 구성해봤는데, 
- 적절하게 배치가 된것인지 리뷰를 받고 싶습니다.
- 다른 방식으로는 각 페이지 index.tsx와 동일한 레벨에 각각의 components 폴더를 만들어서 사용하는 방법도 고민했는데, 
- 서로 다른 레벨의 하위 컴포넌트 들이 동일한 폴더에 있는 것이 맞을까 하는 고민에 첫번째 방식으로 구성해봤습니다.

![2-2 과제 디렉토리 구조](https://github.com/user-attachments/assets/f67b4ac1-5b75-4751-9d04-a69871ddee1f)
- 사실 회사에서 디렉토리 나누는 일을 가장 많이 신경쓰고 있어서 과제를 하는데 있어서도 그 부분에 조금더 집중을 하는 것 같습니다.
- 코치님께선 어떤 컴포넌트 디렉토리 구조를 선호하는 지도 궁금합니다.

감사합니다.
