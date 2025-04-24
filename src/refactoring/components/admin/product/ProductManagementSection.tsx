// components/admin/product/ProductManagementSection.tsx
import { Product } from "../../../../types";
import { SectionLayout, Button } from "../../common";
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
      <Button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        color="green"
        className="px-4 py-2 mb-4"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </Button>
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
