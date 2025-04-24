import { Discount, Product } from "../../../../types.ts";
import { FormInput } from "../../ui/FormInput.tsx";
import { useState } from "react";
import { useProductForm } from "./hooks/useProductForm";
import { DiscountEditForm } from "./DiscountEditForm.tsx";

type Props = {
  initialProduct: Product;
  onEditComplete: (updatedProduct: Product) => void;
};

export const ProductEditForm = ({ initialProduct, onEditComplete }: Props) => {
  const {
    productValue,
    updateProductName,
    updateProductPrice,
    updateProductStock,
  } = useProductForm(initialProduct);

  const [discounts, setDiscounts] = useState<Discount[]>([
    ...initialProduct.discounts,
  ]);

  const handleNameChange = (value: string | number) => {
    updateProductName(String(value));
  };

  const handlePriceChange = (value: string | number) => {
    updateProductPrice(Number(value));
  };

  const handleStockChange = (value: string | number) => {
    updateProductStock(Number(value));
  };

  const handleSave = () => {
    onEditComplete({
      ...initialProduct,
      name: productValue.name,
      price: productValue.price,
      stock: productValue.stock,
      discounts: discounts,
    });
  };

  return (
    <div>
      <div className="mb-4">
        <FormInput
          label="상품명: "
          labelClassName="block mb-1"
          type="text"
          value={productValue.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-4">
        <FormInput
          label="가격: "
          labelClassName="block mb-1"
          type="number"
          value={productValue.price}
          onChange={handlePriceChange}
        />
      </div>
      <div className="mb-4">
        <FormInput
          label="재고: "
          labelClassName="block mb-1"
          type="number"
          value={productValue.stock}
          onChange={handleStockChange}
        />
      </div>
      <DiscountEditForm
        initialDiscounts={discounts}
        onDiscountsChange={setDiscounts}
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};
