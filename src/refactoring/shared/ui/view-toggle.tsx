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

export const ToggleViewOnHide = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isShow } = useViewToggleContext();

  return !isShow && children;
};

export const ToggleViewOnShow = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isShow } = useViewToggleContext();

  return isShow && children;
};

interface ToggleTriggerProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  handleClick?: () => void;
}

export const ViewToggleTrigger = ({
  children,
  handleClick,
  ...props
}: ToggleTriggerProps) => {
  const { toggleView } = useViewToggleContext();

  return (
    <button
      onClick={() => {
        handleClick?.();
        toggleView();
      }}
      {...props}
    >
      {children}
    </button>
  );
};
