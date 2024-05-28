import { baseApi } from "../redux/api/baseApi";
export const createNetworkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNetwork: builder.mutation({
      query: (networkInfo) => ({
        url: "/network/create-network/",
        method: "POST",
        body: networkInfo,
      }),
      invalidatesTags: ["network"],
    }),
    viewNetwork: builder.query({
      query: () => ({
        url: "/network/",
        method: "GET",
      }),
      providesTags: ["network"],
    }),
  }),
});

export const { useCreateNetworkMutation, useViewNetworkQuery } =
  createNetworkApi;
