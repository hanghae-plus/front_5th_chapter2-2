import { createContext, useMemo, useState } from "react";

export interface StateContext {
  isAdmin: boolean;
}

export interface ActionContext {
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: React.ReactNode;
}
export const AdminStateContext = createContext<StateContext | null>(null);
export const AdminActionContext = createContext<ActionContext | null>(null);

export default function AdminProvider({ children }: Props) {
  const [isAdmin, setIsAdmin] = useState(false);

  const stateValue = useMemo(
    () => ({
      isAdmin,
    }),
    [isAdmin]
  );

  const actionValue = useMemo(
    () => ({
      setIsAdmin,
    }),
    []
  );
  return (
    <AdminStateContext.Provider value={stateValue}>
      <AdminActionContext.Provider value={actionValue}>
        {children}
      </AdminActionContext.Provider>
    </AdminStateContext.Provider>
  );
}
