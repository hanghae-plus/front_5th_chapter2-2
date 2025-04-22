import { useState } from 'react';
import { CartPage } from './components/CartPage.tsx';
import { AdminPage } from './components/AdminPage.tsx';
import { useCoupons, useProducts } from './hooks';

// 7팀 컨벤션

// 1. 타입정의할때 타입이름 밑에 속성값들에 타입이름 중복 안되게 하기
// interface IUser {
// 	name: string; //userName 이렇게 쓰지 않기
// 	// ...
// }

// 페이지 User

// 컨테이너 UserContainer

// 뷰 UserView

// UseSection
// ```

// 2. 타입 정의시 `~Data` 금지
// 3. boolean 값을 가지는 변수는 `~ed` 로 명명 함수는 `is~` 로 명명
// const isActivate -> X
// const activated -> O
// const isActivate = () => true; -> O

// 1. 함수 파라미터 개수는 3개 이하
// 2. handler + 동사 + 명사 ex) handle + Add + User
// 3. 모든 이벤트 핸들러 함수는 `handle`로 시작

const App = () => {
  // 프로덕트
  const { products, updateProduct, addProduct } = useProducts();

  // 쿠폰
  const { coupons, addCoupon } = useCoupons();

  // 어드민 여부
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
            {isAdmin ? '장바구니 페이지로' : '관리자 페이지로'}
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
