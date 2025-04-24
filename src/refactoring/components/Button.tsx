interface ButtonProps {
  onClick: () => void;
  className: string;
  disabled: boolean;
  text: string;
}

export const Button = ({ onClick, className, disabled, text }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
    </button>
  );
};
