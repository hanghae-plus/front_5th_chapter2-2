import { QuantityControlProps } from "../types";

export const QuantityControl = ({
  onDecreaseClick,
  onIncreaseClick,
  onRemoveClick,
}: QuantityControlProps) => {
  return (
    <div>
      <button
        onClick={onDecreaseClick}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        -
      </button>
      <button
        onClick={onIncreaseClick}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        +
      </button>
      <button
        onClick={onRemoveClick}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
};
