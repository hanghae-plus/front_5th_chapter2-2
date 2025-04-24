import { Input } from "@/refactoring/components";
import { useProductContext } from "@/refactoring/provider";
import { Product } from "@/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  product: Product;
  editingProduct: Product;
  setEditingProduct: Dispatch<SetStateAction<Product | null>>;
};

export const ModifyProduct = ({ product, editingProduct, setEditingProduct }: Props) => {
  const { products, updateProduct: onProductUpdate } = useProductContext();
  // 새로운 핸들러 함수 추가
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return (
    <>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <Input
          type="text"
          value={editingProduct.name}
          onChange={(e) => handleProductNameUpdate(product.id, e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <Input
          type="number"
          value={editingProduct.price}
          onChange={(e) => handlePriceUpdate(product.id, parseInt(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <Input
          type="number"
          value={editingProduct.stock}
          onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
        />
      </div>
    </>
  );
};
