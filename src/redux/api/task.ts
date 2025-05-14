import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TaskData {
  title: string;
  description: string;
  price: number;
}

export interface Task extends TaskData {
  _id: string; // Assuming this is the ID field from MongoDB
  createdBy: string;
  applied: number;
  status: 'active' | 'inactive';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface TasksQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, TaskData>({
      query: (taskData) => ({
        url: '/task/create-task',
        method: 'POST',
        body: taskData,
      }),
    }),
    getMyTasks: builder.query<TasksResponse, TasksQueryParams>({
      query: (params) => ({
        url: '/task/my-tasks',
        params: {
          search: params.search || '',
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
    }),
  }),
});

export const { useCreateTaskMutation, useGetMyTasksQuery } = taskApi;