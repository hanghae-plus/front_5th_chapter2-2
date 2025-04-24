import { CreateProductFormInput } from "./CreateProductFormInput";
import { Button } from "../../common";
import { useProductManagement } from "../../../contexts/ProductManagementContext";

export const CreateProductForm = () => {
  const { showNewProductForm, newProduct, setNewProduct, handleAddNewProduct } =
    useProductManagement();

  if (!showNewProductForm) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <CreateProductFormInput
        id="productName"
        label="상품명"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <CreateProductFormInput
        id="productPrice"
        label="가격"
        type="number"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: Number(e.target.value) })
        }
      />
      <CreateProductFormInput
        id="productStock"
        label="재고"
        type="number"
        value={newProduct.stock}
        onChange={(e) =>
          setNewProduct({ ...newProduct, stock: Number(e.target.value) })
        }
      />
      <Button
        color="blue"
        width="full"
        className="p-2"
        onClick={handleAddNewProduct}
      >
        추가
      </Button>
    </div>
  );
};
