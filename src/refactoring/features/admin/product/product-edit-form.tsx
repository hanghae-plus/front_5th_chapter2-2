import { Product } from "@refactoring/entities";
import { DiscountEditForm } from "@refactoring/features/admin/discount/discount-edit-form";
import { useEditProductAction } from "@refactoring/hooks/product/useEditProductAction";
import { useProductStore } from "@refactoring/store/product-store";
import { Button, FormInput } from "@refactoring/ui";

interface Props {
  editingProduct: Product;
  product: Product;
}

export const ProductEditForm = (props: Props) => {
  const { editingProduct, product } = props;

  const { handleEditComplete, handleProductNameUpdate, handlePriceUpdate } = useEditProductAction();
  const { handleStockUpdate } = useProductStore();

  return (
    <div>
      <FormInput
        wrapperClassName={"mb-4"}
        labelClassName={"block mb-1"}
        label={"상품명: "}
        type={"text"}
        value={editingProduct.name}
        onChange={(e) => handleProductNameUpdate(product.id, e.target.value)}
      />
      <FormInput
        wrapperClassName={"mb-4"}
        labelClassName={"block mb-1"}
        label={"가격: "}
        type={"number"}
        value={editingProduct.price}
        onChange={(e) => handlePriceUpdate(product.id, parseInt(e.target.value))}
      />
      <FormInput
        wrapperClassName={"mb-4"}
        labelClassName={"block mb-1"}
        label={"재고: "}
        type={"number"}
        value={editingProduct.stock}
        onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
      />
      {/* 할인 정보 수정 부분 */}
      <DiscountEditForm editingProduct={editingProduct} product={product} />
      <Button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </Button>
    </div>
  );
};
