import { useState } from "react"
import { Coupon, Discount, Product } from "../../types.ts"
import ProductList from "./admin/product/ProductList.tsx"
import NewProductForm from "./admin/product/NewProductForm.tsx"
import CouponForm from "./admin/coupon/CouponForm.tsx"
import CouponList from "./admin/coupon/CouponList.tsx"

interface Props {
  products: Product[]
  coupons: Coupon[]
  onProductUpdate: (updatedProduct: Product) => void
  onProductAdd: (newProduct: Product) => void
  onCouponAdd: (newCoupon: Coupon) => void
}

export const AdminPage = ({ products, coupons, onProductUpdate, onProductAdd, onCouponAdd }: Props) => {
  /** 상품 등록 폼 노출 유무 */
  const [showNewProductForm, setShowNewProductForm] = useState(false)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 관리 영역 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {/* 상품 등록 폼 */}
          {showNewProductForm && (
            <NewProductForm onProductAdd={onProductAdd} setShowNewProductForm={setShowNewProductForm} />
          )}
          {/* 상품 목록 */}
          <ProductList products={products} onProductUpdate={onProductUpdate} />
        </div>
        {/* 쿠폰 관리 영역 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            {/* 쿠폰 등록 폼 */}
            <CouponForm onCouponAdd={onCouponAdd} />

            {/* 쿠폰 목록 */}
            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  )
}
