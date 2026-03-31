import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/constants'
import { buildUrl } from '../../utils/common'
import type { Product } from '../../types/types'

export interface ProductParams {
  title?: string
  price_min?: number
  price_max?: number
  categoryId?: string | number
  limit?: number
  offset?: number
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product', 'Products'],
  endpoints: (builder) => ({
    getProduct: builder.query<Product, { id: number }>({
      query: ({ id }) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    getProducts: builder.query<Product[], { params: ProductParams }>({
      query: ({ params }) => buildUrl('/products', params),
      providesTags: ['Products'],
    }),
  }),
})

export const { useGetProductQuery, useGetProductsQuery } = apiSlice
