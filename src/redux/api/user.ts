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
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}

export type UpdateProfileData = Partial<Omit<UserProfile, 'username' | 'name' | '_id' | 'createdAt' | 'updatedAt' | '__v'>>;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000',
    credentials: 'include',
  }),
  tagTypes: ['User'],
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

    exploreAlumni: builder.query<Alumni[], { searchTerm: string; }>({
      query: ({ searchTerm }) => ({
        url: '/user/explore-alumni',
        params: {
          searchTerm
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
  invalidatesTags: ['User'],
  }),
  acceptRequest: builder.mutation<void, { senderId: string }>({
  query: (data) => ({
    url: '/connection/accept',
    method: 'POST',
    body: data,
  }),
  invalidatesTags: ['User'],
}),

    getMyConnections: builder.query<Alumni[], {
  status: string
}>({
  query: ({ status }) => ({
    url: '/connection/my-connections',
    params: { status }  
  }),
  providesTags: ['User'],
})
  }),
});

export const { 
  useExploreAlumniQuery, 
  useGetAlumniByIdQuery, 
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useSendConnectionRequestMutation,
  useAcceptRequestMutation,
  useGetMyConnectionsQuery,
} = userApi;
