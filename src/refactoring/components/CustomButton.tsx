interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: 'bg-green' | 'bg-blue' | 'bg-red' | 'bg-gray' | 'bg-white';
}

const VARIANT_MAP: { [k in PropsType['variant']]: string } = {
  'bg-green': 'bg-green-500 text-white hover:bg-green-600 rounded px-2 py-1',
  'bg-blue': 'bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded',
  'bg-red': 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600',
  'bg-gray': 'bg-gray-300 text-gray-800 px-2 py-1 mr-1 rounded hover:bg-gray-400',
  'bg-white': 'bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100',
};

const CustomButton = ({ onClick, label, className, variant, ...props }: PropsType) => {
  return (
    <button {...props} onClick={onClick} className={`${VARIANT_MAP[variant]} ${className}`}>
      {label}
    </button>
  );
};

export default CustomButton;
