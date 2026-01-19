export enum UserRole {
  MEMBER = "MEMBER",
  LEADER = "LEADER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface User {
  id: string;
  memberId: string;
  email: string;
  name: string | null;
  profilePhoto: string | null;
  phone: string | null;
  role: UserRole;
  createdAt: string;
}

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
}
