import { useAtom } from "jotai";
import { newProductAtom } from "../../store/products/atom.ts";
import {
  updateNewProductAtom,
  handleAddNewProductAtom,
} from "../../store/products/actions.ts";

export const ProductForm = () => {
  const [newProduct] = useAtom(newProductAtom);
  const [, updateNewProduct] = useAtom(updateNewProductAtom);
  const [, handleAddNewProduct] = useAtom(handleAddNewProductAtom);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-3">새 상품 추가</h3>
      <div className="space-y-3">
        <div>
          <label className="block mb-1">상품명:</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              updateNewProduct({
                field: "name",
                value: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">가격:</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              updateNewProduct({
                field: "price",
                value: parseInt(e.target.value),
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">재고:</label>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) =>
              updateNewProduct({
                field: "stock",
                value: parseInt(e.target.value),
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={() => handleAddNewProduct()}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          상품 추가
        </button>
      </div>
    </div>
  );
};
