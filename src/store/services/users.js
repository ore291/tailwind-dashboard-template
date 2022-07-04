import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {setUser} from "../features/userSlice"

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ['User', "Staffs"],
  baseQuery: fetchBaseQuery({
    // baseUrl: `${process.env.VITE_APP_BASE_URL}/api/`
    baseUrl: `http://localhost:8000/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        JSON.parse(localStorage.getItem("accessToken")) || getState().user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsersPag: builder.query({
      query: (arg) => {
        const { page, size, query } = arg;
        return {
          url: `admin/users/default`,
          params: { page, size, query },
        };
      },
    }),
    getUser: builder.query({
      query: (id) => {
        return {
          url: `user/${id}`,
        };
      },
      providesTags: ['User'],
    }),
    getUserRentals: builder.query({
      query: (id) => {
        return {
          url: `/admin/rentals/${id}`,
        };
      },
    }),
    getUser: builder.query({
      query: (id) => {
        return {
          url: `user/${id}`,
        };
      },
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `admin/users/${id}`,
        method: "PATCH",
        body: {
          is_active: status,
        },
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({userId, body}) => ({
        url: `admin/users/${userId}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ['User', 'Staffs'],
    }),
    createStaff: builder.mutation({
      query: (body) => ({
        url: `admin/staffs`,
        method: "POST",
        body
      }),
      invalidatesTags: ['Staffs']
    }),
    deleteStaff: builder.mutation({
      query(id) {
        return {
          url: `admin/staffs/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ['Staffs'],
    }),
    

    getStaffsPag: builder.query({
      query: (arg) => {
        const { page, size , query} = arg;
        return {
          url: `admin/users/staffs`,
          params: { page, size , query},
        };
      },
      providesTags: ['Staffs']
    }),
  }),
});

export const {useUpdateUserMutation, useDeleteStaffMutation, useCreateStaffMutation, useGetUsersPagQuery, useGetStaffsPagQuery, useGetUserQuery , useGetUserRentalsQuery, useUpdateUserStatusMutation} = usersApi;
