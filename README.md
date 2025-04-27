### 배포

- original: https://d5br5.github.io/front_5th_chapter2-2/index.origin.html
- refactoring: https://d5br5.github.io/front_5th_chapter2-2/index.refactoring.html

## 학습 목표

### 과제의 핵심 취지

- React의 hook 이해하기
- 함수형 프로그래밍에 대한 이해
- 액션과 순수함수의 분리

### 과제에서 꼭 알아가길 바라는 점

- 엔티티를 다루는 상태와 그렇지 않은 상태 - cart, isCartFull vs isShowPopup
- 엔티티를 다루는 컴포넌트와 훅 - CartItemView, useCart(), useProduct()
- 엔티티를 다루지 않는 컴포넌트와 훅 - Button, useRoute, useEvent 등
- 엔티티를 다루는 함수와 그렇지 않은 함수 - calculateCartTotal(cart) vs capaitalize(str)

## 과제 셀프 채점

### 기본과제

- Component에서 비즈니스 로직을 분리하기
- 비즈니스 로직에서 특정 엔티티만 다루는 계산을 분리하기
- 뷰데이터와 엔티티데이터의 분리에 대한 이해
- entities -> features -> UI 계층에 대한 이해

#### Check list

- [x] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [x] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [x] 계산함수는 순수함수로 작성이 되었나요?
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

#### Check list

- [x] UI 컴포넌트 계층과 엔티티 컴포넌트의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 Hook과 라이브러리 훅과의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 순수함수와 유틸리티 함수의 계층의 성격이 다르다는 것을 이해하고 적용했는가?

## 과제 셀프회고

### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?

#### [ commit 메시지 세분화, 구체화 ]

커밋 메시지를 세세하게 작성하고자 했습니다. 
커밋하는걸 까먹고 오래 작업하다보면 어느새 10+ 가 되어 있던 지난날의 과오를 청산했습니다.

하나의 커밋에는 하나의 작업 내용만을 담고, 커밋 메시지만 보고도 어떤 작업 내용인지 알 수 있게 하려고 했습니다
근데 작업 계속하다보니 메시지 만드는게 귀찮아지긴 하더라구요.. 그래도 최선을 다했습니다. 

커밋하는 시점에는 에러가 없어야 한다고 하셨지만, 그것도 지키지 못했던 적이 좀 있습니다.
당연히 된다고 생각하고 넘겼는데 테스트가 실패하기도 했었습니다. 좀 더 세세히 살펴보는 습관을 길러야 할 것 같아요

#### [ Context API 를 활용하여 props drilling 개선 ]

초기 구조에서는, useCart, useProduct에서 반환된 값과 함수를 하위 컴포넌트로 전달할 때, props를 통했었습니다.
1,2depth 에서는 상관이 없을 수 있으나, 트리 구조가 깊어지면서 사용이 번거로워지더라구요
props interface에 매번 타입을 다시 적어줘야 했고, 사용하지 않을 중간 컴포넌트에서도 매번 전달하는게 여간 번거로운게 아니었습니다.

그래서 useCart, useProduct 의 반환값을 바로 사용할 수 있는 context provider를 만들고, 이를 App 에 감싸줬습니다. 
최초 데이터의 경우 현재는 mock 데이터지만, 나중엔 msw 혹은 서버 데이터로 연결할 수 있으니 provider 바깥에서 전달한 객체를 기반으로 초기화하도록 했습니다. 

```tsx
<ProductProvider initialProducts={initialProducts}>
    <CouponProvider initialCoupons={initialCoupons}>
         <CartProvider>
              <div className="min-h-screen bg-gray-100">
                  ... pages
              </div>
         </CartProvider>
    </CouponProvider>
</ProductProvider>
```
사용하는 컴포넌트에서는, props가 아닌 직접 hook을 호출하여 관련 데이터를 쉽게 보여줄 수 있었습니다.

```tsx
export const ProductList: React.FC<ProductListProps> = () => {
  const { products } = useProductContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
```

#### [ useForm hook을 작성하여, 반복되는 form 로직 모듈화 ]

이번 과제에서는 form 이 여러번 사용되었습니다.
쿠폰을 생성하고, 상품을 생성하고, 수정할 때 사용했죠
큰 흐름은 비슷했습니다.

1. 초기 값들을 설정한다
2. input과 값을 연동한다. 변경시 form에도 변경된다.
3. 변경 완료후 어딘가에 상태를 저장하고, form을 최초 상태로 돌린다. 

