import { baseApi } from "../../redux/api/baseApi";

// Extend the baseApi with the /all-payments route
export const leaderBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => ({
        url: "/payment/all-payments", // The route to fetch all payments
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export the hook for fetching all payments
export const { useGetAllPaymentsQuery } = leaderBoardApi;
