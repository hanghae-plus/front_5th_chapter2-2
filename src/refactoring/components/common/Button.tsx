interface Props {
  title: string;
  color: "gray" | "red";
  handler: () => void;
}

export const Button = ({ title, color, handler }: Props) => {
  const bgColor = {
    gray: "bg-gray-300",
    grayHover: "bg-gray-400",
    red: "bg-red-500",
    redHover: "bg-red-600",
  };

  const hoverBgColor = {
    gray: "bg-gray-400",
    red: "bg-red-600",
  };

  const textColor = {
    gray: "text-gray-800",
    red: "text-white",
  };

  return (
    <button
      onClick={handler}
      className={`${bgColor[color]} ${textColor[color]} px-2 py-1 rounded mr-1 hover:${hoverBgColor[color]}`}
    >
      {title}
    </button>
  );
};
