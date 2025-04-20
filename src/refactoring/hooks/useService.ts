import { useCallback, useState } from "react";
import { PERMISSION_TYPE, Permission, SERVICE_TYPE, ServiceType } from "../../types";
import { getNextService } from "../models/service";

export const useService = (initialPermission: Permission = PERMISSION_TYPE.USER) => {
  const [permission] = useState<Permission>(initialPermission);
  const [service, setService] = useState<ServiceType>(SERVICE_TYPE.CART);

  const toggleService = useCallback(() => {
    setService((prev) => getNextService(prev, permission === PERMISSION_TYPE.ADMIN));
  }, [permission]);

  return {
    service,
    isAdminView: service === SERVICE_TYPE.ADMIN,
    toggleService,
    permission,
    hasAdminPermission: permission === PERMISSION_TYPE.ADMIN,
  };
};
