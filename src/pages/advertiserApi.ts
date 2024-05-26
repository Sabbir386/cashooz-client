import { baseApi } from "../redux/api/baseApi";
export const createAdvertiserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdvertiser: builder.mutation({
      query: (advertiserInfo) => ({
        url: "/users/create-advertiser/",
        method: "POST",
        body: advertiserInfo,
      }),
      invalidatesTags: ["advertiser"],
    }),
    viewAdvertiser: builder.query({
      query: () => ({
        url: "/advertisers/",
        method: "GET",
      }),
      providesTags: ["advertiser"],
    }),
  }),
});

export const { useCreateAdvertiserMutation, useViewAdvertiserQuery } =
  createAdvertiserApi;
