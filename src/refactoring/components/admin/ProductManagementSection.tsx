// components/admin/product/ProductManagementSection.tsx
import { Product } from "../../../types";
import { SectionLayout } from "../common";
import { useProductManagement } from "../../hooks";
import { CreateProductForm } from "./CreateProductForm";

interface ProductManagementSectionProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManagementSection = ({
  products,
  onProductUpdate,
  onProductAdd,
}: ProductManagementSectionProps) => {
  const { accordion, productEdit, discount, productCreate } =
    useProductManagement({ onProductUpdate, onProductAdd });

  const {
    showNewProductForm,
    setShowNewProductForm,
    newProduct,
    setNewProduct,
    handleAddNewProduct,
  } = productCreate;

  return (
    <SectionLayout title="상품 관리">
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      <CreateProductForm
        formData={newProduct}
        setFormData={setNewProduct}
        handleSubmit={handleAddNewProduct}
        showNewProductForm={showNewProductForm}
      />
      <div className="space-y-2">
        {products.map((product, index) => (
          <div
            key={product.id}
            data-testid={`product-${index + 1}`}
            className="bg-white p-4 rounded shadow"
          >
            <button
              data-testid="toggle-button"
              onClick={() => accordion.toggle(product.id)}
              className="w-full text-left font-semibold"
            >
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
            {accordion.isOpen(product.id) && (
              <div className="mt-2">
                {productEdit.editingProduct &&
                productEdit.editingProduct.id === product.id ? (
                  <div>
                    <div className="mb-4">
                      <label className="block mb-1">상품명: </label>
                      <input
                        type="text"
                        value={productEdit.editingProduct.name}
                        onChange={(e) =>
                          productEdit.handleFieldUpdate(
                            product.id,
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">가격: </label>
                      <input
                        type="number"
                        value={productEdit.editingProduct.price}
                        onChange={(e) =>
                          productEdit.handleFieldUpdate(
                            product.id,
                            "price",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">재고: </label>
                      <input
                        type="number"
                        value={productEdit.editingProduct.stock}
                        onChange={(e) =>
                          productEdit.handleFieldUpdate(
                            product.id,
                            "stock",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    {/* 할인 정보 수정 부분 */}
                    {/* <div>
                      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                      {editingProduct.discounts.map((discount, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2"
                        >
                          <span>
                            {discount.quantity}개 이상 구매 시{" "}
                            {discount.rate * 100}% 할인
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveDiscount(product.id, index)
                            }
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="수량"
                          value={newDiscount.quantity}
                          onChange={(e) =>
                            setNewDiscount({
                              ...newDiscount,
                              quantity: parseInt(e.target.value),
                            })
                          }
                          className="w-1/3 p-2 border rounded"
                        />
                        <input
                          type="number"
                          placeholder="할인율 (%)"
                          value={newDiscount.rate * 100}
                          onChange={(e) =>
                            setNewDiscount({
                              ...newDiscount,
                              rate: parseInt(e.target.value) / 100,
                            })
                          }
                          className="w-1/3 p-2 border rounded"
                        />
                        <button
                          onClick={() => handleAddDiscount(product.id)}
                          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                          할인 추가
                        </button>
                      </div>
                    </div> */}
                    <button
                      onClick={productEdit.handleEditComplete}
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
                          {discount.quantity}개 이상 구매 시{" "}
                          {discount.rate * 100}% 할인
                        </span>
                      </div>
                    ))}
                    <button
                      data-testid="modify-button"
                      onClick={() => productEdit.handleEditProduct(product)}
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
    </SectionLayout>
  );
};
