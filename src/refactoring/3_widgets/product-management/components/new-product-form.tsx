import { NewProductFormProps } from "../types";
import { useProductForm } from "../hooks/use-product-form";

export const NewProductForm = ({ onSubmit }: NewProductFormProps) => {
  const { formData, handleNameChange, handlePriceChange, handleStockChange } =
    useProductForm();

  const handleSubmitClick = () => onSubmit(formData);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          상품명
        </label>
        <input
          data-testid="product-name-input"
          id="productName"
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productPrice"
          className="block text-sm font-medium text-gray-700"
        >
          가격
        </label>
        <input
          data-testid="product-price-input"
          id="productPrice"
          type="number"
          value={formData.price}
          onChange={handlePriceChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productStock"
          className="block text-sm font-medium text-gray-700"
        >
          재고
        </label>
        <input
          data-testid="product-stock-input"
          id="productStock"
          type="number"
          value={formData.stock}
          onChange={handleStockChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSubmitClick}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
