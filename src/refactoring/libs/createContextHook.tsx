import { createContext, useContext } from 'react';

export function createContextHook<T, U>(initialValue: (value?: U) => T) {
  const Context = createContext<T>(null as T);

  const Provider = ({ children, value }: { children: React.ReactNode; value?: U }) => {
    const store = initialValue(value);
    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  const useContextHook = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error('must be used within ContextProvider');
    }
    return context as ReturnType<typeof initialValue>;
  };

  return [Provider, useContextHook] as const;
}
