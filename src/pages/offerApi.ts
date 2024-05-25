import { baseApi } from "../redux/api/baseApi";
export const createOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOffer: builder.mutation({
      query: (giftInfo) => ({
        url: "/offer/create-offer",
        method: "POST",
        body: giftInfo,
      }),
      invalidatesTags: ["offer"],
    }),
    viewOffer: builder.query({
      query: () => ({
        url: "/offer/",
        method: "GET",
      }),
      providesTags: ["offer"],
    }),
  }),
});

export const { useCreateOfferMutation, useViewOfferQuery } = createOfferApi;
