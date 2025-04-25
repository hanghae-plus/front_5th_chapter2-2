import { useAdmin } from '../../../../hooks';

export function ProductAddForm() {
  const { newProduct, handleAddNewProduct, setNewProduct } = useAdmin();

  function handleChangeProductName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct({ ...newProduct, name: e.target.value });
  }

  function handleChangeProductPrice(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct({ ...newProduct, price: parseInt(e.target.value) });
  }

  function handleChangeProductStock(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct({ ...newProduct, stock: parseInt(e.target.value) });
  }

  function handleClickAddNewProduct() {
    handleAddNewProduct();
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>

      <div className="mb-2">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          상품명
        </label>

        <input
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={handleChangeProductName}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
          가격
        </label>

        <input
          id="productPrice"
          type="number"
          value={newProduct.price}
          onChange={handleChangeProductPrice}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
          재고
        </label>

        <input
          id="productStock"
          type="number"
          value={newProduct.stock}
          onChange={handleChangeProductStock}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleClickAddNewProduct}
      >
        추가
      </button>
    </div>
  );
}
