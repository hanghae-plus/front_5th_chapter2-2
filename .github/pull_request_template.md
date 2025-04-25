## 과제의 핵심취지

- React의 hook 이해하기
- 함수형 프로그래밍에 대한 이해
- 액션과 순수함수의 분리

## 과제에서 꼭 알아가길 바라는 점

- 엔티티를 다루는 상태와 그렇지 않은 상태 - cart, isCartFull vs isShowPopup
- 엔티티를 다루는 컴포넌트와 훅 - CartItemView, useCart(), useProduct()
- 엔티티를 다루지 않는 컴포넌트와 훅 - Button, useRoute, useEvent 등
- 엔티티를 다루는 함수와 그렇지 않은 함수 - calculateCartTotal(cart) vs capaitalize(str)

이번 과제에 대한 최대 아쉬움은 시간 부족이었습니다. 시간이 부족하지 않을 거라고 생각했는데 너무나 부족했어요~!

항상 과제를 진행하면서 느끼는 것은 요구사항 및 발제의 의도를 정확히 파악하고 이해해야한다는 점입니다. 🤔 이런 말을 하는 이유는 과제에서 꼭 알아가길 바라는 점을 보면서 나는 어떤 방향으로 이 과제를 풀었는가에 대한 생각이 들었습니다. 과제에서 꼭 알아가기 바라는 점에 `entity`가  주제였던 거 같아요. 사실 저는 발제를 진행하면서는 `entity`에 초점을 맞추기보다는 `순수함수`와 `액션`을 구분하는 것에 더 많은 초점을 두었습니다. **이런 바보 같은** 😂 그래서 오늘도 생각합니다.. 잘 읽는 연습을 하자..!!

### 발제에서의 엔티티
발제에서의 `entity` 는 `product` , `cart`, `coupon` 정도가 있을 거 같습니다. 이것들을 어떻게 리팩토링하고 분류할 수 있을까! 코드를 그냥 보기만 하는 것으로는 `App.tsx`, `Cartpage.tsx`, `Productpage.tsx` 구분이 어려웠습니다. 그래서 이번에 `excalidraw`라는 툴을 사용해서 우선적으로 어떤 함수가 어디서 사용되는 지 구분 하려고 했습니다.

### Original Component 파해치기
**App Component**
![App Component](/.github/assets/app.png)

**Admin Compont**
![Admin Component](/.github/assets/admin.png)

**Cart.png**

![Cart Component](/.github/assets/Cart.png)

이 안에 사용된 함수들을 정의하고 정리해보자는게 저의 생각이었습니다. 그래서 구분을 아래처럼 했습니다.
- <span style="color: #4CAF50">State 관련 로직</span>
- <span style="color: #2196F3">Action 함수</span>
- <span style="color: #F44336">순수 함수</span>

이렇게 함수를 나눠보고 이런 함수를 기반으로 적절하게 hook을 나누는 것을 목표로 했습니다. 하나당 하나의 훅이 있으면 좋겠지만 현실적으로 어려움이 있던거 같습니다.

* `productListItem` => <span style="color: #4CAF50">product,</span> <span style="color: #2196F3">addToCart,</span>
<span style="color: #F44336">getRemainingStock,
getMaxDiscount</span>
* `CartItemList` =>  <span style="color: #4CAF50">cart,</span> <span style="color: #2196F3">
updateQuantity , removeFromCart,</span>
<span style="color: #F44336">getApplyDiscount</span>
* `CouponApplySection` =<span style="color: #4CAF50">coupons ,selectedCoupon</span> <span style="color: #2196F3">applyCoupon</span>

* `OrderSummary` =><span style="color: #F44336">calculateTotal</span>

* `ProductAddForm` =><span style="color: #4CAF50">newProduct,</span> <span style="color: #2196F3">handleAddNewProduct,</span>

* `ProductManageList` =><span style="color: #4CAF50">product,</span> <span style="color: #2196F3">
  isOpen,
  isEditing,
  onToggle,
  onEditClick,,</span>
