import { useState } from "react";
//엔티티를 다루지 않는 훅
export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return { isAdmin, toggleIsAdmin };
};
