// api.js (updated to include the deleteOffer mutation)
import { baseApi } from "../redux/api/baseApi";

export const createOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOffer: builder.mutation({
      query: (giftInfo) => ({
        url: "/offer/create-offer",
        method: "POST",
        body: giftInfo,
      }),
      invalidatesTags: ['Offer'], // Invalidates the 'Offer' tag on creation
    }),
    viewOffer: builder.query({
      query: ({ offerStatus, device, country }) => {
        const params = new URLSearchParams();
        if (offerStatus) params.append('offerStatus', offerStatus);
        if (device) params.append('device', device);
        if (country) params.append('country', country);

        return {
          url: `/offer?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ['Offer'], 
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/offer/${id}`, 
        method: "DELETE",
      }),
      invalidatesTags: ['Offer'], 
    }),
  }),
});

export const { useCreateOfferMutation, useViewOfferQuery, useDeleteOfferMutation } = createOfferApi;
