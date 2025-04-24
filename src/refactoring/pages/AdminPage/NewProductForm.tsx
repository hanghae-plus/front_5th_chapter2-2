import { LabelInput } from "@/refactoring/components";
import { useProductContext } from "@/refactoring/provider";
import { Product } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

const initialNewProduct: Omit<Product, "id"> = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

type Props = {
  setShowNewProductForm: Dispatch<SetStateAction<boolean>>;
};

export const NewProductForm = ({ setShowNewProductForm }: Props) => {
  const { addProduct: onProductAdd } = useProductContext();
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(initialNewProduct);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct(initialNewProduct);
    setShowNewProductForm(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <LabelInput //
        id={"productName"}
        label={"상품명"}
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <LabelInput //
        id={"productPrice"}
        type={"number"}
        label={"가격"}
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
      />
      <LabelInput //
        id={"productStock"}
        type={"number"}
        label={"재고"}
        value={newProduct.stock}
        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
      />
      <button onClick={handleAddNewProduct} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        추가
      </button>
    </div>
  );
};
