import CouponManagement from "./admin/product/CouponManagement.tsx"
import ProductManagement from "./admin/product/ProductManagement.tsx"

export const AdminPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상품 관리 영역 */}
        <ProductManagement />
        {/* 쿠폰 관리 영역 */}
        <CouponManagement />
      </div>
    </div>
  )
}
