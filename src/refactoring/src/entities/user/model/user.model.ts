import { UserRole } from "../types/user.types";

export class User {
  role: UserRole;

  constructor(role: UserRole = "USER") {
    this.role = role;
  }

  isAdmin(): boolean {
    return this.role === "ADMIN";
  }
}
