import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Alumni {
  username: string;
  name: string;
  graduationYear: number;
  linkedin: string;
  company: string;
  position: string;
  email: string;
  bio: string;
  avatar: string;
  skills: string[];
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
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
  }),
});

export const { useExploreAlumniQuery, useGetAlumniByIdQuery } = userApi;
