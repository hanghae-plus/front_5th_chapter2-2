import { Discount, Product } from '../../../types.ts';
import { PRODUCT_FORM_FIELDS } from '../../constatns/productFormFields.ts';

interface ProductManageProps {
  products: Product[];
  openProductIds: Set<string>;
  editingProduct: Product | null;
  newDiscount: Discount;
  newProduct: Omit<Product, 'id'>;
  showNewProductForm: boolean;
  toggleProductAccordion: (productId: string) => void;
  handleEditProduct: (product: Product) => void;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
  handleAddDiscount: (productId: string, discount: Discount) => void;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleEditComplete: () => void;
  handleAddNewProduct: () => void;
  setShowNewProductForm: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProduct: React.Dispatch<React.SetStateAction<Omit<Product, 'id'>>>;
  setNewDiscount: React.Dispatch<React.SetStateAction<Discount>>;
}

import { Input, Button } from '../../ui';
export const ProductManage = ({
  products,
  openProductIds,
  editingProduct,
  newDiscount,
  newProduct,
  showNewProductForm,
  toggleProductAccordion,
  handleEditProduct,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
  handleAddDiscount,
  handleRemoveDiscount,
  handleEditComplete,
  handleAddNewProduct,
  setShowNewProductForm,
  setNewProduct,
  setNewDiscount,
}: ProductManageProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {showNewProductForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          {PRODUCT_FORM_FIELDS.map((field) => {
            const key = field.key as keyof typeof newProduct;
            return (
              <div key={field.id} className="mb-2">
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={newProduct[key] as string | number}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      [key]: field.type === 'number' ? parseInt(e.target.value) : e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            );
          })}
          <Button onClick={handleAddNewProduct} role="add">
            추가
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {products.map((product, index) => (
          <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
            <Button data-testid="toggle-button" onClick={() => toggleProductAccordion(product.id)} role="toggle">
              {product.name} - {product.price}원 (재고: {product.stock})
            </Button>
            {openProductIds.has(product.id) && (
              <div className="mt-2">
                {editingProduct && editingProduct.id === product.id ? (
                  <div>
                    <div className="mb-4">
                      <label className="block mb-1">상품명: </label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => handleProductNameUpdate(product.id, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">가격: </label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => handlePriceUpdate(product.id, parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">재고: </label>
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    {/* 할인 정보 수정 부분 */}
                    <div>
                      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                      {editingProduct.discounts.map((discount, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                          <span>
                            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
                          </span>
                          <Button onClick={() => handleRemoveDiscount(product.id, index)} role="delete">
                            삭제
                          </Button>
                        </div>
                      ))}
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="수량"
                          value={newDiscount.quantity}
                          onChange={(e) => setNewDiscount({ ...newDiscount, quantity: parseInt(e.target.value) })}
                          className="w-1/3 p-2 border rounded"
                        />
                        <input
                          type="number"
                          placeholder="할인율 (%)"
                          value={newDiscount.rate * 100}
                          onChange={(e) => setNewDiscount({ ...newDiscount, rate: parseInt(e.target.value) / 100 })}
                          className="w-1/3 p-2 border rounded"
                        />
                        <button
                          onClick={() => handleAddDiscount(product.id, newDiscount)}
                          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                          할인 추가
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleEditComplete}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                    >
                      수정 완료
                    </button>
                  </div>
                ) : (
                  <div>
                    {product.discounts.map((discount, index) => (
                      <div key={index} className="mb-2">
                        <span>
                          {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
                        </span>
                      </div>
                    ))}
                    <button
                      data-testid="modify-button"
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                    >
                      수정
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
