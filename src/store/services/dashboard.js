import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {setUser} from "../features/userSlice"

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.28bookings.com/api/admin/`,
    // baseUrl: `http://localhost:8000/api/admin/`
  }),
  endpoints: (builder) => ({
    getDashboardData: builder.query({
        query: () => `dashboard`,
      }),
    getDashboardRevenue: builder.query({
      query: (arg) => {
        const {skip, limit} = arg;
        return {
          url: `revenue`,
          params: { skip, limit },
        }

      }
    }),
    getDashboardUsers: builder.query({
      query: (arg) => {
        const {skip, limit} = arg;
        return {
          url: `users`,
          params: { skip, limit },
        }

      }
    }),
    getDashboardItems: builder.query({
      query: (arg) => {
        const {skip, limit} = arg;
        return {
          url: `items`,
          params: { skip, limit },
        }

      }
    }),
    getDashboardRentals: builder.query({
      query: (arg) => {
        const {skip, limit} = arg;
        return {
          url: `rentals`,
          params: { skip, limit },
        }

      }
    }),
    
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetDashboardRevenueQuery,
  useGetDashboardUsersQuery,
  useGetDashboardItemsQuery,
  useGetDashboardRentalsQuery

} = dashboardApi;
