import { useNewProduct } from "../../../hooks/useNewProduct";
import ProductList from "./ProductList";
import NewProductForm from "./NewProductForm";
import { Product } from "../../../../types";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

const ProductSection = ({ products, onProductUpdate, onProductAdd }: Props) => {
  const {
    showNewProductForm,
    newProduct,
    toggleNewProductForm,
    updateNewProduct,
    resetNewProduct,
    getNewProductWithId,
  } = useNewProduct();

  const handleAddNewProduct = () => {
    const productWithId = getNewProductWithId();
    onProductAdd(productWithId);
    resetNewProduct();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={toggleNewProductForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>

      {showNewProductForm && (
        <NewProductForm
          newProduct={newProduct}
          updateNewProduct={updateNewProduct}
          onAddProduct={handleAddNewProduct}
        />
      )}

      <ProductList products={products} onProductUpdate={onProductUpdate} />
    </div>
  );
};

export default ProductSection;
