type QuantityButton = {
  onClick: () => void;
  label: string;
};

export const QuantityButton = ({ onClick, label }: QuantityButton) => (
  <button
    onClick={onClick}
    className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400">
    {label}
  </button>
);
