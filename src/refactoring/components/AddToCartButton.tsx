// AddToCartButton.tsx
interface AddToCartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const AddToCartButton = ({ onClick, disabled }: AddToCartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-1 rounded ${
        !disabled
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      disabled={disabled}
    >
      {!disabled ? '장바구니에 추가' : '품절'}
    </button>
  );
};