* `ProductEditForm` =><span style="color: #4CAF50">editingProduct
newDiscount</span> <span style="color: #2196F3">
  setNewDiscount,
  handleAddDiscount,
  editingProduct,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
  handleRemoveDiscount,
  handleEditComplete,</span>
* `CouponAddForm` =><span style="color: #4CAF50">newCoupon,</span> <span style="color: #2196F3">
setNewCoupon, 
handleAddCoupon</span>
* `CouponList` =><span style="color: #4CAF50">coupons</span>
* `ProductDiscountManage` => <span style="color: #4CAF50">editingProduct
newDiscount,</span> <span style="color: #2196F3">
  handleRemoveDiscount,
  newDiscount,
  setNewDiscount,
  handleAddDiscount,</span>

이렇게 분리하고 보니 명확하게 보이는 것이 있습니다. 바로 <span style="color:#F44336">계산함수</span>라고 했던 것이 `cart`에만 모여있는 것을 확인할 수 있습니다. 이게 조금 신기하더라구요! 아니면 제가 계산 함수를 잘못 분리했을 수도 있겠다 싶었습니다. 이렇게 분리가 된다는 말인가?



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
액션함수와 순수함수의 분리에 신경 썼습니다. 그렇게 분리가 이루어지고 나면 utils나 model 디렉토리 내부에서 사용하는 함수로 분리할 수 있을 거 같았습니다. ㅠ 하지만 거기 까지 가지는 못했습니다. 혼자서 계속 좀 더 진행해보려구요 (주말동안만!)

### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?
음.. 너무 많은 고민을 한거 같아요. props drilling 문제도 해결하고 싶었고, 뭔가 멋지게 깔끔하게 나누고 싶었는데 모든 인생사가 명확하게 구분이 되지 않듯이, 이번 과제도 그랬습니다. `product`가 `cart`에서 사용된다던지, `coupon`이 `product`와 `cart`에서 사용된다 던지. 그래서 `hook`을 만들었지만 아니.. 이게 맞아? 라는 생각이 많이 들었어요. `hook` 을 깔끔하게 유지하고 싶지만 그렇지 못한 모습.. 다음에는 깔끔한 모양보다는 이해되는 코드, 읽히는 코드에 좀더 집중해보겠습니다. 나를 이해 시키려고해서 남들이 이해하기 좋은 코드를 놓친거 같은 느낌입니다. 성호 코치님이 의존성은 한방향으로 흐르는게 좋다는 말을 듣고 머리에 전기가 찌릿했지만, 저에게는 시간이 너무나 부족했습니다. ㅠ 그게 아쉬워요 !! 

### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)

## 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문
1. 코드 분리를 진행하는 과정에서 해당 entity와 결합해야 해서 코드의 복잡성이 올라가게 된다면 어떻게 처리하는게 좋을까요?
2. 코드 분리하는 과정을 잘 표현하고 싶어서 분리 되어가는 코드들도 남겨두었는데, 제가 맡게 분리한것인지 궁금합니다.! 그리고 Hook을 하나의 책임만 갖게 하고 싶어서 여러개로 분리했는데, 이 하나의 책임이라는 범위는 개발자가 설정하는 것인가요? 예를들면 `useCart`는 카트에 대한 책임을 가지는데 예를들면 카트 안에 담긴 상품을 추가한다거나 수정한다거나 하는 부분들에 대한 책임을 분리하는게 더 좋을까요?
3. 제 코드를 보면 직접적으로 setState를 넘기는 경우가 있는데요. 이렇게 직접적으로 state를 조절할 수 있게 props로 전달하는 방식이 좋은방식일까요? 아니면 함수를 만들어서 함수를 넘기는게 더 좋은 방식일까요? 함수를 만들어서 전달하면 내가 원하는 행동만 강제하는 느낌이라 안정성이 좀 더 증가할 거 같다는 생각이 드는데 코치님은 어떠실지 궁금합니다.
4. utill로 어떤것을 분리해야할지 모르겠습니다. 보통 날짜 변환이나, validate처리 같은 것이 있을 수 있을거같은데, 보통 Utill은 어떤 기준을 가지고 분리할까요? 계산과는 다른 거 같고, 프로젝트에 종속되지 않는 기능을 하는 파일들일까요?
