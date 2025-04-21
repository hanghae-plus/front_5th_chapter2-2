import * as React from "react";
import { cn } from "../../utils/cn";
import { Icons } from "./Icons";

const AccordionContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <AccordionContext.Provider value={{ open, setOpen }}>
      <div className={cn(className)} ref={ref} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  const { open, setOpen } = React.useContext(AccordionContext);

  return (
    <button
      className={cn("flex w-full justify-between text-left font-semibold", className)}
      ref={ref}
      {...props}
      onClick={() => setOpen(!open)}
    >
      {children}
    </button>
  );
});

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  const { open } = React.useContext(AccordionContext);

  if (!open) return null;

  return (
    <div className={cn("mt-2", className)} ref={ref} {...props}>
      {children}
    </div>
  );
});

export { Accordion, AccordionTrigger, AccordionContent };
