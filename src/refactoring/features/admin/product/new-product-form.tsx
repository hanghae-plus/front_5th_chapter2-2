import { useProductStore } from "../../../store/product-store";
import { Button } from "../../../ui/button";
import { FormInput } from "../../../ui/form-input";

export const NewProductForm = () => {
  const { newProduct, updateNewProduct, handleAddNewProduct } = useProductStore();

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <FormInput
        wrapperClassName={"mb-2"}
        labelClassName={"block text-sm font-medium text-gray-700"}
        id={"productName"}
        label={"상품명"}
        type={"text"}
        value={newProduct.name}
        onChange={(e) => updateNewProduct({ ...newProduct, name: e.target.value })}
      />
      <FormInput
        wrapperClassName={"mb-2"}
        labelClassName={"block text-sm font-medium text-gray-700"}
        id={"productPrice"}
        label={"가격"}
        type={"number"}
        value={newProduct.price}
        onChange={(e) => updateNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
      />
      <FormInput
        wrapperClassName={"mb-2"}
        labelClassName={"block text-sm font-medium text-gray-700"}
        id={"productStock"}
        label={"재고"}
        type={"number"}
        value={newProduct.stock}
        onChange={(e) => updateNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
      />

      <Button
        onClick={handleAddNewProduct}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </Button>
    </div>
  );
};
