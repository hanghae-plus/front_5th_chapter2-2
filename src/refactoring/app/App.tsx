import { useState } from "react";

import { AdminPage, CartPage } from "@/refactoring/pages";

import { initialCoupons } from "@r/mock/initial-coupons";
import { initialProducts } from "@r/mock/initial-products";

import { ProductProvider } from "@r/model/product/product-context";
import { CouponProvider } from "@r/model/coupon/coupon-context";
import { CartProvider } from "@r/model/cart/cart-context";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <ProductProvider initialProducts={initialProducts}>
      <CouponProvider initialCoupons={initialCoupons}>
        <CartProvider>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
                <button
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
                >
                  {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
                </button>
              </div>
            </nav>
            <main className="container mx-auto mt-6">
              {isAdmin ? <AdminPage /> : <CartPage />}
            </main>
          </div>
        </CartProvider>
      </CouponProvider>
    </ProductProvider>
  );
};

export default App;
