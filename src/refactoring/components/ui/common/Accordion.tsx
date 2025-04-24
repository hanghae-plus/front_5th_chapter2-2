import { ReactNode } from "react";

type AccordionProps = {
  title: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export const Accordion = ({
  title,
  isOpen,
  onToggle,
  children,
  ...props
}: AccordionProps) => {
  return (
    <div className="bg-white p-4 rounded shadow" {...props}>
      <button
        data-testid="toggle-button"
        className="w-full text-left font-semibold"
        onClick={onToggle}
      >
        {title}
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};
