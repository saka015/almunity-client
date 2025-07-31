import { UserRegisterData, SimpleUserRegisterData } from '@/app/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/auth-slice';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

interface OTPVerifyResponse {
  status: 'success' | 'error';
  message: string;
  user: User;
}
// test

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<any, SimpleUserRegisterData>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    verifyOtp: builder.mutation<OTPVerifyResponse, { email?: string; otp?: string }>({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    //

    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
