import { useContext } from "react";
import { AdminStateContext, StateContext } from "../context/AdminProvider";

export const useAdminContext = (): StateContext => {
  const object = useContext(AdminStateContext);
  if (!object) {
    throw new Error("useGetComplexObject must be used within a Provider");
  }
  return object;
};
