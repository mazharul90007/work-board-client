import { Priority, TaskStatus } from "./task.interface";

export enum UserRole {
  MEMBER = "MEMBER",
  LEADER = "LEADER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface UserTask {
  id?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
}

export interface User {
  id: string;
  memberId: string;
  email: string;
  name: string | null;
  profilePhoto: string | null;
  phone: string | null;
  role: UserRole;
  status: string;
  createdAt: string;
  updatedAt?: string;
  tasks?: UserTask[];
}

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  status?: UserStatus;
  searchTerm?: string;
  role?: UserRole;
}
