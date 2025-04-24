interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  disabled?: boolean;
}

export const CartItemActions = ({
  onIncrease,
  onDecrease,
  onRemove,
  disabled = false,
}: Props) => {
  return (
    <div>
      <button
        onClick={onDecrease}
        disabled={disabled}
        aria-label="수량 감소"
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        -
      </button>
      <button
        onClick={onIncrease}
        disabled={disabled}
        aria-label="수량 증가"
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        +
      </button>
      <button
        onClick={onRemove}
        aria-label="삭제"
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
};
