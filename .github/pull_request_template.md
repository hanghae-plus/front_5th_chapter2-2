## 과제의 핵심취지

- React의 hook 이해하기
- 함수형 프로그래밍에 대한 이해
- 액션과 순수함수의 분리

## 과제에서 꼭 알아가길 바라는 점

- 엔티티를 다루는 상태와 그렇지 않은 상태 - cart, isCartFull vs isShowPopup

엔티티를 다룬다는것은 도메인 데이터 상태를 관리 / 수정 한다는 것

- 엔티티를 다루는 컴포넌트와 훅 - CartItemView, useCart(), useProduct()


- 엔티티를 다루지 않는 컴포넌트와 훅 - Button, useRoute, useEvent 등

utils 엔티티를 다루지 않는 함수

- 엔티티를 다루는 함수와 그렇지 않은 함수 - calculateCartTotal(cart) vs capaitalize(str)

ocp / 전략패턴 써야하는 이유

저번부터 과제부터 불변성을 지키고 (원본을 보호하기 위해 데이터 얇은 복사),  계산(순수)함수와 액션함수로 분리하고자 노력중.
ex) for문은 forEach나 map 으로.
함수 하나의 책임제


### 기본과제

- Component에서 비즈니스 로직을 분리하기
- 비즈니스 로직에서 특정 엔티티만 다루는 계산을 분리하기
- 뷰데이터와 엔티티데이터의 분리에 대한 이해
- entities -> features -> UI 계층에 대한 이해

- [ ] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [ ] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [ ] 계산함수는 순수함수로 작성이 되었나요?
- [ ] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [ ] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [ ] 계산함수는 순수함수로 작성이 되었나요?
- [ ] 특정 Entitiy만 다루는 함수는 분리되어 있나요?
- [ ] 특정 Entitiy만 다루는 Component와 UI를 다루는 Component는 분리되어 있나요?
- [ ] 데이터 흐름에 맞는 계층구조를 이루고 의존성이 맞게 작성이 되었나요?

### 심화과제

- 재사용 가능한 Custom UI 컴포넌트를 만들어 보기
- 재사용 가능한 Custom 라이브러리 Hook을 만들어 보기
- 재사용 가능한 Custom 유틸 함수를 만들어 보기
- 그래서 엔티티와는 어떤 다른 계층적 특징을 가지는지 이해하기

- [ ] UI 컴포넌트 계층과 엔티티 컴포넌트의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [ ] 엔티티 Hook과 라이브러리 훅과의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [ ] 엔티티 순수함수와 유틸리티 함수의 계층의 성격이 다르다는 것을 이해하고 적용했는가?

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?

### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?

### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)

## 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문

사실 업무를 하면서 리팩토링 하고 싶은 부분이 보이고 조금 더 시간을 두고 구조를 설계하고 싶지만
대부분의 업무가 개발자에게 그렇게 많은 시간을 주지는 않습니다.
그래서 사실 더 좋은 구조가 생각난다 하더라도 조금은 뒤로 미루며 기능개발을 할때가 많습니다. 그러다보니
더 좋은 구조에서 더 생각해보고 발전할 수 있는 방향을 모색하고 싶은 욕구가 있지만 포기하기도 하고 개발에 몰두하다보니 얼렁뚱땅 넘어가기도 하는데요.
이번 과제에서 그런 부분들이 어느 정도 해결된 것 같고 더 나아가서 제가 원했던 효율적인(제가 생각하기에) 구조 (OCP 와 전략패턴)에 대해서 공부해 볼수 있었습니다.

이번 발제 팀과제에서도 순수함수와 액션함수의 정의, 그리고 그것을 나누는 작업들을 했었는데요. 하면서 이걸 나누면 어떤 이득이 있는지 곰곰이 생각해봤습니다.
단위 테스트 용이성, 함수단일책임, 가독성, 확장성, 유지보수성 등의 이득을 갖고올수 있을거란 확신이 들었습니다.
사실 저는 업무를 하면서 함수단일책임을 한번도 크게 고려해보며 코드를 짠 적이 없습니다.
그렇다보니 테스트할때는 여러 변수들을 고려해야하며, 재사용성은 꿈도 꾸지 못했습니다. (컴포넌트에 여러 책임과 함수가 존재하는데 그게 재사용이 될리가요 ㅎ)
하지만 이번 과제를 하면서 배운것과 경험한 것을 토대로 실무에 점진적으로 적용할 수 있겠단 큰 자신감을 얻었습니다 ^^

제가 업무할때 코드 형식들이 정말 이번 5주차 과제의 /components/CartPage.tsx랑 비슷합니다. 
계산함수와 액션함수의 혼용, 분리되지 UI 컴포넌트. 이렇게 코드를 짜다보면 에러가 생겼을때 디버깅이 까다롭습니다.
1번 변수가 문제인지 2번 변수가 문제인지 둘다 확인해야 합니다 -> 유지보수성, 테스트 용이성
함수가 단일책임이 아니기 때문에 해당 함수에서 어떤 책임을 가지고 있는지 불분명하고, 확장성 또한 매우 낮습니다.

