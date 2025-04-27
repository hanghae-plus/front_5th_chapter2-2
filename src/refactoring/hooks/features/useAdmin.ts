import { useState } from "react";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return { isAdmin, toggleIsAdmin };
};
