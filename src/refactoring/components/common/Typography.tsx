interface TypographyProps {
  variant: "h1" | "h2" | "h3" | "price" | "label" | "productName" | "navHeader";
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
    h3: "text-lg font-semibold mb-2",
    price: "text-gray-600",
    label: "text-sm font-medium",
    productName: "font-semibold",
    navHeader: "text-2xl font-bold",
  };

  const element = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    price: "span",
    label: "span",
    productName: "span",
    navHeader: "h1",
  } as const;

  const Tag = element[variant];

  return (
    <Tag className={`${baseStyles[variant]} ${className}`}>{children}</Tag>
  );
};
