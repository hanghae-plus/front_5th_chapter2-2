import { useState } from "react";
import { Coupon, Product } from "../../types.ts";
import {
  useCouponManager,
  useDiscountManager,
  useNewProductManager,
  useProductEditor,
} from "../components/Admin/hooks/index.ts";
import { formatCouponDisplay } from "../models/cart.ts";
import CouponManage from "../components/Admin/ui/CouponManage.tsx";
import NewProductForm from "../components/Admin/ui/NewProductForm.tsx";
import ModifyProduct from "../components/Admin/ui/ModifyProduct.tsx";

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
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductFieldUpdate,
    handleEditComplete,
  } = useProductEditor(onProductUpdate);

  const { newCoupon, handleCouponChange, handleAddCoupon } =
    useCouponManager(onCouponAdd);

  const {
    newDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
    handleDiscountChange,
  } = useDiscountManager(onProductUpdate);

  const {
    showNewProductForm,
    newProduct,
    handleProductFieldChange,
    handleAddNewProduct,
    toggleNewProductForm,
  } = useNewProductManager(onProductAdd);

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={toggleNewProductForm}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </button>

          {showNewProductForm && (
            <NewProductForm
              newProduct={newProduct}
              onFieldChange={handleProductFieldChange}
              onAddProduct={handleAddNewProduct}
            />
          )}

          <div data-testid={"product-list"} className="space-y-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-testid={`product-${index + 1}`}
                className="bg-white p-4 rounded shadow"
              >
                <button
                  data-testid="toggle-button"
                  onClick={() => toggleProductAccordion(product.id)}
                  className="w-full text-left font-semibold"
                >
                  {product.name} - {product.price}원 (재고: {product.stock})
                </button>
                {openProductIds.has(product.id) && (
                  <ModifyProduct
                    product={product}
                    editingProduct={editingProduct}
                    handleEditProduct={handleEditProduct}
                    handleProductFieldUpdate={handleProductFieldUpdate}
                    handleEditComplete={handleEditComplete}
                    newDiscount={newDiscount}
                    handleRemoveDiscount={handleRemoveDiscount}
                    handleDiscountChange={handleDiscountChange}
                    handleAddDiscount={handleAddDiscount}
                    setEditingProduct={setEditingProduct}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <CouponManage
          newCoupon={newCoupon}
          handleCouponChange={handleCouponChange}
          handleAddCoupon={handleAddCoupon}
          coupons={coupons}
          formatCouponDisplay={formatCouponDisplay}
        />
      </div>
    </div>
  );
};
