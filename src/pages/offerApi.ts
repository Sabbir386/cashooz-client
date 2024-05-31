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
      query: ({ device, country }) => {
        const params = new URLSearchParams();
        if (device) params.append('device', device);
        if (country) params.append('country', country);

        return {
          url: `/offer/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["offer"],
    }),
  }),
});

export const { useCreateOfferMutation, useViewOfferQuery } = createOfferApi;
