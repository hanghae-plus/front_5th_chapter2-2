type CheckoutButtonProps = {
  onCheckout: () => void;
  disabled?: boolean;
};

export const CheckoutButton = ({ onCheckout, disabled = false }: CheckoutButtonProps) => (
  <button
    onClick={onCheckout}
    disabled={disabled}
    className={`w-full mt-6 py-2 text-white text-lg font-semibold rounded ${
      disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
    }`}>
    주문하기
  </button>
);
