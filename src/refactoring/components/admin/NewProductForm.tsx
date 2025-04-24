import { Product } from "@/types";

interface Props {
  newProduct: Omit<Product, "id">;
  updateNewProduct: (field: keyof Omit<Product, "id">, value: any) => void;
  onAddProduct: () => void;
}

const NewProductForm = ({
  newProduct,
  updateNewProduct,
  onAddProduct,
}: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">새 상품 추가</h3>
      <div className="mb-2">
        <label htmlFor="productName" className="block mb-1">
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={(e) => updateNewProduct("name", e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="productPrice" className="block mb-1">
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          value={newProduct.price}
          onChange={(e) => updateNewProduct("price", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productStock" className="block mb-1">
          재고
        </label>
        <input
          id="productStock"
          type="number"
          value={newProduct.stock}
          onChange={(e) => updateNewProduct("stock", parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={onAddProduct}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        추가
      </button>
    </div>
  );
};

export default NewProductForm;
