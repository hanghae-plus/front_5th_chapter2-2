import { useCallback, useState } from "react";
import { PERMISSION_TYPE, Permission, SERVICE_TYPE, ServiceType } from "../../types";

export const useService = (initialPermission: Permission = PERMISSION_TYPE.USER) => {
  const [permission] = useState<Permission>(initialPermission);
  const [service, setService] = useState<ServiceType>(SERVICE_TYPE.USER);

  const toggleService = useCallback(() => {
    setService((prev) => {
      if (prev === SERVICE_TYPE.USER && permission !== PERMISSION_TYPE.ADMIN) {
        return prev;
      }
      return prev === SERVICE_TYPE.USER ? SERVICE_TYPE.ADMIN : SERVICE_TYPE.USER;
    });
  }, [permission]);

  return {
    service,
    isAdminView: service === SERVICE_TYPE.ADMIN,
    toggleService,
    permission,
    hasAdminPermission: permission === PERMISSION_TYPE.ADMIN,
  };
};
