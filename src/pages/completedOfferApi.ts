import { baseApi } from "../redux/api/baseApi";
export const createCompletedOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompletedOffer: builder.mutation({
      query: (completedOfferInfo) => ({
        url: "/completedOffer/create-completedOffer/",
        method: "POST",
        body: completedOfferInfo,
      }),
      invalidatesTags: ["completedOffer"],
    }),
    viewCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),
  }),
});

export const { useCreateCompletedOfferMutation, useViewCompletedOfferQuery } =
  createCompletedOfferApi;
