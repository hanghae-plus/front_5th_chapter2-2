import { AdminPage } from "../AdminPage.tsx";
import { CartPage } from "../CartPage.tsx";
import { useCoupons, useProducts } from "../../hooks";
import { initialProducts } from "../../constants/initialProducts.ts";
import { initialCoupons } from "../../constants/initialCoupons.ts";
import { useAdmin } from "../../context/adminContext.tsx";

export default function Body() {
  const { isAdmin } = useAdmin();
  const { products, addProduct, updateProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  return (
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
  );
}
