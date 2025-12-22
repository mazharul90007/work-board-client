export const API_BASE_URL = "https://workboard-server.vercel.app/api/v1";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ============User types===========
export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
}

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
}

// ==============Task types====================
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

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  userId: string;
  user: {
    name: string | null;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  userId: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
}

// ====================Users API=================
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/user`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const res: ApiResponse<User[]> = await response.json();
    return res.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    const res: ApiResponse<User> = await response.json();
    return res.data;
  },

  create: async (input: CreateUserInput): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Failed to create user");
    const res: ApiResponse<User> = await response.json();
    return res.data;
  },

  update: async (id: string, input: UpdateUserInput): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Failed to update user");
    const res: ApiResponse<User> = await response.json();
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
  },
};

// ===================Tasks API==============
export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/task`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    const res: ApiResponse<Task[]> = await response.json();
    return res.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/task/${id}`);
    if (!response.ok) throw new Error("Failed to fetch task");
    const res: ApiResponse<Task> = await response.json();
    return res.data;
  },

  create: async (input: CreateTaskInput): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Failed to create task");
    const res: ApiResponse<Task> = await response.json();
    return res.data;
  },

  update: async (id: string, input: UpdateTaskInput): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/task/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Failed to update task");
    const res: ApiResponse<Task> = await response.json();
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/task/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
  },
};
