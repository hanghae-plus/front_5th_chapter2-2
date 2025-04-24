import { HTMLAttributes, PropsWithChildren } from "react";

type CardSize = "sm" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    className?: string;
    size?: CardSize;
  }>;

type CardHeaderProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    className?: string;
  }>;

type CardContentProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    className?: string;
  }>;

type CardFooterProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    className?: string;
  }>;

const CardHeader = ({
  children,
  className = "",
  ...props
}: CardHeaderProps) => {
  const headerClasses = ["flex justify-between items-center mb-2", className]
    .filter(Boolean)
    .join(" ");

  return (
    <h2 className={headerClasses} {...props}>
      {children}
    </h2>
  );
};

const CardContent = ({
  children,
  className = "",
  ...props
}: CardContentProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({
  children,
  className = "",
  ...props
}: CardFooterProps) => {
  const footerClasses = ["mt-4", className].filter(Boolean).join(" ");

  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

export const Card = ({
  children,
  size = "md",
  className = "",
  ...props
}: CardProps) => {
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const containerClasses = [
    "mt-6",
    sizeClasses[size],
    "bg-white",
    "shadow",
    "rounded",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
