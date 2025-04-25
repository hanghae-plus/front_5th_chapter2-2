interface CartItemControlsProps {
  productId: string;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemControls = ({ 
  productId, 
  quantity, 
  onUpdateQuantity, 
  onRemove 
}: CartItemControlsProps) => {
  return (
    <div>
      <button
        onClick={() => onUpdateQuantity(productId, quantity - 1)}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        -
      </button>
      <button
        onClick={() => onUpdateQuantity(productId, quantity + 1)}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        +
      </button>
      <button
        onClick={() => onRemove(productId)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
}; 