기존 상태에서는, input의 value change handler를 input마다 생성해서 전달해주고 있었습니다. 
이러면 input이 늘어날때마다 함수도 추가해줘야 하기 때문에, 확장성 면에서 좋지 않습니다. 
그래서 다음과 같이 useForm 훅을 작성했습니다. 

```ts
import { useState } from "react";

export const useForm = <T>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormReset = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    handleFormChange,
    handleFormReset,
  };
};
```
input에 name property 를 설정해주고, handleFormChange를 핸들러로 전달해주면 form 상태를 업데이트할 수 있습니다.
인자로 초기값을 받아 최초 세팅을 할 수 있고, 제네릭을 사용하여 form field 구조의 타입을 추론할 수 있습니다. 

#### [ ViewToggle ui component를 만들어, 뷰 전환 로직 모듈화 ] 

상품 상세 정보를 클릭하여 접었다 폈다 하는 컴포넌트가 있었습니다. 
ui 의 상태인 isOpen으로 관리를 하고 있었습니다. 
accordion ui 컴포넌트로 분리하면 좋을 것 같다고 생각했습니다. 

하지만 좀 더 파악해보니, 비슷한 흐름을 타는 컴포넌트가 더 있었습니다. 
상품 수정 폼이나 생성 폼입니다. 버튼을 누르면 폼이 나타나고, 제출하면 특정 동작을 수행하고 폼이 사라집니다. 
이것도 결국 아코디언과 마찬가지로 isOpen으로 구분할 수 있는 두 상태를 담은 ui였습니다. 

그래서 이를 별도의 ui로 커버할 수 있는 컴포넌트를 만들었습니다. 
accordion과 정확히 동일하지는 않으니, View 를 Toggle 한다는 의미에서 ViewToggle로 명명했습니다. 

<details>
<summary>ViewToggle 컴포넌트 코드</summary>

```tsx
import { createContext, useContext, useState } from "react";

interface ViewToggleContexttype {
  isShow: boolean;
  toggleView: () => void;
}

const ViewToggleContext = createContext<ViewToggleContexttype | null>(null);

export const ViewToggle = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useState(false);

  const toggleView = () => setIsShow((prev) => !prev);

  return (
    <ViewToggleContext.Provider value={{ isShow, toggleView }}>
      {children}
    </ViewToggleContext.Provider>
  );
};

const useViewToggleContext = () => {
  const context = useContext(ViewToggleContext);
  if (!context) {
    throw new Error("useViewToggleContext must be used within a ViewToggle");
  }
  return context;
};

export const OnHide = ({ children }: { children: React.ReactNode }) => {
  const { isShow } = useViewToggleContext();

  return !isShow && children;
};

export const OnShow = ({ children }: { children: React.ReactNode }) => {
  const { isShow } = useViewToggleContext();

  return isShow && children;
};

interface ToggleTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: React.ReactNode | ((isShow: boolean) => React.ReactNode);
  handleClick?: () => void;
}

export const Trigger = ({
  children,
  handleClick,
  ...props
}: ToggleTriggerProps) => {
  const { toggleView, isShow } = useViewToggleContext();

  const content = typeof children === "function" ? children(isShow) : children;

  return (
    <button
      onClick={() => {
        handleClick?.();
        toggleView();
      }}
      {...props}
    >
      {content}
    </button>
  );
};

ViewToggle.Trigger = Trigger;
ViewToggle.OnShow = OnShow;
ViewToggle.OnHide = OnHide;
```
</details>

1. 기본적으로, 컴포지션 패턴을 사용했습니다. 컴포넌트 트리를 사용자가 원하는대로 구성할 수 있도록 했습니다.
2. on일때 보여줄 OnShow, off 일때 보여줄 OnHide, 둘을 전환할 Trigger 컴포넌트를 만들었습니다. 
3. OnShow, OnHide는 둘 중 하나만 보여줄 수 있습니다. 
4. 상태와 크게 상관없는 요소들도 포함시킬 수 있습니다.
5. on, off 상태는 context로 관리합니다. 

이렇게 구성한 ViewToggle은 '화면을 전환한다' 는 맥락에서, 폼 보여주기 전환과 아코디언 모두에서 사용할 수 있습니다
뿐만아니라 비슷한 로직을 가진 여러 뷰 전환시에도 사용할 수 있습니다. 

context 내 계층구조만 맞춰준다면, 각각 하위 파일로 분리하기도 용이합니다. 

