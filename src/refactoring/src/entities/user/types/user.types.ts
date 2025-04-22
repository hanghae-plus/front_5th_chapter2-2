export type UserRole = "ADMIN" | "USER";

export interface User {
  role: UserRole;
}
