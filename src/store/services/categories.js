import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `api.28bookings.com/api/`
    // baseUrl: `http://localhost:8000/api/`
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (id) => `subcategories/${id}`,
      providesTags: ['Categories'],
    }),
    getCategory: builder.query({
      query: (id) => `categories/${id}`,
    }),
    getAllCategories: builder.query({
      query: () => `categories/all`,
    }),
    getItemsByCategory: builder.query({
      query: (id) => `categories/${id}/items`,
    }),
    getCategoryBySlug: builder.query({
      query: (slug) => `category/${slug}`,
      providesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query(id) {
        return {
          url: `categories/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ['Categories'],
    }),
    createCategory: builder.mutation({
      query(data) {
        return {
          url: `category`,
          method: 'POST',
          body: data
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ['Categories'],
    })
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetItemsByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation
} = categoriesApi;
