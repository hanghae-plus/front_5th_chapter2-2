import { Product } from "../../../../types.ts";
import { useProductEdit } from "../../../hooks/useProductEdit";
import { formatDiscountInfo } from "../../../models/product.ts";
import ProductEditForm from "./ProductEditForm.tsx";

interface Props {
  product: Product;
  index: number;
  isOpen: boolean;
  toggleProductAccordion: (productId: string) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}

const ProductItem = ({
  product,
  index,
  isOpen,
  toggleProductAccordion,
  onProductUpdate,
}: Props) => {
  const {
    editingProduct,
    handleEditProduct,
    handleCancelEdit,
    handleUpdateEditingField,
  } = useProductEdit();

  const handleSaveProduct = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      handleCancelEdit();
    }
  };

  const isEditing = editingProduct !== null && editingProduct.id === product.id;

  return (
    <div
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

      {isOpen && (
        <div className="mt-2">
          {isEditing ? (
            <ProductEditForm
              editingProduct={editingProduct}
              handleUpdateEditingField={handleUpdateEditingField}
              onCancelEdit={handleCancelEdit}
              onSaveProduct={handleSaveProduct}
            />
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>{formatDiscountInfo(discount)}</span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductItem;
