import { baseApi } from "../../redux/api/baseApi";

export const extendedBaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    savePaymentInfo: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payment/save-payment-info",
        method: "POST",
        body: paymentInfo,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePaymentIntentMutation, useSavePaymentInfoMutation } = extendedBaseApi;
