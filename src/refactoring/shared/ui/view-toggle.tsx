import { createContext, useContext, useState } from "react";

interface ViewToggleContexttype {
  isShow: boolean;
  toggleView: () => void;
}

const ViewToggleContext = createContext<ViewToggleContexttype | null>(null);

export const ViewToggle = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useState(false);

  const toggleView = () => setIsShow((prev) => !prev);

  return (
    <ViewToggleContext.Provider value={{ isShow, toggleView }}>
      {children}
    </ViewToggleContext.Provider>
  );
};

const useViewToggleContext = () => {
  const context = useContext(ViewToggleContext);
  if (!context) {
    throw new Error("useViewToggleContext must be used within a ViewToggle");
  }
  return context;
};

export const OnHide = ({ children }: { children: React.ReactNode }) => {
  const { isShow } = useViewToggleContext();

  return !isShow && children;
};

export const OnShow = ({ children }: { children: React.ReactNode }) => {
  const { isShow } = useViewToggleContext();

  return isShow && children;
};

interface ToggleTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: React.ReactNode | ((isShow: boolean) => React.ReactNode);
  handleClick?: () => void;
}

export const Trigger = ({
  children,
  handleClick,
  ...props
}: ToggleTriggerProps) => {
  const { toggleView, isShow } = useViewToggleContext();

  const content = typeof children === "function" ? children(isShow) : children;

  return (
    <button
      onClick={() => {
        handleClick?.();
        toggleView();
      }}
      {...props}
    >
      {content}
    </button>
  );
};

ViewToggle.Trigger = Trigger;
ViewToggle.OnShow = OnShow;
ViewToggle.OnHide = OnHide;
