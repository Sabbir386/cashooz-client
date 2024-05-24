import { baseApi } from "../redux/api/baseApi";
export const createOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOffer: builder.mutation({
      query: (giftInfo) => ({
        url: "/offer/create-offer",
        method: "POST",
        body: giftInfo,
      }),
    }),
    viewOffer: builder.query({
      query: () => ({
        url: "/offer/",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateOfferMutation, useViewOfferQuery } = createOfferApi;
