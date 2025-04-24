// components/admin/product/ProductManagementSection.tsx
import { Product } from "../../../../types";
import { SectionLayout } from "../../common";
import { useProductManagement } from "../../../hooks";
import { CreateProductForm } from "./CreateProductForm";
import { ProductManagementItem } from "./ProductManagementItem";

interface ProductManagementSectionProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManagementSection = ({
  products,
  onProductUpdate,
  onProductAdd,
}: ProductManagementSectionProps) => {
  const { accordion, productEdit, discount, productCreate } =
    useProductManagement({ onProductUpdate, onProductAdd });

  const {
    showNewProductForm,
    setShowNewProductForm,
    newProduct,
    setNewProduct,
    handleAddNewProduct,
  } = productCreate;

  return (
    <SectionLayout title="상품 관리">
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      <CreateProductForm
        formData={newProduct}
        setFormData={setNewProduct}
        handleSubmit={handleAddNewProduct}
        showNewProductForm={showNewProductForm}
      />
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductManagementItem
            key={product.id}
            product={product}
            index={index}
            isOpen={accordion.isOpen}
            toggle={accordion.toggle}
            editingProduct={productEdit.editingProduct}
            handleFieldUpdate={productEdit.handleFieldUpdate}
            handleDiscountRemove={discount.handleDiscountRemove}
            handleDiscountAdd={discount.handleDiscountAdd}
            newDiscount={discount.newDiscount}
            setNewDiscount={discount.setNewDiscount}
            handleEditComplete={productEdit.handleEditComplete}
            handleEditProduct={productEdit.handleEditProduct}
          />
        ))}
      </div>
    </SectionLayout>
  );
};
