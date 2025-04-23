import { useAtom } from "jotai";
import { newDiscountAtom } from "../../store/products/atom.ts";
import { handleAddDiscountAtom } from "../../store/products/actions.ts";

export const DiscountFormSection = () => {
  const [newDiscount, setNewDiscount] = useAtom(newDiscountAtom);
  const [, handleAddDiscount] = useAtom(handleAddDiscountAtom);

  return (
    <div className="mt-4 p-2 border rounded">
      <h5 className="font-semibold mb-2">새 할인 추가</h5>
      <div className="flex space-x-2 mb-2">
        <div>
          <label className="block mb-1 text-sm">수량:</label>
          <input
            type="number"
            value={newDiscount.quantity}
            onChange={(e) =>
              setNewDiscount({
                ...newDiscount,
                quantity: parseInt(e.target.value),
              })
            }
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">할인율(%):</label>
          <input
            type="number"
            value={newDiscount.rate}
            onChange={(e) =>
              setNewDiscount({
                ...newDiscount,
                rate: parseInt(e.target.value),
              })
            }
            className="w-full p-1 border rounded"
          />
        </div>
      </div>
      <button
        onClick={() => handleAddDiscount()}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 w-full"
      >
        할인 추가
      </button>
    </div>
  );
};
