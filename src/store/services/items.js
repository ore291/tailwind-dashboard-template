import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const itemsApi = createApi({
  reducerPath: "itemsApi",
  tagTypes: ['Items', "Messages", "Withdraw", "Settings"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.28bookings.com/api/`,
    // baseUrl: `http://localhost:8000/api/`,
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
    getWithdrawsPag: builder.query({
      query: (arg) => {
        const { page, size, query } = arg;
        return {
          url: `admin/withdrawals/default/`,
          params: { page, size, query },
        };
      },
      providesTags : ["Withdraw"]
    }),
    getSettings: builder.query({
      query: () => {    
        return {
          url: `settings/`,
        
        };
      },
      providesTags : ["Settings"]
    }),
    getItemsPag: builder.query({
      query: (arg) => {
        const { page, size, query } = arg;
        return {
          url: `admin/users/items/`,
          params: { page, size, query },
        };
      },
      providesTags : ["Items"]
    }),
    getMessagesPag: builder.query({
      query: (arg) => {
        const { page, size, query } = arg;
        return {
          url: `contacts/`,
          params: { page, size, query },
        };
      },
      providesTags : ["Messages"]
    }),
    getRentalsPag: builder.query({
      query: (arg) => {
        const { page, size, id } = arg;
        return {
          url: `admin/rentals/default/`,
          params: { page, size, id },
        };
      },
    }),
    getTransPag: builder.query({
      query: (arg) => {
        const { page, size, id } = arg;
        return {
          url: `admin/transactions/default/`,
          params: { page, size, id },
        };
      },
    }),
    getSingleMessage: builder.query({
      query: (id) => {
        return {
          url: `contacts/${id}`, 
        };
      },
      providesTags : ["Messages"]
    }),
    updateItem: builder.mutation({
        query: ({itemId, body}) => ({
          url: `admin/items/${itemId}/`,
          method: "PATCH",
          body
        }),
        invalidatesTags: ['Items'],
      }),
    updateContact: builder.mutation({
        query: (id) => ({
          url: `contacts/${id}/`,
          method: "PATCH",
          body : {
            reviewed : true
          }
        }),
        invalidatesTags: ['Messages'],
      }),
    updateWithdrawal: builder.mutation({
        query: (id) => ({
          url: `withdrawal/${id}/`,
          method: "PATCH",
          body : {
            status : 1
          }
        }),
        invalidatesTags: ['Withdraw'],
      }),

    updateSettings: builder.mutation({
      query: (value) => ({
        url: `settings/`,
        method: "PATCH",
        body : {
          commision : value
        }
      }),
      invalidatesTags: ['Settings',]
    }),
   
  }),
});

export const {useGetSettingsQuery, useUpdateSettingsMutation, useUpdateWithdrawalMutation, useGetWithdrawsPagQuery, useGetTransPagQuery, useUpdateContactMutation,  useGetSingleMessageQuery,useGetMessagesPagQuery, useGetRentalsPagQuery, useGetItemsPagQuery, useUpdateItemMutation} = itemsApi;