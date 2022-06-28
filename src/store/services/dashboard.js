import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {setUser} from "../features/userSlice"

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${process.env.VITE_APP_BASE_URL}/api/`
    baseUrl: `http://localhost:8000/api/admin/`
  }),
  endpoints: (builder) => ({
    getDashboardData: builder.query({
        query: () => `dashboard`,
      }),
    // loginUser: builder.mutation({
    //   query(data) {
    //     return {
    //       url: `token`,
    //       method: 'POST',
    //       body: data
    //     }
    //   },
    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       dispatch(setUser(data));
    //     } catch (error) {}
    //   },
    // }),
  }),
});

export const {
  useGetDashboardDataQuery
} = dashboardApi;
