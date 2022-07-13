import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {setUser} from "../features/userSlice"

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["Disputes"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.28bookings.com/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        JSON.parse(localStorage.getItem("accessToken")) ||
        getState().user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
    // baseUrl: `http://localhost:8000/api/admin/`
  }),
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => `admin/dashboard/`,
    }),
    getDashboardRevenue: builder.query({
      query: (arg) => {
        const { skip, limit } = arg;
        return {
          url: `admin/revenue/`,
          params: { skip, limit },
        };
      },
    }),
    getDashboardUsers: builder.query({
      query: (arg) => {
        const { skip, limit } = arg;
        return {
          url: `admin/users/`,
          params: { skip, limit },
        };
      },
    }),
    getDashboardItems: builder.query({
      query: (arg) => {
        const { skip, limit } = arg;
        return {
          url: `admin/items/`,
          params: { skip, limit },
        };
      },
    }),
    getDashboardRentals: builder.query({
      query: (arg) => {
        const { skip, limit } = arg;
        return {
          url: `admin/rentals/`,
          params: { skip, limit },
        };
      },
    }),
    getDashboardDisputes: builder.query({
      query: (arg) => {
        const { page, size, query } = arg;
        return {
          url: `admin/disputes/default/`,
          params: { page, size, query },
        };
      },
      providesTags: ["Disputes"],
    }),
    updateDispute: builder.mutation({
      query: ({ id, body }) => ({
        url: `disputes/${id}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Disputes"],
    }),
    confirmRefund: builder.mutation({
      query: (id) => ({
        url: `disputes/refund/${id}/`,
        method: "POST",
      }),
      invalidatesTags: ["Disputes"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `admin/rental/cancel/${id}/`,
        method: "POST",
      }),
      invalidatesTags: ["Disputes"],
    }),
  }),
});

export const {
  useCancelBookingMutation,
  useConfirmRefundMutation,
  useUpdateDisputeMutation,
  useGetDashboardDisputesQuery,
  useGetDashboardDataQuery,
  useGetDashboardRevenueQuery,
  useGetDashboardUsersQuery,
  useGetDashboardItemsQuery,
  useGetDashboardRentalsQuery,
} = dashboardApi;