현재 수정한 CartPage.tsx는 대략 모습이 이렇습니다.

    const CartPage = () => {
        return (
            <ItemList addToCart={addToCart} cart={cart} products={products} />
            <CartList removeFromCart={removeFromCart} updateQuantity={updateQuantity} cart={cart} />
            <UsingCoupon coupons={coupons} selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />
            <OrderSummary totalBeforeDiscount={totalBeforeDiscount} totalAfterDiscount={totalAfterDiscount} totalDiscount={totalDiscount} />
        )
    }

어떻게 이렇게 만들었는지 한번 복기해보겠습니다.

CartPage를 기준으로 보면 cart 폴더와 coupon 폴더로만 나눴습니다 (처음 제 눈엔 그렇게 나눠야한다고 보였어요 크게 두개로만 보였습니다)
순수함수와 액션함수를 나눠야한다는 생각이 있었는데
hooks 폴더안에 hook 관련한 함수를 전부 넣었습니다. (데이터를 변경하는 액션 함수) hooks/useCart.ts에서 선언한 훅은 CartPage.tsx에서 한번만 호출하면 데이터 일관성을 유지하고
CartPage의 다른곳에서 쓰는 데이터는 props로 넘겨주었습니다.
utils 폴더와 entities에는 순수함수만 넣어서 외부변수의 영향을 받지 않는 함수들로만 정리했습니다.(특정 도메인에 속해있냐 전역적으로 쓸수있냐에 따라 나눔. 도메인에 속한 객체)
features 폴더는 검색해보니 다른 함수들끼리 합쳐진? 예를들어,,, 그래서 필요없다고 생각해서 안만들었습니다.
각 책임별로 나눠보니 다시한번 cart 폴더는 네가지 컴포넌트로 나눌수 있다는게 눈에 보이기 시작했습니다.
cart-list, item-list, order-summary, using-coupon 네 가지로 나눌 수 있고 네 가지를 들어가보면 전부 하나의 UI만 책임지고 있다는 것이 보입니다.

또 만약 item-list나 cart-list를 다른 곳에서 써야한다고 가정했을 떄 import CartList 후에 CartList에서 필요한 데이터만 불러와주면 됩니다. (질문1) AdminPage.tsx line17

useLocalStorage 훅 썼음. 수정은 복잡해서 저장/삭제 기능만 구현함.

OCP 활용을 위해 FieldValidator 개념 추가해봤습니다. OCP란 Open & Closed Principal 이라는 건데 
확장엔 오픈, 수정엔 닫혀있다는 뜻으로 수정할 땐 다 고치는게 아니라 딱 그 개념만 수정하고, 확장은 여러곳에서 가능한.

    const fieldValidator: Record<keyof Product, FieldValidator> = {
        price: (value) => typeof value === 'number' && value % 100 === 0,
        stock: (_) => true,
        name: (_) => true,
        discounts: (_) => true,
        id: (_) => true,
    }

    OCP를 충족하기 위해 전략패턴을 사용하고자 했습니다. 전략패턴이란 행동을 추상화하고 여러 구현을 교체/수정 가능하게끔 만드는 건데요.
    stock에 대한 전략을 현재는 true만 나오도록 되어있지만 언제든 '전략' 추상화와 교체가 가능합니다.

제가 직접 만든 fieldValidator를 예시로 보면 수정할때는 fieldValidator의 속성 하나만 추가/수정 해준다면 
handleAllEdit 함수의 수정없이 적용이 가능합니다.

    const handleAllEdit = (field: keyof Product, value: string | number) => {
        const validator = fieldValidator[field];
        if(!validator(value)) {
            alert(fieldErrorMessages[field]);
            return;
        }

이렇게 전략패턴을 사용하면 수정 / 추가가 매우 간단하다는 생각이 들었고 무엇보다도 테스트 용이성이 매우매우매우 올라갑니다.
이유는 수정이 필요한 부분이 딱 한 곳이기 때문에 다른 코드의 영향을 고려하지 않아도 되기 때문입니다. (다시 한번 크게 깨닫고 갑니다)
하지만 단점으로는 처음 OCP와 전략패턴의 맛을 본 저로썬 처음 설계할때 시간이 꽤 들것 같습니다 ㅎㅎ 그럼에도 불구하고 계쏙 시도해볼 생각입니다.

test code는 checkCurrency 유틸함수와 useLocalStorage 라이브러리훅에 대해서 작성했습니다.

질문 )



파일이름
컴포넌트면 PascalCase로
훅이면 useSomething.ts (camelCase) 로 일관되게 가는 게 핵심!

카멜식 - 낙타 등모양 ex) userLoginModal.tsx 변수나 함수

파스칼 - 카멜이랑 같지만 첫 글자도 대문자인것.  클래스명, 컴포넌트명에 주로 사용 ex) type UserProfile

케밥 - user-login-modal (폴더)

스네이크 - user_login_modal => 파이썬, DB에서 주로 사용 

폴더 이름
📌 이유: CLI 경로나 Git, 파일 경로 입력 시 대소문자 구분 없이 타이핑이 편함

📦 Next.js 등 프레임워크도 이 방식을 선호

hooks 폴더와 entities의 차이
hooks - 실제 데이터를 fetch 하거나 조작하는 행위
entities (순수함수) - 데이터 정의와 계산

hooks 는 entities를 참조할수 있지만 entities는 hooks 를 참조할 수 없다.