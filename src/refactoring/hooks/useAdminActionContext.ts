import { useContext } from "react";
import { ActionContext, AdminActionContext } from "../context/AdminProvider";

export const useAdminActionContext = (): ActionContext => {
  const object = useContext(AdminActionContext);
  if (!object) {
    throw new Error("useGetComplexObject must be used within a Provider");
  }
  return object;
};
