interface TypographyProps {
  variant: "h1" | "h2" | "price" | "label" | "productName";
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({
  variant,
  children,
  className = "",
}: TypographyProps) => {
  const baseStyles = {
    h1: "text-3xl font-bold mb-6",
    h2: "text-2xl font-semibold mb-4",
    price: "text-gray-600",
    label: "text-sm font-medium",
    productName: "font-semibold",
  };

  const element = {
    h1: "h1",
    h2: "h2",
    price: "span",
    label: "span",
    productName: "span",
  } as const;

  const Tag = element[variant];

  return (
    <Tag className={`${baseStyles[variant]} ${className}`}>{children}</Tag>
  );
};
