import { Product } from '../../../../types';
import useManageProduct from '../../../hooks/useManageProduct';
import AddNewProductItem from './AddNewProductItem';
import EditProductItem from './EditProductItem';

export default function ProductSection({
  products,
  onProductUpdate,
  onProductAdd
}: {
  products: Product[];
  onProductUpdate: (product: Product) => void;
  onProductAdd: (product: Product) => void;
}) {
  const {
    openProductIds,
    showNewProductForm,
    editingProduct,
    setEditingProduct,
    toggleProductAccordion,
    setShowNewProductForm,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate
  } = useManageProduct({
    products,
    onProductUpdate
  });

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
        <AddNewProductItem
          onProductAdd={onProductAdd}
          setShowNewProductForm={setShowNewProductForm}
        />
      )}
      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            data-testid={`product-${index + 1}`}
            className="bg-white p-4 rounded shadow"
          >
            <button
              data-testid="toggle-button"
              onClick={() => toggleProductAccordion(product.id)}
              className="w-full text-left font-semibold"
            >
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
            {openProductIds.has(product.id) && (
              <div className="mt-2">
                {editingProduct && editingProduct.id === product.id ? (
                  <div>
                    <div className="mb-4">
                      <label className="block mb-1">상품명: </label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={e => handleProductNameUpdate(product.id, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">가격: </label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={e => handlePriceUpdate(product.id, parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">재고: </label>
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={e => handleStockUpdate(product.id, parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    {/* 할인 정보 수정 부분 */}
                    <EditProductItem
                      products={products}
                      onProductUpdate={onProductUpdate}
                      editingProduct={editingProduct}
                      setEditingProduct={setEditingProduct}
                    />
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
}
