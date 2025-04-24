import { Coupon, Product } from "../../types.ts";
import { CartDetail } from "../components/CartDetail.tsx";
import { ItemList } from "../components/ItemList.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

// 액션 - 계산 분리하기..

// 책에서는 액션에서 계산을 빼내는 작업은 암묵적인 입력과 암묵적인 출력을 명시적인 입력과 명시적인 출력으로 바꾸는 데 있다고 말합니다.

// > **암묵적 입력**
// > 암묵적인 입력은 함수인자가 아닌 형태로 사용되는 데이터나 함수내부에서 선언한 데이터 등을 의미합니다.

// > **암묵적 출력**
// > 암묵적인 출력은 함수의 반환값이 아닌 외부세상에 변화를 주는 것(DOM, console, 전역변수에 대입)을 의미합니다.

// > **명시적인 입력과 출력**
// > 명시적인 입력이란 함수의 인자를 의미하고 명시적인 출력이란 함수의 반환값을 의미합니다

// ### 액션에서 계산 빼내기 리팩토링 방법

// 1주차에서 느꼈을 **함수를 테스트를 쉽게 하기 위해서는 함수가 반드시 반환값을 가져야 하며, 함수 내에서 사용되는 모든 데이터를 외부에서 주입이 가능해야 한다**는 것을 느꼈을거에요.

// 그래서 이러한 **암묵적인 입/출력들을 "함수인자와 반환값인 명시적인 입출력으로 바꾸는 것"** 이 액션에서 계산을 빼내는 방법입니다.

// 그래서 우리는 다음과 같은 전략을 취해볼 수 있었습니다.

// 1. 액션에 암묵적인 출력의 개수에 따라 계산 함수로 빼낸다.해당 값이 관련된 코드 조각을 모아 함수의 형태로 만든다.
// 2. 계산함수에 반환값이 없다면 반환값을 만든다. (대개 마지막에 쓰이고 있는 변수)
// 3. 함수내에서 사용되고 있는 모든 데이터를 함수의 인자에서 받을 수 있도록 리팩토링 한다.
// 4. 외부세상에 영향을 주고 있지 않도록 필요하다면 카피온라이트나 방어적복사를 적용한다.

export const CartPage = ({ products, coupons }: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ItemList products={products} />
        <CartDetail coupons={coupons} />
      </div>
    </div>
  );
};
