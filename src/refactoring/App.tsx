import { useState } from "react"
import { CartPage } from "./components/CartPage.tsx"
import { AdminPage } from "./components/AdminPage.tsx"
import Header from "./components/ui/Header.tsx"
import { ProductProvider } from "./context/ProductContext.tsx"
import { CouponProvider } from "./context/CouponContext.tsx"
import { initialProducts } from "./constants/products.ts"
import { initialCoupons } from "./constants/coupons.ts"

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <ProductProvider initialProducts={initialProducts}>
      <CouponProvider initialCoupons={initialCoupons}>
        <div className="min-h-screen bg-gray-100">
          <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          <main className="container mx-auto mt-6">{isAdmin ? <AdminPage /> : <CartPage />}</main>
        </div>
      </CouponProvider>
    </ProductProvider>
  )
}

export default App
