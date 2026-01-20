export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface UserSummary {
  id: string;
  name?: string | null;
  email: string;
  profilePhoto?: string | null;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  isDeleted: boolean;
  deletedAt: string | null;
  completedAt: string | null;
  assignedById: string;
  assignedToId: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: UserSummary;
  assignedBy: UserSummary;
}

export interface TaskQueryParams {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  priority?: Priority;
  assignedTo?: string;
  assignedBy?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  assignedToId: string;
  dueDate?: string | null;
}

export interface UpdateTaskInput {
  title?: string | null;
  description?: string | null;
  priority?: Priority | null;
  status?: TaskStatus | null;
  assignedToId?: string | null;
  dueDate?: string | null;
}
