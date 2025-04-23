import { Product } from '../../../types';

interface NewProductFormProps {
  newProduct: Omit<Product, 'id'>;
  onNewProductChange: (product: Omit<Product, 'id'>) => void;
  onAddNewProduct: () => void;
}

export const NewProductForm = ({ 
  newProduct, 
  onNewProductChange, 
  onAddNewProduct 
}: NewProductFormProps) => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
    <ProductInput
      newProduct={newProduct}
      onNewProductChange={onNewProductChange}
    />
    <button
      onClick={onAddNewProduct}
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
      추가
    </button>
  </div>
);

interface ProductInputProps {
  newProduct: Omit<Product, 'id'>;
  onNewProductChange: (product: Omit<Product, 'id'>) => void;
}

const ProductInput = ({ newProduct, onNewProductChange }: ProductInputProps) => (
  <>
    <div className="mb-2">
      <label htmlFor="productName" className="block text-sm font-medium text-gray-700">상품명</label>
      <input
        id="productName"
        type="text"
        value={newProduct.name}
        onChange={(e) => onNewProductChange({ ...newProduct, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">가격</label>
      <input
        id="productPrice"
        type="number"
        value={newProduct.price}
        onChange={(e) => onNewProductChange({ ...newProduct, price: parseInt(e.target.value) })}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">재고</label>
      <input
        id="productStock"
        type="number"
        value={newProduct.stock}
        onChange={(e) => onNewProductChange({ ...newProduct, stock: parseInt(e.target.value) })}
        className="w-full p-2 border rounded"
      />
    </div>
  </>
); 