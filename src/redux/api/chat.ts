import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    username: string;
  };
  receiver: {
    _id: string;
    name: string;
    username: string;
  };
  message: string;
  timestamp: string;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1',
    credentials: 'include',
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], string>({
      query: (userId) => ({
        url: `/chat/${userId}`,
      }),
      providesTags: ['Messages'],
      transformResponse: (response: any) => {
        console.log('Received messages:', response);
        return response || [];
      },
    }),
  }),
});

export const { useGetMessagesQuery } = chatApi;
