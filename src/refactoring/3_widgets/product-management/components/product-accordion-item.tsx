import { useProductAccordion, useProductEditor } from "../hooks";
import { ProductAccordionItemProps } from "../types";
import { ProductEditForm } from "./product-edit-form";

export const ProductAccordionItem: React.FC<ProductAccordionItemProps> = ({
  product,
  index,
  updateProduct,
}) => {
  const { isOpen, toggleAccordion } = useProductAccordion();
  const editor = useProductEditor(product, updateProduct);

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={toggleAccordion}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {isOpen && (
        <div className="mt-2">
          {/* 수정 모드 */}
          {editor.isEditing && (
            <ProductEditForm
              product={editor.editingProduct}
              onFieldChange={editor.handleProductChange}
              addDiscount={editor.handleAddDiscountClick}
              removeDiscount={editor.handleRemoveDiscountClick}
              onSaveClick={editor.handleSaveClick}
            />
          )}
          {/* 읽기 모드 */}
          {!editor.isEditing && (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={editor.handleEditClick}
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
