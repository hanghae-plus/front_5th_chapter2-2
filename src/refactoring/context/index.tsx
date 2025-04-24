import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartItem } from "../../types";

interface LocalStorageContextType {
  localCart: CartItem[];
  setValue: (value: CartItem[]) => void;
  removeValue: () => void;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { localCart, setValue, removeValue } = useLocalStorage();

  return (
    <LocalStorageContext.Provider value={{ localCart, setValue, removeValue }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageContext = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error("useLocalStorageContext must be used within a LocalStorageProvider");
  }
  return context;
};