```tsx
export const ProductAccordion: React.FC<ProductAccordionProps> = ({
  product,
  ...props
}) => {
  return (
    <div className="bg-white p-4 rounded shadow" {...props}>
      <ViewToggle>
        <ViewToggle.Trigger
          data-testid="toggle-button"
          className="w-full text-left font-semibold"
        >
          {product.name} - {product.price}원 (재고: {product.stock})
        </ViewToggle.Trigger>
        <ViewToggle.OnShow>
          <div className="mt-2">
            <ProductDetail product={product} />
          </div>
        </ViewToggle.OnShow>
      </ViewToggle>
    </div>
  );
};
```

#### [ 폴더구조 가독성 ]

저는 FSD 구조를 알지 못했습니다. 
지난 5주간, 여러 자료 및 수강생 분들의 코드를 보며 FSD라는 것을 처음 알게 되었습니다. 
'최고의 프론트엔드 구조' 라는 찬사를 받기도 하더군요.

설명된 글과, 예시를 살펴보니 꽤 그럴 듯 해보였습니다. 
그동안 프로젝트를 진행하며 느꼈던 고충들도 어느 정도 해소가 될 것 같았습니다.

그래서 저도 이번 과제에 한 번 적용해보고자 했습니다. 
(다음주 과제가 폴더 관리 관련이라는 것은 알았지만, 연습겸..)

과제 중반(c8df9ec04eca14a9fe1e2a3b13a6d37ca9c027ba)까지는 FSD 구조를 잘 따르려고 했습니다.
잘 따랐는지는 모르겠습니다. entity, feature, widget이 아직도 잘 구분이 안가긴 합니다.
개념적으로는 어떻게 구분되는지 알 것 같은데, 막상 코드를 짜보니 
이 코드가 feature인가.. widget인가 애매한 순간이 많았습니다. 

그러다, FSD 를 버리고, 다시 원래의 폴더 구조로 복귀했습니다. 3319e68a650e7ab2d51fbb9672022bd3f176b5e4

그 이유는 크게 다음과 같습니다. 

1. 프로젝트 규모에 비해 폴더가 너무 많아졌다
7. 원하는 파일이 어느 폴더에 있는지 바로 찾지 못하겠다
8. 폴더간 관계가 눈에 잘 안들어온다.

1번 이유에서 모두 이어진다고 할 수 있겠습니다. 
각 엔티티별로 ui, model 폴더를 만들어줘야하고, 핵심 파일 이외에 배럴 파일도 만들어줘야해서
폴더와 파일이 너무 많아졌습니다. 그래서 내가 원하는 파일이 어디 있는지 찾기 쉽지 않더라구요.
폴더 열고 닫고만 수십번을 한 것 같아요. 여기에 지쳐서, 기본 구조로 다시 돌아왔습니다. 

1. app 폴더
    - 앱 최초 진입 파일인 `main.tsx` 와 `App.tsx` 가 위치합니다.
    - 앱 전체에서 사용하는 Provider를 감싸줍니다.
5. model 폴더
    - cart, coupon, discount, product 엔티티 폴더입니다.
    - 폴더별로, context, lib, types, hook 을 정의해두었습니다.
6. pages 폴더
    - page별 라우트 파일을 모아두었습니다.
    - 각 페이지에서 사용할 컴포넌트를, pages 폴더 하위 components 폴더에 따로 모아두었습니다.
9. shared 폴더
    - 공용으로 사용할 hook, ui 를 모아두었습니다.
10. 기타 (mock data 폴더)

이렇게 배치하고 나니, 비슷한 관심사끼리 응집시킬 수 있었고, 폴더 위치 파악도 쉽게 되었습니다. 
아무리 좋은 구조라도, 프로젝트 상황에 따라 좋지 않을수도 있다는 것을 느꼈습니다. 
나중에 프로젝트 규모가 커지면, 그 때 가서 분리해도 늦지 않을 것 같습니다. 

### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?

- 데이터를 로컬스토리지에 저장하기 or msw 적용하기
- tanstack query 를 사용해서 서버 데이터 관리
- 폴더 구조를 좀 더 신경써보기..

### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)

- 프로젝트 규모에 따라, 최적의 폴더 구조가 다를 것이라고 생각합니다. 본 과제의 경우에도, 저는 지금 단계에서 FSD는 굳이 필요 없다고 느꼈지만, 나중에 커지면 필요해질 것 같다고 생각했습니다. 하지만, 정확히 그 시점이 언제일지는 모르겠습니다. 프로젝트 규모가 점점 커지면서, 지금쯤 구조의 변화가 필요하다! 는 것은 어떻게 판단할 수 있을까요? 또, 프로젝트에 끼칠 영향을 최소화하여 구조를 변경하는 팁이 있을까요? 아니면, 아예 구조 변화는 필요 없다고 생각하시나요? (아예 처음부터 잘 짜야한다)
