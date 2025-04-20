import { SERVICE_TYPE, ServiceType } from "../../types";

export const getNextService = (
  current: ServiceType,
  hasAdminPermission: boolean
): ServiceType => {
  if (current === SERVICE_TYPE.CART && hasAdminPermission)
    return SERVICE_TYPE.ADMIN;
  if (current === SERVICE_TYPE.ADMIN) return SERVICE_TYPE.CART;
  return current; // 권한 없으면 유지
};
