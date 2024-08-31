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
    createPaypalOrder: builder.mutation({
      query: () => ({
        url: "/paypal/create-order",
        method: "POST",
      }),
    }),
    completeOrder: builder.query({ // Changed to query
      query: () => ({
        url: `/paypal/complete-order`,
        method: "GET", // GET request for fetching data
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePaymentIntentMutation,
  useSavePaymentInfoMutation,
  useCreatePaypalOrderMutation,
  useCompleteOrderQuery,
} = extendedBaseApi;
