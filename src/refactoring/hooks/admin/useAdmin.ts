import { useLocalStorage } from "../common/useLocalStorage";

export const useAdmin = (initialIsAdmin: boolean) => {
  const [isAdmin, setIsAdmin] = useLocalStorage("isAdmin", initialIsAdmin);

  return { isAdmin, setIsAdmin };
};
