import { useState } from "react";
import { Coupon, Product } from "../../../types.ts";
import { useProductsContext } from "../../hooks";
import { AdminProductList } from "./AdminProductList.tsx";
import { CouponManagement } from "./CouponManagement.tsx";
import { NewProductForm } from "./NewProductForm.tsx";

interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({ coupons, onCouponAdd }: Props) => {
  const { addProduct: onProductAdd } = useProductsContext();
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>
          {showNewProductForm && (
            <NewProductForm
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddNewProduct={handleAddNewProduct}
            />
          )}
          <AdminProductList />
        </div>
        <CouponManagement
          coupons={coupons}
          newCoupon={newCoupon}
          setNewCoupon={setNewCoupon}
          handleAddCoupon={handleAddCoupon}
        />
      </div>
    </div>
  );
};
