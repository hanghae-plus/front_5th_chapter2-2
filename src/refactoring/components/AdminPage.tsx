import { useState } from "react";
import { Coupon, Product } from "../../types.ts";
import NewProductForm from "./admin/NewProductForm.tsx";
import CouponList from "./admin/CouponList.tsx";
import NewCouponForm from "./admin/NewCouponForm.tsx";
import ProductItem from "./admin/ProductItem.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={() => setShowNewProductForm((prev) => !prev)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>

          {/* 상품 추가 폼 */}
          {showNewProductForm && (
            <NewProductForm onAddProduct={(product) => onProductAdd(product)} />
          )}

          <div className="space-y-2">
            {products.map((product, index) => (
              <ProductItem
                key={product.id}
                product={product}
                testId={`product-${index + 1}`}
                onProductUpdate={(updatedProduct) =>
                  onProductUpdate(updatedProduct)
                }
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <NewCouponForm onCouponAdd={onCouponAdd} />
            <CouponList coupons={coupons}></CouponList>
          </div>
        </div>
      </div>
    </div>
  );
};
