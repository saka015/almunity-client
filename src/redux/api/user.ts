import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Alumni {
  _id: string;
  username: string;
  name: string;
  graduationYear: number;
  linkedin: string;
  company: string;
  position: string;
  email: string;
  college: string;
  profilePicture?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  graduationYear: number;
  linkedin: string;
  company: string;
  position: string;
  calendly: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ConnectionResponse {
  _id: string;
  sender: {
    _id: string;
    username: string;
    name: string;
    graduationYear: number;
    linkedin: string;
    company: string;
    position: string;
    profilePicture?: string;
  };
  receiver: {
    _id: string;
    username: string;
    name: string;
    graduationYear: number;
    linkedin: string;
    company: string;
    position: string;
    profilePicture?: string;
  };
  status: 'pending' | 'accepted';
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionStatusResponse {
  connectionStatus: 'none' | 'requested' | 'incoming' | 'connected';
}

export type UpdateProfileData = Partial<
  Omit<UserProfile, 'username' | 'name' | '_id' | 'createdAt' | 'updatedAt' | '__v'>
>;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['User', 'Connection'],
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: `/user/profile`,
      }),
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<UserProfile, UpdateProfileData>({
      query: (data) => ({
        url: '/user/update-profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    exploreAlumni: builder.query<Alumni[], { searchTerm: string }>({
      query: ({ searchTerm }) => ({
        url: '/user/explore-alumni',
        params: {
          searchTerm,
        },
      }),
    }),
    getAlumniById: builder.query<Alumni, string>({
      query: (username) => ({
        url: `/user/alumni/${username}`,
      }),
    }),
    sendConnectionRequest: builder.mutation<void, { receiverId: string }>({
      query: (data) => ({
        url: '/connection/send',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User', 'Connection'],
    }),
    acceptConnection: builder.mutation<void, { connectionId: string }>({
      query: (data) => ({
        url: `/connection/${data.connectionId}/accept`,
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Connection'],
    }),
    getConnectionStatus: builder.query<ConnectionStatusResponse, string>({
      query: (userId) => ({
        url: `/connection/status/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: 'Connection', id: userId }],
    }),
    getMyConnections: builder.query<
      ConnectionResponse[],
      {
        status: string;
      }
    >({
      query: ({ status }) => ({
        url: '/connection/my-connections',
        params: { status },
      }),
      providesTags: ['Connection'],
    }),
    getPendingConnections: builder.query<ConnectionResponse[], void>({
      query: () => ({
        url: '/connection/pending',
      }),
      providesTags: ['Connection'],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useExploreAlumniQuery,
  useGetAlumniByIdQuery,
  useUpdateProfileMutation,
  useSendConnectionRequestMutation,
  useAcceptConnectionMutation,
  useGetConnectionStatusQuery,
  useGetMyConnectionsQuery,
  useGetPendingConnectionsQuery,
} = userApi;
