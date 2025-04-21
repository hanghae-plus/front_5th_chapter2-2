export default function QuantityButton({
  children,
  type,
  onClick,
}: {
  type: "PLUS" | "MINUS" | "DELETE";
  children: React.ReactNode;
  onClick: () => void;
}) {
  const baseStyle = "px-2 py-1 rounded mr-1";
  const typeStyle = {
    PLUS: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    MINUS: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    DELETE: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${typeStyle[type]}`}>
      {children}
    </button>
  );
}
