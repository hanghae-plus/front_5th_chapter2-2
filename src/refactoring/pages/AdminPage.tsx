import { Coupon, Product } from "../../types.ts";
import { ProductAddForm } from "../components/product/ProductAddForm.tsx";
import { CouponAddForm } from "../components/coupon/CouponAddForm.tsx";
import { CouponList } from "../components/coupon/CouponList.tsx";
import { ProductManageList } from "../components/product/ProductManageList.tsx";
import { ProductEditForm } from "../components/product/ProductEditForm.tsx";
import { useAccordian } from "../hooks/useAccordian.ts";
import { useProductEdit } from "../hooks/useProductEdit.ts";
import { useDiscount } from "../hooks/useDiscount.ts";
import { useNewProduct } from "../hooks/useNewProduct.ts";
import { useCouponForm } from "../hooks/useCouponForm.ts";

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
  const { openProductIds, toggleProductAccordion } = useAccordian();
  const {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
  } = useProductEdit({ products, onProductUpdate });
  const {
    showNewProductForm,
    setShowNewProductForm,
    newProduct,
    setNewProduct,
    handleAddNewProduct,
  } = useNewProduct({ onProductAdd });

  const {
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  } = useDiscount({
    products,
    editingProduct,
    onProductUpdate,
    setEditingProduct,
  });

  const { newCoupon, setNewCoupon, handleAddCoupon } = useCouponForm({
    onCouponAdd,
  });

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
            <ProductAddForm
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddNewProduct={handleAddNewProduct}
            />
          )}
          <div className="space-y-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-testid={`product-${index + 1}`}
                className="bg-white p-4 rounded shadow"
              >
                {/* 상품 정보 표시 컴포넌트 */}
                <ProductManageList
                  product={product}
                  isOpen={openProductIds.has(product.id)}
                  isEditing={editingProduct?.id === product.id}
                  onToggle={toggleProductAccordion}
                  onEditClick={handleEditProduct}
                />

                {/* 수정 폼 컴포넌트 */}
                {openProductIds.has(product.id) &&
                  editingProduct?.id === product.id && (
                    <ProductEditForm
                      editingProduct={editingProduct}
                      newDiscount={newDiscount}
                      handleProductNameUpdate={handleProductNameUpdate}
                      handlePriceUpdate={handlePriceUpdate}
                      handleStockUpdate={handleStockUpdate}
                      handleAddDiscount={handleAddDiscount}
                      handleRemoveDiscount={handleRemoveDiscount}
                      setNewDiscount={setNewDiscount}
                      handleEditComplete={handleEditComplete}
                    />
                  )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <CouponAddForm
              newCoupon={newCoupon}
              setNewCoupon={setNewCoupon}
              handleAddCoupon={handleAddCoupon}
            />
            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};
