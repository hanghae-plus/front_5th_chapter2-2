import { Discount, Product } from '../../../types';
import { H4 } from '../shared';
import Accordion from '../shared/Accordion';
import AddDiscountForm from './AddDiscountForm';
interface ProductAccordionProps {
  product: Product;
  editingProduct: Product | null;
  handleEditProduct: (product: Product) => void;
  handleEditComplete: () => void;
}
const ProductAccordion = ({
  product,
  editingProduct,
  handleEditProduct,
  handleEditComplete,
}: ProductAccordionProps) => {
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      handleEditProduct(updatedProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      handleEditProduct(updatedProduct);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, stock: newStock };
      handleEditProduct(updatedProduct);
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = {
        ...editingProduct,
        discounts: editingProduct.discounts.filter((_, i) => i !== index),
      };
      handleEditProduct(updatedProduct);
    }
  };

  const handleAddDiscount = (productId: string, discount: Discount) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = {
        ...editingProduct,
        discounts: [...editingProduct.discounts, discount],
      };
      handleEditProduct(updatedProduct);
    }
  };

  return (
    <Accordion title={Title(product)}>
      <div className="mt-2">
        {editingProduct && editingProduct.id === product.id ? (
          <div>
            <div className="mb-4">
              <label className="block mb-1">상품명: </label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  handleProductNameUpdate(product.id, e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">가격: </label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  handlePriceUpdate(product.id, parseInt(e.target.value))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">재고: </label>
              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  handleStockUpdate(product.id, parseInt(e.target.value))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <ProductDiscount
              editingProduct={editingProduct}
              handleRemoveDiscount={handleRemoveDiscount}
              handleAddDiscount={handleAddDiscount}
            />
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
    </Accordion>
  );
};

export default ProductAccordion;

const Title = (product: Product) => {
  return (
    <button
      data-testid="toggle-button"
      className="w-full text-left font-semibold"
    >
      {product.name} - {product.price}원 (재고: {product.stock})
    </button>
  );
};

/**
 * 상품 할인 정보 컴포넌트
 * @param editingProduct 수정할 상품
 * @param handleRemoveDiscount 할인 정보 삭제 함수
 * @param handleAddDiscount 할인 정보 추가 함수
 * @returns 상품 할인 정보 컴포넌트
 */
const ProductDiscount = ({
  editingProduct,
  handleRemoveDiscount,
  handleAddDiscount,
}: {
  editingProduct: Product;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleAddDiscount: (productId: string, discount: Discount) => void;
}) => {
  return (
    <div>
      <H4>할인 정보</H4>
      {editingProduct.discounts.map((discount, index) => (
        <ProductDiscountItem
          key={index}
          discount={discount}
          index={index}
          productId={editingProduct.id}
          handleRemoveDiscount={handleRemoveDiscount}
        />
      ))}
      {/* 할인 추가 폼 */}
      <AddDiscountForm
        productId={editingProduct.id}
        onAddDiscount={handleAddDiscount}
      />
    </div>
  );
};

const ProductDiscountItem = ({
  discount,
  index,
  productId,
  handleRemoveDiscount,
}: {
  discount: Discount;
  index: number;
  productId: string;
  handleRemoveDiscount: (productId: string, index: number) => void;
}) => {
  return (
    <div key={index} className="flex justify-between items-center mb-2">
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
      <button
        onClick={() => handleRemoveDiscount(productId, index)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
};
