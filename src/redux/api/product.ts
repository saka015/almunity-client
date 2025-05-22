import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  meetLink?: string;
  productType: 'session' | 'product';
  productLink?: string;
  availableDates: string[];
  createdBy: string;
  createdUsername: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  bookedBy?: string;
  bookedAt?: Date;
}

export interface ProductQueryParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:5000/api/v1',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, Omit<Product, 'createdBy' | 'createdUsername' | 'paymentStatus' | '_id'>>({
      query: (productData) => ({
        url: '/product/create-product',
        method: 'POST',
        body: productData,
      }),
    }),
    getAllProducts: builder.query<{ products: Product[]; pagination: { currentPage: number; totalPages: number; totalItems: number; itemsPerPage: number } }, ProductQueryParams>({
      query: (params) => ({
        url: '/product/all-products',
        params: {
          search: params.search || '',
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery
} = productApi;
