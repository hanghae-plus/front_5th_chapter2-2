import { Coupon, Product } from "../../types.ts";
import { TitleMenu } from "../components/Common/TitleMenu.tsx";
import { Button } from "../components/Common/Button.tsx";
import {
  AdminItem,
  ManageCouponForm,
  NewProductForm,
} from "../components/Admin";
import { useProductManager } from "../hooks";
import { validateProductFields } from "../utils/validation.ts";
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
  const {
    openProductIds,
    editingProduct,
    newDiscount,
    newCoupon,
    showNewProductForm,
    newProduct,
    setEditingProduct,
    setNewDiscount,
    setNewCoupon,
    setShowNewProductForm,
    toggleProductAccordion,
    setNewProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
  } = useProductManager();

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      if (validateProductFields(editingProduct)) {
        alert("상품의 모든 칸을 입력해주세요");
      }
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

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
      <TitleMenu menu={"admin"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <Button
            onClick={() => setShowNewProductForm(!showNewProductForm)}
            variant="success"
            className="px-4 py-2 mb-4"
          >
            {showNewProductForm ? "취소" : "새 상품 추가"}
          </Button>
          {showNewProductForm && (
            <NewProductForm
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              onSubmit={handleAddNewProduct}
            />
          )}
          <div className="space-y-2">
            {products.map((product, index) => (
              <AdminItem
                key={index}
                product={product}
                index={index}
                isOpen={openProductIds.has(product.id)}
                editingProduct={editingProduct}
                newDiscount={newDiscount}
                toggleProductAccordion={toggleProductAccordion}
                handleEditProduct={handleEditProduct}
                handleEditComplete={handleEditComplete}
                handleProductNameUpdate={handleProductNameUpdate}
                handlePriceUpdate={handlePriceUpdate}
                handleStockUpdate={handleStockUpdate}
                handleRemoveDiscount={handleRemoveDiscount}
                handleAddDiscount={handleAddDiscount}
                setNewDiscount={setNewDiscount}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <ManageCouponForm
            newCoupon={newCoupon}
            setNewCoupon={setNewCoupon}
            handleAddCoupon={handleAddCoupon}
            coupons={coupons}
          />
        </div>
      </div>
    </div>
  );
};
