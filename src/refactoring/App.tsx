import { Coupon, Product } from "../types.ts";
import { ProductProvider, CouponProvider, AuthProvider } from "./contexts";
import { CartPage, AdminPage } from "./pages";

import { Navigation, Content } from "./components";

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

const initialCoupons: Coupon[] = [
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

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider products={initialProducts}>
        <CouponProvider coupons={initialCoupons}>
          <div className="min-h-screen bg-gray-100">
            <Navigation />
            <Content />
          </div>
        </CouponProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
