import { Product } from "../../../../types.ts";
import { Button } from "../../ui/Button.tsx";
import { FormInput } from "../../ui/FormInput.tsx";
import { useProductForm } from "./hooks/useProductForm.ts";
import { generateIdentifier } from "../../../utils/generateIdentifier.ts";

type Props = {
  onProductAdd: (newProduct: Product) => void;
  onCancel: () => void;
};

export const ProductAddForm = ({ onProductAdd, onCancel }: Props) => {
  const {
    productValue,
    updateProductName,
    updateProductPrice,
    updateProductStock,
    resetProduct,
  } = useProductForm();

  const handleNameChange = (value: string | number) => {
    updateProductName(String(value));
  };

  const handlePriceChange = (value: string | number) => {
    updateProductPrice(Number(value));
  };

  const handleStockChange = (value: string | number) => {
    updateProductStock(Number(value));
  };

  const handleAddNewProduct = () => {
    onProductAdd({
      id: generateIdentifier(),
      ...productValue,
    });

    resetProduct();
    onCancel();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <FormInput
        id="productName"
        label="상품명"
        type="text"
        value={productValue.name}
        onChange={handleNameChange}
        required
      />
      <FormInput
        id="productPrice"
        label="가격"
        type="number"
        value={productValue.price}
        onChange={handlePriceChange}
        required
      />
      <FormInput
        id="productStock"
        label="재고"
        type="number"
        value={productValue.stock}
        onChange={handleStockChange}
        required
      />
      <Button onClick={handleAddNewProduct} variant="primary" fullWidth>
        추가
      </Button>
    </div>
  );
};
