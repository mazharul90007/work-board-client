import { loginCredentials, loginResponse } from "../interfaces/auth.interface";
import {
  CreateTaskInput,
  Pagination,
  Task,
  TaskQueryParams,
  UpdateTaskInput,
} from "../interfaces/task.interface";
import {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserQueryParams,
} from "../interfaces/user.interface";
import api from "./axios";

export interface ApiResponse<M, T> {
  success: boolean;
  message: string;
  meta?: M;
  data: T;
}

// ====================Auth API=============
export const authApi = {
  login: async (credentials: loginCredentials): Promise<loginResponse> => {
    try {
      const response = await api.post<ApiResponse<null, loginResponse>>(
        "/auth/login",
        credentials,
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};

// ====================Users API=============
export const usersApi = {
  createUser: async (userData: CreateUserInput): Promise<User> => {
    const response = await api.post<ApiResponse<null, User>>(
      "/auth/signup",
      userData,
    );
    return response.data.data;
  },

  getAll: async (
    params?: UserQueryParams,
  ): Promise<{ data: User[]; meta: Pagination }> => {
    const response = await api.get<ApiResponse<Pagination, User[]>>("/user", {
      params,
    });
    return { data: response.data.data, meta: response.data.meta! };
  },

  // getById: async (id: string): Promise<User> => {
  //   const { data } = await api.get<ApiResponse<User>>(`/user/${id}`);

  //   return data.data;
  // },

  updateUser: async (id: string, input: UpdateUserInput) => {
    const { data } = await api.patch<ApiResponse<null, User>>(
      `/user/${id}`,
      input,
    );

    return data.data;
  },
  deleteUser: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null, User>>(`/user/${id}`);
    return data;
  },
};

// ===================Tasks API==============
export const tasksApi = {
  getAll: async (
    params?: TaskQueryParams,
  ): Promise<{ data: Task[]; meta: Pagination }> => {
    const response = await api.get<ApiResponse<Pagination, Task[]>>("/task", {
      params,
    });
    return { data: response.data.data, meta: response.data.meta! };
  },

  createTask: async (taskData: CreateTaskInput): Promise<Task> => {
    const response = await api.post<ApiResponse<null, Task>>("/task", taskData);
    return response.data.data;
  },
  updateTask: async (id: string, data: UpdateTaskInput) => {
    const response = await api.patch(`/task/${id}`, data);
    return response.data;
  },
  deleteTask: async (id: string) => {
    const response = await api.delete(`/task/delete/${id}`);
    return response.data;
  },
};
